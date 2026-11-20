/* Validador Email — página do Painel de Suprimentos
 *
 * Mostra a triagem da caixa de entrada do Outlook gravada na tabela triagem_email
 * por uma tarefa agendada do Claude (conector Microsoft 365 → Supabase).
 * Usa a mesma sessão do Painel (mesmo projeto Supabase, mesmo endereço).
 * O RLS só devolve linhas do próprio dono, e só se ele estiver em validador_email_acesso.
 */
(function () {
  "use strict";

  const SUPABASE_URL = "https://xuukjnpkltvgzjfgivnd.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_67e6uHmdZJw2MU6QRht-gg_Qw6fioLY";
  const SB = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const GRUPOS = [
    { id: "acao", titulo: "Precisa da sua ação", cor: "var(--acao)", aberto: true },
    { id: "responder", titulo: "Esperando sua resposta", cor: "var(--responder)", aberto: true },
    { id: "acompanhar", titulo: "Acompanhar", cor: "var(--acompanhar)", aberto: true },
    { id: "respondido", titulo: "Você já respondeu", cor: "var(--ok)", aberto: false },
    { id: "informativo", titulo: "Informativos", cor: "var(--info)", aberto: false },
    { id: "ruido", titulo: "Pode ignorar", cor: "var(--ruido)", aberto: false },
  ];
  const PESO = { alta: 0, media: 1, baixa: 2 };
  const PREFS = "validador-email:prefs";

  const $ = (id) => document.getElementById(id);
  const abertos = Object.fromEntries(GRUPOS.map((g) => [g.id, g.aberto]));
  let itens = [];
  let uid = null;

  function lerPrefs() {
    try { return JSON.parse(localStorage.getItem(PREFS) || "{}"); } catch { return {}; }
  }
  function salvarPrefs() {
    try {
      localStorage.setItem(PREFS, JSON.stringify({ periodo: $("periodo").value, mostrarResolvidos: $("mostrarResolvidos").checked }));
    } catch { /* sem armazenamento */ }
  }

  function status(texto, erro) {
    $("status").textContent = texto || "";
    $("status").classList.toggle("erro", Boolean(erro));
  }

  function aviso(titulo, texto, mostrarBotao) {
    $("telaApp").classList.add("oculto");
    $("telaAviso").classList.remove("oculto");
    $("avisoTitulo").textContent = titulo;
    $("avisoTexto").textContent = texto;
    $("avisoBotao").classList.toggle("oculto", !mostrarBotao);
  }

  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function linkSeguro(url) {
    return /^https:\/\/(outlook\.office365\.com|outlook\.office\.com|outlook\.live\.com)\//.test(url || "") ? url : "#";
  }
  const dataCurta = (iso) =>
    iso ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "";

  function desde(dias) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (dias - 1));
    return d.toISOString();
  }

  // ---------- dados ----------
  async function carregar() {
    status("Carregando…");
    const [triagem, execucao] = await Promise.all([
      SB.from("triagem_email")
        .select("id,assunto,remetente,remetente_email,recebido_em,categoria,prioridade,resumo,acao_sugerida,prazo,link,lido,em_copia,importancia,resolvido")
        .gte("recebido_em", desde(Number($("periodo").value)))
        .order("recebido_em", { ascending: false })
        .limit(1000),
      SB.from("validador_email_execucoes").select("executado_em,emails_lidos,conversas").order("executado_em", { ascending: false }).limit(1).maybeSingle(),
    ]);
    if (triagem.error) {
      status("Não foi possível carregar: " + triagem.error.message, true);
      return;
    }
    itens = triagem.data || [];
    const ex = execucao.data;
    $("ultima").textContent = ex ? `Última análise: ${dataCurta(ex.executado_em)}` : "Ainda não houve análise.";
    desenhar();
    const pendentes = itens.filter((i) => (i.categoria === "acao" || i.categoria === "responder") && !i.resolvido).length;
    status(`${itens.length} conversas no período · ${pendentes} precisam de você.`);
  }

  async function marcarResolvido(id, valor) {
    const it = itens.find((i) => i.id === id);
    if (it) it.resolvido = valor;
    desenhar();
    const { error } = await SB.from("triagem_email")
      .update({ resolvido: valor, resolvido_em: valor ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) {
      if (it) it.resolvido = !valor;
      desenhar();
      status("Não foi possível salvar: " + error.message, true);
    }
  }

  // ---------- tela ----------
  function cartao(it, cor) {
    const tags = [];
    if (it.prioridade) tags.push(`<span class="tag ${it.prioridade === "alta" ? "alta" : ""}">prioridade ${esc(it.prioridade)}</span>`);
    if (it.prazo) tags.push(`<span class="tag prazo">prazo: ${esc(it.prazo)}</span>`);
    if (it.em_copia) tags.push(`<span class="tag">em cópia/lista</span>`);
    if (it.lido === false) tags.push(`<span class="tag">não lido</span>`);
    const remetente = it.remetente || it.remetente_email || "";
    return `<article class="email ${it.resolvido ? "resolvido" : ""}" style="--cor:${cor}">
      <div class="topo"><a class="assunto" href="${esc(linkSeguro(it.link))}" target="_blank" rel="noopener">${esc(it.assunto || "(sem assunto)")}</a></div>
      <div class="meta">${esc(remetente)} · ${esc(dataCurta(it.recebido_em))}</div>
      ${it.resumo ? `<div class="resumo">${esc(it.resumo)}</div>` : ""}
      ${it.acao_sugerida ? `<div class="acao"><b>Próximo passo:</b> ${esc(it.acao_sugerida)}</div>` : ""}
      <div class="tags">${tags.join("")}
        <label><input type="checkbox" data-resolver="${esc(it.id)}" ${it.resolvido ? "checked" : ""}> resolvido</label>
      </div>
    </article>`;
  }

  function desenhar() {
    const mostrarResolvidos = $("mostrarResolvidos").checked;
    const contadores = [];
    const secoes = [];
    for (const g of GRUPOS) {
      const lista = itens
        .filter((it) => it.categoria === g.id)
        .filter((it) => mostrarResolvidos || !it.resolvido)
        .sort((a, b) => (PESO[a.prioridade] ?? 3) - (PESO[b.prioridade] ?? 3) || Date.parse(b.recebido_em) - Date.parse(a.recebido_em));
      contadores.push(`<button type="button" class="contador" style="--cor:${g.cor}" data-ir="${g.id}"><b>${lista.length}</b><span>${g.titulo}</span></button>`);
      secoes.push(`<section class="grupo ${abertos[g.id] ? "" : "fechado"}" id="grupo-${g.id}" style="--cor:${g.cor}">
        <h2 data-alternar="${g.id}"><span class="bolinha"></span>${g.titulo} (${lista.length})</h2>
        <div class="lista">${lista.length ? lista.map((it) => cartao(it, g.cor)).join("") : '<div class="vazio">Nada aqui.</div>'}</div>
      </section>`);
    }
    $("contadores").innerHTML = contadores.join("");
    $("grupos").innerHTML = secoes.join("");
  }

  // ---------- acesso ----------
  async function iniciar(session) {
    const novo = session && session.user ? session.user.id : null;
    if (novo === uid && novo !== null) return;
    uid = novo;
    if (!uid) {
      $("nomeUsuario").textContent = "";
      aviso("Entre no Painel primeiro", "O Validador Email usa o mesmo login do Painel de Suprimentos.", true);
      return;
    }
    $("nomeUsuario").textContent = session.user.email || "";
    const { data, error } = await SB.from("validador_email_acesso").select("user_id").eq("user_id", uid).maybeSingle();
    if (error || !data) {
      aviso("Acesso restrito", "Esta página é pessoal e não está liberada para o seu usuário.", false);
      return;
    }
    $("telaAviso").classList.add("oculto");
    $("telaApp").classList.remove("oculto");
    await carregar();
  }

  // ---------- eventos ----------
  const p = lerPrefs();
  if (p.periodo) $("periodo").value = p.periodo;
  $("mostrarResolvidos").checked = Boolean(p.mostrarResolvidos);

  $("periodo").addEventListener("change", () => { salvarPrefs(); carregar(); });
  $("mostrarResolvidos").addEventListener("change", () => { salvarPrefs(); desenhar(); });
  $("btnAtualizar").addEventListener("click", carregar);
  document.addEventListener("click", (ev) => {
    const ir = ev.target.closest("[data-ir]");
    if (ir) {
      abertos[ir.dataset.ir] = true;
      const sec = $("grupo-" + ir.dataset.ir);
      sec.classList.remove("fechado");
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const alt = ev.target.closest("[data-alternar]");
    if (alt) {
      const g = alt.dataset.alternar;
      abertos[g] = !abertos[g];
      $("grupo-" + g).classList.toggle("fechado", !abertos[g]);
    }
  });
  document.addEventListener("change", (ev) => {
    const id = ev.target.dataset && ev.target.dataset.resolver;
    if (id) marcarResolvido(id, ev.target.checked);
  });

  SB.auth.onAuthStateChange((_evento, session) => { iniciar(session); });
  SB.auth.getSession().then(({ data }) => iniciar(data && data.session));
})();
