// SISMED — Edge Function "fotos-compactar" (reconstruída a partir do app v3.1.1)
//
// O que faz, no bucket privado "fotos":
//   1. a/AAAA-MM-DD/*  (cópias pequenas aguardando)  → junta num z/AAAA-MM-DD.zip por dia, registra em fotos_arquivos
//      e apaga as cópias. Só compacta quando o que aguarda soma 3 MB — ou sempre, com {"incluirHoje": true}
//      (botão "Compactar agora" do administrador). Sem incluirHoje, o dia de hoje fica para depois.
//   2. c/AAAA-MM-DD/*  (fotos de consulta) com mais de 20 dias → apaga (continuam no .zip).
//   3. z/*.zip com mais de 12 meses → apaga, junto com a linha em fotos_arquivos.
//
// Quem pode chamar: um administrador logado (pelo app) ou a chave service_role (agenda diária).
// Publicar:  supabase functions deploy fotos-compactar   (ou pelo painel: Edge Functions › Deploy)
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { unzipSync, zipSync } from "npm:fflate@0.8.2";

const BUCKET = "fotos";
const LIMIAR = 3 * 1024 * 1024;   // 3 MB aguardando → compacta
const DIAS_CONSULTA = 20;         // igual a FOTO_CFG.dias no app
const MESES_ZIP = 12;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (o, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });

// data (AAAA-MM-DD) no fuso de São Paulo, deslocada em dias
function diaSP(deslocDias = 0) {
  const d = new Date(Date.now() + deslocDias * 86400000);
  return d.toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
}
const RX_DIA = /^\d{4}-\d{2}-\d{2}$/;

// lista tudo de uma "pasta" (em páginas de 1000)
async function listar(sb, prefixo) {
  const out = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await sb.storage.from(BUCKET).list(prefixo, { limit: 1000, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;
    out.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return out;
}
async function remover(sb, caminhos) {
  for (let i = 0; i < caminhos.length; i += 500) {
    const { error } = await sb.storage.from(BUCKET).remove(caminhos.slice(i, i + 500));
    if (error) throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL");
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anon = Deno.env.get("SUPABASE_ANON_KEY");
    const auth = req.headers.get("Authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "");

    // quem chama: agenda (service_role) ou administrador logado
    if (token !== service) {
      const usr = createClient(url, anon, { global: { headers: { Authorization: auth } } });
      const { data, error } = await usr.rpc("is_admin");
      if (error || data !== true) return json({ error: "Só o administrador pode compactar as fotos." }, 403);
    }
    const sb = createClient(url, service);
    const body = await req.json().catch(() => ({}));
    const incluirHoje = body && body.incluirHoje === true;
    const hoje = diaSP(0);

    // 1. compactar o que aguarda
    const pastas = (await listar(sb, "a")).map((e) => e.name).filter((n) => RX_DIA.test(n) && (incluirHoje || n < hoje)).sort();
    const pend = [];
    let total = 0;
    for (const dia of pastas) {
      const arqs = (await listar(sb, `a/${dia}`)).filter((e) => e.id);   // e.id nulo = subpasta
      const tam = arqs.reduce((s, e) => s + (+(e.metadata && e.metadata.size) || 0), 0);
      if (arqs.length) pend.push({ dia, arqs });
      total += tam;
    }
    let fotosCompactadas = 0;
    if (pend.length && (incluirHoje || total >= LIMIAR)) {
      for (const { dia, arqs } of pend) {
        const zipPath = `z/${dia}.zip`;
        const ent = {};
        // o .zip do dia já existe? soma às fotos que já estão nele
        const ant = await sb.storage.from(BUCKET).download(zipPath);
        if (!ant.error && ant.data) {
          const velho = unzipSync(new Uint8Array(await ant.data.arrayBuffer()));
          for (const [k, v] of Object.entries(velho)) if (!k.endsWith("/")) ent[k] = [v, { level: 0 }];
        }
        const feitos = [];
        for (const a of arqs) {
          const caminho = `a/${dia}/${a.name}`;
          const { data, error } = await sb.storage.from(BUCKET).download(caminho);
          if (error || !data) continue;
          ent[`${dia}/${a.name}`] = [new Uint8Array(await data.arrayBuffer()), { level: 0 }];   // webp/jpg já são comprimidos
          feitos.push(caminho);
        }
        if (!feitos.length) continue;
        const zip = zipSync(ent);
        const up = await sb.storage.from(BUCKET).upload(zipPath, new Blob([zip], { type: "application/zip" }),
          { contentType: "application/zip", upsert: true });
        if (up.error) throw up.error;
        const { error: e2 } = await sb.from("fotos_arquivos").upsert(
          { dia, arquivo: zipPath, qtd: Object.keys(ent).length, bytes: zip.byteLength, atualizado_em: new Date().toISOString() },
          { onConflict: "dia" });
        if (e2) throw e2;
        await remover(sb, feitos);   // só depois que o .zip foi gravado
        fotosCompactadas += feitos.length;
      }
    }

    // 2. fotos de consulta vencidas
    const limiteC = diaSP(-DIAS_CONSULTA);
    let consultaRemovidas = 0;
    for (const p of (await listar(sb, "c")).map((e) => e.name).filter((n) => RX_DIA.test(n) && n <= limiteC)) {
      const arqs = (await listar(sb, `c/${p}`)).filter((e) => e.id).map((e) => `c/${p}/${e.name}`);
      if (arqs.length) { await remover(sb, arqs); consultaRemovidas += arqs.length; }
    }

    // 3. arquivos .zip com mais de 12 meses
    const d = new Date(); d.setMonth(d.getMonth() - MESES_ZIP);
    const limiteZ = d.toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" });
    const velhos = (await listar(sb, "z")).filter((e) => e.id && /^\d{4}-\d{2}-\d{2}\.zip$/.test(e.name) && e.name.slice(0, 10) < limiteZ);
    if (velhos.length) {
      await remover(sb, velhos.map((e) => `z/${e.name}`));
      await sb.from("fotos_arquivos").delete().lt("dia", limiteZ);
    }

    return json({ fotosCompactadas, consultaRemovidas, zipsRemovidos: velhos.length, aguardandoBytes: total });
  } catch (e) {
    return json({ error: String((e && e.message) || e) }, 500);
  }
});
