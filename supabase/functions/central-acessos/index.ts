// Central de acessos do Capivara — logins e senhas de todas as aplicações.
//
// Chamada pela aba "Central de acessos" do Painel (só administrador do Painel).
// Cada aplicação guarda os logins no Supabase do seu projeto; esta função usa a
// chave de serviço de cada projeto para criar o login, trocar a senha, mandar o
// link de redefinição e bloquear/desbloquear — e grava o resultado na central.
// Senha nenhuma é guardada: a senha gerada volta UMA vez para quem pediu.
//
// Projetos:
//   painel  — este projeto (Suprimentos, CAP-Refeições, Validador Email). Chave automática.
//   notas   — Controle_Documentos-Fiscais. Secret NOTAS_SERVICE_ROLE_KEY.
//   estoque — almoxarifado. Secret ESTOQUE_SERVICE_ROLE_KEY (perfil, obras e "aprova requisições" vão para profiles).
// Sem o secret de um projeto, as ações daquele app respondem com o aviso de configuração.
//
// Publicar no projeto xuukjnpkltvgzjfgivnd (painel_suprimentos) com verify_jwt = true.
import { createClient } from "jsr:@supabase/supabase-js@2";

const PAINEL_URL = Deno.env.get("SUPABASE_URL")!;
const PAINEL_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const PROJETOS: Record<string, { url: string; key: string | undefined }> = {
  painel: { url: PAINEL_URL, key: PAINEL_KEY },
  notas: { url: Deno.env.get("NOTAS_SUPABASE_URL") || "https://kygainafarusnsstvvhc.supabase.co", key: Deno.env.get("NOTAS_SERVICE_ROLE_KEY") },
  estoque: { url: Deno.env.get("ESTOQUE_SUPABASE_URL") || "https://qjmqburjyqlgwjihvlgp.supabase.co", key: Deno.env.get("ESTOQUE_SERVICE_ROLE_KEY") },
};
const BANIDO = "876000h"; // ~100 anos

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
class Erro extends Error { constructor(msg: string, public status = 400) { super(msg); } }

const db = createClient(PAINEL_URL, PAINEL_KEY, { auth: { persistSession: false } });

