/* ============================================================
   COTAÇÃO DE PREÇOS (CERTAME) — Painel de Suprimentos
   ============================================================
   Rotina completa de cotação:
     1. Novo certame: escolhe os insumos das SOLICITAÇÕES PENDENTES do
        relatório do Sienge (state.rows com solicPendente) e define prazo,
        local de entrega e critério de julgamento.
     2. Convites: escolhe fornecedores do cadastro e envia a solicitação de
        cotação pelo WhatsApp (wa.me com a mensagem pronta). Cada fornecedor
        recebe um link exclusivo (cotacao.html?t=<token>) que abre dentro do
        próprio WhatsApp; ele preenche os preços e a resposta chega no banco.
        Se o fornecedor responder por mensagem de texto, o comprador lança
        os preços manualmente ("Lançar resposta").
     3. Mapa comparativo: itens × fornecedores, menor preço destacado,
        totais, cobertura, economia e sugestão automática do vencedor.
     4. Indicação do vencedor: por item ou global (lote), com justificativa
        obrigatória quando o indicado não for o menor preço; conclusão do
        certame, impressão do mapa e aviso ao vencedor pelo WhatsApp.
   Banco: supabase/cotacao_certame.sql (tabelas cotacao_*).
   Permissões: leitura para quem está logado; criar/editar para quem pode
   lançar cotação (admin, supervisor, operador, operador avançado).
   ============================================================ */
