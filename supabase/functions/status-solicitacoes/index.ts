// API: o sistema de Estoque (almoxarifado) consulta a situação das solicitações de compra do Sienge.
// Recebe { solicitacoes: ["34343", "33598", ...] } e devolve os itens dessas solicitações da tabela sienge_itens
// (última importação do relatório do Sienge feita no Painel): pedido, fornecedor, situação, previsão de entrega,
// nota fiscal e data de entrega na obra. Só leitura.
// Autenticação: o token de login do usuário no Supabase do ESTOQUE (outro projeto), conferido na API de auth
// do estoque; o usuário precisa estar ativo lá — o mesmo esquema da receber-nota-estoque do Controle de Notas.
// verify_jwt fica desligado de propósito: o token é do outro projeto e é conferido aqui.
// Publicada no projeto Supabase xuukjnpkltvgzjfgivnd (painel_suprimentos), verify_jwt = false.
import { createClient } from "jsr:@supabase/supabase-js@2";

const ESTOQUE_URL = "https://qjmqburjyqlgwjihvlgp.supabase.co";
// chave pública (anon) do projeto do estoque — a mesma que já está no index.html dele
const ESTOQUE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbXFidXJqeXFsZ3dqaWh2bGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NzU0NzIsImV4cCI6MjEwNDQ1MTQ3Mn0.cOdmVw3W0HCilACqZIVFMCwsr6zxA0g_3CreKIuk9kw";
const MAX_SOLICITACOES = 300;
const CAMPOS = [
  "num_solicitacao", "data_solicitacao", "situacao_solicitacao", "solicitante", "data_autorizacao_solicitacao",
  "num_pedido", "data_pedido", "situacao_pedido", "situacao_autorizacao_item", "data_autorizacao_pedido",
  "comprador", "fornecedor", "descricao_insumo", "detalhe", "marca", "unidade",
  "qtd_solicitada", "qtd_entregue", "saldo", "previsao_entrega", "data_chegada_obra", "data_entrega_obra",
  "num_nota_fiscal", "data_nota_fiscal", "codigo_obra", "obra", "importado_em",
].join(",");

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Use POST." }, 405);

  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Login do estoque ausente." }, 401);

  // 1) confere o login no Supabase do estoque
  const uRes = await fetch(`${ESTOQUE_URL}/auth/v1/user`, { headers: { apikey: ESTOQUE_ANON, Authorization: `Bearer ${token}` } });
  if (!uRes.ok) return json({ error: "Login do estoque inválido ou expirado." }, 401);
  const user = await uRes.json();
  // 2) perfil precisa estar ativo no estoque
  const pRes = await fetch(`${ESTOQUE_URL}/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=ativo`, {
    headers: { apikey: ESTOQUE_ANON, Authorization: `Bearer ${token}` },
  });
  const perfis = pRes.ok ? await pRes.json() : [];
  if (!perfis || !perfis[0] || !perfis[0].ativo) return json({ error: "Usuário do estoque inativo." }, 403);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "JSON inválido." }, 400); }
  const lista = Array.isArray(body.solicitacoes) ? body.solicitacoes : [];
  // número da solicitação do Sienge: só dígitos (o estoque grava como texto digitado)
  const nums = [...new Set(lista.map((v) => String(v ?? "").replace(/\D/g, "")).filter((v) => v && v.length <= 12))]
    .slice(0, MAX_SOLICITACOES);
  if (!nums.length) return json({ itens: [], importadoEm: null });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const itens: unknown[] = [];
  for (let de = 0; ; de += 1000) {
    const { data, error } = await admin.from("sienge_itens").select(CAMPOS).in("num_solicitacao", nums)
      .order("num_solicitacao").order("num_pedido").range(de, de + 999);
    if (error) { console.error("sienge_itens", error); return json({ error: "Erro ao consultar o Painel de Suprimentos." }, 500); }
    itens.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  const { data: ult } = await admin.from("sienge_itens").select("importado_em").order("importado_em", { ascending: false }).limit(1);
  return json({ itens, importadoEm: ult && ult[0] ? ult[0].importado_em : null });
});