// ------------------------------------------------------------------ auth admin genérico (qualquer projeto)
type Conta = { id: string; email: string; last_sign_in_at?: string; banned_until?: string; created_at?: string };
function projeto(nome: string) {
  const p = PROJETOS[nome];
  if (!p) throw new Erro(`Projeto desconhecido: ${nome}`);
  if (!p.key) throw new Erro(`O projeto "${nome}" ainda não está ligado à central: falta o secret ${nome.toUpperCase()}_SERVICE_ROLE_KEY na função central-acessos.`, 412);
  return p as { url: string; key: string };
}
async function gotrue(nome: string, caminho: string, init: RequestInit = {}) {
  const p = projeto(nome);
  const r = await fetch(`${p.url}/auth/v1${caminho}`, {
    ...init,
    headers: { apikey: p.key, Authorization: `Bearer ${p.key}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const txt = await r.text();
  let corpo: any = null;
  try { corpo = txt ? JSON.parse(txt) : null; } catch { corpo = txt; }
  if (!r.ok) throw new Erro(`Projeto ${nome}: ${(corpo && (corpo.msg || corpo.message || corpo.error_description || corpo.error)) || r.status}`, r.status >= 500 ? 502 : 400);
  return corpo;
}
async function contaPorId(nome: string, id: string): Promise<Conta | null> {
  try { return await gotrue(nome, `/admin/users/${id}`); } catch { return null; }
}
async function contaPorEmail(nome: string, email: string): Promise<Conta | null> {
  const alvo = email.trim().toLowerCase();
  for (let page = 1; page <= 20; page++) {
    const r = await gotrue(nome, `/admin/users?page=${page}&per_page=200`);
    const lista: Conta[] = r.users || [];
    const achou = lista.find((u) => (u.email || "").toLowerCase() === alvo);
    if (achou) return achou;
    if (lista.length < 200) break;
  }
  return null;
}
async function todasContas(nome: string): Promise<Conta[]> {
  const out: Conta[] = [];
  for (let page = 1; page <= 20; page++) {
    const r = await gotrue(nome, `/admin/users?page=${page}&per_page=200`);
    out.push(...(r.users || []));
    if ((r.users || []).length < 200) break;
  }
  return out;
}

function gerarSenha(n = 12) {
  const letras = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", nums = "23456789", todos = letras + nums + "@#%";
  const rnd = (max: number) => crypto.getRandomValues(new Uint32Array(1))[0] % max;
  const s = [letras[rnd(letras.length)], nums[rnd(nums.length)], "@#%"[rnd(3)]];
  while (s.length < n) s.push(todos[rnd(todos.length)]);
  for (let i = s.length - 1; i > 0; i--) { const j = rnd(i + 1); [s[i], s[j]] = [s[j], s[i]]; }
  return s.join("");
}
function senhaValida(s: string) {
  if (s.length < 8) throw new Erro("A senha precisa ter pelo menos 8 caracteres.");
  if (!/[A-Za-z]/.test(s) || !/\d/.test(s)) throw new Erro("A senha precisa ter letras e números.");
}

// ------------------------------------------------------------------ central
async function carregar(usuarioId: string, appId: string) {
  const [{ data: u }, { data: app }, { data: ua }] = await Promise.all([
    db.from("acesso_usuarios").select("*").eq("id", usuarioId).maybeSingle(),
    db.from("acesso_aplicacoes").select("*").eq("id", appId).maybeSingle(),
    db.from("acesso_usuario_apps").select("*").eq("usuario_id", usuarioId).eq("app_id", appId).maybeSingle(),
  ]);
  if (!u) throw new Erro("Pessoa não encontrada na central.", 404);
  if (!app) throw new Erro("Aplicação não encontrada.", 404);
  if (!ua) throw new Erro(`${u.nome} ainda não tem acesso a ${app.nome}. Dê o acesso (perfil) antes de mexer no login.`);
  return { u, app, ua };
}
function emailDoLogin(app: any, u: any, ua: any, informado?: string, login?: string) {
  if (informado) return informado.trim().toLowerCase();
  if (ua.conta_email) return String(ua.conta_email).toLowerCase();
  if (app.tipo_login === "login") {
    if (!login) throw new Erro(`${app.nome} entra com usuário (login). Informe o login.`);
    return `${login.trim().toLowerCase().replace(/\s+/g, ".")}@${app.dominio_login}`;
  }
  if (!u.email) throw new Erro("Cadastre o e-mail da pessoa (ou informe o e-mail de entrada).");
  return String(u.email).toLowerCase();
}
async function log(por: { id: string; nome: string }, usuario_id: string | null, app_id: string | null, acao: string, detalhes: unknown = {}) {
  await db.from("acesso_log").insert({ por: por.id, por_nome: por.nome, usuario_id, app_id, acao, detalhes });
}
async function gravarConta(usuarioId: string, appId: string, conta: Conta) {
  const { error } = await db.from("acesso_usuario_apps").update({ conta_id: conta.id, conta_email: conta.email.toLowerCase() })
    .eq("usuario_id", usuarioId).eq("app_id", appId);
  if (error) throw new Erro(error.message, 500);
}

// sincroniza com a aplicação: mesmo projeto → função do banco; Notas → aqui
async function sincronizar(usuarioId: string, appId: string): Promise<string> {
  const { data: app } = await db.from("acesso_aplicacoes").select("*").eq("id", appId).maybeSingle();
  if (!app) return "aplicação desconhecida";
  if (app.sincroniza === "banco") {
    const { data, error } = await db.rpc("acesso_reaplicar", { p_usuario: usuarioId, p_app: appId });
    if (error) throw new Erro(error.message, 500);
    return String(data);
  }
  if (appId === "estoque") return await sincronizarEstoque(usuarioId);
  if (appId !== "notas") return "esta aplicação ainda não recebe a sincronização automática (ajuste manual no app)";
  const p = projeto("notas");
  const notas = createClient(p.url, p.key, { auth: { persistSession: false } });
  const { data: ua } = await db.from("acesso_usuario_apps").select("conta_id").eq("usuario_id", usuarioId).eq("app_id", appId).maybeSingle();
  if (!ua?.conta_id) return "sem login vinculado";
  const { data: u } = await db.from("acesso_usuarios").select("nome").eq("id", usuarioId).maybeSingle();
  const { data: ef, error } = await db.rpc("acesso_efetivo_admin", { p_usuario: usuarioId, p_app: appId });
  if (error) throw new Erro(error.message, 500);
  const perms: string[] = ef?.ativo ? (ef.permissoes || []) : [];
  const role = perms.includes("notas.admin") ? "admin" : perms.includes("notas.supervisor") ? "supervisor" : "operador";
  const coluna = (perms.find((x) => x.startsWith("notas.coluna.")) || "").replace("notas.coluna.", "") || null;
  const conta = await contaPorId("notas", ua.conta_id);
  const r1 = await notas.from("profiles").upsert({ id: ua.conta_id, name: u?.nome, email: conta?.email, role, coluna, active: !!ef?.ativo }, { onConflict: "id" });
  if (r1.error) throw new Erro("Notas: " + r1.error.message, 502);
  if (perms.includes("notas.validador")) {
    const obraIds = (ef.obras || []).map((o: any) => Number(o.ref)).filter((n: number) => Number.isFinite(n));
    const { data: atual } = await notas.from("validador_acessos").select("cnpjs").eq("user_id", ua.conta_id).maybeSingle();
    const r2 = await notas.from("validador_acessos").upsert({
      user_id: ua.conta_id, todas: !!ef.todas_obras, obra_ids: obraIds, cnpjs: atual?.cnpjs || [], atualizado_em: new Date().toISOString(),
    }, { onConflict: "user_id" });
    if (r2.error) throw new Erro("Notas: " + r2.error.message, 502);
  } else {
    await notas.from("validador_acessos").delete().eq("user_id", ua.conta_id);
  }
  return "ok";
}

// ------------------------------------------------------------------ Estoque (projeto almoxarifado)
// O cadastro do Estoque é profiles: papel (operador | encarregado | admin), setor (almoxarifado | compras | frotas),
// ativo, obras_vinculadas (ids das obras do documento do app) e aprova_requisicoes (coluna criada por
// almoxarifado/scripts/central_acessos.sql; sem ela, a marcação antiga do app continua valendo).
const ESTOQUE_DOC = "controle-estoque-obras-v1";
function papelEstoque(perms: string[]) {
  const papel = perms.includes("estoque.admin") ? "admin" : perms.includes("estoque.encarregado") ? "encarregado" : "operador";
  const setor = (perms.find((x) => x.startsWith("estoque.setor.")) || "").replace("estoque.setor.", "") || null;
  const aprova = papel === "admin" || perms.includes("estoque.aprova");
  return { papel, setor, aprova };
}
async function obrasDoEstoque(est: any): Promise<{ id: string; nome: string }[]> {
  const { data, error } = await est.from("app_kv").select("obras:value->obras").eq("key", ESTOQUE_DOC).maybeSingle();
  if (error) throw new Erro("Estoque: " + error.message, 502);
  return (Array.isArray(data?.obras) ? data.obras : []).filter((o: any) => o && o.id).map((o: any) => ({ id: String(o.id), nome: String(o.nome || o.id) }));
}
async function sincronizarEstoque(usuarioId: string): Promise<string> {
  const p = projeto("estoque");
  const est = createClient(p.url, p.key, { auth: { persistSession: false } });
  const { data: ua } = await db.from("acesso_usuario_apps").select("conta_id").eq("usuario_id", usuarioId).eq("app_id", "estoque").maybeSingle();
  if (!ua?.conta_id) return "sem login vinculado";
  const { data: u } = await db.from("acesso_usuarios").select("nome").eq("id", usuarioId).maybeSingle();
  const { data: ef, error } = await db.rpc("acesso_efetivo_admin", { p_usuario: usuarioId, p_app: "estoque" });
  if (error) throw new Erro(error.message, 500);
  const ativo = !!ef?.ativo;
  const { papel, setor, aprova } = papelEstoque(ef?.permissoes || []);
  const obras = ef?.todas_obras
    ? (await obrasDoEstoque(est)).map((o) => o.id)
    : (ef?.obras || []).map((o: any) => o.ref).filter((r: any) => r != null).map(String);
  const conta = await contaPorId("estoque", ua.conta_id);
  const linha: Record<string, unknown> = { id: ua.conta_id, nome: u?.nome, email: conta?.email, papel, setor, ativo, obras_vinculadas: obras, aprova_requisicoes: aprova };
  let r = await est.from("profiles").upsert(linha, { onConflict: "id" });
  if (r.error && /aprova_requisicoes/.test(r.error.message)) {
    delete linha.aprova_requisicoes;
    r = await est.from("profiles").upsert(linha, { onConflict: "id" });
    if (!r.error) return "ok, mas falta rodar almoxarifado/scripts/central_acessos.sql no banco do Estoque: a marcação \"Aprova requisições\" não foi gravada";
  }
  if (r.error) throw new Erro("Estoque: " + r.error.message, 502);
  return "ok";
}
// Estoque: traz pessoas, perfis e obras para a central (não grava nada no Estoque)
async function importarEstoque() {
  const p = projeto("estoque");
  const est = createClient(p.url, p.key, { auth: { persistSession: false } });
  const [{ data: perfis, error: e1 }, obras, { data: kv }] = await Promise.all([
    est.from("profiles").select("*"),
    obrasDoEstoque(est),
    est.from("app_kv").select("aprov:value->config->aprovadores").eq("key", ESTOQUE_DOC).maybeSingle(),
  ]);
  if (e1) throw new Erro("Estoque: " + e1.message, 502);
  const aprovadores: Record<string, boolean> = (kv?.aprov && typeof kv.aprov === "object") ? kv.aprov : {};
  let nObras = 0, nPessoas = 0;
  for (const o of obras) {
    let { data: ob } = await db.from("acesso_obras").select("id").ilike("nome", o.nome).maybeSingle();
    if (!ob) ({ data: ob } = await db.from("acesso_obras").insert({ nome: o.nome }).select("id").single());
    if (ob) { await db.from("acesso_obra_vinculos").upsert({ obra_id: ob.id, app_id: "estoque", ref: o.id }, { onConflict: "obra_id,app_id", ignoreDuplicates: true }); nObras++; }
  }
  const { data: vinc } = await db.from("acesso_obra_vinculos").select("obra_id,ref").eq("app_id", "estoque");
  const { data: pfs } = await db.from("acesso_perfis").select("id,nome,permissoes").eq("app_id", "estoque");
  const perfisCentral = [...(pfs || [])];
  const mesmo = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));
  for (const n of perfis || []) {
    if (!n.email) continue;
    const email = String(n.email).toLowerCase();
    let { data: u } = await db.from("acesso_usuarios").select("id").ilike("email", email).maybeSingle();
    if (!u) ({ data: u } = await db.from("acesso_usuarios").insert({ nome: n.nome || email, email }).select("id").single());
    if (!u) continue;
    const { data: ja } = await db.from("acesso_usuario_apps").select("usuario_id").eq("usuario_id", u.id).eq("app_id", "estoque").maybeSingle();
    if (ja) continue; // não sobrescreve o que já foi ajustado na central
    // a mesma regra do app: coluna aprova_requisicoes → marcação do documento → padrão do papel
    const aprova = n.papel === "admin" || (typeof n.aprova_requisicoes === "boolean" ? n.aprova_requisicoes
      : Object.prototype.hasOwnProperty.call(aprovadores, n.id) ? !!aprovadores[n.id] : n.papel === "encarregado");
    const perms = [
      ...(n.papel === "admin" ? ["estoque.admin"] : n.papel === "encarregado" ? ["estoque.encarregado"] : []),
      ...(n.setor ? ["estoque.setor." + n.setor] : []),
      ...(aprova ? ["estoque.aprova"] : []),
    ];
    let pf = perfisCentral.find((x) => mesmo(x.permissoes || [], perms));
    if (!pf) {
      const nome = [n.papel === "admin" ? "Admin" : n.papel === "encarregado" ? "Encarregado" : "Operador", n.setor, aprova && n.papel !== "admin" ? "aprova" : ""]
        .filter(Boolean).join(" · ");
      const { data: novo } = await db.from("acesso_perfis").insert({ app_id: "estoque", nome, descricao: "Criado na importação", permissoes: perms }).select("id,nome,permissoes").single();
      if (novo) { pf = novo; perfisCentral.push(novo); }
    }
    const vinculadas: string[] = Array.isArray(n.obras_vinculadas) ? n.obras_vinculadas.map(String) : [];
    const veTodas = n.papel === "admin" || (n.papel === "encarregado" && n.setor === "almoxarifado");
    // a importação não deve regravar o Estoque: grava direto, sem chamar sincronizar()
    const { error: eIns } = await db.from("acesso_usuario_apps").insert({
      usuario_id: u.id, app_id: "estoque", perfil_id: pf?.id ?? null, ativo: n.ativo !== false,
      todas_obras: veTodas && !vinculadas.length, conta_id: n.id, conta_email: email,
    });
    if (eIns) continue;
    if (vinculadas.length) {
      const linhas = vinculadas.map((oid) => vinc?.find((x) => x.ref === oid)?.obra_id).filter(Boolean)
        .map((obra_id) => ({ usuario_id: u!.id, app_id: "estoque", obra_id }));
      if (linhas.length) await db.from("acesso_usuario_obras").insert(linhas);
    }
    nPessoas++;
  }
  return { pessoas: nPessoas, obras: nObras };
}

// Notas: traz pessoas, perfis e obras do outro projeto para a central
async function importarNotas() {
  const p = projeto("notas");
  const notas = createClient(p.url, p.key, { auth: { persistSession: false } });
  const [{ data: perfis, error: e1 }, { data: obras, error: e2 }, { data: vals }] = await Promise.all([
    notas.from("profiles").select("id,name,email,role,coluna,active"),
    notas.from("obras").select("id,nome,codigo,active"),
    notas.from("validador_acessos").select("user_id,todas,obra_ids"),
  ]);
  if (e1 || e2) throw new Erro("Notas: " + (e1 || e2)!.message, 502);
  const { data: perfisCentral } = await db.from("acesso_perfis").select("id,nome").eq("app_id", "notas");
  const pid = (nome: string) => perfisCentral?.find((x) => x.nome === nome)?.id ?? null;
  let nObras = 0, nPessoas = 0;
  for (const o of obras || []) {
    let { data: ob } = await db.from("acesso_obras").select("id").ilike("nome", o.nome).maybeSingle();
    if (!ob) ({ data: ob } = await db.from("acesso_obras").insert({ nome: o.nome, codigo: o.codigo, ativa: o.active !== false }).select("id").single());
    if (ob) { await db.from("acesso_obra_vinculos").upsert({ obra_id: ob.id, app_id: "notas", ref: String(o.id) }, { onConflict: "obra_id,app_id", ignoreDuplicates: true }); nObras++; }
  }
  const { data: vinc } = await db.from("acesso_obra_vinculos").select("obra_id,ref").eq("app_id", "notas");
  for (const n of perfis || []) {
    if (!n.email) continue;
    const email = String(n.email).toLowerCase();
    let { data: u } = await db.from("acesso_usuarios").select("id").ilike("email", email).maybeSingle();
    if (!u) ({ data: u } = await db.from("acesso_usuarios").insert({ nome: n.name || email, email }).select("id").single());
    if (!u) continue;
    const { data: ja } = await db.from("acesso_usuario_apps").select("usuario_id").eq("usuario_id", u.id).eq("app_id", "notas").maybeSingle();
    if (ja) continue; // não sobrescreve o que já foi ajustado na central
    const v = (vals || []).find((x) => x.user_id === n.id);
    const nomePerfil = n.role === "admin" ? "Administrador" : n.role === "supervisor" ? "Supervisor"
      : n.coluna === "lancamento" ? "Operador · Lançamento" : n.coluna === "financeiro_cx" ? "Operador · Financeiro/Caixa"
      : n.coluna === "pendencias" ? "Operador · Pendências" : v ? "Validador de obra" : "Operador · Pendências";
    // a importação não deve regravar o Notas: grava direto, sem chamar sincronizar()
    await db.from("acesso_usuario_apps").insert({
      usuario_id: u.id, app_id: "notas", perfil_id: pid(nomePerfil), ativo: n.active !== false,
      todas_obras: v ? !!v.todas : true, conta_id: n.id, conta_email: email,
    });
    if (v && !v.todas && (v.obra_ids || []).length) {
      const linhas = (v.obra_ids as number[]).map((oid) => vinc?.find((x) => x.ref === String(oid))?.obra_id).filter(Boolean)
        .map((obra_id) => ({ usuario_id: u!.id, app_id: "notas", obra_id }));
      if (linhas.length) await db.from("acesso_usuario_obras").insert(linhas);
    }
    nPessoas++;
  }
  return { pessoas: nPessoas, obras: nObras };
}

// ------------------------------------------------------------------ handler
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);
  try {
    const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
    const { data: quem } = await db.auth.getUser(token);
    if (!quem?.user) throw new Erro("Faça login no Painel.", 401);
    const { data: pf } = await db.from("perfis").select("nome,is_admin").eq("id", quem.user.id).maybeSingle();
    if (!pf?.is_admin) throw new Erro("Só o administrador do Painel usa a central de acessos.", 403);
    const por = { id: quem.user.id, nome: pf.nome || quem.user.email || "" };

    const b = await req.json().catch(() => ({}));
    const acao = String(b.acao || "");

    if (acao === "projetos") {
      return json({ projetos: Object.fromEntries(Object.entries(PROJETOS).map(([k, v]) => [k, !!v.key])) });
    }
    if (acao === "importar_estoque") {
      const r = await importarEstoque();
      await log(por, null, "estoque", "importou usuários do Estoque", r);
      return json(r);
    }
    if (acao === "importar_notas") {
      const r = await importarNotas();
      await log(por, null, "notas", "importou usuários do Notas", r);
      return json(r);
    }

    // situação dos logins de uma pessoa em todas as aplicações dela
    if (acao === "status") {
      const { data: apps } = await db.from("acesso_usuario_apps").select("app_id,conta_id,conta_email, acesso_aplicacoes(projeto,nome)")
        .eq("usuario_id", b.usuario_id);
      const out: Record<string, unknown> = {};
      for (const a of apps || []) {
        const proj = (a as any).acesso_aplicacoes?.projeto;
        try {
          projeto(proj);
          let c = a.conta_id ? await contaPorId(proj, a.conta_id) : null;
          if (!c && a.conta_email) c = await contaPorEmail(proj, a.conta_email);
          out[a.app_id] = c
            ? { existe: true, vinculado: c.id === a.conta_id, conta_id: c.id, email: c.email, ultimo_login: c.last_sign_in_at || null,
                bloqueado: !!c.banned_until && new Date(c.banned_until) > new Date(), criado_em: c.created_at }
            : { existe: false };
        } catch (e) {
          out[a.app_id] = { erro: (e as Error).message };
        }
      }
      return json({ status: out });
    }

    const usuarioId = String(b.usuario_id || ""), appId = String(b.app_id || "");
    const { u, app, ua } = await carregar(usuarioId, appId);
    const proj = app.projeto as string;

    if (acao === "vincular") {
      const email = emailDoLogin(app, u, ua, b.email, b.login);
      const c = await contaPorEmail(proj, email);
      if (!c) throw new Erro(`Não existe login ${email} em ${app.nome}. Use "Criar login".`, 404);
      await gravarConta(usuarioId, appId, c);
      const sinc = await sincronizar(usuarioId, appId);
      await log(por, usuarioId, appId, "vinculou login", { email: c.email });
      return json({ ok: true, conta_id: c.id, email: c.email, sincronizacao: sinc });
    }

    if (acao === "criar_login") {
      const email = emailDoLogin(app, u, ua, b.email, b.login);
      const senha = b.senha ? String(b.senha) : gerarSenha();
      senhaValida(senha);
      let c = await contaPorEmail(proj, email);
      const jaExistia = !!c;
      if (!c) {
        const meta: Record<string, unknown> = { nome: u.nome, criado_pela_central: true };
        if (appId === "refeicoes") { meta.app = "medicoes"; meta.login = email.split("@")[0].toUpperCase(); }
        c = await gotrue(proj, "/admin/users", { method: "POST", body: JSON.stringify({ email, password: senha, email_confirm: true, user_metadata: meta }) });
      }
      await gravarConta(usuarioId, appId, c!);
      const sinc = await sincronizar(usuarioId, appId);
      await log(por, usuarioId, appId, jaExistia ? "vinculou login existente" : "criou login", { email });
      return json({ ok: true, email, conta_id: c!.id, ja_existia: jaExistia, senha: jaExistia ? null : senha, sincronizacao: sinc });
    }

    const contaId = ua.conta_id as string | null;
    if (!contaId) throw new Erro(`${u.nome} ainda não tem login vinculado em ${app.nome}. Use "Criar login" ou "Vincular".`);

    if (acao === "definir_senha") {
      const senha = b.senha ? String(b.senha) : gerarSenha();
      senhaValida(senha);
      await gotrue(proj, `/admin/users/${contaId}`, { method: "PUT", body: JSON.stringify({ password: senha, user_metadata: { trocar_senha: !b.senha } }) });
      await log(por, usuarioId, appId, b.senha ? "definiu senha" : "gerou senha temporária", {});
      return json({ ok: true, senha: b.senha ? null : senha });
    }

    if (acao === "enviar_link") {
      const c = await contaPorId(proj, contaId);
      if (!c?.email) throw new Erro("Login não encontrado no projeto da aplicação.", 404);
      if (/@rafinfraestrutura\.com\.br$/i.test(c.email) && appId === "refeicoes") {
        throw new Erro("O login do CAP-Refeições não é um e-mail de verdade: use \"Gerar senha temporária\".");
      }
      const redirect = b.redirect || app.url || undefined;
      await gotrue(proj, `/recover${redirect ? `?redirect_to=${encodeURIComponent(redirect)}` : ""}`, { method: "POST", body: JSON.stringify({ email: c.email }) });
      await log(por, usuarioId, appId, "enviou link de redefinição", { email: c.email });
      return json({ ok: true, email: c.email });
    }

    if (acao === "bloquear" || acao === "desbloquear") {
      await gotrue(proj, `/admin/users/${contaId}`, { method: "PUT", body: JSON.stringify({ ban_duration: acao === "bloquear" ? BANIDO : "none" }) });
      // o mesmo login pode servir a mais de uma aplicação do projeto (ex.: Suprimentos e Validador Email)
      const { data: outros } = await db.from("acesso_usuario_apps").select("app_id").eq("conta_id", contaId).neq("app_id", appId);
      await log(por, usuarioId, appId, acao === "bloquear" ? "bloqueou login" : "desbloqueou login", { tambem_afeta: (outros || []).map((o) => o.app_id) });
      return json({ ok: true, tambem_afeta: (outros || []).map((o) => o.app_id) });
    }

    if (acao === "sincronizar") {
      const r = await sincronizar(usuarioId, appId);
      return json({ ok: true, sincronizacao: r });
    }

    throw new Erro(`Ação desconhecida: ${acao}`);
  } catch (e) {
    const err = e as Erro;
    return json({ error: err.message || String(e) }, err.status || 500);
  }
});