(function(){
  'use strict';
  const SB = () => window.SB;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const h = s => (s == null ? '' : String(s)).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = v => (Number(v) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = v => (Number(v) || 0).toLocaleString('pt-BR', { maximumFractionDigits: 3 });
  const parseNum = v => {
    if (v == null) return null;
    let s = String(v).trim().replace(/[R$\s]/g, '');
    if (!s) return null;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    const n = Number(s);
    return isFinite(n) ? n : null;
  };
  const fmtDataHora = iso => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };
  const soDigitos = s => String(s || '').replace(/\D/g, '');
  // WhatsApp: guarda com DDI 55 quando vier só DDD + número
  const normFone = s => { const d = soDigitos(s); return (d.length === 10 || d.length === 11) ? '55' + d : d; };
  const fmtFone = s => {
    const d = soDigitos(s);
    const m = d.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? `(${m[1]}) ${m[2]}-${m[3]}` : (d || '—');
  };
  const podeLancar = () => { const p = window.PERFIL || {}; return !!(p.logado && (p.isAdmin || p.isSupervisor || p.isOperador || p.isOperadorAvancado)); };
  const ehGestor = () => { const p = window.PERFIL || {}; return !!(p.isAdmin || p.isSupervisor); };
  const numCert = id => 'COT-' + String(id).padStart(4, '0');

  const STATUS = {
    rascunho:   { t: 'Rascunho',          c: 'var(--text-dim)' },
    em_cotacao: { t: 'Em cotação',        c: 'var(--blue)' },
    em_analise: { t: 'Em análise',        c: 'var(--amber)' },
    concluida:  { t: 'Concluída',         c: 'var(--teal)' },
    cancelada:  { t: 'Cancelada',         c: 'var(--red)' }
  };
  const ST_CONV = {
    pendente:   { t: 'Não enviado', c: 'var(--text-dim)' },
    enviado:    { t: 'Aguardando',  c: 'var(--amber)' },
    respondido: { t: 'Respondeu',   c: 'var(--teal)' },
    declinou:   { t: 'Declinou',    c: 'var(--red)' }
  };
  /* IBS/CBS (reforma tributária): o mapa compara pelo CUSTO LÍQUIDO de cada preço.
       regular / Simples com IBS/CBS por fora: nota = preço × (1 + t)   crédito = preço × t × a
       Simples (IBS/CBS dentro do DAS):        nota = preço             crédito = preço × t × a
       custo líquido = nota − crédito; t = (CBS% + IBS%)/100; a = aproveitamento do crédito no certame.
     Sem regime informado: sem crédito (custo = preço). Frete entra pelo valor informado. */
  const REGIMES = {
    regular:          { t: 'Regime regular',              c: 'var(--teal)' },
    simples:          { t: 'Simples Nacional',            c: 'var(--amber)' },
    simples_por_fora: { t: 'Simples c/ IBS/CBS por fora', c: 'var(--blue)' }
  };
  const SEM_REGIME = { t: 'Regime não informado', c: 'var(--text-dim)' };
  const pct = v => (Number(v) || 0).toLocaleString('pt-BR', { maximumFractionDigits: 4 });
  const aproveitamento = p => (p && p.credito_ibs_cbs_pct != null ? Number(p.credito_ibs_cbs_pct) : 100) / 100;
  function fiscal(preco, resp, regime, aprov){
    const cbs = resp && resp.aliq_cbs != null ? Number(resp.aliq_cbs) : 0;
    const ibs = resp && resp.aliq_ibs != null ? Number(resp.aliq_ibs) : 0;
    const t = regime ? (cbs + ibs) / 100 : 0;
    const porFora = regime === 'regular' || regime === 'simples_por_fora';
    const trib = preco * t;
    const nota = porFora ? preco + trib : preco;
    const credito = trib * aprov;
    return { cbs, ibs, t, trib, nota, credito, liquido: nota - credito, porFora, informado: !!regime && (resp && (resp.aliq_cbs != null || resp.aliq_ibs != null)) };
  }
  const pill = (o) => `<span class="cert-pill" style="--c:${o.c}">${h(o.t)}</span>`;

  const S = {
    view: 'lista',            // lista | novo | fornecedores | detalhe
    processos: [], resumo: {}, fornecedores: [],
    atual: null,              // { p, itens, convites, respostas }
    selecao: new Set(),       // chaves das linhas de solicitação marcadas
    preSelecao: null,         // linhas vindas da aba Solicitações
    escolha: {},              // vencedor escolhido na tela: itemId -> conviteId | 'global' -> conviteId
    canal: null, carregado: false
  };

  /* ---------------- estilos ---------------- */
  const css = `
  #tab-certames .cert-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
  #tab-certames .cert-tabs button{border:1px solid var(--line);background:var(--asphalt-2);color:var(--text-dim);padding:8px 14px;border-radius:6px;font:600 12.5px var(--font-body);cursor:pointer}
  #tab-certames .cert-tabs button.on{background:var(--yellow);border-color:var(--yellow);color:#1A1E24}
  #tab-certames .cert-pill{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11.5px;font-weight:600;color:var(--c);border:1px solid var(--c);white-space:nowrap;background:color-mix(in srgb,var(--c) 12%,transparent)}
  #tab-certames .cert-grid{display:grid;gap:14px}
  #tab-certames .cert-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px;margin-bottom:14px}
  #tab-certames .cert-kpi{background:var(--asphalt-2);border:1px solid var(--line);border-radius:8px;padding:12px 14px}
  #tab-certames .cert-kpi .k{font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:.06em}
  #tab-certames .cert-kpi .v{font:600 20px var(--font-display);margin-top:4px;font-variant-numeric:tabular-nums}
  #tab-certames .cert-kpi .d{font-size:11.5px;color:var(--text-faint);margin-top:2px}
  #tab-certames table.data td.num,#tab-certames table.data th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
  #tab-certames table.data td.wrap{white-space:normal;min-width:220px;max-width:460px;line-height:1.4}
  #tab-certames tr.clicavel{cursor:pointer}
  #tab-certames .cert-acoes{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  #tab-certames .cert-vazio{padding:28px;text-align:center;color:var(--text-dim);font-size:13px}
  #tab-certames .cert-mapa td.melhor{background:color-mix(in srgb,var(--teal) 16%,transparent);font-weight:600}
  #tab-certames .cert-mapa td.vence{outline:2px solid var(--yellow);outline-offset:-2px}
  #tab-certames .cert-mapa td.semcot{color:var(--text-faint)}
  #tab-certames .cert-mapa th.forn{min-width:150px;text-align:center}
  #tab-certames .cert-mapa tfoot td{font-weight:600;border-top:2px solid var(--line)}
  #tab-certames .cert-mapa label.radio{display:inline-flex;gap:4px;align-items:center;font-size:11px;color:var(--text-dim);cursor:pointer;margin-left:6px}
  #tab-certames .cert-mapa label.radio input{width:auto;margin:0}
  #tab-certames .cert-sub{font-size:11.5px;color:var(--text-faint);display:block}
  #tab-certames .cert-aviso{border:1px solid var(--amber);background:color-mix(in srgb,var(--amber) 10%,transparent);color:var(--text);border-radius:8px;padding:10px 12px;font-size:12.5px;margin-bottom:12px}
  #tab-certames .cert-ok{border-color:var(--teal);background:color-mix(in srgb,var(--teal) 10%,transparent)}
  #tab-certames .btn.wa{background:#25D366;border-color:#25D366;color:#0B141A}
  #tab-certames .btn.wa:hover{background:#3be07a}
  #tab-certames input.cert-in{background:var(--asphalt-2);border:1px solid var(--line);color:var(--text);border-radius:6px;padding:6px 8px;font:13px var(--font-body);width:100%}
  #tab-certames input.cert-qtd{width:96px;text-align:right}
  #tab-certames .cert-sel-bar{display:flex;gap:10px;align-items:center;flex-wrap:wrap;position:sticky;bottom:0;background:var(--asphalt-2);border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin-top:12px;z-index:5}
  #certModal .modal{max-width:760px}
  #certModal table.data td{vertical-align:middle}
  #certModal input,#certModal select,#certModal textarea{background:var(--asphalt-2);border:1px solid var(--line);color:var(--text);border-radius:6px;padding:7px 9px;font:13px var(--font-body);width:100%}
  #certModal input[type=checkbox]{width:auto}
  #certToast{position:fixed;right:18px;bottom:18px;z-index:90;background:var(--asphalt-2);border:1px solid var(--teal);border-left:4px solid var(--teal);color:var(--text);padding:10px 14px;border-radius:8px;font-size:13px;box-shadow:0 6px 24px rgba(0,0,0,.35);display:none;max-width:340px}
  @media (max-width:640px){#tab-certames .ctr-frm{grid-template-columns:1fr}}
  `;

  /* ---------------- utilidades de UI ---------------- */
  function toast(msg){
    let t = $('#certToast');
    if (!t) { t = document.createElement('div'); t.id = 'certToast'; document.body.appendChild(t); }
    t.textContent = msg; t.style.display = 'block';
    clearTimeout(toast._t); toast._t = setTimeout(() => { t.style.display = 'none'; }, 5000);
  }
  function erro(e, ctx){
    console.error(ctx, e);
    const m = (e && (e.message || e.error_description)) || String(e);
    alert((ctx ? ctx + '\n\n' : '') + m);
  }
  function modal(titulo, corpoHtml, botoes){
    let bd = $('#certModal');
    if (!bd) {
      bd = document.createElement('div'); bd.id = 'certModal'; bd.className = 'modal-backdrop';
      bd.addEventListener('click', e => { if (e.target === bd) fecharModal(); });
      document.body.appendChild(bd);
    }
    bd.innerHTML = `<div class="modal wide" role="dialog" aria-modal="true"><h3>${h(titulo)}</h3><div class="cert-modal-corpo">${corpoHtml}</div>
      <div class="modal-actions">${(botoes || []).map((b, i) => `<button class="btn ${b.cls || ''}" data-mb="${i}">${h(b.t)}</button>`).join('')}</div></div>`;
    (botoes || []).forEach((b, i) => $(`[data-mb="${i}"]`, bd).addEventListener('click', () => b.fn ? b.fn(bd) : fecharModal()));
    bd.classList.add('open');
    return bd;
  }
  function fecharModal(){ const bd = $('#certModal'); if (bd) bd.classList.remove('open'); }
  const painel = () => $('#tab-certames');

  /* ---------------- dados ---------------- */
  async function carregarLista(){
    const [pr, fo, it, cv] = await Promise.all([
      SB().from('cotacao_processos').select('*').order('id', { ascending: false }),
      SB().from('cotacao_fornecedores').select('*').order('nome'),
      SB().from('cotacao_itens').select('id,processo_id'),
      SB().from('cotacao_convites').select('id,processo_id,status')
    ]);
    for (const r of [pr, fo, it, cv]) if (r.error) throw r.error;
    S.processos = pr.data || [];
    S.fornecedores = fo.data || [];
    S.resumo = {};
    S.processos.forEach(p => { S.resumo[p.id] = { itens: 0, convites: 0, respostas: 0 }; });
    (it.data || []).forEach(i => { if (S.resumo[i.processo_id]) S.resumo[i.processo_id].itens++; });
    (cv.data || []).forEach(c => {
      const r = S.resumo[c.processo_id]; if (!r) return;
      r.convites++; if (c.status === 'respondido') r.respostas++;
    });
    S.carregado = true;
    const pillEl = document.getElementById('countCertames');
    if (pillEl) pillEl.textContent = S.processos.filter(p => p.status === 'em_cotacao' || p.status === 'em_analise').length;
  }
  async function carregarCertame(id){
    const [p, it, cv] = await Promise.all([
      SB().from('cotacao_processos').select('*').eq('id', id).single(),
      SB().from('cotacao_itens').select('*').eq('processo_id', id).order('ordem').order('id'),
      SB().from('cotacao_convites').select('*').eq('processo_id', id).order('id')
    ]);
    for (const r of [p, it, cv]) if (r.error) throw r.error;
    const ids = (cv.data || []).map(c => c.id);
    let resp = [];
    if (ids.length) {
      const r = await SB().from('cotacao_respostas').select('*').in('convite_id', ids);
      if (r.error) throw r.error;
      resp = r.data || [];
    }
    if (!S.fornecedores.length) {
      const f = await SB().from('cotacao_fornecedores').select('*').order('nome');
      if (!f.error) S.fornecedores = f.data || [];
    }
    S.atual = { p: p.data, itens: it.data || [], convites: cv.data || [], respostas: resp };
    // escolha inicial: o que já está gravado, senão a sugestão do mapa
    S.escolha = {};
    S.atual.itens.forEach(i => { if (i.vencedor_convite_id) S.escolha[i.id] = i.vencedor_convite_id; });
    if (S.atual.p.vencedor_convite_id) S.escolha.global = S.atual.p.vencedor_convite_id;
  }
  const fornecedorDe = conv => S.fornecedores.find(f => f.id === conv.fornecedor_id) || { nome: '(fornecedor removido)', telefone: '' };

  /* ---------------- mapa comparativo (cálculo) ---------------- */
  function calcularMapa(){
    const A = S.atual; if (!A) return null;
    const conv = A.convites.filter(c => c.status === 'respondido');
    const preco = {}; // itemId -> conviteId -> resposta
    A.respostas.forEach(r => {
      if (!conv.some(c => c.id === r.convite_id)) return;
      (preco[r.item_id] = preco[r.item_id] || {})[r.convite_id] = r;
    });
    const valor = (itemId, convId) => {
      const r = (preco[itemId] || {})[convId];
      return r && r.disponivel !== false && r.valor_unitario != null ? Number(r.valor_unitario) : null;
    };
    const aprov = aproveitamento(A.p);
    // detalhe fiscal de um preço (por unidade): nota, IBS/CBS, crédito e custo líquido
    const fisc = (itemId, convId) => {
      const v = valor(itemId, convId); if (v == null) return null;
      const c = conv.find(x => x.id === convId);
      return Object.assign({ preco: v }, fiscal(v, (preco[itemId] || {})[convId], c && c.regime_tributario, aprov));
    };
    const custo = (itemId, convId) => { const f = fisc(itemId, convId); return f ? f.liquido : null; };
    const itens = A.itens.map(i => {
      const ofertas = conv.map(c => ({ conv: c.id, v: custo(i.id, c.id), p: valor(i.id, c.id) })).filter(o => o.v != null).sort((a, b) => a.v - b.v);
      const media = ofertas.length ? ofertas.reduce((s, o) => s + o.v, 0) / ofertas.length : null;
      return { item: i, ofertas, melhor: ofertas[0] || null, maior: ofertas[ofertas.length - 1] || null, media };
    });
    // total = custo líquido + frete (é o que decide); totalNota = desembolso na nota
    const totais = conv.map(c => {
      let sub = 0, trib = 0, nota = 0, credito = 0, liquido = 0, cot = 0;
      A.itens.forEach(i => {
        const f = fisc(i.id, c.id); if (!f) return;
        const q = Number(i.quantidade);
        sub += f.preco * q; trib += f.trib * q; nota += f.nota * q; credito += f.credito * q; liquido += f.liquido * q; cot++;
      });
      const frete = Number(c.frete_total) || 0;
      return { conv: c, sub, trib, nota, credito, liquido, frete, total: liquido + frete, totalNota: nota + frete, cot,
               completo: cot === A.itens.length && A.itens.length > 0 };
    });
    const completos = totais.filter(t => t.completo).sort((a, b) => a.total - b.total);
    const sugestaoGlobal = completos[0] ? completos[0].conv.id : null;
    const semRegime = conv.filter(c => !c.regime_tributario);
    return { conv, itens, totais, valor, custo, fisc, aprov, sugestaoGlobal, completos, semRegime };
  }
  function vencedorItem(m, li){
    const e = S.escolha[li.item.id];
    if (e && li.ofertas.some(o => o.conv === e)) return e;
    return li.melhor ? li.melhor.conv : null;
  }
  function vencedorGlobal(m){
    const e = S.escolha.global;
    if (e && m.totais.some(t => t.conv.id === e && t.cot > 0)) return e;
    return m.sugestaoGlobal;
  }
  // resultado final conforme o critério: itemId -> { conv, v: preço unitário, c: custo líquido unitário }
  function resultado(m){
    const crit = S.atual.p.criterio;
    const out = {};
    if (crit === 'global') {
      const g = vencedorGlobal(m);
      m.itens.forEach(li => { const v = g ? m.valor(li.item.id, g) : null; if (v != null) out[li.item.id] = { conv: g, v, c: m.custo(li.item.id, g) }; });
    } else {
      m.itens.forEach(li => { const c = vencedorItem(m, li); if (c) out[li.item.id] = { conv: c, v: m.valor(li.item.id, c), c: m.custo(li.item.id, c) }; });
    }
    return out;
  }

  /* ---------------- render: casca ---------------- */
  function render(){
    const el = painel(); if (!el) return;
    const P = window.PERFIL || {};
    if (!P.logado) {
      el.innerHTML = cabecalho() + `<div class="ctr-card"><div class="cert-vazio">Faça login (canto superior direito) para usar a cotação de preços.</div></div>`;
      return;
    }
    const abas = [['lista', 'Certames'], ['novo', 'Novo certame'], ['fornecedores', 'Fornecedores']];
    el.innerHTML = cabecalho() +
      `<div class="cert-tabs">${abas.map(([k, t]) => `<button data-v="${k}" class="${(S.view === k || (S.view === 'detalhe' && k === 'lista')) ? 'on' : ''}">${t}</button>`).join('')}</div>
       <div id="certCorpo"></div>`;
    $$('.cert-tabs button', el).forEach(b => b.addEventListener('click', () => { S.view = b.dataset.v; render(); }));
    const corpo = $('#certCorpo', el);
    if (S.view === 'novo') return renderNovo(corpo);
    if (S.view === 'fornecedores') return renderFornecedores(corpo);
    if (S.view === 'detalhe' && S.atual) return renderDetalhe(corpo);
    return renderLista(corpo);
  }
  function cabecalho(){
    return `<div class="ctr-head"><h2>Cotação de Preços<span class="ctr-sub">Insumos das solicitações pendentes → convite pelo WhatsApp → mapa comparativo → vencedor do certame</span></h2></div>`;
  }

  /* ---------------- lista de certames ---------------- */
  function renderLista(corpo){
    if (!S.carregado) { corpo.innerHTML = `<div class="cert-vazio">Carregando…</div>`; return; }
    const ps = S.processos;
    const cont = k => ps.filter(p => p.status === k).length;
    corpo.innerHTML = `
      <div class="cert-kpis">
        <div class="cert-kpi"><div class="k">Em cotação</div><div class="v">${cont('em_cotacao')}</div><div class="d">aguardando fornecedores</div></div>
        <div class="cert-kpi"><div class="k">Em análise</div><div class="v">${cont('em_analise')}</div><div class="d">mapa para decidir</div></div>
        <div class="cert-kpi"><div class="k">Concluídos</div><div class="v">${cont('concluida')}</div><div class="d">vencedor indicado</div></div>
        <div class="cert-kpi"><div class="k">Rascunhos</div><div class="v">${cont('rascunho')}</div><div class="d">ainda não enviados</div></div>
      </div>
      <div class="ctr-toolbar">
        <input type="text" id="certBusca" placeholder="Buscar nº, título ou local…">
        <select id="certFSt"><option value="">Todos os status</option>${Object.entries(STATUS).map(([k, o]) => `<option value="${k}">${o.t}</option>`).join('')}</select>
        <button class="btn small" id="certRecarregar">↻ Atualizar</button>
        <button class="btn primary small" id="certNovoBtn">+ Novo certame</button>
      </div>
      <div class="table-scroll"><table class="data"><thead><tr>
        <th>Nº</th><th>Título</th><th>Local de entrega</th><th>Status</th><th>Critério</th><th class="num">Itens</th><th class="num">Respostas</th><th>Prazo</th><th>Criado em</th>
      </tr></thead><tbody id="certTb"></tbody></table></div>`;
    const pintar = () => {
      const q = ($('#certBusca').value || '').trim().toUpperCase();
      const st = $('#certFSt').value;
      const rows = ps.filter(p => (!st || p.status === st) &&
        (!q || numCert(p.id).includes(q) || (p.titulo || '').toUpperCase().includes(q) || (p.localidade_entrega || '').toUpperCase().includes(q)));
      $('#certTb').innerHTML = rows.length ? rows.map(p => {
        const r = S.resumo[p.id] || {};
        const vencido = p.status === 'em_cotacao' && p.prazo_resposta && new Date(p.prazo_resposta) < new Date();
        return `<tr class="clicavel" data-id="${p.id}"><td class="mono">${numCert(p.id)}</td><td class="wrap">${h(p.titulo)}</td>
          <td>${h(p.localidade_entrega || '—')}</td><td>${pill(STATUS[p.status])}</td><td>${p.criterio === 'global' ? 'Menor global' : 'Menor por item'}</td>
          <td class="num">${r.itens || 0}</td><td class="num">${r.respostas || 0}/${r.convites || 0}</td>
          <td style="${vencido ? 'color:var(--red)' : ''}">${fmtDataHora(p.prazo_resposta)}${vencido ? ' ⚠' : ''}</td><td>${fmtDataHora(p.criado_em)}</td></tr>`;
      }).join('') : `<tr><td colspan="9"><div class="cert-vazio">Nenhum certame. Clique em <b>Novo certame</b> para cotar os insumos das solicitações pendentes.</div></td></tr>`;
      $$('#certTb tr[data-id]').forEach(tr => tr.addEventListener('click', () => abrir(Number(tr.dataset.id))));
    };
    $('#certBusca').addEventListener('input', pintar);
    $('#certFSt').addEventListener('change', pintar);
    $('#certRecarregar').addEventListener('click', () => atualizarLista());
    $('#certNovoBtn').addEventListener('click', () => { S.view = 'novo'; render(); });
    pintar();
  }
  async function atualizarLista(){
    try { await carregarLista(); } catch (e) { erro(e, 'Não foi possível carregar os certames. Verifique se o banco da cotação já foi criado (supabase/cotacao_certame.sql).'); }
    render();
  }
  async function abrir(id){
    try {
      await carregarCertame(id); S.view = 'detalhe'; render(); window.scrollTo({ top: 0, behavior: 'smooth' });
      carregarLista().catch(() => {}); // mantém o contador do menu em dia
    }
    catch (e) { erro(e, 'Não foi possível abrir o certame.'); }
  }

  /* ---------------- novo certame (a partir das solicitações pendentes) ---------------- */
  const chaveLinha = r => [r.numSolicitacao, r.descricaoInsumo, r.detalhe, r.obraLabel, r.qtdSolicitadaNum].join('§');
  function linhasPendentes(){
    const rows = (typeof state !== 'undefined' && state && Array.isArray(state.rows)) ? state.rows : [];
    return rows.filter(r => r.solicPendente);
  }
  function renderNovo(corpo){
    if (!podeLancar()) {
      corpo.innerHTML = `<div class="ctr-card"><div class="cert-vazio">Seu perfil não tem permissão para criar certames. Fale com um administrador.</div></div>`;
      return;
    }
    const todas = linhasPendentes();
    if (S.preSelecao) { S.selecao = new Set(S.preSelecao.map(chaveLinha)); S.preSelecao = null; }
    const obras = [...new Set(todas.map(r => r.obraLabel).filter(Boolean))].sort();
    const comps = [...new Set(todas.map(r => r.compradorDistribuidoLabel).filter(Boolean))].sort();
    const P = window.PERFIL || {};
    const amanha = new Date(Date.now() + 2 * 864e5); amanha.setHours(17, 0, 0, 0);
    const prazoPadrao = new Date(amanha.getTime() - amanha.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
    corpo.innerHTML = `
      <div class="cert-grid">
      <div class="ctr-card"><header><h3>1. Dados do certame</h3><p>O fornecedor vê o título, o local, o prazo e as observações</p></header>
        <div class="ctr-body ctr-frm">
          <label class="full">Título<input id="cnTitulo" placeholder="Ex.: Cotação de agregados — Obra BR-316"></label>
          <label>Local de entrega<input id="cnLocal" placeholder="Ex.: Canteiro Castanhal/PA"></label>
          <label>Prazo para resposta<input type="datetime-local" id="cnPrazo" value="${prazoPadrao}"></label>
          <label>Comprador responsável<input id="cnComprador" value="${h(P.nome || '')}"></label>
          <label>WhatsApp do comprador (opcional)<input id="cnFone" placeholder="(91) 99999-9999"></label>
          <label>Critério de julgamento<select id="cnCrit"><option value="item">Menor preço por item (pode ter vários vencedores)</option><option value="global">Menor preço global (um vencedor para o lote)</option></select></label>
          <label class="full">Observações ao fornecedor<textarea id="cnObs" placeholder="Condições, especificações, forma de faturamento…"></textarea></label>
        </div></div>
      <div class="ctr-card"><header><h3>2. Insumos das solicitações pendentes</h3><p>${todas.length} linha(s) pendente(s) no relatório importado · marque o que entra na cotação</p></header>
        <div class="ctr-body">
          ${todas.length ? '' : `<div class="cert-aviso">Nenhuma solicitação pendente carregada. Importe/abra o relatório do Sienge no painel (Suprimentos) e volte aqui.</div>`}
          <div class="ctr-toolbar">
            <input type="text" id="cnBusca" placeholder="Buscar insumo, nº da solicitação, obra…">
            <select id="cnObra"><option value="">Todas as obras</option>${obras.map(o => `<option>${h(o)}</option>`).join('')}</select>
            <select id="cnComp"><option value="">Todos os compradores</option>${comps.map(o => `<option>${h(o)}</option>`).join('')}</select>
            <label style="display:flex;gap:6px;align-items:center;font-size:12.5px;color:var(--text-dim)"><input type="checkbox" id="cnSoSel" style="width:auto"> Só marcados</label>
          </div>
          <div class="table-scroll" style="max-height:460px;overflow:auto"><table class="data"><thead><tr>
            <th><input type="checkbox" id="cnTodos" style="width:auto" title="Marcar todos os visíveis"></th><th>Solicitação</th><th>Obra</th><th>Insumo</th><th class="num">Qtd.</th><th>Un.</th><th>Comprador</th><th>Chegada na obra</th>
          </tr></thead><tbody id="cnTb"></tbody></table></div>
          <div class="cert-sel-bar">
            <span id="cnResumo" style="font-size:13px"></span>
            <label style="display:flex;gap:6px;align-items:center;font-size:12.5px;color:var(--text-dim)"><input type="checkbox" id="cnAgrupar" checked style="width:auto"> Agrupar insumos iguais (soma as quantidades)</label>
            <span style="flex:1"></span>
            <button class="btn primary" id="cnCriar">Criar certame</button>
          </div>
        </div></div>
      </div>`;
    const visiveis = () => {
      const q = ($('#cnBusca').value || '').trim().toUpperCase();
      const ob = $('#cnObra').value, co = $('#cnComp').value, so = $('#cnSoSel').checked;
      return todas.filter(r => (!ob || r.obraLabel === ob) && (!co || r.compradorDistribuidoLabel === co) &&
        (!so || S.selecao.has(chaveLinha(r))) &&
        (!q || String(r.numSolicitacao).toUpperCase().includes(q) || (r.descricaoInsumo || '').toUpperCase().includes(q) || (r.obraLabel || '').toUpperCase().includes(q)));
    };
    const pintar = () => {
      const rows = visiveis();
      $('#cnTb').innerHTML = rows.slice(0, 800).map(r => {
        const k = chaveLinha(r);
        return `<tr><td><input type="checkbox" data-k="${h(k)}" ${S.selecao.has(k) ? 'checked' : ''} style="width:auto"></td>
          <td class="mono">${h(r.numSolicitacao)}</td><td>${h(r.obraLabel)}</td>
          <td class="wrap">${h(r.descricaoInsumo)}${r.detalhe ? `<span class="cert-sub">${h(r.detalhe)}</span>` : ''}</td>
          <td class="num">${num(r.qtdSolicitadaNum)}</td><td>${h(r.unidadeMovimento || '')}</td><td>${h(r.compradorDistribuidoLabel || '')}</td>
          <td>${r.dChegada ? r.dChegada.toLocaleDateString('pt-BR') : '—'}</td></tr>`;
      }).join('') || `<tr><td colspan="8"><div class="cert-vazio">Nada encontrado com esses filtros.</div></td></tr>`;
      $$('#cnTb input[data-k]').forEach(cb => cb.addEventListener('change', () => { cb.checked ? S.selecao.add(cb.dataset.k) : S.selecao.delete(cb.dataset.k); resumo(); }));
      resumo();
    };
    const resumo = () => {
      const n = todas.filter(r => S.selecao.has(chaveLinha(r))).length;
      $('#cnResumo').innerHTML = `<b>${n}</b> linha(s) marcada(s)`;
    };
    ['cnBusca', 'cnObra', 'cnComp', 'cnSoSel'].forEach(id => $('#' + id).addEventListener(id === 'cnBusca' ? 'input' : 'change', pintar));
    $('#cnTodos').addEventListener('change', e => { visiveis().forEach(r => e.target.checked ? S.selecao.add(chaveLinha(r)) : S.selecao.delete(chaveLinha(r))); pintar(); });
    $('#cnCriar').addEventListener('click', () => criarCertame(todas.filter(r => S.selecao.has(chaveLinha(r)))));
    pintar();
  }
  async function criarCertame(linhas){
    const titulo = $('#cnTitulo').value.trim();
    if (!titulo) { alert('Informe o título do certame.'); $('#cnTitulo').focus(); return; }
    if (!linhas.length) { alert('Marque pelo menos um insumo das solicitações pendentes.'); return; }
    const prazo = $('#cnPrazo').value;
    let itens = linhas.map(r => ({
      num_solicitacao: String(r.numSolicitacao || ''), obra: r.obraLabel || '', insumo: r.descricaoInsumo || '(sem descrição)',
      detalhe: r.detalhe || '', unidade: r.unidadeMovimento || '', quantidade: Number(r.qtdSolicitadaNum) > 0 ? Number(r.qtdSolicitadaNum) : 1
    }));
    if ($('#cnAgrupar').checked) {
      const g = new Map();
      itens.forEach(i => {
        const k = [i.insumo.trim().toUpperCase(), (i.detalhe || '').trim().toUpperCase(), (i.unidade || '').trim().toUpperCase()].join('§');
        if (!g.has(k)) g.set(k, Object.assign({}, i, { _sol: new Set(), _obra: new Set() }));
        else g.get(k).quantidade += i.quantidade;
        const a = g.get(k);
        if (i.num_solicitacao) a._sol.add(i.num_solicitacao);
        if (i.obra) a._obra.add(i.obra);
      });
      itens = [...g.values()].map(a => {
        const { _sol, _obra, ...rest } = a;
        return Object.assign(rest, { num_solicitacao: [..._sol].join(', '), obra: [..._obra].join(', ') });
      });
    }
    const btn = $('#cnCriar'); btn.disabled = true; btn.textContent = 'Criando…';
    try {
      const { data: p, error } = await SB().from('cotacao_processos').insert({
        titulo, localidade_entrega: $('#cnLocal').value.trim() || null,
        prazo_resposta: prazo ? new Date(prazo).toISOString() : null,
        comprador_nome: $('#cnComprador').value.trim() || null,
        comprador_telefone: normFone($('#cnFone').value) || null,
        criterio: $('#cnCrit').value, observacao: $('#cnObs').value.trim() || null
      }).select().single();
      if (error) throw error;
      const { error: e2 } = await SB().from('cotacao_itens').insert(itens.map((i, n) => Object.assign(i, { processo_id: p.id, ordem: n + 1 })));
      if (e2) throw e2;
      S.selecao = new Set();
      await carregarLista();
      toast(`Certame ${numCert(p.id)} criado. Agora convide os fornecedores.`);
      await abrir(p.id);
    } catch (e) { erro(e, 'Não foi possível criar o certame.'); btn.disabled = false; btn.textContent = 'Criar certame'; }
  }

  /* ---------------- detalhe do certame ---------------- */
  function linkPortal(conv){
    const u = new URL('cotacao.html', location.href);
    u.search = '?t=' + conv.token; u.hash = '';
    return u.href;
  }
  function mensagemConvite(conv){
    const A = S.atual, f = fornecedorDe(conv);
    const linhas = A.itens.map((i, n) => `${n + 1}) ${i.insumo}${i.detalhe ? ' — ' + i.detalhe : ''}: ${num(i.quantidade)} ${i.unidade || ''}`.trim());
    return [
      `Olá${f.contato ? ', ' + f.contato : ''}! Tudo bem?`,
      ``,
      `Estamos realizando a *cotação ${numCert(A.p.id)}* — ${A.p.titulo} — e gostaríamos de receber a proposta da *${f.nome}* para os itens abaixo:`,
      ``,
      ...linhas,
      ``,
      A.p.localidade_entrega ? `📍 Entrega: ${A.p.localidade_entrega}` : null,
      A.p.prazo_resposta ? `⏰ Prazo para resposta: ${fmtDataHora(A.p.prazo_resposta)}` : null,
      ``,
      `👉 Para enviar os preços, toque no link (é só preencher, não precisa cadastro):`,
      linkPortal(conv),
      ``,
      `Se preferir, pode responder aqui mesmo com preço unitário de cada item, frete, prazo de entrega e condição de pagamento.`,
      A.p.comprador_nome ? `\nObrigado! ${A.p.comprador_nome}` : `\nObrigado!`
    ].filter(l => l !== null).join('\n');
  }
  function abrirWhats(fone, texto){
    const d = normFone(fone);
    if (!d) { alert('Este fornecedor não tem WhatsApp cadastrado.'); return false; }
    window.open(`https://wa.me/${d}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    return true;
  }

  function renderDetalhe(corpo){
    const A = S.atual, p = A.p, edita = podeLancar();
    const aberto = p.status === 'rascunho' || p.status === 'em_cotacao';
    const m = calcularMapa();
    const resp = A.convites.filter(c => c.status === 'respondido').length;
    corpo.innerHTML = `
      <div class="ctr-toolbar"><button class="btn small" id="cdVoltar">← Certames</button><span style="flex:1"></span>
        <button class="btn small" id="cdAtualizar">↻ Atualizar</button>
        ${edita && p.status === 'rascunho' ? `<button class="btn small primary" id="cdAbrir">Abrir cotação</button>` : ''}
        ${edita && p.status === 'em_cotacao' ? `<button class="btn small primary" id="cdEncerrar">Encerrar recebimento → análise</button>` : ''}
        ${edita && p.status === 'em_analise' ? `<button class="btn small" id="cdReabrir">Reabrir recebimento</button>` : ''}
        ${edita && p.status === 'concluida' ? `<button class="btn small" id="cdReanalisar">Reabrir análise</button>` : ''}
        ${edita && p.status !== 'cancelada' && p.status !== 'concluida' ? `<button class="btn small" id="cdCancelar">Cancelar certame</button>` : ''}
        ${(ehGestor() || (p.status === 'rascunho' && p.criado_por === (window.PERFIL || {}).id)) ? `<button class="btn small" id="cdExcluir" style="color:var(--red)">Excluir</button>` : ''}
      </div>
      <div class="ctr-card" style="margin-bottom:14px"><div class="ctr-body">
        <div style="display:flex;gap:12px;align-items:baseline;flex-wrap:wrap">
          <span class="mono" style="font-size:13px;color:var(--text-dim)">${numCert(p.id)}</span>
          <h3 style="margin:0;font:600 18px var(--font-display)">${h(p.titulo)}</h3>${pill(STATUS[p.status])}
        </div>
        <div class="cert-kpis" style="margin:12px 0 0">
          <div class="cert-kpi"><div class="k">Local de entrega</div><div class="v" style="font-size:15px">${h(p.localidade_entrega || '—')}</div></div>
          <div class="cert-kpi"><div class="k">Prazo para resposta</div><div class="v" style="font-size:15px">${fmtDataHora(p.prazo_resposta)}</div></div>
          <div class="cert-kpi"><div class="k">Critério</div><div class="v" style="font-size:15px">${p.criterio === 'global' ? 'Menor preço global' : 'Menor preço por item'}</div></div>
          <div class="cert-kpi"><div class="k">Respostas</div><div class="v">${resp}/${A.convites.length}</div><div class="d">${A.itens.length} item(ns) em cotação</div></div>
          <div class="cert-kpi"><div class="k">Crédito de IBS/CBS</div><div class="v" style="font-size:15px">${edita && p.status !== 'concluida' && p.status !== 'cancelada'
            ? `<input class="cert-in" id="cdCredito" inputmode="decimal" value="${pct(aproveitamento(p) * 100)}" style="width:80px;text-align:right"> %`
            : pct(aproveitamento(p) * 100) + '%'}</div><div class="d">aproveitamento usado no custo líquido</div></div>
        </div>
        ${p.observacao ? `<p class="ctr-note" style="margin:10px 0 0"><b>Observações ao fornecedor:</b> ${h(p.observacao)}</p>` : ''}
        ${p.status === 'em_cotacao' && resp < 3 ? `<div class="cert-aviso" style="margin:12px 0 0">Recomendado: pelo menos <b>3 propostas válidas</b> para o mapa comparativo.</div>` : ''}
      </div></div>
      <div class="cert-grid">
        <div class="ctr-card"><header><h3>Itens em cotação</h3><p>${aberto && edita ? 'Ajuste quantidades ou remova itens antes de enviar' : 'Insumos vindos das solicitações pendentes'}</p></header>
          <div class="ctr-body"><div class="table-scroll"><table class="data"><thead><tr><th>#</th><th>Insumo</th><th>Solicitação</th><th>Obra</th><th class="num">Qtd.</th><th>Un.</th>${aberto && edita ? '<th></th>' : ''}</tr></thead>
          <tbody>${A.itens.map((i, n) => `<tr><td>${n + 1}</td><td class="wrap">${h(i.insumo)}${i.detalhe ? `<span class="cert-sub">${h(i.detalhe)}</span>` : ''}</td>
            <td class="mono">${h(i.num_solicitacao || '—')}</td><td class="wrap" style="min-width:120px">${h(i.obra || '—')}</td>
            <td class="num">${aberto && edita ? `<input class="cert-in cert-qtd" data-qtd="${i.id}" value="${num(i.quantidade)}">` : num(i.quantidade)}</td><td>${h(i.unidade || '')}</td>
            ${aberto && edita ? `<td><button class="btn small ghost" data-rmitem="${i.id}" title="Remover item">✕</button></td>` : ''}</tr>`).join('')}</tbody></table></div></div></div>

        <div class="ctr-card"><header><h3>Fornecedores convidados</h3><p>Envie pelo WhatsApp; a resposta pelo link aparece aqui sozinha</p></header>
          <div class="ctr-body">
            ${edita && aberto ? `<div class="ctr-toolbar"><select id="cdAddForn" style="flex:1 1 260px"><option value="">+ Convidar fornecedor do cadastro…</option>${S.fornecedores.filter(f => f.ativo && !A.convites.some(c => c.fornecedor_id === f.id)).map(f => `<option value="${f.id}">${h(f.nome)}${f.insumos ? ' — ' + h(f.insumos) : ''}</option>`).join('')}</select>
              <button class="btn small" id="cdNovoForn">Cadastrar novo</button>
              ${A.convites.some(c => c.status === 'pendente') ? `<button class="btn small wa" id="cdEnviarTodos">Enviar para os não enviados</button>` : ''}</div>` : ''}
            <div class="table-scroll"><table class="data"><thead><tr><th>Fornecedor</th><th>WhatsApp</th><th>Situação</th><th>Enviado</th><th>Respondido</th><th class="num">Total na nota</th><th></th></tr></thead>
            <tbody>${A.convites.length ? A.convites.map(c => {
              const f = fornecedorDe(c), t = m && m.totais.find(x => x.conv.id === c.id);
              return `<tr><td class="wrap" style="min-width:160px">${h(f.nome)}${c.observacao ? `<span class="cert-sub">“${h(c.observacao)}”</span>` : ''}</td><td>${h(fmtFone(f.telefone))}</td>
                <td>${pill(ST_CONV[c.status])}${c.status === 'respondido' ? `<span class="cert-sub">${h((REGIMES[c.regime_tributario] || SEM_REGIME).t)}</span>` : ''}${c.respondido_via === 'manual' ? '<span class="cert-sub">lançado pelo comprador</span>' : ''}${c.editado_em ? `<span class="cert-sub" title="Última correção feita no painel">✎ editado por ${h(c.editado_por_nome || 'comprador')} em ${fmtDataHora(c.editado_em)}</span>` : ''}</td>
                <td>${fmtDataHora(c.enviado_em)}</td><td>${fmtDataHora(c.respondido_em)}</td>
                <td class="num">${t && t.cot ? 'R$ ' + money(t.totalNota) + `<span class="cert-sub">líquido R$ ${money(t.total)} · ${t.cot}/${A.itens.length} itens</span>` : '—'}</td>
                <td><div class="cert-acoes">
                  ${edita && aberto ? `<button class="btn small wa" data-wa="${c.id}" title="Abrir o WhatsApp com a mensagem pronta">${c.enviado_em ? 'Reenviar' : 'Enviar'} 📲</button>` : ''}
                  <button class="btn small" data-copiar="${c.id}" title="Copiar o link de resposta do fornecedor">🔗</button>
                  ${edita && p.status !== 'concluida' && p.status !== 'cancelada' ? (c.status === 'respondido'
                    ? `<button class="btn small" data-manual="${c.id}" title="Corrigir preços ou condições desta proposta">✎ Editar resposta</button>`
                    : `<button class="btn small" data-manual="${c.id}" title="O fornecedor respondeu por mensagem? Lance os preços aqui">Lançar resposta</button>`) : ''}
                  ${edita && aberto && c.status !== 'respondido' ? `<button class="btn small ghost" data-rmconv="${c.id}" title="Retirar convite">✕</button>` : ''}
                </div></td></tr>`;
            }).join('') : `<tr><td colspan="7"><div class="cert-vazio">Nenhum fornecedor convidado ainda.</div></td></tr>`}</tbody></table></div>
          </div></div>

        <div class="ctr-card"><header><h3>Mapa comparativo</h3><p>Preço unitário de cada proposta e custo líquido após o crédito de IBS/CBS · ★ menor custo líquido do item · contorno amarelo = vencedor indicado</p></header>
          <div class="ctr-body" id="cdMapa"></div></div>
      </div>`;
    renderMapa($('#cdMapa'), m);
    ligarDetalhe();
  }

  function renderMapa(el, m){
    const A = S.atual, p = A.p;
    if (!m || !m.conv.length) { el.innerHTML = `<div class="cert-vazio">O mapa aparece quando chegar a primeira proposta.</div>`; return; }
    const decide = podeLancar() && (p.status === 'em_analise' || p.status === 'em_cotacao');
    const crit = p.criterio;
    const res = resultado(m);
    const vg = crit === 'global' ? vencedorGlobal(m) : null;
    const qtdDe = iid => Number((A.itens.find(i => i.id === Number(iid)) || {}).quantidade || 0);
    const totalVenc = Object.entries(res).reduce((s, [iid, r]) => s + r.c * qtdDe(iid), 0);
    const notaVenc = Object.entries(res).reduce((s, [iid, r]) => s + m.fisc(Number(iid), r.conv).nota * qtdDe(iid), 0);
    const credVenc = Object.entries(res).reduce((s, [iid, r]) => s + m.fisc(Number(iid), r.conv).credito * qtdDe(iid), 0);
    const totalMedia = m.itens.reduce((s, li) => s + (li.media != null ? li.media * Number(li.item.quantidade) : 0), 0);
    const totalMaior = m.itens.reduce((s, li) => s + (li.maior ? li.maior.v * Number(li.item.quantidade) : 0), 0);
    const semOferta = m.itens.filter(li => !li.ofertas.length).length;
    const fretesVenc = crit === 'global' ? (vg ? Number((m.conv.find(c => c.id === vg) || {}).frete_total) || 0 : 0)
      : [...new Set(Object.values(res).map(r => r.conv))].reduce((s, cid) => s + (Number((m.conv.find(c => c.id === cid) || {}).frete_total) || 0), 0);
    const naoMenor = crit === 'global' ? (vg && m.sugestaoGlobal && vg !== m.sugestaoGlobal)
      : m.itens.some(li => li.melhor && res[li.item.id] && res[li.item.id].c > li.melhor.v + 1e-9);

    el.innerHTML = `
      <div class="cert-kpis">
        <div class="cert-kpi"><div class="k">Custo líquido indicado</div><div class="v">R$ ${money(totalVenc + fretesVenc)}</div><div class="d">itens R$ ${money(totalVenc)} + frete R$ ${money(fretesVenc)}</div></div>
        <div class="cert-kpi"><div class="k">Valor na nota (vencedor)</div><div class="v">R$ ${money(notaVenc + fretesVenc)}</div><div class="d">crédito de IBS/CBS R$ ${money(credVenc)} (${pct(m.aprov * 100)}% aproveitado)</div></div>
        <div class="cert-kpi"><div class="k">Economia × média</div><div class="v" style="color:var(--teal)">R$ ${money(Math.max(totalMedia - totalVenc, 0))}</div><div class="d">${totalMedia ? ((1 - totalVenc / totalMedia) * 100).toFixed(1).replace('.', ',') + '% abaixo da média das propostas' : '—'}</div></div>
        <div class="cert-kpi"><div class="k">Economia × maior preço</div><div class="v">R$ ${money(Math.max(totalMaior - totalVenc, 0))}</div></div>
        <div class="cert-kpi"><div class="k">Propostas</div><div class="v">${m.conv.length}</div><div class="d">${semOferta ? `<span style="color:var(--red)">${semOferta} item(ns) sem oferta</span>` : 'todos os itens com oferta'}</div></div>
      </div>
      ${m.semRegime.length ? `<div class="cert-aviso">${m.semRegime.map(c => h(fornecedorDe(c).nome)).join(', ')} não informou o regime tributário — a proposta entra sem crédito de IBS/CBS (custo = preço). Use “✎ editar” para completar.</div>` : ''}
      ${crit === 'global' && !m.completos.length ? `<div class="cert-aviso">Critério global: nenhum fornecedor cotou <b>todos</b> os itens. Indique o vencedor manualmente com justificativa, ou mude o critério para “por item”.</div>` : ''}
      <div class="table-scroll"><table class="data cert-mapa"><thead><tr><th>#</th><th>Insumo</th><th class="num">Qtd.</th>
        ${m.conv.map(c => `<th class="forn">${h(fornecedorDe(c).nome)}<span class="cert-sub">${h((REGIMES[c.regime_tributario] || SEM_REGIME).t)}</span>${decide ? `<br><button class="btn small ghost" data-editmapa="${c.id}" title="Editar a resposta deste fornecedor" style="padding:2px 8px;margin-top:4px">✎ editar</button>` : ''}${crit === 'global' && decide ? `<br><label class="radio"><input type="radio" name="cdVG" value="${c.id}" ${vg === c.id ? 'checked' : ''}> vencedor</label>` : ''}</th>`).join('')}
        <th class="num">Média (líquido)</th>${crit === 'item' ? '<th>Vencedor do item</th>' : ''}</tr></thead>
      <tbody>${m.itens.map((li, n) => {
        const venc = res[li.item.id];
        return `<tr><td>${n + 1}</td><td class="wrap">${h(li.item.insumo)}<span class="cert-sub">${h(li.item.unidade || '')}</span></td><td class="num">${num(li.item.quantidade)}</td>
          ${m.conv.map(c => {
            const r = (A.respostas.find(x => x.convite_id === c.id && x.item_id === li.item.id)) || null;
            const f = m.fisc(li.item.id, c.id);
            if (!f) return `<td class="num semcot">${r && r.disponivel === false ? 'não fornece' : '—'}</td>`;
            const v = f.preco, q = Number(li.item.quantidade);
            const melhor = li.melhor && Math.abs(f.liquido - li.melhor.v) < 1e-9;
            const ehV = venc && venc.conv === c.id;
            const dica = [`Preço R$ ${money(v)}`, `CBS ${pct(f.cbs)}% + IBS ${pct(f.ibs)}%`,
              f.porFora ? `IBS/CBS por fora R$ ${money(f.trib)} → nota R$ ${money(f.nota)}` : `IBS/CBS dentro do preço R$ ${money(f.trib)}`,
              `crédito R$ ${money(f.credito)}`, `custo líquido R$ ${money(f.liquido)}`, r && r.marca ? 'Marca: ' + r.marca : '', r && r.observacao ? r.observacao : ''].filter(Boolean).join(' · ');
            return `<td class="num ${melhor ? 'melhor' : ''} ${ehV ? 'vence' : ''}" title="${h(dica)}">
              ${melhor ? '★ ' : ''}R$ ${money(v)}<span class="cert-sub">${f.informado ? `IBS/CBS ${pct(f.cbs + f.ibs)}% · ` : ''}líquido R$ ${money(f.liquido)}</span><span class="cert-sub">total líq. R$ ${money(f.liquido * q)}${r && r.marca ? ' · ' + h(r.marca) : ''}</span>
              ${crit === 'item' && decide ? `<label class="radio"><input type="radio" name="cdV${li.item.id}" value="${c.id}" data-item="${li.item.id}" ${ehV ? 'checked' : ''}> vence</label>` : ''}</td>`;
          }).join('')}
          <td class="num">${li.media != null ? 'R$ ' + money(li.media) : '—'}</td>
          ${crit === 'item' ? `<td>${venc ? h(fornecedorDe(m.conv.find(c => c.id === venc.conv)).nome) + (li.melhor && venc.c > li.melhor.v + 1e-9 ? ' <span style="color:var(--amber)" title="não é o menor custo líquido">⚠</span>' : '') : '<span style="color:var(--text-faint)">sem oferta</span>'}</td>` : ''}</tr>`;
      }).join('')}</tbody>
      <tfoot>
        <tr><td></td><td>Subtotal dos itens (preço)</td><td></td>${m.totais.map(t => `<td class="num">R$ ${money(t.sub)}<span class="cert-sub">${t.cot}/${A.itens.length} itens</span></td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>IBS/CBS</td><td></td>${m.totais.map(t => `<td class="num" style="font-weight:400">R$ ${money(t.trib)}<span class="cert-sub">${t.conv.regime_tributario === 'simples' ? 'dentro do preço' : t.conv.regime_tributario ? 'por fora, na nota' : 'não informado'}</span></td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>Frete</td><td></td>${m.totais.map(t => `<td class="num">R$ ${money(t.frete)}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>Total na nota</td><td></td>${m.totais.map(t => `<td class="num" style="font-weight:400">R$ ${money(t.totalNota)}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>(−) Crédito de IBS/CBS</td><td></td>${m.totais.map(t => `<td class="num" style="font-weight:400;color:var(--teal)">− R$ ${money(t.credito)}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>Custo líquido da proposta</td><td></td>${m.totais.map(t => `<td class="num ${crit === 'global' && t.conv.id === m.sugestaoGlobal ? 'melhor' : ''} ${crit === 'global' && t.conv.id === vg ? 'vence' : ''}">R$ ${money(t.total)}${t.completo ? '' : '<span class="cert-sub" style="color:var(--amber)">incompleta</span>'}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>Prazo de entrega</td><td></td>${m.totais.map(t => `<td class="num" style="font-weight:400">${h(t.conv.prazo_entrega || '—')}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>Pagamento</td><td></td>${m.totais.map(t => `<td class="num" style="font-weight:400">${h(t.conv.condicao_pagamento || '—')}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
        <tr><td></td><td>Validade</td><td></td>${m.totais.map(t => `<td class="num" style="font-weight:400">${t.conv.validade_proposta ? new Date(t.conv.validade_proposta + 'T12:00').toLocaleDateString('pt-BR') : '—'}</td>`).join('')}<td></td>${crit === 'item' ? '<td></td>' : ''}</tr>
      </tfoot></table></div>
      <p class="ctr-note">O vencedor é escolhido pelo <b>custo líquido</b>: preço + IBS/CBS destacado na nota − crédito de IBS/CBS (${pct(m.aprov * 100)}% de aproveitamento). Fornecedor do regime regular soma IBS/CBS por fora e gera crédito integral; no Simples Nacional o IBS/CBS já está no preço e só gera o crédito do percentual informado. O frete entra pelo valor informado.${crit === 'item' ? ' No critério por item o frete de cada fornecedor é somado uma vez ao valor indicado quando ele vence ao menos um item.' : ''}</p>
      ${decide || p.status === 'concluida' ? `
      <div class="ctr-frm" style="margin-top:12px">
        <label class="full">Justificativa ${naoMenor ? '<b style="color:var(--amber)">(obrigatória: o vencedor indicado não é o menor custo líquido)</b>' : '(opcional)'}
          <textarea id="cdJust" ${decide ? '' : 'disabled'} placeholder="Ex.: menor prazo de entrega, fornecedor já homologado, qualidade comprovada…">${h(p.justificativa || '')}</textarea></label>
        ${decide ? `<label class="ctr-chk full"><input type="checkbox" id="cdHist"> Registrar os preços vencedores no histórico de preços (aba Cotação de Insumos Críticos)</label>` : ''}
      </div>` : ''}
      <div class="ctr-toolbar" style="margin-top:12px;margin-bottom:0">
        <button class="btn small" id="cdImprimir">🖨 Imprimir mapa comparativo</button>
        <button class="btn small" id="cdCsv">⬇ Exportar CSV</button>
        ${podeLancar() ? `<button class="btn small" id="cdRegCrit" title="Grava os preços recebidos no histórico da aba Cotação de Insumos Críticos">📈 Registrar na Cotação de Insumos Críticos</button>` : ''}
        <span style="flex:1"></span>
        ${decide ? `<button class="btn small" id="cdSugestao">Usar sugestão (menor custo líquido)</button><button class="btn primary" id="cdConcluir">Indicar vencedor e concluir certame</button>` : ''}
        ${p.status === 'concluida' && podeLancar() ? `<button class="btn small wa" id="cdAvisarVenc">Avisar vencedor(es) pelo WhatsApp 📲</button>` : ''}
      </div>`;

    $$('input[type=radio][data-item]', el).forEach(r => r.addEventListener('change', () => { S.escolha[Number(r.dataset.item)] = Number(r.value); renderMapa(el, m); }));
    $$('input[name=cdVG]', el).forEach(r => r.addEventListener('change', () => { S.escolha.global = Number(r.value); renderMapa(el, m); }));
    const just = $('#cdJust', el); if (just && decide) just.addEventListener('input', () => { p.justificativa = just.value; });
    const bs = $('#cdSugestao', el); if (bs) bs.addEventListener('click', () => { S.escolha = {}; renderMapa(el, m); });
    const bc = $('#cdConcluir', el); if (bc) bc.addEventListener('click', () => concluir(m, naoMenor));
    $('#cdImprimir', el).addEventListener('click', () => imprimirMapa(m));
    $('#cdCsv', el).addEventListener('click', () => exportarCsv(m));
    const ba = $('#cdAvisarVenc', el); if (ba) ba.addEventListener('click', () => avisarVencedores(m));
    const br = $('#cdRegCrit', el); if (br) br.addEventListener('click', () => registrarCriticos(m));
    $$('[data-editmapa]', el).forEach(b => b.addEventListener('click', () => lancarManual(A.convites.find(c => c.id === Number(b.dataset.editmapa)))));
  }

  function ligarDetalhe(){
    const A = S.atual, p = A.p;
    const on = (id, fn) => { const b = document.getElementById(id); if (b) b.addEventListener('click', fn); };
    on('cdVoltar', () => { S.view = 'lista'; S.atual = null; atualizarLista(); });
    on('cdAtualizar', () => abrir(p.id));
    const cr = $('#cdCredito');
    if (cr) cr.addEventListener('change', async () => {
      const v = parseNum(cr.value);
      if (v == null || v < 0 || v > 100) { alert('Informe um percentual entre 0 e 100.'); return abrir(p.id); }
      const { error } = await SB().from('cotacao_processos').update({ credito_ibs_cbs_pct: v }).eq('id', p.id);
      if (error) return erro(error, 'Não foi possível salvar o aproveitamento do crédito.');
      toast('Aproveitamento do crédito atualizado — mapa recalculado.'); abrir(p.id);
    });
    on('cdAbrir', () => mudarStatus('em_cotacao'));
    on('cdEncerrar', () => { if (confirm('Encerrar o recebimento de propostas? Os links dos fornecedores deixam de aceitar respostas.')) mudarStatus('em_analise'); });
    on('cdReabrir', () => mudarStatus('em_cotacao'));
    on('cdReanalisar', () => { if (confirm('Reabrir a análise? O vencedor indicado poderá ser alterado.')) mudarStatus('em_analise'); });
    on('cdCancelar', () => { if (confirm('Cancelar este certame?')) mudarStatus('cancelada'); });
    on('cdExcluir', async () => {
      if (!confirm(`Excluir definitivamente o certame ${numCert(p.id)} com itens, convites e respostas?`)) return;
      const { error } = await SB().from('cotacao_processos').delete().eq('id', p.id);
      if (error) return erro(error, 'Não foi possível excluir.');
      S.view = 'lista'; S.atual = null; atualizarLista();
    });
    on('cdNovoForn', () => editarFornecedor(null, async f => { if (f) await convidar(f.id); }));
    on('cdEnviarTodos', enviarTodos);
    const sel = $('#cdAddForn'); if (sel) sel.addEventListener('change', () => { if (sel.value) convidar(Number(sel.value)); });
    $$('[data-qtd]').forEach(inp => inp.addEventListener('change', async () => {
      const v = parseNum(inp.value);
      if (!v || v <= 0) { alert('Quantidade inválida.'); return abrir(p.id); }
      const { error } = await SB().from('cotacao_itens').update({ quantidade: v }).eq('id', Number(inp.dataset.qtd));
      if (error) erro(error, 'Não foi possível salvar a quantidade.'); else toast('Quantidade atualizada.');
    }));
    $$('[data-rmitem]').forEach(b => b.addEventListener('click', async () => {
      if (A.itens.length <= 1) return alert('O certame precisa de pelo menos um item.');
      if (!confirm('Remover este item do certame?')) return;
      const { error } = await SB().from('cotacao_itens').delete().eq('id', Number(b.dataset.rmitem));
      if (error) return erro(error, 'Não foi possível remover.');
      abrir(p.id);
    }));
    $$('[data-wa]').forEach(b => b.addEventListener('click', () => enviarConvite(A.convites.find(c => c.id === Number(b.dataset.wa)))));
    $$('[data-copiar]').forEach(b => b.addEventListener('click', async () => {
      const c = A.convites.find(x => x.id === Number(b.dataset.copiar));
      try { await navigator.clipboard.writeText(linkPortal(c)); toast('Link do fornecedor copiado.'); }
      catch (e) { prompt('Copie o link do fornecedor:', linkPortal(c)); }
    }));
    $$('[data-manual]').forEach(b => b.addEventListener('click', () => lancarManual(A.convites.find(c => c.id === Number(b.dataset.manual)))));
    $$('[data-rmconv]').forEach(b => b.addEventListener('click', async () => {
      if (!confirm('Retirar o convite deste fornecedor? O link dele deixa de funcionar.')) return;
      const { error } = await SB().from('cotacao_convites').delete().eq('id', Number(b.dataset.rmconv));
      if (error) return erro(error, 'Não foi possível retirar o convite.');
      abrir(p.id);
    }));
  }

  async function mudarStatus(st){
    const p = S.atual.p;
    const upd = { status: st };
    if (st !== 'concluida') { upd.concluido_em = null; upd.concluido_por = null; }
    const { error } = await SB().from('cotacao_processos').update(upd).eq('id', p.id);
    if (error) return erro(error, 'Não foi possível mudar a situação do certame.');
    await carregarLista().catch(() => {});
    abrir(p.id);
  }
  async function convidar(fornId){
    const { error } = await SB().from('cotacao_convites').insert({ processo_id: S.atual.p.id, fornecedor_id: fornId });
    if (error) return erro(error, 'Não foi possível convidar o fornecedor.');
    abrir(S.atual.p.id);
  }
  async function enviarConvite(c){
    const f = fornecedorDe(c);
    if (!abrirWhats(f.telefone, mensagemConvite(c))) return;
    const upd = { enviado_em: new Date().toISOString() };
    if (c.status === 'pendente') upd.status = 'enviado';
    const { error } = await SB().from('cotacao_convites').update(upd).eq('id', c.id);
    if (error) return erro(error, 'A mensagem foi aberta, mas não consegui marcar o envio.');
    if (S.atual.p.status === 'rascunho') await SB().from('cotacao_processos').update({ status: 'em_cotacao' }).eq('id', S.atual.p.id);
    abrir(S.atual.p.id);
  }
  // o navegador só deixa abrir uma janela por clique: envia um por vez, com confirmação entre eles
  async function enviarTodos(){
    const fila = S.atual.convites.filter(c => c.status === 'pendente');
    if (!fila.length) return;
    const proximo = (i) => {
      if (i >= fila.length) { fecharModal(); abrir(S.atual.p.id); return; }
      const f = fornecedorDe(fila[i]);
      modal(`Enviar convite ${i + 1} de ${fila.length}`, `<p class="ctr-note">Abrir o WhatsApp com a mensagem pronta para <b>${h(f.nome)}</b> (${h(fmtFone(f.telefone))}). Depois de enviar lá, volte aqui para o próximo.</p>`, [
        { t: 'Parar', cls: 'ghost', fn: () => { fecharModal(); abrir(S.atual.p.id); } },
        { t: 'Pular', fn: () => proximo(i + 1) },
        { t: 'Abrir WhatsApp 📲', cls: 'primary', fn: async () => {
          const c = fila[i];
          if (abrirWhats(f.telefone, mensagemConvite(c))) {
            await SB().from('cotacao_convites').update({ enviado_em: new Date().toISOString(), status: 'enviado' }).eq('id', c.id);
            if (S.atual.p.status === 'rascunho') { await SB().from('cotacao_processos').update({ status: 'em_cotacao' }).eq('id', S.atual.p.id); S.atual.p.status = 'em_cotacao'; }
          }
          proximo(i + 1);
        } }
      ]);
    };
    proximo(0);
  }

  /* ---------------- resposta lançada pelo comprador ---------------- */
  function lancarManual(c){
    const A = S.atual, f = fornecedorDe(c);
    const r = id => A.respostas.find(x => x.convite_id === c.id && x.item_id === id) || {};
    const editando = c.status === 'respondido';
    const bd = modal(`${editando ? 'Editar resposta' : 'Lançar resposta'} — ${f.nome}`, `
      <p class="ctr-note" style="margin-top:0">${editando
        ? `Corrija o que for preciso. A alteração fica registrada com o seu nome${c.respondido_via === 'link' ? ' (a proposta original veio pelo link do fornecedor)' : ''}.`
        : 'Use quando o fornecedor responder por mensagem de texto, áudio ou e-mail. Deixe em branco o que ele não cotou.'}</p>
      <div class="ctr-frm" style="margin-bottom:10px"><label class="full">Regime tributário do fornecedor (IBS/CBS) <b style="color:var(--red)">*</b><select id="mlRegime">
        <option value="">Selecione…</option>${Object.entries(REGIMES).map(([k, o]) => `<option value="${k}" ${c.regime_tributario === k ? 'selected' : ''}>${h(o.t)}</option>`).join('')}</select></label></div>
      <p class="ctr-note" style="margin-top:0">Regime regular / Simples com IBS/CBS por fora: preço <b>sem</b> IBS/CBS e as alíquotas destacadas na nota. Simples Nacional: preço final e o percentual de CBS/IBS que sai na nota para crédito.</p>
      <div class="table-scroll"><table class="data"><thead><tr><th>Insumo</th><th class="num">Qtd.</th><th>Preço unitário (R$)</th><th>CBS (%)</th><th>IBS (%)</th><th>Marca</th><th>Não fornece</th></tr></thead><tbody>
      ${A.itens.map(i => { const x = r(i.id); return `<tr><td class="wrap" style="min-width:180px">${h(i.insumo)}<span class="cert-sub">${h(i.unidade || '')}</span></td><td class="num">${num(i.quantidade)}</td>
        <td><input data-v="${i.id}" inputmode="decimal" value="${x.valor_unitario != null ? money(x.valor_unitario) : ''}" style="min-width:110px"></td>
        <td><input data-cbs="${i.id}" inputmode="decimal" value="${x.aliq_cbs != null ? pct(x.aliq_cbs) : ''}" placeholder="0,9" style="min-width:64px"></td>
        <td><input data-ibs="${i.id}" inputmode="decimal" value="${x.aliq_ibs != null ? pct(x.aliq_ibs) : ''}" placeholder="0,1" style="min-width:64px"></td>
        <td><input data-m="${i.id}" value="${h(x.marca || '')}" style="min-width:100px"></td>
        <td style="text-align:center"><input type="checkbox" data-nd="${i.id}" ${x.disponivel === false ? 'checked' : ''}></td></tr>`; }).join('')}
      </tbody></table></div>
      <div class="ctr-frm" style="margin-top:12px">
        <label>Frete total (R$)<input id="mlFrete" inputmode="decimal" value="${c.frete_total ? money(c.frete_total) : ''}"></label>
        <label>Prazo de entrega <b style="color:var(--red)">*</b><input id="mlPrazo" value="${h(c.prazo_entrega || '')}" placeholder="Ex.: 5 dias úteis"></label>
        <label>Condição de pagamento <b style="color:var(--red)">*</b><input id="mlPag" value="${h(c.condicao_pagamento || '')}" placeholder="Ex.: 28 dias"></label>
        <label>Validade da proposta <b style="color:var(--red)">*</b><input type="date" id="mlVal" value="${h(c.validade_proposta || '')}"></label>
        <label class="full">Observação<textarea id="mlObs">${h(c.observacao || '')}</textarea></label>
      </div>`, [
      { t: 'Cancelar', cls: 'ghost' },
      { t: 'Salvar resposta', cls: 'primary', fn: async (bd) => {
        const linhas = A.itens.map(i => {
          const nd = $(`[data-nd="${i.id}"]`, bd).checked;
          const v = parseNum($(`[data-v="${i.id}"]`, bd).value);
          const cbs = parseNum($(`[data-cbs="${i.id}"]`, bd).value), ibs = parseNum($(`[data-ibs="${i.id}"]`, bd).value);
          return { convite_id: c.id, item_id: i.id, valor_unitario: nd ? null : v, aliq_cbs: nd ? null : cbs, aliq_ibs: nd ? null : ibs,
                   marca: $(`[data-m="${i.id}"]`, bd).value.trim() || null, disponivel: !nd, atualizado_em: new Date().toISOString() };
        }).filter(l => l.valor_unitario != null || !l.disponivel);
        if (linhas.some(l => l.valor_unitario != null && l.valor_unitario < 0)) return alert('Preço não pode ser negativo.');
        if (linhas.some(l => [l.aliq_cbs, l.aliq_ibs].some(a => a != null && (a < 0 || a > 100)))) return alert('As alíquotas de CBS e IBS devem ficar entre 0 e 100%.');
        const regime = $('#mlRegime', bd).value;
        if (!regime) { $('#mlRegime', bd).style.borderColor = 'var(--red)'; return alert('Informe o regime tributário do fornecedor (IBS/CBS).'); }
        if (!linhas.some(l => l.valor_unitario != null)) return alert('Informe o preço de pelo menos um item.');
        const faltam = [['#mlPrazo', 'prazo de entrega'], ['#mlPag', 'condição de pagamento'], ['#mlVal', 'validade da proposta']]
          .filter(([sel]) => !$(sel, bd).value.trim());
        $$('#mlPrazo,#mlPag,#mlVal', bd).forEach(i => { i.style.borderColor = i.value.trim() ? '' : 'var(--red)'; });
        if (faltam.length) return alert('Preencha: ' + faltam.map(x => x[1]).join(', ') + '.');
        // itens que ficaram sem preço nesta edição: retira a resposta antiga desse item
        const retirar = A.respostas.filter(r => r.convite_id === c.id && !linhas.some(l => l.item_id === r.item_id)).map(r => r.id);
        if (retirar.length) {
          const { error: ed } = await SB().from('cotacao_respostas').delete().in('id', retirar);
          if (ed) return erro(ed, 'Não foi possível limpar os preços retirados.');
        }
        const { error } = await SB().from('cotacao_respostas').upsert(linhas, { onConflict: 'convite_id,item_id' });
        if (error) return erro(error, 'Não foi possível salvar os preços.');
        const P = window.PERFIL || {};
        const marca = editando
          ? { editado_em: new Date().toISOString(), editado_por: P.id || null, editado_por_nome: P.nome || null }
          : { status: 'respondido', respondido_em: new Date().toISOString(), respondido_via: 'manual' };
        const { error: e2 } = await SB().from('cotacao_convites').update(Object.assign(marca, {
          regime_tributario: regime, frete_total: parseNum($('#mlFrete', bd).value) || 0, prazo_entrega: $('#mlPrazo', bd).value.trim() || null,
          condicao_pagamento: $('#mlPag', bd).value.trim() || null, validade_proposta: $('#mlVal', bd).value || null,
          observacao: $('#mlObs', bd).value.trim() || null
        })).eq('id', c.id);
        if (e2) return erro(e2, 'Preços salvos, mas não consegui atualizar o convite.');
        fecharModal(); toast(editando ? 'Resposta corrigida.' : 'Resposta lançada.'); abrir(A.p.id);
      } }
    ]);
    return bd;
  }

  /* ---------------- conclusão ---------------- */
  async function concluir(m, naoMenor){
    const A = S.atual, p = A.p;
    const just = ($('#cdJust') || {}).value ? $('#cdJust').value.trim() : '';
    if (naoMenor && !just) { alert('Informe a justificativa: o vencedor indicado não é o menor custo líquido.'); $('#cdJust').focus(); return; }
    const res = resultado(m);
    if (!Object.keys(res).length) return alert('Nenhum item tem vencedor (sem propostas válidas).');
    const semV = A.itens.filter(i => !res[i.id]).length;
    if (semV && !confirm(`${semV} item(ns) ficarão sem vencedor (sem oferta). Concluir assim mesmo?`)) return;
    const hist = $('#cdHist') && $('#cdHist').checked;
    try {
      for (const i of A.itens) {
        const r = res[i.id];
        const { error } = await SB().from('cotacao_itens').update({ vencedor_convite_id: r ? r.conv : null }).eq('id', i.id);
        if (error) throw error;
      }
      const { error } = await SB().from('cotacao_processos').update({
        status: 'concluida', justificativa: just || null,
        vencedor_convite_id: p.criterio === 'global' ? vencedorGlobal(m) : null,
        concluido_em: new Date().toISOString(), concluido_por: (window.PERFIL || {}).id || null
      }).eq('id', p.id);
      if (error) throw error;
      if (hist) {
        const hoje = new Date(); const iso = new Date(hoje.getTime() - hoje.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
        const regs = A.itens.filter(i => res[i.id]).map(i => {
          const cv = m.conv.find(c => c.id === res[i.id].conv);
          const eq = (campo, v) => (window.COT_EQUIVALENTE && window.COT_EQUIVALENTE(campo, v)) || null;
          return { data: iso, fornecedor: fornecedorDe(cv).nome,
                   insumo: eq('insumo', i.insumo) || String(i.insumo || '').replace(/^\s*\d+\s*-\s*/, '').trim(),
                   unidade_medida: eq('unidade', i.unidade) || i.unidade || 'un',
                   valor_unitario: res[i.id].v, frete_unitario: 0, localidade_entrega: eq('local', p.localidade_entrega) || p.localidade_entrega || '—' };
        });
        const { error: eh } = await SB().from('cotacoes').insert(regs);
        if (eh) erro(eh, 'Certame concluído, mas não consegui registrar no histórico de preços.');
        else if (window.COT_RECARREGAR) window.COT_RECARREGAR().catch(() => {});
      }
      toast(`Certame ${numCert(p.id)} concluído.`);
      await carregarLista().catch(() => {});
      abrir(p.id);
    } catch (e) { erro(e, 'Não foi possível concluir o certame.'); }
  }
  /* ---------------- registro na Cotação de Insumos Críticos (tabela "cotacoes") ----------------
     Leva os preços recebidos no certame para o histórico de preços por fornecedor e
     localidade. Cada item pode ganhar o nome usado no histórico (ex.: "Diesel S10"),
     lembrado neste navegador para os próximos certames. Os insumos críticos já vêm
     marcados; o que já estiver registrado (mesma data, fornecedor, insumo, valor e
     local) aparece como "já registrado" e não é gravado de novo. */
  const isoLocal = d => { const x = d ? new Date(d) : new Date(); return new Date(x.getTime() - x.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); };
  const NOMES_KEY = 'cert_nome_historico';
  const nomesSalvos = () => { try { return JSON.parse(localStorage.getItem(NOMES_KEY) || '{}') || {}; } catch (e) { return {}; } };
  const guardarNomes = o => { try { localStorage.setItem(NOMES_KEY, JSON.stringify(o)); } catch (e) { /* só conveniência */ } };
  // nome já usado no histórico que equivale a "nome" (mesma chave de COT_CHAVE, definida na aba de insumos críticos)
  const equivalente = (campo, nome, lista) => {
    const f = window.COT_CHAVE && window.COT_CHAVE[campo]; if (!f || !nome) return null;
    const k = f(nome); if (!k) return null;
    const cont = {}; lista.forEach(v => { if (v && f(v) === k) cont[v] = (cont[v] || 0) + 1; });
    return Object.keys(cont).sort((a, b) => cont[b] - cont[a])[0] || null;
  };
  // ordem: o nome escolhido antes (se ainda existe no histórico) > nome equivalente do histórico > nome sem o código do Sienge
  const nomeSugerido = (i, hist) => {
    const nomes = hist.map(r => r.insumo), salvo = nomesSalvos()[i.insumo];
    if (salvo && nomes.includes(salvo)) return salvo;
    return equivalente('insumo', i.insumo, nomes) || String(i.insumo || '').replace(/^\s*\d+\s*-\s*/, '').trim();
  };
  const ehCritico = i => (window.classificarMaterialCritico && window.classificarMaterialCritico(`${i.insumo || ''} ${i.detalhe || ''}`)) || '';
  const chaveHist = r => [r.data, String(r.fornecedor).trim().toLowerCase(), String(r.insumo).trim().toLowerCase(),
    Number(r.valor_unitario).toFixed(4), String(r.localidade_entrega).trim().toLowerCase()].join('|');

  async function registrarCriticos(m){
    const A = S.atual, p = A.p;
    if (!m || !m.conv.length) return alert('Ainda não há propostas para registrar.');
    const { data: hist, error } = await SB().from('cotacoes').select('data,fornecedor,insumo,unidade_medida,valor_unitario,localidade_entrega');
    if (error) return erro(error, 'Não foi possível ler o histórico de preços.');
    const existentes = new Set((hist || []).map(chaveHist));
    const uniq = arr => [...new Set(arr.filter(Boolean).map(s => String(s).trim()))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    const nomesHist = uniq((hist || []).map(r => r.insumo)), unidHist = uniq((hist || []).map(r => r.unidade_medida)), locHist = uniq((hist || []).map(r => r.localidade_entrega));
    const criticos = A.itens.filter(ehCritico);
    const marcarItem = i => criticos.length ? !!ehCritico(i) : true;

    // uma linha por preço recebido (fornecedor × item); frete total rateado pelo valor de cada item
    const linhas = [];
    m.totais.forEach(t => {
      A.itens.forEach(i => {
        const v = m.valor(i.id, t.conv.id); if (v == null) return;
        const frete = t.frete && t.sub ? Math.round(t.frete * v / t.sub * 1e4) / 1e4 : 0;
        linhas.push({ k: `${t.conv.id}_${i.id}`, conv: t.conv, item: i, v, frete, data: isoLocal(t.conv.respondido_em) });
      });
    });
    const res = resultado(m);

    const bd = modal(`Registrar na Cotação de Insumos Críticos — ${numCert(p.id)}`, `
      <p class="ctr-note" style="margin-top:0">Os preços marcados vão para o histórico da aba <b>Cotação de Insumos Críticos</b> (melhor preço do dia, série histórica e registros).
        ${criticos.length ? `Os itens classificados como <b>insumo crítico</b> já vêm marcados.` : 'Nenhum item deste certame casa com a classificação de insumo crítico — confira antes de registrar.'}</p>
      <datalist id="crtDlIns">${nomesHist.map(n => `<option value="${h(n)}">`).join('')}</datalist>
      <datalist id="crtDlUn">${unidHist.map(n => `<option value="${h(n)}">`).join('')}</datalist>
      <datalist id="crtDlLoc">${locHist.map(n => `<option value="${h(n)}">`).join('')}</datalist>
      <div class="ctr-frm"><label class="full">Localidade de entrega<input id="crtLocal" list="crtDlLoc" value="${h(equivalente('local', p.localidade_entrega, (hist || []).map(r => r.localidade_entrega)) || p.localidade_entrega || '')}"></label></div>
      <h4 style="margin:14px 0 6px;font:600 13px var(--font-body)">Como cada item aparece no histórico</h4>
      <p class="ctr-note" style="margin:0 0 6px">Use o mesmo nome, unidade e localidade que já estão no histórico (ex.: DIESEL S10, Litro, BENEVIDES) — assim os preços entram na mesma série. Já vem sugerido o nome equivalente quando existe.</p>
      <div class="table-scroll"><table class="data"><thead><tr><th>Item do certame</th><th>Nome no histórico</th><th>Unidade</th></tr></thead><tbody>
        ${A.itens.map(i => `<tr><td class="wrap" style="min-width:180px">${h(i.insumo)}${ehCritico(i) ? ` <span class="badge critico">${h(ehCritico(i))}</span>` : ''}</td>
          <td><input data-nome="${i.id}" list="crtDlIns" value="${h(nomeSugerido(i, hist || []))}" style="min-width:180px"></td>
          <td><input data-un="${i.id}" list="crtDlUn" value="${h(equivalente('unidade', i.unidade, (hist || []).map(r => r.unidade_medida)) || i.unidade || '')}" style="min-width:70px"></td></tr>`).join('')}
      </tbody></table></div>
      <h4 style="margin:14px 0 6px;font:600 13px var(--font-body)">Preços recebidos</h4>
      <div class="table-scroll"><table class="data"><thead><tr><th><input type="checkbox" id="crtTodos" title="Marcar/desmarcar todos"></th><th>Fornecedor</th><th>Item</th><th class="num">Valor unit. (R$)</th><th>Frete unit. (R$)</th><th>Data</th><th></th></tr></thead><tbody>
        ${linhas.map(l => `<tr data-k="${l.k}"><td><input type="checkbox" data-sel="${l.k}" ${marcarItem(l.item) ? 'checked' : ''}></td>
          <td class="wrap" style="min-width:140px">${h(fornecedorDe(l.conv).nome)}${res[l.item.id] && res[l.item.id].conv === l.conv.id ? ' <span class="cert-sub" style="color:var(--teal)">vencedor do item</span>' : ''}</td>
          <td class="wrap" style="min-width:160px">${h(l.item.insumo)}</td>
          <td class="num">${money(l.v)}</td>
          <td><input data-fr="${l.k}" inputmode="decimal" value="${l.frete ? String(l.frete).replace('.', ',') : '0'}" style="min-width:80px" title="Frete total da proposta rateado pelo valor de cada item"></td>
          <td><input type="date" data-dt="${l.k}" value="${l.data}"></td>
          <td data-st="${l.k}"></td></tr>`).join('')}
      </tbody></table></div>`, [
      { t: 'Cancelar', cls: 'ghost' },
      { t: 'Registrar preços', cls: 'primary', fn: async (bd) => {
        const local = $('#crtLocal', bd).value.trim();
        if (!local) { $('#crtLocal', bd).style.borderColor = 'var(--red)'; return alert('Informe a localidade de entrega.'); }
        const regs = [], vistos = new Set(); let dup = 0;
        for (const l of linhas) {
          if (!$(`[data-sel="${l.k}"]`, bd).checked) continue;
          const nome = $(`[data-nome="${l.item.id}"]`, bd).value.trim();
          const un = $(`[data-un="${l.item.id}"]`, bd).value.trim();
          const fr = parseNum($(`[data-fr="${l.k}"]`, bd).value) || 0;
          const dt = $(`[data-dt="${l.k}"]`, bd).value;
          if (!nome || !un) return alert(`Preencha o nome no histórico e a unidade de "${l.item.insumo}".`);
          if (!dt) return alert('Informe a data de todos os preços marcados.');
          if (fr < 0) return alert('Frete não pode ser negativo.');
          const r = { data: dt, fornecedor: fornecedorDe(l.conv).nome, insumo: nome, unidade_medida: un,
                      valor_unitario: l.v, frete_unitario: fr, localidade_entrega: local };
          const k = chaveHist(r);
          if (existentes.has(k) || vistos.has(k)) { dup++; continue; }
          vistos.add(k); regs.push(r);
        }
        if (!regs.length) return alert(dup ? 'Os preços marcados já estão registrados no histórico.' : 'Marque pelo menos um preço.');
        const { error: ei } = await SB().from('cotacoes').insert(regs);
        if (ei) return erro(ei, 'Não foi possível registrar os preços na Cotação de Insumos Críticos.');
        const nomes = nomesSalvos();
        A.itens.forEach(i => { const v = $(`[data-nome="${i.id}"]`, bd).value.trim(); if (v) nomes[i.insumo] = v; });
        guardarNomes(nomes);
        fecharModal();
        toast(`${regs.length} preço(s) registrado(s) na Cotação de Insumos Críticos${dup ? ` · ${dup} já existia(m)` : ''}.`);
        if (window.COT_RECARREGAR) window.COT_RECARREGAR().catch(() => {});
      } }
    ]);

    // marca "já registrado" conforme o que está na tela (nome, data, local)
    const conferir = () => {
      const local = $('#crtLocal', bd).value.trim();
      linhas.forEach(l => {
        const r = { data: $(`[data-dt="${l.k}"]`, bd).value, fornecedor: fornecedorDe(l.conv).nome,
                    insumo: $(`[data-nome="${l.item.id}"]`, bd).value.trim(), valor_unitario: l.v, localidade_entrega: local };
        $(`[data-st="${l.k}"]`, bd).innerHTML = existentes.has(chaveHist(r)) ? '<span class="cert-sub" style="color:var(--amber)">já registrado</span>' : '';
      });
    };
    conferir();
    linhas.forEach(l => { const st = $(`[data-st="${l.k}"]`, bd); if (st.textContent) $(`[data-sel="${l.k}"]`, bd).checked = false; });
    $$('input[data-nome],input[data-dt],#crtLocal', bd).forEach(inp => inp.addEventListener('input', conferir));
    const todos = $('#crtTodos', bd);
    todos.checked = $$('input[data-sel]', bd).every(c => c.checked);
    todos.addEventListener('change', () => $$('input[data-sel]', bd).forEach(c => { c.checked = todos.checked; }));
  }

  function avisarVencedores(m){
    const A = S.atual, res = resultado(m);
    const porConv = {};
    A.itens.forEach(i => { const r = res[i.id]; if (r) (porConv[r.conv] = porConv[r.conv] || []).push({ i, v: r.v }); });
    const ids = Object.keys(porConv).map(Number);
    if (!ids.length) return;
    const proximo = n => {
      if (n >= ids.length) return fecharModal();
      const c = A.convites.find(x => x.id === ids[n]), f = fornecedorDe(c);
      const total = porConv[ids[n]].reduce((s, x) => s + x.v * Number(x.i.quantidade), 0) + (Number(c.frete_total) || 0);
      const txt = [`Olá${f.contato ? ', ' + f.contato : ''}! A *${f.nome}* foi a vencedora da cotação *${numCert(A.p.id)}* — ${A.p.titulo} — nos itens:`, '',
        ...porConv[ids[n]].map((x, k) => `${k + 1}) ${x.i.insumo}: ${num(x.i.quantidade)} ${x.i.unidade || ''} × R$ ${money(x.v)}`),
        '', `Total: R$ ${money(total)}${c.frete_total ? ' (com frete)' : ''}`, '', 'Em breve enviaremos o pedido de compra. Obrigado!'].join('\n');
      modal(`Avisar vencedor ${n + 1} de ${ids.length}`, `<p class="ctr-note">Abrir o WhatsApp de <b>${h(f.nome)}</b> com a mensagem de resultado.</p>`, [
        { t: 'Parar', cls: 'ghost' }, { t: 'Pular', fn: () => proximo(n + 1) },
        { t: 'Abrir WhatsApp 📲', cls: 'primary', fn: () => { abrirWhats(f.telefone, txt); proximo(n + 1); } }]);
    };
    proximo(0);
  }

  /* ---------------- impressão / CSV ---------------- */
  function imprimirMapa(m){
    const A = S.atual, p = A.p, res = resultado(m);
    const nomes = m.conv.map(c => fornecedorDe(c).nome);
    const w = window.open('', '_blank');
    if (!w) return alert('Libere as janelas pop-up para imprimir.');
    const linhas = m.itens.map((li, n) => `<tr><td>${n + 1}</td><td>${h(li.item.insumo)}${li.item.detalhe ? '<br><small>' + h(li.item.detalhe) + '</small>' : ''}</td><td class="n">${num(li.item.quantidade)} ${h(li.item.unidade || '')}</td>
      ${m.conv.map(c => { const f = m.fisc(li.item.id, c.id); const ehV = res[li.item.id] && res[li.item.id].conv === c.id;
        return `<td class="n ${f && li.melhor && Math.abs(f.liquido - li.melhor.v) < 1e-9 ? 'm' : ''} ${ehV ? 'v' : ''}">${!f ? '—' : money(f.preco) + '<br><small>IBS/CBS ' + pct(f.cbs + f.ibs) + '% · líq. ' + money(f.liquido) + '<br>total líq. ' + money(f.liquido * Number(li.item.quantidade)) + '</small>'}</td>`; }).join('')}
      <td>${res[li.item.id] ? h(fornecedorDe(m.conv.find(c => c.id === res[li.item.id].conv)).nome) : '—'}</td></tr>`).join('');
    const rodape = (rot, fn) => `<tr class="t"><td></td><td>${rot}</td><td></td>${m.totais.map(fn).join('')}<td></td></tr>`;
    const totalV = Object.entries(res).reduce((s, [iid, r]) => s + r.c * Number(A.itens.find(i => i.id === Number(iid)).quantidade), 0);
    w.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Mapa comparativo ${numCert(p.id)}</title>
      <style>body{font:12px Arial,sans-serif;color:#111;margin:24px}h1{font-size:17px;margin:0}table{border-collapse:collapse;width:100%;margin-top:12px}th,td{border:1px solid #999;padding:5px 6px;vertical-align:top}th{background:#eee}
      .n{text-align:right;white-space:nowrap}.m{background:#dff3df;font-weight:bold}.v{outline:2px solid #c98a00;outline-offset:-2px}.t td{font-weight:bold;background:#fafafa}small{color:#555}
      .meta{display:flex;gap:24px;flex-wrap:wrap;margin-top:6px}.ass{display:flex;gap:40px;margin-top:60px}.ass div{flex:1;border-top:1px solid #111;text-align:center;padding-top:4px}@media print{button{display:none}}</style></head><body>
      <button onclick="print()" style="float:right">Imprimir</button>
      <h1>Mapa comparativo de preços — ${numCert(p.id)}</h1><div>${h(p.titulo)}</div>
      <div class="meta"><span><b>Local de entrega:</b> ${h(p.localidade_entrega || '—')}</span><span><b>Critério:</b> ${p.criterio === 'global' ? 'Menor preço global' : 'Menor preço por item'}</span>
      <span><b>Situação:</b> ${STATUS[p.status].t}</span><span><b>Emitido em:</b> ${new Date().toLocaleString('pt-BR')}</span></div>
      <table><thead><tr><th>#</th><th>Insumo</th><th>Qtd.</th>${m.conv.map((c, k) => `<th>${h(nomes[k])}<br><small>${h((REGIMES[c.regime_tributario] || SEM_REGIME).t)}<br>preço unit. / custo líquido (R$)</small></th>`).join('')}<th>Vencedor</th></tr></thead><tbody>${linhas}</tbody>
      <tfoot>${rodape('Subtotal (preço)', t => `<td class="n">${money(t.sub)}</td>`)}${rodape('IBS/CBS', t => `<td class="n">${money(t.trib)}</td>`)}${rodape('Frete', t => `<td class="n">${money(t.frete)}</td>`)}${rodape('Total na nota', t => `<td class="n">${money(t.totalNota)}</td>`)}${rodape('(−) Crédito de IBS/CBS', t => `<td class="n">${money(t.credito)}</td>`)}${rodape('Custo líquido', t => `<td class="n">${money(t.total)}</td>`)}
      ${rodape('Prazo de entrega', t => `<td>${h(t.conv.prazo_entrega || '—')}</td>`)}${rodape('Pagamento', t => `<td>${h(t.conv.condicao_pagamento || '—')}</td>`)}</tfoot></table>
      <p><b>Custo líquido indicado (itens):</b> R$ ${money(totalV)}. Comparação pelo custo líquido = preço + IBS/CBS na nota − crédito de IBS/CBS (${pct(m.aprov * 100)}% de aproveitamento). Verde = menor custo líquido do item; contorno = vencedor indicado.</p>
      ${p.justificativa ? `<p><b>Justificativa:</b> ${h(p.justificativa)}</p>` : ''}
      <div class="ass"><div>Comprador${p.comprador_nome ? ': ' + h(p.comprador_nome) : ''}</div><div>Aprovação</div></div></body></html>`);
    w.document.close();
  }
  function exportarCsv(m){
    const A = S.atual, nomes = m.conv.map(c => fornecedorDe(c).nome), res = resultado(m);
    const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const linhas = [['Item', 'Insumo', 'Unidade', 'Quantidade', ...nomes.flatMap(n => [n + ' — preço', n + ' — IBS+CBS %', n + ' — custo líquido']), 'Vencedor'].map(q).join(';')];
    m.itens.forEach((li, n) => linhas.push([n + 1, li.item.insumo, li.item.unidade, num(li.item.quantidade),
      ...m.conv.flatMap(c => { const f = m.fisc(li.item.id, c.id); return f ? [money(f.preco), pct(f.cbs + f.ibs), money(f.liquido)] : ['', '', '']; }),
      res[li.item.id] ? fornecedorDe(m.conv.find(c => c.id === res[li.item.id].conv)).nome : ''].map(q).join(';')));
    linhas.push(['', 'Total na nota', '', '', ...m.totais.flatMap(t => [money(t.totalNota), '', '']), ''].map(q).join(';'));
    linhas.push(['', 'Custo líquido da proposta', '', '', ...m.totais.flatMap(t => ['', '', money(t.total)]), ''].map(q).join(';'));
    const blob = new Blob(['﻿' + linhas.join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `mapa_${numCert(A.p.id)}.csv`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  /* ---------------- cadastro de fornecedores ---------------- */
  function renderFornecedores(corpo){
    const edita = podeLancar();
    corpo.innerHTML = `
      <div class="ctr-toolbar"><input type="text" id="cfBusca" placeholder="Buscar fornecedor, CNPJ, cidade, insumo…">
        <label style="display:flex;gap:6px;align-items:center;font-size:12.5px;color:var(--text-dim)"><input type="checkbox" id="cfInat" style="width:auto"> Mostrar inativos</label>
        ${edita ? '<button class="btn primary small" id="cfNovo">+ Novo fornecedor</button>' : ''}</div>
      <div class="table-scroll"><table class="data"><thead><tr><th>Fornecedor</th><th>CNPJ</th><th>Contato</th><th>WhatsApp</th><th>Cidade</th><th>Fornece</th><th>Situação</th><th></th></tr></thead><tbody id="cfTb"></tbody></table></div>`;
    const pintar = () => {
      const q = ($('#cfBusca').value || '').trim().toUpperCase(), inat = $('#cfInat').checked;
      const rows = S.fornecedores.filter(f => (inat || f.ativo) && (!q || [f.nome, f.cnpj, f.cidade, f.insumos, f.contato].some(x => (x || '').toUpperCase().includes(q))));
      $('#cfTb').innerHTML = rows.map(f => `<tr><td class="wrap" style="min-width:160px">${h(f.nome)}</td><td class="mono">${h(f.cnpj || '—')}</td><td>${h(f.contato || '—')}</td>
        <td>${h(fmtFone(f.telefone))}</td><td>${h(f.cidade || '—')}</td><td class="wrap">${h(f.insumos || '—')}</td><td>${f.ativo ? pill({ t: 'Ativo', c: 'var(--teal)' }) : pill({ t: 'Inativo', c: 'var(--text-dim)' })}</td>
        <td>${edita ? `<button class="btn small" data-ed="${f.id}">Editar</button>` : ''}</td></tr>`).join('') ||
        `<tr><td colspan="8"><div class="cert-vazio">Nenhum fornecedor cadastrado. Cadastre com o número de WhatsApp para poder enviar as cotações.</div></td></tr>`;
      $$('[data-ed]').forEach(b => b.addEventListener('click', () => editarFornecedor(S.fornecedores.find(f => f.id === Number(b.dataset.ed)), () => render())));
    };
    $('#cfBusca').addEventListener('input', pintar);
    $('#cfInat').addEventListener('change', pintar);
    const n = $('#cfNovo'); if (n) n.addEventListener('click', () => editarFornecedor(null, () => render()));
    if (!S.carregado) carregarLista().then(pintar).catch(e => erro(e, 'Não foi possível carregar os fornecedores.')); else pintar();
  }
  function editarFornecedor(f, depois){
    f = f || { ativo: true };
    modal(f.id ? 'Editar fornecedor' : 'Novo fornecedor', `<div class="ctr-frm">
      <label class="full">Razão social / nome<input id="efNome" value="${h(f.nome || '')}"></label>
      <label>CNPJ<input id="efCnpj" value="${h(f.cnpj || '')}"></label>
      <label>Contato (nome)<input id="efContato" value="${h(f.contato || '')}"></label>
      <label>WhatsApp (com DDD)<input id="efFone" value="${h(f.telefone ? fmtFone(f.telefone) : '')}" placeholder="(91) 99999-9999"></label>
      <label>E-mail<input id="efEmail" value="${h(f.email || '')}"></label>
      <label>Cidade/UF<input id="efCidade" value="${h(f.cidade || '')}"></label>
      <label>Insumos que fornece<input id="efIns" value="${h(f.insumos || '')}" placeholder="Ex.: brita, areia, CAP"></label>
      <label class="full">Observação<textarea id="efObs">${h(f.observacao || '')}</textarea></label>
      <label class="ctr-chk full"><input type="checkbox" id="efAtivo" ${f.ativo ? 'checked' : ''}> Ativo (aparece para convite)</label></div>`, [
      { t: 'Cancelar', cls: 'ghost' },
      { t: 'Salvar', cls: 'primary', fn: async (bd) => {
        const nome = $('#efNome', bd).value.trim(), fone = normFone($('#efFone', bd).value);
        if (!nome) return alert('Informe o nome do fornecedor.');
        if (fone.length < 12) return alert('Informe o WhatsApp com DDD (ex.: (91) 99999-9999).');
        const row = { nome, telefone: fone, cnpj: $('#efCnpj', bd).value.trim() || null, contato: $('#efContato', bd).value.trim() || null,
          email: $('#efEmail', bd).value.trim() || null, cidade: $('#efCidade', bd).value.trim() || null, insumos: $('#efIns', bd).value.trim() || null,
          observacao: $('#efObs', bd).value.trim() || null, ativo: $('#efAtivo', bd).checked };
        const q = f.id ? SB().from('cotacao_fornecedores').update(row).eq('id', f.id).select().single() : SB().from('cotacao_fornecedores').insert(row).select().single();
        const { data, error } = await q;
        if (error) return erro(error, 'Não foi possível salvar o fornecedor.');
        const i = S.fornecedores.findIndex(x => x.id === data.id);
        if (i >= 0) S.fornecedores[i] = data; else S.fornecedores.push(data);
        S.fornecedores.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
        fecharModal(); toast('Fornecedor salvo.');
        if (depois) depois(data);
      } }
    ]);
  }

  /* ---------------- tempo real: resposta do fornecedor ---------------- */
  function assinar(){
    if (S.canal || !SB() || !(window.PERFIL || {}).logado) return;
    try {
      S.canal = SB().channel('cotacao-certame')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'cotacao_convites' }, payload => {
          const n = payload.new || {};
          if (n.status === 'respondido' && n.respondido_via === 'link') {
            const f = S.fornecedores.find(x => x.id === n.fornecedor_id);
            toast(`📩 ${f ? f.nome : 'Um fornecedor'} respondeu a cotação ${numCert(n.processo_id)}.`);
          }
          if (S.view === 'detalhe' && S.atual && S.atual.p.id === n.processo_id) abrir(n.processo_id);
          else if (S.view === 'lista') atualizarLista();
        })
        .subscribe();
    } catch (e) { console.warn('Tempo real da cotação indisponível', e); }
  }

  /* ---------------- API pública ---------------- */
  let iniciado = false;
  function iniciar(){
    if (iniciado) return; iniciado = true;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  }
  window.CERT = {
    show(){
      iniciar();
      if (!(window.PERFIL || {}).logado) return render();
      assinar();
      if (S.view === 'detalhe' && S.atual) return render();
      atualizarLista();
    },
    // chamado pela aba Solicitações: abre o "Novo certame" com as linhas filtradas já marcadas
    cotarSolicitacoes(linhas){
      S.preSelecao = (linhas || []).filter(r => r.solicPendente);
      S.view = 'novo';
      const b = document.querySelector('.tab-btn[data-tab="certames"]');
      if (b) b.click(); else this.show();
    }
  };
  document.addEventListener('perfil-atualizado', () => {
    iniciar();
    if ((window.PERFIL || {}).logado) {
      carregarLista().catch(() => {});
      assinar();
    }
    if (painel() && painel().classList.contains('active')) window.CERT.show();
  });
})();
