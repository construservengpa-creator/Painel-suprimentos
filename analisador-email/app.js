/* Analisador de Email — frontend
 *
 * 1. Login Microsoft (MSAL, fluxo de redirecionamento) com permissão só de leitura (Mail.Read).
 * 2. Lê a Caixa de Entrada e os Itens Enviados do período direto no Microsoft Graph.
 * 3. Agrupa por conversa e descobre se você já respondeu depois do último email recebido.
 * 4. Descarta propaganda óbvia localmente e manda o resto, em lotes, para /api/classificar (Claude).
 * 5. Mostra por categoria, com resumo, próxima ação e link para abrir no Outlook.
 */
(function () {
  "use strict";

  const ESCOPOS = ["User.Read", "Mail.Read"];
  const GRAPH = "https://graph.microsoft.com/v1.0";
  const TAMANHO_LOTE = 25;
  const LOTES_EM_PARALELO = 3;
  const LIMITE_EMAILS = 600;
  const CHAVE_CACHE = "analisador-email:classificacoes:v1";
  const CHAVE_RESOLVIDOS = "analisador-email:resolvidos:v1";

  const GRUPOS = [
    { id: "acao", titulo: "Precisa da sua ação", cor: "var(--acao)", aberto: true },
    { id: "responder", titulo: "Esperando sua resposta", cor: "var(--responder)", aberto: true },
    { id: "acompanhar", titulo: "Acompanhar", cor: "var(--acompanhar)", aberto: true },
    { id: "respondido", titulo: "Você já respondeu", cor: "var(--ok)", aberto: false },
    { id: "informativo", titulo: "Informativos", cor: "var(--info)", aberto: false },
    { id: "ruido", titulo: "Pode ignorar", cor: "var(--ruido)", aberto: false },
  ];

  // Remetentes que nunca pedem ação (propaganda, marketplace, pesquisas). Ficam fora da IA.
  const RUIDO_REMETENTE = /(ofertas@|marketing\.|newsletter|promo(cao|coes)?@|news@|mailing|pesquisa|ipsos|@r\.mercadolivre|comunicacao\.)/i;

  const $ = (id) => document.getElementById(id);
  let msalApp = null;
  let conta = null;
  let config = null;
  let itens = [];
  const abertos = Object.fromEntries(GRUPOS.map((g) => [g.id, g.aberto]));

  // ---------- armazenamento local (pode falhar em modo privado) ----------
  function lerLocal(chave) {
    try { return JSON.parse(localStorage.getItem(chave) || "{}"); } catch { return {}; }
  }
  function gravarLocal(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* sem armazenamento */ }
  }
  let cache = lerLocal(CHAVE_CACHE);
  let resolvidos = lerLocal(CHAVE_RESOLVIDOS);

  function limparCacheAntigo() {
    const limite = Date.now() - 30 * 864e5;
    for (const [id, v] of Object.entries(cache)) if (!v.em || v.em < limite) delete cache[id];
    for (const [id, em] of Object.entries(resolvidos)) if (em < limite) delete resolvidos[id];
    gravarLocal(CHAVE_CACHE, cache);
    gravarLocal(CHAVE_RESOLVIDOS, resolvidos);
  }

  // ---------- status ----------
  function status(texto, erro) {
    const el = conta ? $("status") : $("statusLogin");
    el.textContent = texto || "";
    el.classList.toggle("erro", Boolean(erro));
  }

  // ---------- login ----------
  async function iniciar() {
    try {
      const r = await fetch("/api/config");
      config = await r.json();
    } catch {
      status("Não foi possível carregar a configuração do servidor.", true);
      return;
    }
    if (!config.clientId) {
      status("Falta configurar AZURE_CLIENT_ID no Vercel (veja o README).", true);
      $("btnEntrar").disabled = true;
      return;
    }
    msalApp = new msal.PublicClientApplication({
      auth: {
        clientId: config.clientId,
        authority: "https://login.microsoftonline.com/" + (config.tenantId || "organizations"),
        redirectUri: location.origin + "/",
      },
      cache: { cacheLocation: "localStorage" },
    });
    await msalApp.initialize();
    try {
      const resp = await msalApp.handleRedirectPromise();
      if (resp && resp.account) msalApp.setActiveAccount(resp.account);
    } catch (e) {
      status("Falha no login: " + (e.errorMessage || e.message), true);
    }
    conta = msalApp.getActiveAccount() || msalApp.getAllAccounts()[0] || null;
    if (conta) {
      msalApp.setActiveAccount(conta);
      entrouNoApp();
    }
  }

  function entrouNoApp() {
    $("telaLogin").classList.add("oculto");
    $("telaApp").classList.remove("oculto");
    $("btnSair").classList.remove("oculto");
    $("nomeUsuario").textContent = conta.name || conta.username;
    if (!config.iaConfigurada) status("Aviso: ANTHROPIC_API_KEY não está configurada no Vercel; a classificação vai falhar.", true);
    limparCacheAntigo();
  }

  async function token() {
    const pedido = { scopes: ESCOPOS, account: conta };
    try {
      return (await msalApp.acquireTokenSilent(pedido)).accessToken;
    } catch (e) {
      if (e instanceof msal.InteractionRequiredAuthError) {
        await msalApp.acquireTokenRedirect(pedido);
      }
      throw e;
    }
  }

  // ---------- Microsoft Graph ----------
  async function graphGet(url) {
    const r = await fetch(url.startsWith("http") ? url : GRAPH + url, {
      headers: { Authorization: "Bearer " + (await token()), Prefer: 'outlook.body-content-type="text"' },
    });
    if (!r.ok) throw new Error("Graph " + r.status + ": " + (await r.text()).slice(0, 200));
    return r.json();
  }

  async function graphTodos(url, limite) {
    const saida = [];
    let proximo = url;
    while (proximo && saida.length < limite) {
      const pagina = await graphGet(proximo);
      saida.push(...(pagina.value || []));
      proximo = pagina["@odata.nextLink"];
      status(`Lendo emails… ${saida.length}`);
    }
    return saida.slice(0, limite);
  }

  function desde(dias) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - (dias - 1));
    return d.toISOString();
  }

  async function lerCaixa(dias, soNaoLidos) {
    const inicio = desde(dias);
    let filtro = `receivedDateTime ge ${inicio}`;
    if (soNaoLidos) filtro += " and isRead eq false";
    const campos = "id,subject,from,toRecipients,ccRecipients,receivedDateTime,importance,bodyPreview,hasAttachments,isRead,webLink,conversationId";
    const recebidos = await graphTodos(
      `/me/mailFolders/inbox/messages?$filter=${encodeURIComponent(filtro)}&$orderby=receivedDateTime desc&$select=${campos}&$top=100`,
      LIMITE_EMAILS
    );
    const enviados = await graphTodos(
      `/me/mailFolders/sentitems/messages?$filter=${encodeURIComponent("sentDateTime ge " + inicio)}&$orderby=sentDateTime desc&$select=conversationId,sentDateTime&$top=200`,
      2000
    );
    return { recebidos, enviados };
  }

  // ---------- preparação ----------
  function enderecos(lista) {
    return (lista || []).map((r) => (r.emailAddress && (r.emailAddress.address || r.emailAddress.name)) || "").filter(Boolean);
  }

  function montarItens(recebidos, enviados) {
    const meuEmail = (conta.username || "").toLowerCase();
    const ultimoEnvio = {};
    for (const m of enviados) {
      const t = Date.parse(m.sentDateTime);
      if (!ultimoEnvio[m.conversationId] || t > ultimoEnvio[m.conversationId]) ultimoEnvio[m.conversationId] = t;
    }
    // Uma linha por conversa: o email mais recente dela (a lista já vem do mais novo para o mais antigo).
    const porConversa = new Map();
    for (const m of recebidos) {
      const chave = m.conversationId || m.id;
      if (porConversa.has(chave)) { porConversa.get(chave).mensagensNaConversa++; continue; }
      const de = m.from && m.from.emailAddress ? m.from.emailAddress : {};
      const para = enderecos(m.toRecipients);
      porConversa.set(chave, {
        id: m.id,
        assunto: m.subject || "(sem assunto)",
        de: (de.name ? de.name + " " : "") + "<" + (de.address || "") + ">",
        deEndereco: (de.address || "").toLowerCase(),
        para,
        cc: enderecos(m.ccRecipients),
        recebido: m.receivedDateTime,
        importancia: m.importance,
        temAnexo: m.hasAttachments,
        lido: m.isRead,
        link: m.webLink,
        previa: m.bodyPreview || "",
        souDestinatarioDireto: para.some((p) => p.toLowerCase() === meuEmail),
        respondidoPorMim: (ultimoEnvio[chave] || 0) > Date.parse(m.receivedDateTime),
        mensagensNaConversa: 1,
      });
    }
    return [...porConversa.values()];
  }

  // ---------- classificação ----------
  async function classificarLote(lote) {
    const r = await fetch("/api/classificar", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + (await token()) },
      body: JSON.stringify({ emails: lote }),
    });
    const dados = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(dados.erro || "Erro " + r.status);
    return dados.resultados || [];
  }

  async function classificar(lista) {
    const pendentes = [];
    for (const it of lista) {
      if (it.respondidoPorMim) { it.categoria = "respondido"; continue; }
      if (RUIDO_REMETENTE.test(it.deEndereco)) {
        Object.assign(it, { categoria: "ruido", prioridade: "baixa", resumo: "Propaganda ou pesquisa (filtrado sem IA).", acao_sugerida: "", prazo: "" });
        continue;
      }
      const c = cache[it.id];
      if (c) { Object.assign(it, c.r); continue; }
      pendentes.push(it);
    }

    const lotes = [];
    for (let i = 0; i < pendentes.length; i += TAMANHO_LOTE) lotes.push(pendentes.slice(i, i + TAMANHO_LOTE));
    let feitos = 0;
    const falhas = [];
    const porId = new Map(pendentes.map((p) => [p.id, p]));

    async function trabalhador() {
      while (lotes.length) {
        const lote = lotes.shift();
        try {
          const resultados = await classificarLote(lote.map(({ link, lido, deEndereco, ...resto }) => resto));
          for (const res of resultados) {
            const it = porId.get(res.id);
            if (!it) continue;
            const r = { categoria: res.categoria, prioridade: res.prioridade, resumo: res.resumo, acao_sugerida: res.acao_sugerida, prazo: res.prazo };
            Object.assign(it, r);
            cache[it.id] = { r, em: Date.now() };
          }
        } catch (e) {
          falhas.push(e.message);
        }
        feitos += lote.length;
        status(`Classificando com IA… ${feitos}/${pendentes.length}`);
        desenhar();
      }
    }
    if (pendentes.length) {
      status(`Classificando com IA… 0/${pendentes.length}`);
      await Promise.all(Array.from({ length: LOTES_EM_PARALELO }, trabalhador));
      gravarLocal(CHAVE_CACHE, cache);
    }
    // O que a IA não devolveu fica em "acompanhar" para não sumir.
    for (const it of lista) {
      if (!it.categoria) Object.assign(it, { categoria: "acompanhar", prioridade: "media", resumo: "Não foi possível classificar automaticamente.", acao_sugerida: "Abrir e verificar.", prazo: "" });
    }
    return falhas;
  }

  // ---------- tela ----------
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const PESO = { alta: 0, media: 1, baixa: 2 };
  const dataCurta = (iso) => new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

  function cartao(it, cor) {
    const resolvido = Boolean(resolvidos[it.id]);
    const tags = [];
    if (it.prioridade) tags.push(`<span class="tag ${it.prioridade === "alta" ? "alta" : ""}">prioridade ${esc(it.prioridade)}</span>`);
    if (it.prazo) tags.push(`<span class="tag prazo">prazo: ${esc(it.prazo)}</span>`);
    if (!it.souDestinatarioDireto) tags.push(`<span class="tag">em cópia/lista</span>`);
    if (!it.lido) tags.push(`<span class="tag">não lido</span>`);
    if (it.mensagensNaConversa > 1) tags.push(`<span class="tag">${it.mensagensNaConversa} msgs na conversa</span>`);
    return `<article class="email ${resolvido ? "resolvido" : ""}" style="--cor:${cor}">
      <div class="topo"><a class="assunto" href="${esc(it.link)}" target="_blank" rel="noopener">${esc(it.assunto)}</a></div>
      <div class="meta">${esc(it.de)} · ${esc(dataCurta(it.recebido))}</div>
      ${it.resumo ? `<div class="resumo">${esc(it.resumo)}</div>` : `<div class="resumo">${esc(it.previa.slice(0, 200))}</div>`}
      ${it.acao_sugerida ? `<div class="acao"><b>Próximo passo:</b> ${esc(it.acao_sugerida)}</div>` : ""}
      <div class="tags">${tags.join("")}
        <label><input type="checkbox" data-resolver="${esc(it.id)}" ${resolvido ? "checked" : ""}> resolvido</label>
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
        .filter((it) => mostrarResolvidos || !resolvidos[it.id])
        .sort((a, b) => (PESO[a.prioridade] ?? 3) - (PESO[b.prioridade] ?? 3) || Date.parse(b.recebido) - Date.parse(a.recebido));
      contadores.push(`<button type="button" class="contador" style="--cor:${g.cor}" data-ir="${g.id}"><b>${lista.length}</b><span>${g.titulo}</span></button>`);
      const aberto = abertos[g.id] ? "" : "fechado";
      secoes.push(`<section class="grupo ${aberto}" id="grupo-${g.id}" style="--cor:${g.cor}">
        <h2 data-alternar="${g.id}"><span class="bolinha"></span>${g.titulo} (${lista.length})</h2>
        <div class="lista">${lista.length ? lista.map((it) => cartao(it, g.cor)).join("") : '<div class="vazio">Nada aqui.</div>'}</div>
      </section>`);
    }
    $("contadores").innerHTML = itens.length ? contadores.join("") : "";
    $("grupos").innerHTML = itens.length ? secoes.join("") : "";
  }

  // ---------- ações ----------
  async function analisar() {
    const botao = $("btnAnalisar");
    botao.disabled = true;
    itens = [];
    desenhar();
    try {
      status("Lendo emails…");
      const { recebidos, enviados } = await lerCaixa(Number($("periodo").value), $("soNaoLidos").checked);
      itens = montarItens(recebidos, enviados);
      desenhar();
      const falhas = await classificar(itens);
      desenhar();
      const acao = itens.filter((i) => (i.categoria === "acao" || i.categoria === "responder") && !resolvidos[i.id]).length;
      const resumo = `${recebidos.length} emails em ${itens.length} conversas · ${acao} precisam de você.` +
        (recebidos.length >= LIMITE_EMAILS ? ` Limite de ${LIMITE_EMAILS} emails atingido; escolha um período menor para ver tudo.` : "");
      status(falhas.length ? `${resumo} Alguns lotes falharam: ${falhas[0]}` : resumo, falhas.length > 0);
    } catch (e) {
      status("Erro: " + e.message, true);
    } finally {
      botao.disabled = false;
    }
  }

  // Lembra as últimas escolhas de período e filtros.
  const PREFS = "analisador-email:prefs";
  function carregarPrefs() {
    const p = lerLocal(PREFS);
    if (p.periodo) $("periodo").value = p.periodo;
    $("soNaoLidos").checked = Boolean(p.soNaoLidos);
    $("mostrarResolvidos").checked = Boolean(p.mostrarResolvidos);
  }
  function salvarPrefs() {
    gravarLocal(PREFS, { periodo: $("periodo").value, soNaoLidos: $("soNaoLidos").checked, mostrarResolvidos: $("mostrarResolvidos").checked });
  }

  $("btnEntrar").addEventListener("click", () => {
    if (!msalApp) return;
    msalApp.loginRedirect({ scopes: ESCOPOS, prompt: "select_account" });
  });
  $("btnSair").addEventListener("click", () => msalApp && msalApp.logoutRedirect({ account: conta }));
  $("btnAnalisar").addEventListener("click", analisar);
  ["periodo", "soNaoLidos", "mostrarResolvidos"].forEach((id) => $(id).addEventListener("change", () => { salvarPrefs(); if (id === "mostrarResolvidos") desenhar(); }));
  document.addEventListener("click", (ev) => {
    const ir = ev.target.closest("[data-ir]");
    if (ir) {
      const sec = $("grupo-" + ir.dataset.ir);
      abertos[ir.dataset.ir] = true;
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
    if (!id) return;
    if (ev.target.checked) resolvidos[id] = Date.now(); else delete resolvidos[id];
    gravarLocal(CHAVE_RESOLVIDOS, resolvidos);
    desenhar();
  });

  carregarPrefs();
  iniciar();
})();
