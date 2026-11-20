/* =====================================================================
 * CENTRAL DE ACESSOS DO CAPIVARA — aba "Central de acessos" do Painel
 *
 * Um cadastro de pessoas para todas as aplicações do Capivara:
 *   pessoa → aplicações → perfil (permissões) → obras → login/senha.
 * Banco: supabase/central_acessos.sql (tabelas acesso_*; RLS só administrador).
 * Logins e senhas: Edge Function central-acessos (chave de serviço de cada projeto).
 * Ao salvar, o acesso é gravado no cadastro próprio de cada aplicação
 * (Painel, Validador Email e CAP-Refeições pelo banco; Notas pela função).
 * ===================================================================== */
(function(){
  'use strict';
  const root = document.getElementById('caRoot');
  if(!root || !window.SB) return;
  const SB = window.SB;
  // janela de edição fora do root: redesenhar a lista não fecha a janela aberta
  const modal = document.createElement('div');
  modal.className = 'ca-modal'; modal.id = 'caModal'; modal.hidden = true;
  root.parentNode.appendChild(modal);
  document.addEventListener('keydown', e => {
    if(e.key !== 'Escape' || modal.hidden) return;
    const s = modal.querySelector('.ca-senha');
    if(s) s.remove(); else { modal.hidden = true; modal.innerHTML = ''; }
  });

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmtData = iso => { if(!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleString('pt-BR', {day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'}); };
  const norm = s => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();

  const S = {
    carregado:false, carregando:false, aba:'pessoas', erro:'',
    apps:[], perms:[], perfis:[], obras:[], vinculos:[], pessoas:[], uapps:[], uobras:[], log:[],
    projetos:null, filtro:{ texto:'', app:'', situacao:'' }, perfilApp:'suprimentos', perfilSel:null,
    status:{}, // usuario_id → { app_id → status do login }
  };

  /* ------------------------------------------------------------ dados */
  async function ler(tabela, ordem){
    let q = SB.from(tabela).select('*');
    if(ordem) q = q.order(ordem);
    const { data, error } = await q;
    if(error) throw error;
    return data || [];
  }
  async function carregar(){
    if(S.carregando) return;
    S.carregando = true; S.erro = '';
    render();
    try{
      const r = await Promise.all([
        ler('acesso_aplicacoes','ordem'), ler('acesso_permissoes','ordem'), ler('acesso_perfis','nome'),
        ler('acesso_obras','nome'), ler('acesso_obra_vinculos'), ler('acesso_usuarios','nome'),
        ler('acesso_usuario_apps'), ler('acesso_usuario_obras'),
      ]);
      [S.apps, S.perms, S.perfis, S.obras, S.vinculos, S.pessoas, S.uapps, S.uobras] = r;
      S.carregado = true;
    }catch(e){
      console.error('Central de acessos:', e);
      S.erro = /acesso_|does not exist|schema cache/i.test(e.message||'')
        ? 'As tabelas da central ainda não existem no banco. Rode o arquivo supabase/central_acessos.sql no SQL Editor do Supabase.'
        : 'Não foi possível carregar a central: ' + (e.message || e);
    }
    S.carregando = false;
    render();
    if(S.carregado && S.projetos === null) funcao({ acao:'projetos' }).then(r => { S.projetos = r.projetos; render(); }).catch(() => { S.projetos = false; render(); });
  }
  async function carregarLog(){
    const { data, error } = await SB.from('acesso_log').select('*').order('em', { ascending:false }).limit(300);
    if(!error) S.log = data || [];
    render();
  }

  async function funcao(body){
    const { data, error } = await SB.functions.invoke('central-acessos', { body });
    if(error){
      let msg = error.message || 'Falha na função central-acessos.';
      try{ const j = await error.context.json(); if(j && j.error) msg = j.error; }catch(_){}
      if(/Failed to send|not found|404/i.test(msg)) msg = 'A função central-acessos ainda não foi publicada no Supabase (veja supabase/CENTRAL-ACESSOS.md).';
      throw new Error(msg);
    }
    if(data && data.error) throw new Error(data.error);
    return data;
  }

  const app = id => S.apps.find(a => a.id === id);
  const perfil = id => S.perfis.find(p => p.id === id);
  const permsDoApp = id => S.perms.filter(p => p.app_id === id);
  const perfisDoApp = id => S.perfis.filter(p => p.app_id === id);
  const uappsDe = uid => S.uapps.filter(x => x.usuario_id === uid);
  const uapp = (uid, aid) => S.uapps.find(x => x.usuario_id === uid && x.app_id === aid);
  const obrasDe = (uid, aid) => S.uobras.filter(x => x.usuario_id === uid && x.app_id === aid).map(x => x.obra_id);
  const vinculo = (oid, aid) => (S.vinculos.find(v => v.obra_id === oid && v.app_id === aid) || {}).ref;
  const projetoLigado = a => !S.projetos || S.projetos[a.projeto] !== false;

  // o mesmo cálculo do banco (private.acesso_sincronizar): papel que o Painel recebe
  function papelPainel(perms){
    const t = c => perms.includes(c);
    const admin = t('painel.usuarios') || t('painel.importar');
    const sup = !admin && t('painel.creditos');
    const opav = !(admin||sup) && t('painel.cap');
    const op = !(admin||sup||opav) && t('painel.contratos');
    const papel = admin ? 'Administrador' : sup ? 'Supervisor' : opav ? 'Operador avançado' : op ? 'Operador' : 'Convidado';
    return papel + ((admin || t('painel.jarvis')) ? ' + Jarvis' : '');
  }
  function papelNotas(perms){
    const role = perms.includes('notas.admin') ? 'admin' : perms.includes('notas.supervisor') ? 'supervisor' : 'operador';
    const col = (perms.find(x => x.startsWith('notas.coluna.')) || '').replace('notas.coluna.','');
    return role + (col ? ' · coluna ' + col : '') + (perms.includes('notas.validador') ? ' · validador' : '');
  }
  function resultadoNoApp(aid, perms){
    if(aid === 'suprimentos') return 'No Painel vira: <b>' + esc(papelPainel(perms)) + '</b>';
    if(aid === 'notas') return 'No Notas vira: <b>' + esc(papelNotas(perms)) + '</b>';
    if(aid === 'estoque') return 'O Estoque ainda não lê a central: ajuste o acesso também dentro do app (integração pendente).';
    return '';
  }

  /* ------------------------------------------------------------ render */
  function render(){
    if(!document.body.classList.contains('is-admin')){ root.innerHTML = ''; return; }
    const abas = [['pessoas','Pessoas'],['perfis','Perfis e permissões'],['obras','Obras'],['historico','Histórico']];
    root.innerHTML = `
      <div class="section-head">
        <div><div class="eyebrow">Acesso</div><h2>Central de acessos do Capivara</h2>
          <p class="ca-sub">Quem usa cada aplicação, com qual perfil, em quais obras — e o login e a senha de cada uma.</p></div>
        <div class="toolbar">
          <button class="btn ghost small" data-ca="importar">⇩ Importar usuários existentes</button>
          <button class="btn primary small" data-ca="nova-pessoa">+ Nova pessoa</button>
        </div>
      </div>
      ${avisoProjetos()}
      <div class="ca-abas" role="tablist">${abas.map(([k,t]) => `<button role="tab" class="ca-aba ${S.aba===k?'on':''}" data-ca-aba="${k}">${t}</button>`).join('')}</div>
      <div class="ca-corpo">${S.erro ? `<div class="ca-erro">${esc(S.erro)}</div>` : !S.carregado ? '<div class="ca-vazio">Carregando…</div>' :
        S.aba === 'pessoas' ? telaPessoas() : S.aba === 'perfis' ? telaPerfis() : S.aba === 'obras' ? telaObras() : telaHistorico()}</div>
`;
    ligar();
  }

  function avisoProjetos(){
    if(!S.projetos) return '';
    const falta = S.apps.filter(a => S.projetos[a.projeto] === false).map(a => a.nome);
    if(!falta.length) return '';
    return `<div class="ca-aviso">🔌 Login e senha de <b>${esc(falta.join(', '))}</b> ainda não estão ligados à central: falta cadastrar a chave de serviço do projeto na função <code>central-acessos</code> (veja <code>supabase/CENTRAL-ACESSOS.md</code>). O perfil e as obras podem ser definidos mesmo assim.</div>`;
  }

  function chipApp(p, a){
    const ua = uapp(p.id, a.id);
    if(!ua) return '<span class="ca-nada">—</span>';
    const pf = perfil(ua.perfil_id);
    const inativo = !ua.ativo || (ua.validade && ua.validade < new Date().toISOString().slice(0,10)) || (pf && !pf.ativo);
    const obras = a.usa_obras ? (ua.todas_obras ? 'todas as obras' : `${obrasDe(p.id, a.id).length} obra(s)`) : '';
    const semLogin = !ua.conta_id ? ' <span class="ca-tag alerta" title="Sem login vinculado nesta aplicação">sem login</span>' : '';
    return `<span class="ca-chip ${inativo?'off':''}" title="${esc(a.nome)}${obras?' · '+obras:''}">${esc(pf ? pf.nome : 'sem perfil')}</span>${semLogin}${obras?`<small class="ca-obs">${obras}</small>`:''}`;
  }

  function telaPessoas(){
    const f = S.filtro, txt = norm(f.texto);
    const lista = S.pessoas.filter(p => {
      if(txt && !norm(p.nome + ' ' + (p.email||'') + ' ' + (p.cargo||'')).includes(txt)) return false;
      if(f.app === '__nenhuma' && uappsDe(p.id).length) return false;
      if(f.app && f.app !== '__nenhuma' && !uapp(p.id, f.app)) return false;
      if(f.situacao === 'ativos' && !p.ativo) return false;
      if(f.situacao === 'inativos' && p.ativo) return false;
      if(f.situacao === 'semlogin' && !uappsDe(p.id).some(x => !x.conta_id)) return false;
      return true;
    });
    return `
      <div class="ca-filtros">
        <input type="search" class="ca-in" data-ca-f="texto" placeholder="Buscar por nome, e-mail ou cargo" value="${esc(f.texto)}">
        <select class="ca-in" data-ca-f="app"><option value="">Todas as aplicações</option>${S.apps.map(a => `<option value="${a.id}" ${f.app===a.id?'selected':''}>Com acesso a ${esc(a.nome)}</option>`).join('')}<option value="__nenhuma" ${f.app==='__nenhuma'?'selected':''}>Sem nenhuma aplicação</option></select>
        <select class="ca-in" data-ca-f="situacao">
          <option value="">Todas as situações</option>
          <option value="ativos" ${f.situacao==='ativos'?'selected':''}>Ativas</option>
          <option value="inativos" ${f.situacao==='inativos'?'selected':''}>Desativadas</option>
          <option value="semlogin" ${f.situacao==='semlogin'?'selected':''}>Com aplicação sem login</option>
        </select>
        <span class="count-badge">${lista.length} pessoa(s)</span>
      </div>
      <div class="table-wrap"><table class="ca-tab">
        <thead><tr><th>Pessoa</th>${S.apps.map(a => `<th>${esc(a.nome)}</th>`).join('')}<th></th></tr></thead>
        <tbody>${lista.length ? lista.map(p => `
          <tr class="${p.ativo?'':'ca-off'}">
            <td class="txt"><b>${esc(p.nome)}</b>${p.ativo?'':' <span class="ca-tag">desativada</span>'}<small class="ca-obs">${esc(p.email||'sem e-mail')}${p.cargo?' · '+esc(p.cargo):''}</small></td>
            ${S.apps.map(a => `<td>${chipApp(p, a)}</td>`).join('')}
            <td><button class="btn small" data-ca-editar="${p.id}">Editar</button></td>
          </tr>`).join('') : `<tr><td colspan="${S.apps.length+2}" class="ca-vazio">${S.pessoas.length ? 'Ninguém com esses filtros.' : 'Nenhuma pessoa cadastrada ainda. Use “Importar usuários existentes” para trazer quem já usa as aplicações.'}</td></tr>`}
        </tbody></table></div>`;
  }

  function telaPerfis(){
    const a = app(S.perfilApp) || S.apps[0];
    if(!a) return '<div class="ca-vazio">Nenhuma aplicação cadastrada.</div>';
    const lista = perfisDoApp(a.id);
    let sel = lista.find(p => p.id === S.perfilSel);
    const novo = S.perfilSel === 'novo';
    if(!sel && !novo){ sel = lista[0]; S.perfilSel = sel ? sel.id : null; }
    const pf = novo ? { id:null, app_id:a.id, nome:'', descricao:'', permissoes:[], todas_obras:false, ativo:true } : sel;
    const grupos = {};
    permsDoApp(a.id).forEach(p => { (grupos[p.grupo] = grupos[p.grupo] || []).push(p); });
    const quem = pf && pf.id ? S.uapps.filter(x => x.perfil_id === pf.id).map(x => S.pessoas.find(p => p.id === x.usuario_id)).filter(Boolean) : [];
    return `
      <div class="ca-apps">${S.apps.map(x => `<button class="ca-pill ${x.id===a.id?'on':''}" data-ca-papp="${x.id}">${esc(x.nome)}</button>`).join('')}</div>
      <div class="ca-perfis">
        <div class="ca-lista">
          ${lista.map(p => `<button class="ca-item ${pf && p.id===pf.id?'on':''} ${p.ativo?'':'off'}" data-ca-psel="${p.id}">
              <span>${esc(p.nome)}</span><small>${p.permissoes.length} perm. · ${S.uapps.filter(x => x.perfil_id===p.id).length} pessoa(s)</small></button>`).join('')}
          <button class="ca-item novo ${novo?'on':''}" data-ca-psel="novo">+ Novo perfil</button>
        </div>
        ${pf ? `<div class="ca-editor" data-ca-perfil="${pf.id||''}">
          <div class="ca-linha">
            <label>Nome do perfil<input class="ca-in" data-pf="nome" value="${esc(pf.nome)}" placeholder="Ex.: Comprador"></label>
            <label>Descrição<input class="ca-in" data-pf="descricao" value="${esc(pf.descricao||'')}" placeholder="Para que serve"></label>
          </div>
          <div class="ca-linha">
            <label class="ca-ck"><input type="checkbox" data-pf="ativo" ${pf.ativo?'checked':''}> Perfil ativo</label>
            ${a.usa_obras ? `<label class="ca-ck"><input type="checkbox" data-pf="todas_obras" ${pf.todas_obras?'checked':''}> Sugerir “todas as obras” ao dar este perfil</label>` : ''}
            <span class="ca-res" data-pf-res>${resultadoNoApp(a.id, pf.permissoes)}</span>
          </div>
          <div class="ca-grupos">
            ${Object.keys(grupos).map(g => `<fieldset><legend><label class="ca-ck"><input type="checkbox" data-pf-grupo="${esc(g)}" ${grupos[g].every(p => pf.permissoes.includes(p.codigo))?'checked':''}> ${esc(g)}</label></legend>
              ${grupos[g].map(p => `<label class="ca-ck perm"><input type="checkbox" data-pf-perm="${esc(p.codigo)}" data-grupo="${esc(g)}" ${pf.permissoes.includes(p.codigo)?'checked':''}> <span>${esc(p.nome)}<code>${esc(p.codigo)}</code></span></label>`).join('')}
            </fieldset>`).join('')}
          </div>
          <div class="ca-acoes">
            <button class="btn primary small" data-ca="salvar-perfil">Salvar perfil</button>
            ${pf.id ? `<button class="btn small" data-ca="duplicar-perfil">Duplicar</button>` : ''}
            ${pf.id && !quem.length ? `<button class="btn ghost small ca-perigo" data-ca="excluir-perfil">Excluir</button>` : ''}
            <span class="ca-msg" data-ca-msg></span>
          </div>
          ${pf.id ? `<p class="ca-obs">${quem.length ? `<b>Quem tem este perfil (${quem.length}):</b> ${quem.map(p => esc(p.nome)).join(', ')}. Ao salvar, a mudança vale para todos na hora.` : 'Ninguém tem este perfil.'}</p>` : ''}
        </div>` : '<div class="ca-vazio">Escolha um perfil.</div>'}
      </div>`;
  }

  function telaObras(){
    const comObras = S.apps.filter(a => a.usa_obras);
    return `
      <p class="ca-obs">Cadastro único de obras. Em cada aplicação a obra tem o seu próprio código (id no cadastro do app): é esse vínculo que faz a restrição por obra chegar até o app.</p>
      <div class="table-wrap"><table class="ca-tab">
        <thead><tr><th>Obra</th><th>Código</th><th>Ativa</th>${comObras.map(a => `<th title="Id da obra no ${esc(a.nome)}">Id no ${esc(a.nome)}</th>`).join('')}<th>Pessoas</th><th></th></tr></thead>
        <tbody>
          ${S.obras.map(o => `<tr data-ca-obra="${o.id}">
            <td><input class="ca-in" data-ob="nome" value="${esc(o.nome)}"></td>
            <td><input class="ca-in curto" data-ob="codigo" value="${esc(o.codigo||'')}"></td>
            <td><input type="checkbox" data-ob="ativa" ${o.ativa?'checked':''}></td>
            ${comObras.map(a => `<td><input class="ca-in curto" data-ob-vinc="${a.id}" value="${esc(vinculo(o.id, a.id)||'')}" placeholder="—"></td>`).join('')}
            <td>${new Set(S.uobras.filter(x => x.obra_id===o.id).map(x => x.usuario_id)).size}</td>
            <td><button class="btn small" data-ca-salvar-obra="${o.id}">Salvar</button></td>
          </tr>`).join('')}
          <tr data-ca-obra="nova">
            <td><input class="ca-in" data-ob="nome" placeholder="Nova obra"></td>
            <td><input class="ca-in curto" data-ob="codigo" placeholder="Código"></td>
            <td><input type="checkbox" data-ob="ativa" checked></td>
            ${comObras.map(a => `<td><input class="ca-in curto" data-ob-vinc="${a.id}" placeholder="—"></td>`).join('')}
            <td></td><td><button class="btn primary small" data-ca-salvar-obra="nova">Adicionar</button></td>
          </tr>
        </tbody></table></div>`;
  }

  function telaHistorico(){
    if(!S.logLido){ S.logLido = true; carregarLog(); return '<div class="ca-vazio">Carregando histórico…</div>'; }
    if(!S.log.length) return '<div class="ca-vazio">Nenhuma alteração registrada ainda.</div>';
    const nomeP = id => (S.pessoas.find(p => p.id === id) || {}).nome || '';
    const det = d => {
      if(!d || typeof d !== 'object') return '';
      const partes = [];
      if(d.perfil) partes.push('perfil ' + d.perfil);
      if(d.antes && d.depois){
        if(d.antes.perfil_id !== d.depois.perfil_id) partes.push(`perfil: ${(perfil(d.antes.perfil_id)||{}).nome||'—'} → ${(perfil(d.depois.perfil_id)||{}).nome||'—'}`);
        if(d.antes.ativo !== d.depois.ativo) partes.push(d.depois.ativo ? 'reativado' : 'suspenso');
        if(d.antes.todas_obras !== d.depois.todas_obras) partes.push(d.depois.todas_obras ? 'todas as obras' : 'obras selecionadas');
        if(d.antes.conta_id !== d.depois.conta_id) partes.push('login vinculado');
      }
      if(d.perfil_id && !d.perfil && !d.antes) partes.push('perfil ' + ((perfil(d.perfil_id)||{}).nome || '#'+d.perfil_id));
      if(d.incluidas && d.incluidas.length) partes.push('+ ' + d.incluidas.join(', '));
      if(d.retiradas && d.retiradas.length) partes.push('− ' + d.retiradas.join(', '));
      if(d.email) partes.push(d.email);
      if(d.obras) partes.push(d.obras.length + ' obra(s)');
      if(d.tambem_afeta && d.tambem_afeta.length) partes.push('também vale para ' + d.tambem_afeta.join(', '));
      ['painel','refeicoes','pessoas'].forEach(k => { if(typeof d[k] === 'number') partes.push(`${k}: ${d[k]}`); });
      return partes.join(' · ');
    };
    return `<div class="ca-filtros"><button class="btn small" data-ca="recarregar-log">↻ Atualizar</button><span class="ca-obs">Últimas 300 alterações. Senhas nunca são registradas.</span></div>
      <div class="table-wrap"><table class="ca-tab">
        <thead><tr><th>Quando</th><th>Quem fez</th><th>O quê</th><th>Pessoa</th><th>Aplicação</th><th>Detalhes</th></tr></thead>
        <tbody>${S.log.map(l => `<tr><td>${fmtData(l.em)}</td><td>${esc(l.por_nome||'sistema')}</td><td>${esc(l.acao)}</td><td>${esc(nomeP(l.usuario_id))}</td><td>${esc((app(l.app_id)||{}).nome||l.app_id||'')}</td><td class="txt">${esc(det(l.detalhes))}</td></tr>`).join('')}</tbody>
      </table></div>`;
  }

  /* ------------------------------------------------------------ editor de pessoa (modal) */
  function abrirPessoa(id){
    const p = id ? S.pessoas.find(x => x.id === id) : { id:null, nome:'', email:'', cargo:'', telefone:'', ativo:true, observacao:'' };
    if(!p) return;
    const m = modal;
    m.hidden = false;
    m.innerHTML = `<div class="ca-janela" role="dialog" aria-modal="true" aria-label="Acessos de ${esc(p.nome||'nova pessoa')}">
      <div class="ca-jtopo"><h3>${p.id ? esc(p.nome) : 'Nova pessoa'}</h3><button class="btn ghost small" data-ca="fechar" aria-label="Fechar">✕</button></div>
      <section class="ca-bloco" data-ca-pessoa="${p.id||''}">
        <h4>Dados da pessoa</h4>
        <div class="ca-linha">
          <label>Nome<input class="ca-in" data-pe="nome" value="${esc(p.nome)}"></label>
          <label>E-mail<input class="ca-in" type="email" data-pe="email" value="${esc(p.email||'')}" placeholder="nome@empresa.com.br"></label>
        </div>
        <div class="ca-linha">
          <label>Cargo / função<input class="ca-in" data-pe="cargo" value="${esc(p.cargo||'')}"></label>
          <label>Telefone<input class="ca-in" data-pe="telefone" value="${esc(p.telefone||'')}"></label>
        </div>
        <label>Observação<input class="ca-in" data-pe="observacao" value="${esc(p.observacao||'')}"></label>
        <div class="ca-acoes">
          <label class="ca-ck"><input type="checkbox" data-pe="ativo" ${p.ativo?'checked':''}> Pessoa ativa <small class="ca-obs">(desativar tira o acesso em todas as aplicações)</small></label>
          <button class="btn primary small" data-ca="salvar-pessoa">${p.id ? 'Salvar dados' : 'Cadastrar'}</button>
          <span class="ca-msg" data-ca-msg></span>
        </div>
      </section>
      ${p.id ? S.apps.map(a => blocoApp(p, a)).join('') : '<p class="ca-obs">Cadastre a pessoa para liberar as aplicações.</p>'}
    </div>`;
    ligarModal(p);
    if(p.id && uappsDe(p.id).length) atualizarStatus(p.id);
  }

  function blocoApp(p, a){
    const ua = uapp(p.id, a.id);
    const tem = !!ua;
    const pfs = perfisDoApp(a.id).filter(x => x.ativo || (ua && x.id === ua.perfil_id));
    const sel = ua ? ua.perfil_id : null;
    const obrasSel = new Set(ua ? obrasDe(p.id, a.id) : []);
    const todas = ua ? ua.todas_obras : false;
    const st = (S.status[p.id] || {})[a.id];
    const ligado = projetoLigado(a);
    const loginPh = a.tipo_login === 'login' ? `LOGIN@${a.dominio_login}` : (p.email || 'e-mail de entrada');
    return `<section class="ca-bloco ca-app ${tem?'':'fechado'}" data-ca-app="${a.id}">
      <div class="ca-jtopo"><h4><label class="ca-ck"><input type="checkbox" data-ap="tem" ${tem?'checked':''}> ${esc(a.nome)}</label> <small class="ca-obs">${esc(a.descricao||'')}</small></h4>
        ${tem ? `<span class="ca-chip ${ua.ativo?'':'off'}">${ua.ativo?'liberado':'suspenso'}</span>` : ''}</div>
      <div class="ca-app-corpo">
        <div class="ca-linha">
          <label>Perfil<select class="ca-in" data-ap="perfil"><option value="">— escolha —</option>${pfs.map(x => `<option value="${x.id}" ${x.id===sel?'selected':''}>${esc(x.nome)}</option>`).join('')}</select></label>
          <label>Acesso até (opcional)<input class="ca-in" type="date" data-ap="validade" value="${esc(ua && ua.validade || '')}"></label>
          <label class="ca-ck"><input type="checkbox" data-ap="ativo" ${!ua || ua.ativo?'checked':''}> Liberado</label>
        </div>
        <div class="ca-perms" data-ap-perms>${resumoPerfil(a.id, sel)}</div>
        ${a.usa_obras ? `<div class="ca-obras">
          <div class="ca-linha"><label class="ca-ck"><input type="radio" name="ob-${a.id}" data-ap="todas" value="1" ${todas?'checked':''}> Todas as obras</label>
            <label class="ca-ck"><input type="radio" name="ob-${a.id}" data-ap="todas" value="0" ${todas?'':'checked'}> Só as obras marcadas</label>
            <input class="ca-in curto" type="search" data-ap="busca-obra" placeholder="Filtrar obras"></div>
          <div class="ca-obras-lista" ${todas?'hidden':''}>${S.obras.filter(o => o.ativa || obrasSel.has(o.id)).map(o => `<label class="ca-ck" data-nome="${esc(norm(o.nome))}"><input type="checkbox" data-ap-obra="${o.id}" ${obrasSel.has(o.id)?'checked':''}> ${esc(o.nome)}${vinculo(o.id, a.id) ? '' : ' <span class="ca-tag alerta" title="Esta obra não tem id no '+esc(a.nome)+' (aba Obras): a restrição não chega ao app">sem vínculo</span>'}</label>`).join('') || '<span class="ca-obs">Nenhuma obra cadastrada (aba Obras).</span>'}</div>
        </div>` : ''}
        <div class="ca-acoes">
          <button class="btn primary small" data-ca="salvar-app">Salvar acesso</button>
          ${tem ? `<button class="btn ghost small ca-perigo" data-ca="remover-app">Tirar acesso</button>` : ''}
          <span class="ca-msg" data-ca-msg></span>
        </div>
        ${tem ? `<div class="ca-login">
          <h5>Login e senha</h5>
          ${!ligado ? `<p class="ca-aviso">Projeto ${esc(a.projeto)} ainda não ligado à central (falta a chave de serviço). Troque a senha dentro do próprio app por enquanto.</p>` : ''}
          <div class="ca-linha">
            <label>Entra como<input class="ca-in" data-ap="conta_email" value="${esc(ua.conta_email||'')}" placeholder="${esc(loginPh)}"></label>
            <div class="ca-st">${statusTxt(ua, st)}</div>
          </div>
          <div class="ca-acoes">
            ${!ua.conta_id ? `<button class="btn small" data-lg="criar_login" ${ligado?'':'disabled'}>Criar login</button><button class="btn small" data-lg="vincular" ${ligado?'':'disabled'}>Vincular login existente</button>` : `
            <button class="btn small" data-lg="gerar" ${ligado?'':'disabled'}>Gerar senha temporária</button>
            <button class="btn small" data-lg="definir" ${ligado?'':'disabled'}>Definir senha…</button>
            ${a.tipo_login === 'email' ? `<button class="btn small" data-lg="enviar_link" ${ligado?'':'disabled'}>Enviar link de redefinição</button>` : ''}
            ${st && st.bloqueado ? `<button class="btn small" data-lg="desbloquear" ${ligado?'':'disabled'}>Desbloquear login</button>` : `<button class="btn ghost small ca-perigo" data-lg="bloquear" ${ligado?'':'disabled'}>Bloquear login</button>`}
            <button class="btn ghost small" data-lg="sincronizar" title="Grava de novo o perfil e as obras no cadastro do app">Reaplicar no app</button>`}
          </div>
        </div>` : ''}
      </div>
    </section>`;
  }

  function statusTxt(ua, st){
    if(!ua.conta_id && !st) return '<span class="ca-tag alerta">sem login vinculado</span>';
    if(!st) return '<span class="ca-obs">Consultando o login…</span>';
    if(st.erro) return `<span class="ca-obs">${esc(st.erro)}</span>`;
    if(!st.existe) return '<span class="ca-tag alerta">login não encontrado no projeto</span>';
    return `${st.bloqueado ? '<span class="ca-tag alerta">bloqueado</span> ' : '<span class="ca-tag ok">ativo</span> '}
      <span class="ca-obs">${esc(st.email)} · último acesso ${fmtData(st.ultimo_login)}${st.vinculado ? '' : ' · <b>encontrado pelo e-mail, clique em “Vincular”</b>'}</span>`;
  }

  function resumoPerfil(aid, pid){
    const pf = perfil(Number(pid));
    if(!pf) return '<span class="ca-obs">Escolha um perfil para ver o que a pessoa vai poder fazer.</span>';
    const nomes = permsDoApp(aid).filter(p => pf.permissoes.includes(p.codigo)).map(p => p.nome);
    const res = resultadoNoApp(aid, pf.permissoes);
    return `<details><summary>${nomes.length} permissão(ões) neste perfil${res ? ' · ' + res : ''}</summary><ul>${nomes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></details>`;
  }

  async function atualizarStatus(uid){
    try{
      const r = await funcao({ acao:'status', usuario_id: uid });
      S.status[uid] = r.status || {};
    }catch(e){
      S.status[uid] = Object.fromEntries(uappsDe(uid).map(x => [x.app_id, { erro: e.message }]));
    }
    const m = modal;
    if(m.hidden) return;
    uappsDe(uid).forEach(ua => {
      const b = m.querySelector(`[data-ca-app="${ua.app_id}"]`);
      if(!b) return;
      const novo = document.createElement('div');
      novo.innerHTML = blocoApp(S.pessoas.find(p => p.id === uid), app(ua.app_id));
      b.replaceWith(novo.firstElementChild);
    });
    ligarModal(S.pessoas.find(p => p.id === uid));
  }

  function mostrarSenha(titulo, senha, extra){
    const m = modal;
    const d = document.createElement('div');
    d.className = 'ca-senha';
    d.innerHTML = `<div class="ca-janela pequena" role="dialog" aria-modal="true">
      <h3>${esc(titulo)}</h3>
      ${senha ? `<p>Passe esta senha para a pessoa. <b>Ela não será mostrada de novo</b> e não fica guardada em lugar nenhum.</p>
      <div class="ca-senha-valor"><code>${esc(senha)}</code><button class="btn small" data-copiar>Copiar</button></div>` : ''}
      ${extra ? `<p class="ca-obs">${extra}</p>` : ''}
      <div class="ca-acoes"><button class="btn primary small" data-ok>Ok</button></div></div>`;
    m.appendChild(d);
    d.querySelector('[data-ok]').onclick = () => d.remove();
    const c = d.querySelector('[data-copiar]');
    if(c) c.onclick = async () => { try{ await navigator.clipboard.writeText(senha); c.textContent = 'Copiada!'; }catch(_){ c.textContent = 'Selecione e copie'; } };
  }

  function msg(el, texto, ok){
    if(!el) return;
    el.textContent = texto; el.className = 'ca-msg ' + (ok ? 'ok' : 'erro');
    if(ok) setTimeout(() => { if(el.textContent === texto) el.textContent = ''; }, 3500);
  }

  /* ------------------------------------------------------------ ações */
  async function salvarPessoa(bloco, p){
    const v = k => bloco.querySelector(`[data-pe="${k}"]`);
    const dados = { nome: v('nome').value.trim(), email: v('email').value.trim().toLowerCase() || null, cargo: v('cargo').value.trim() || null,
                    telefone: v('telefone').value.trim() || null, observacao: v('observacao').value.trim() || null, ativo: v('ativo').checked };
    const m = bloco.querySelector('[data-ca-msg]');
    if(!dados.nome) return msg(m, 'Informe o nome.');
    if(dados.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(dados.email)) return msg(m, 'E-mail inválido.');
    if(p.id && p.ativo && !dados.ativo && !confirm(`Desativar ${dados.nome}? O acesso a todas as aplicações será retirado.`)) return;
    const q = p.id ? SB.from('acesso_usuarios').update(dados).eq('id', p.id).select().single()
                   : SB.from('acesso_usuarios').insert(dados).select().single();
    const { data, error } = await q;
    if(error) return msg(m, /duplicate|unique/i.test(error.message) ? 'Já existe uma pessoa com este e-mail.' : 'Não foi possível salvar: ' + error.message);
    const i = S.pessoas.findIndex(x => x.id === data.id);
    if(i >= 0) S.pessoas[i] = data; else S.pessoas.push(data);
    S.pessoas.sort((a,b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    if(!p.id){ render(); abrirPessoa(data.id); return; }
    // desativar/reativar: Notas é sincronizado pela função
    if(p.ativo !== data.ativo) await sincronizarExternos(data.id);
    render(); abrirPessoa(data.id);
    msg(modal.querySelector('[data-ca-pessoa] [data-ca-msg]'), 'Salvo!', true);
  }

  async function sincronizarExternos(uid, soApp){
    for(const ua of uappsDe(uid)){
      const a = app(ua.app_id);
      if(!a || a.sincroniza !== 'funcao' || !ua.conta_id || (soApp && soApp !== a.id) || !projetoLigado(a)) continue;
      try{ await funcao({ acao:'sincronizar', usuario_id: uid, app_id: a.id }); }catch(e){ console.warn('Sincronizar ' + a.id, e); }
    }
  }

  async function salvarApp(bloco, p, a){
    const m = bloco.querySelector('[data-ca-msg]');
    const q = s => bloco.querySelector(s);
    const tem = q('[data-ap="tem"]').checked;
    const ua = uapp(p.id, a.id);
    if(!tem){ if(ua) return removerApp(bloco, p, a); return msg(m, 'Marque a aplicação para dar o acesso.'); }
    const perfilId = Number(q('[data-ap="perfil"]').value) || null;
    if(!perfilId) return msg(m, 'Escolha o perfil.');
    const todasEl = bloco.querySelector('[data-ap="todas"]:checked');
    const todas = a.usa_obras ? (todasEl ? todasEl.value === '1' : false) : true;
    const obras = [...bloco.querySelectorAll('[data-ap-obra]:checked')].map(x => Number(x.dataset.apObra));
    if(a.usa_obras && !todas && !obras.length && !confirm('Nenhuma obra marcada: a pessoa não vai ver nenhuma obra nesta aplicação. Continuar?')) return;
    const contaEl = q('[data-ap="conta_email"]');
    const linha = { usuario_id: p.id, app_id: a.id, perfil_id: perfilId, ativo: q('[data-ap="ativo"]').checked,
                    todas_obras: todas, validade: q('[data-ap="validade"]').value || null };
    if(contaEl) linha.conta_email = contaEl.value.trim().toLowerCase() || null;
    msg(m, 'Salvando…', true);
    // obras primeiro (sem disparar sincronização com a linha antiga), depois a linha do acesso
    const { error } = await SB.from('acesso_usuario_apps').upsert(linha, { onConflict: 'usuario_id,app_id' });
    if(error) return msg(m, 'Não foi possível salvar: ' + error.message);
    if(a.usa_obras){
      const antes = new Set(obrasDe(p.id, a.id)), depois = new Set(todas ? [] : obras);
      const tirar = [...antes].filter(x => !depois.has(x)), por = [...depois].filter(x => !antes.has(x));
      if(tirar.length){ const r = await SB.from('acesso_usuario_obras').delete().eq('usuario_id', p.id).eq('app_id', a.id).in('obra_id', tirar); if(r.error) return msg(m, r.error.message); }
      if(por.length){ const r = await SB.from('acesso_usuario_obras').insert(por.map(obra_id => ({ usuario_id: p.id, app_id: a.id, obra_id }))); if(r.error) return msg(m, r.error.message); }
    }
    await recarregarPessoa(p.id);
    if(a.sincroniza === 'funcao') await sincronizarExternos(p.id, a.id);
    const semLogin = !uapp(p.id, a.id).conta_id;
    render(); abrirPessoa(p.id);
    msg(modal.querySelector(`[data-ca-app="${a.id}"] [data-ca-msg]`), semLogin ? 'Salvo! Agora crie ou vincule o login.' : 'Salvo e aplicado no ' + a.nome + '.', true);
  }

  async function removerApp(bloco, p, a){
    if(!confirm(`Tirar o acesso de ${p.nome} ao ${a.nome}? O login continua existindo, mas fica sem nenhuma permissão no app.`)) return;
    const m = bloco.querySelector('[data-ca-msg]');
    if(a.sincroniza === 'funcao'){
      // primeiro suspende (para o Notas receber), depois apaga
      await SB.from('acesso_usuario_apps').update({ ativo:false }).eq('usuario_id', p.id).eq('app_id', a.id);
      await sincronizarExternos(p.id, a.id);
    }
    const { error } = await SB.from('acesso_usuario_apps').delete().eq('usuario_id', p.id).eq('app_id', a.id);
    if(error) return msg(m, 'Não foi possível tirar: ' + error.message);
    await recarregarPessoa(p.id);
    render(); abrirPessoa(p.id);
  }

  async function recarregarPessoa(uid){
    const [r1, r2] = await Promise.all([
      SB.from('acesso_usuario_apps').select('*').eq('usuario_id', uid),
      SB.from('acesso_usuario_obras').select('*').eq('usuario_id', uid),
    ]);
    if(!r1.error) S.uapps = S.uapps.filter(x => x.usuario_id !== uid).concat(r1.data || []);
    if(!r2.error) S.uobras = S.uobras.filter(x => x.usuario_id !== uid).concat(r2.data || []);
  }

  async function acaoLogin(tipo, bloco, p, a){
    const m = bloco.querySelector('[data-ca-msg]');
    const ua = uapp(p.id, a.id);
    const contaEl = bloco.querySelector('[data-ap="conta_email"]');
    let entrada = contaEl ? contaEl.value.trim() : '';
    const body = { usuario_id: p.id, app_id: a.id };
    try{
      if(tipo === 'criar_login' || tipo === 'vincular'){
        if(a.tipo_login === 'login'){
          if(!entrada){ entrada = prompt(`Login (usuário) de ${p.nome} no ${a.nome}:`, (p.nome||'').split(' ').filter(Boolean).map((x,i,arr) => i===0||i===arr.length-1?x:'').filter(Boolean).join('.').toUpperCase()) || ''; }
          if(!entrada) return;
          if(entrada.includes('@')) body.email = entrada; else body.login = entrada;
        }else if(entrada) body.email = entrada;
        if(tipo === 'criar_login'){
          const s = prompt('Senha inicial (deixe em branco para gerar uma senha temporária):', '');
          if(s === null) return;
          if(s) body.senha = s;
        }
        msg(m, 'Aguarde…', true);
        const r = await funcao({ acao: tipo, ...body });
        await recarregarPessoa(p.id);
        mostrarSenha(tipo === 'vincular' ? 'Login vinculado' : (r.ja_existia ? 'Login já existia — vinculado' : 'Login criado'), r.senha,
          `Entra como <b>${esc(r.email)}</b>${r.ja_existia && tipo==='criar_login' ? '. A senha não foi alterada: use “Gerar senha temporária” se precisar.' : ''}`);
      }else if(tipo === 'gerar' || tipo === 'definir'){
        if(tipo === 'definir'){
          const s = prompt(`Nova senha de ${p.nome} no ${a.nome} (mín. 8 caracteres, letras e números):`, '');
          if(!s) return;
          body.senha = s;
        }else if(!confirm(`Gerar uma senha temporária para ${p.nome} no ${a.nome}? A senha atual deixa de valer.`)) return;
        msg(m, 'Aguarde…', true);
        const r = await funcao({ acao:'definir_senha', ...body });
        mostrarSenha(tipo === 'gerar' ? 'Senha temporária gerada' : 'Senha definida', r.senha, tipo === 'definir' ? 'A nova senha já vale.' : 'Oriente a pessoa a trocar a senha depois de entrar.');
        msg(m, '', true);
      }else if(tipo === 'enviar_link'){
        msg(m, 'Enviando…', true);
        const r = await funcao({ acao:'enviar_link', ...body });
        mostrarSenha('Link enviado', null, 'A pessoa recebe em <b>' + esc(r.email) + '</b> o link para criar uma nova senha.');
      }else if(tipo === 'bloquear' || tipo === 'desbloquear'){
        if(tipo === 'bloquear' && !confirm(`Bloquear o login de ${p.nome}? Ele não consegue mais entrar (nem com digital) até ser desbloqueado.`)) return;
        const r = await funcao({ acao: tipo, ...body });
        const outros = (r.tambem_afeta || []).map(x => (app(x)||{}).nome || x);
        mostrarSenha(tipo === 'bloquear' ? 'Login bloqueado' : 'Login desbloqueado', null, outros.length ? 'Vale também para: ' + esc(outros.join(', ')) + ' (é o mesmo login).' : '');
      }else if(tipo === 'sincronizar'){
        const r = await funcao({ acao:'sincronizar', ...body });
        mostrarSenha('Reaplicado no ' + a.nome, null, 'Resultado: ' + esc(r.sincronizacao));
      }
      if(tipo === 'criar_login' || tipo === 'vincular') render();
      await atualizarStatus(p.id);
    }catch(e){
      const atual = modal.querySelector(`[data-ca-app="${a.id}"] [data-ca-msg]`);
      msg(atual || m, e.message);
    }
  }

  async function salvarPerfil(ed){
    const a = app(S.perfilApp);
    const id = Number(ed.dataset.caPerfil) || null;
    const m = ed.querySelector('[data-ca-msg]');
    const dados = {
      app_id: a.id,
      nome: ed.querySelector('[data-pf="nome"]').value.trim(),
      descricao: ed.querySelector('[data-pf="descricao"]').value.trim() || null,
      ativo: ed.querySelector('[data-pf="ativo"]').checked,
      todas_obras: !!(ed.querySelector('[data-pf="todas_obras"]') || {}).checked,
      permissoes: [...ed.querySelectorAll('[data-pf-perm]:checked')].map(x => x.dataset.pfPerm),
    };
    if(!dados.nome) return msg(m, 'Informe o nome do perfil.');
    const qtd = id ? S.uapps.filter(x => x.perfil_id === id).length : 0;
    if(qtd && !confirm(`Este perfil está com ${qtd} pessoa(s). A mudança vale para todas na hora. Salvar?`)) return;
    const r = id ? await SB.from('acesso_perfis').update(dados).eq('id', id).select().single()
                 : await SB.from('acesso_perfis').insert(dados).select().single();
    if(r.error) return msg(m, /duplicate|unique/i.test(r.error.message) ? 'Já existe um perfil com este nome nesta aplicação.' : r.error.message);
    const i = S.perfis.findIndex(x => x.id === r.data.id);
    if(i >= 0) S.perfis[i] = r.data; else S.perfis.push(r.data);
    S.perfilSel = r.data.id;
    if(a.sincroniza === 'funcao' && projetoLigado(a)){
      for(const ua of S.uapps.filter(x => x.perfil_id === r.data.id && x.conta_id)){
        try{ await funcao({ acao:'sincronizar', usuario_id: ua.usuario_id, app_id: a.id }); }catch(e){ console.warn(e); }
      }
    }
    render();
    msg(root.querySelector('.ca-editor [data-ca-msg]'), 'Perfil salvo.', true);
  }

  async function salvarObra(tr){
    const id = tr.dataset.caObra === 'nova' ? null : Number(tr.dataset.caObra);
    const dados = { nome: tr.querySelector('[data-ob="nome"]').value.trim(), codigo: tr.querySelector('[data-ob="codigo"]').value.trim() || null,
                    ativa: tr.querySelector('[data-ob="ativa"]').checked };
    if(!dados.nome) return alert('Informe o nome da obra.');
    const r = id ? await SB.from('acesso_obras').update(dados).eq('id', id).select().single()
                 : await SB.from('acesso_obras').insert(dados).select().single();
    if(r.error) return alert(/duplicate|unique/i.test(r.error.message) ? 'Já existe uma obra com este nome.' : r.error.message);
    const oid = r.data.id;
    for(const inp of tr.querySelectorAll('[data-ob-vinc]')){
      const aid = inp.dataset.obVinc, ref = inp.value.trim(), atual = vinculo(oid, aid);
      if(ref === (atual || '')) continue;
      const q = ref ? await SB.from('acesso_obra_vinculos').upsert({ obra_id: oid, app_id: aid, ref }, { onConflict:'obra_id,app_id' })
                    : await SB.from('acesso_obra_vinculos').delete().eq('obra_id', oid).eq('app_id', aid);
      if(q.error) return alert(`Vínculo com ${(app(aid)||{}).nome}: ` + (/duplicate|unique/i.test(q.error.message) ? 'este id já está ligado a outra obra.' : q.error.message));
    }
    [S.obras, S.vinculos] = await Promise.all([ler('acesso_obras','nome'), ler('acesso_obra_vinculos')]);
    render();
  }

  async function importar(){
    if(!confirm('Trazer para a central quem já usa o Painel, o Validador Email e o CAP-Refeições (e o Notas, se a chave estiver configurada)?\n\nNada muda dentro das aplicações: a mesma pessoa é reconhecida pelo e-mail e recebe o perfil que já tem hoje.')) return;
    const linhas = [];
    try{
      const { data, error } = await SB.rpc('acesso_importar_existentes');
      if(error) throw error;
      linhas.push(`Painel: ${data.painel} · CAP-Refeições: ${data.refeicoes} · obras: ${data.obras}`);
    }catch(e){ linhas.push('Painel/CAP-Refeições: ' + (e.message || e)); }
    try{
      const r = await funcao({ acao:'importar_notas' });
      linhas.push(`Notas: ${r.pessoas} pessoa(s), ${r.obras} obra(s)`);
    }catch(e){ linhas.push('Notas: ' + e.message); }
    await carregar();
    alert('Importação concluída.\n\n' + linhas.join('\n') + '\n\nConfira as pessoas repetidas (mesma pessoa com e-mails diferentes) e junte-as manualmente se precisar.');
  }

  /* ------------------------------------------------------------ eventos */
  function ligar(){
    root.querySelectorAll('[data-ca-aba]').forEach(b => b.onclick = () => { S.aba = b.dataset.caAba; if(S.aba === 'historico') S.logLido = false; render(); });
    root.querySelectorAll('[data-ca-f]').forEach(el => {
      const ev = el.tagName === 'INPUT' ? 'input' : 'change';
      el.addEventListener(ev, () => {
        S.filtro[el.dataset.caF] = el.value;
        const pos = el.selectionStart;
        render();
        const novo = root.querySelector(`[data-ca-f="${el.dataset.caF}"]`);
        if(novo && el.tagName === 'INPUT'){ novo.focus(); try{ novo.setSelectionRange(pos, pos); }catch(_){} }
      });
    });
    root.querySelectorAll('[data-ca-editar]').forEach(b => b.onclick = () => abrirPessoa(b.dataset.caEditar));
    root.querySelectorAll('[data-ca-papp]').forEach(b => b.onclick = () => { S.perfilApp = b.dataset.caPapp; S.perfilSel = null; render(); });
    root.querySelectorAll('[data-ca-psel]').forEach(b => b.onclick = () => { S.perfilSel = b.dataset.caPsel === 'novo' ? 'novo' : Number(b.dataset.caPsel); render(); });
    root.querySelectorAll('[data-ca-salvar-obra]').forEach(b => b.onclick = () => salvarObra(b.closest('tr')));
    const on = (k, f) => { const b = root.querySelector(`[data-ca="${k}"]`); if(b) b.onclick = f; };
    on('nova-pessoa', () => abrirPessoa(null));
    on('importar', importar);
    on('recarregar-log', () => { S.logLido = false; render(); });
    const ed = root.querySelector('.ca-editor');
    if(ed){
      const atualizarRes = () => {
        const perms = [...ed.querySelectorAll('[data-pf-perm]:checked')].map(x => x.dataset.pfPerm);
        const r = ed.querySelector('[data-pf-res]'); if(r) r.innerHTML = resultadoNoApp(S.perfilApp, perms);
        ed.querySelectorAll('[data-pf-grupo]').forEach(g => { const itens = [...ed.querySelectorAll(`[data-pf-perm][data-grupo="${CSS.escape(g.dataset.pfGrupo)}"]`)]; g.checked = itens.every(i => i.checked); g.indeterminate = !g.checked && itens.some(i => i.checked); });
      };
      ed.querySelectorAll('[data-pf-perm]').forEach(c => c.addEventListener('change', atualizarRes));
      ed.querySelectorAll('[data-pf-grupo]').forEach(g => g.addEventListener('change', () => {
        ed.querySelectorAll(`[data-pf-perm][data-grupo="${CSS.escape(g.dataset.pfGrupo)}"]`).forEach(i => i.checked = g.checked); atualizarRes();
      }));
      atualizarRes();
      on('salvar-perfil', () => salvarPerfil(ed));
      on('duplicar-perfil', () => {
        const pf = perfil(Number(ed.dataset.caPerfil));
        S.perfilSel = 'novo'; render();
        const e2 = root.querySelector('.ca-editor');
        e2.querySelector('[data-pf="nome"]').value = pf.nome + ' (cópia)';
        e2.querySelector('[data-pf="descricao"]').value = pf.descricao || '';
        e2.querySelectorAll('[data-pf-perm]').forEach(c => c.checked = pf.permissoes.includes(c.dataset.pfPerm));
        e2.querySelector('[data-pf-perm]') && e2.querySelector('[data-pf-perm]').dispatchEvent(new Event('change'));
      });
      on('excluir-perfil', async () => {
        const id = Number(ed.dataset.caPerfil);
        if(!confirm('Excluir este perfil?')) return;
        const { error } = await SB.from('acesso_perfis').delete().eq('id', id);
        if(error) return msg(ed.querySelector('[data-ca-msg]'), error.message);
        S.perfis = S.perfis.filter(x => x.id !== id); S.perfilSel = null; render();
      });
    }
  }

  function ligarModal(p){
    const m = modal;
    const fechar = () => { m.hidden = true; m.innerHTML = ''; };
    m.onclick = e => { if(e.target === m) fechar(); };
    const fb = m.querySelector('[data-ca="fechar"]'); if(fb) fb.onclick = fechar;
    const bp = m.querySelector('[data-ca-pessoa]');
    const sp = m.querySelector('[data-ca="salvar-pessoa"]');
    if(sp) sp.onclick = () => salvarPessoa(bp, p);
    m.querySelectorAll('[data-ca-app]').forEach(bloco => {
      const a = app(bloco.dataset.caApp);
      const tem = bloco.querySelector('[data-ap="tem"]');
      tem.onchange = () => {
        bloco.classList.toggle('fechado', !tem.checked);
        if(!tem.checked && uapp(p.id, a.id)) removerApp(bloco, p, a).then(() => { const t = m.querySelector(`[data-ca-app="${a.id}"] [data-ap="tem"]`); if(t && uapp(p.id, a.id)) t.checked = true; });
      };
      const sel = bloco.querySelector('[data-ap="perfil"]');
      sel.onchange = () => {
        bloco.querySelector('[data-ap-perms]').innerHTML = resumoPerfil(a.id, sel.value);
        const pf = perfil(Number(sel.value));
        if(pf && a.usa_obras && !uapp(p.id, a.id)){
          const r = bloco.querySelector(`[data-ap="todas"][value="${pf.todas_obras ? 1 : 0}"]`); if(r){ r.checked = true; r.dispatchEvent(new Event('change')); }
        }
      };
      bloco.querySelectorAll('[data-ap="todas"]').forEach(r => r.onchange = () => { const l = bloco.querySelector('.ca-obras-lista'); if(l) l.hidden = bloco.querySelector('[data-ap="todas"]:checked').value === '1'; });
      const busca = bloco.querySelector('[data-ap="busca-obra"]');
      if(busca) busca.oninput = () => { const t = norm(busca.value); bloco.querySelectorAll('.ca-obras-lista [data-nome]').forEach(l => l.hidden = t && !l.dataset.nome.includes(t)); };
      const sa = bloco.querySelector('[data-ca="salvar-app"]'); if(sa) sa.onclick = () => salvarApp(bloco, p, a);
      const ra = bloco.querySelector('[data-ca="remover-app"]'); if(ra) ra.onclick = () => removerApp(bloco, p, a);
      bloco.querySelectorAll('[data-lg]').forEach(b => b.onclick = () => acaoLogin(b.dataset.lg, bloco, p, a));
    });
  }

  /* ------------------------------------------------------------ ciclo de vida */
  function aoAbrirAba(){
    if(!document.body.classList.contains('is-admin')) return;
    if(!S.carregado && !S.carregando) carregar(); else render();
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('.tab-btn[data-tab="acessos"]');
    if(b) setTimeout(aoAbrirAba, 0);
  });
  document.addEventListener('perfil-atualizado', () => {
    if(!document.body.classList.contains('is-admin')){ S.carregado = false; root.innerHTML = ''; modal.hidden = true; modal.innerHTML = ''; return; }
    const painel = document.getElementById('tab-acessos');
    if(painel && painel.classList.contains('active')) aoAbrirAba();
  });
})();
