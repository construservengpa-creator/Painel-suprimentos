/* ============================================================
   FICHA CADASTRAL DO FORNECEDOR — IBS e CBS (reforma tributária)
   ============================================================
   Definição única dos campos da ficha, usada por:
     • cadastro-fornecedor.html  (o fornecedor preenche pelo link do WhatsApp)
     • cotacao-certame.js        (aba Fornecedores do painel: editar, imprimir, enviar)
   Banco: supabase/fornecedores_ficha_ibs_cbs.sql (colunas de cotacao_fornecedores).
   Também busca os dados do CNPJ (BrasilAPI) e do CEP (ViaCEP, com o código IBGE
   do município, que define o município/UF do IBS). Escrito em ES5 para abrir em
   qualquer celular.
   ============================================================ */
(function(){
  'use strict';
  function h(s){ return (s == null ? '' : String(s)).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function dig(s){ return String(s == null ? '' : s).replace(/\D/g, ''); }
  function parseNum(v){
    var s = String(v == null ? '' : v).trim().replace(/[%\s]/g, '');
    if (!s) return null;
    if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
    var n = Number(s); return isFinite(n) ? n : NaN;
  }
  function pct(v){ return v == null || v === '' ? '' : (Number(v) || 0).toLocaleString('pt-BR', { maximumFractionDigits: 4 }); }

  var UFS = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];

  var OP = {
    regime_federal: [
      ['lucro_real', 'Lucro Real'],
      ['lucro_presumido', 'Lucro Presumido'],
      ['lucro_arbitrado', 'Lucro Arbitrado'],
      ['simples', 'Simples Nacional'],
      ['mei', 'MEI'],
      ['produtor_rural', 'Produtor rural pessoa física'],
      ['pessoa_fisica', 'Pessoa física / autônomo'],
      ['outro', 'Outro']
    ],
    regime_ibs_cbs: [
      ['regular', 'Regime regular — IBS/CBS destacados por fora do preço (Lucro Real/Presumido)'],
      ['simples', 'Simples Nacional / MEI — IBS/CBS recolhidos dentro do DAS'],
      ['simples_por_fora', 'Simples Nacional com opção pelo regime regular de IBS/CBS (por fora)'],
      ['nao_contribuinte', 'Não contribuinte de IBS/CBS (produtor rural, nanoempreendedor, pessoa física)']
    ],
    tratamento_ibs_cbs: [
      ['padrao', 'Alíquota padrão (sem redução)'],
      ['reducao_30', 'Redução de 30% (profissões regulamentadas)'],
      ['reducao_60', 'Redução de 60% (bens e serviços dos anexos da LC 214/2025)'],
      ['aliquota_zero', 'Alíquota zero'],
      ['isencao', 'Isenção, suspensão ou diferimento'],
      ['monofasico', 'Regime específico — combustíveis (monofásico)'],
      ['especifico_outro', 'Outro regime específico'],
      ['varios', 'Varia conforme o produto/serviço']
    ],
    documento_fiscal: [
      ['nfe', 'NF-e (mercadorias)'],
      ['nfse', 'NFS-e padrão nacional (serviços)'],
      ['ambos', 'NF-e e NFS-e'],
      ['nfce', 'NFC-e'],
      ['outro', 'Outro']
    ],
    uf: UFS.map(function(u){ return [u, u]; })
  };

  /* Campos. tipo: text | select | num | area | chk. obrig: entra no "ficha completa".
     quando(f): só aparece (e só é exigido) quando a condição vale. */
  var SECOES = [
    { id: 'ident', titulo: '1. Identificação', campos: [
      { k: 'nome', t: 'Razão social / nome completo', obrig: true, full: true, max: 200 },
      { k: 'cnpj', t: 'CNPJ ou CPF', obrig: true, mask: 'doc', ph: '00.000.000/0000-00', botao: 'cnpj' },
      { k: 'nome_fantasia', t: 'Nome fantasia', max: 200 },
      { k: 'inscricao_estadual', t: 'Inscrição estadual', ph: 'ou ISENTO', max: 30 },
      { k: 'inscricao_municipal', t: 'Inscrição municipal', max: 30 },
      { k: 'cnae_principal', t: 'CNAE principal', ph: '0000-0/00', max: 20 }
    ]},
    { id: 'end', titulo: '2. Endereço do estabelecimento', campos: [
      { k: 'cep', t: 'CEP', mask: 'cep', ph: '00000-000', dica: 'Ao informar o CEP o endereço é preenchido.' },
      { k: 'logradouro', t: 'Logradouro', max: 200 },
      { k: 'numero', t: 'Número', max: 20 },
      { k: 'complemento', t: 'Complemento', max: 100 },
      { k: 'bairro', t: 'Bairro', max: 100 },
      { k: 'cidade', t: 'Município', obrig: true, max: 100 },
      { k: 'uf', t: 'UF', tipo: 'select', obrig: true },
      { k: 'municipio_ibge', t: 'Código IBGE do município', obrig: true, ph: '7 dígitos', max: 7,
        dica: 'Identifica o município e a UF do IBS. Vem automático pelo CEP.' }
    ]},
    { id: 'contato', titulo: '3. Contatos', campos: [
      { k: 'contato', t: 'Pessoa de contato', max: 120 },
      { k: 'telefone', t: 'WhatsApp (com DDD)', obrig: true, mask: 'fone', ph: '(91) 99999-9999' },
      { k: 'email', t: 'E-mail comercial', max: 200 },
      { k: 'email_nfe', t: 'E-mail que envia o XML das notas', max: 200 },
      { k: 'contador_nome', t: 'Contador / escritório contábil', max: 120 },
      { k: 'contador_contato', t: 'Telefone ou e-mail do contador', max: 200 }
    ]},
    { id: 'trib', titulo: '4. Tributação — IBS e CBS', nota:
        'A partir de 2026 a nota fiscal destaca a CBS (federal) e o IBS (estadual + municipal). ' +
        'Essas informações definem como o IBS/CBS entra no preço e quanto de crédito a nossa empresa pode aproveitar.',
      campos: [
      { k: 'regime_federal', t: 'Regime de tributação da empresa', tipo: 'select', obrig: true },
      { k: 'regime_ibs_cbs', t: 'Enquadramento no IBS/CBS', tipo: 'select', obrig: true, full: true },
      { k: 'opcao_regular_periodo', t: 'Desde quando optou pelo IBS/CBS por fora?', ph: 'Ex.: 1º semestre de 2027', max: 60, full: true,
        quando: function(f){ return f.regime_ibs_cbs === 'simples_por_fora'; },
        dica: 'A opção do Simples pelo regime regular do IBS/CBS vale por semestre.' },
      { k: 'tratamento_ibs_cbs', t: 'Tratamento dos produtos/serviços que nos vende', tipo: 'select', obrig: true, full: true },
      { k: 'aliq_cbs_padrao', t: 'Alíquota de CBS usual (%)', tipo: 'num', ph: 'Ex.: 0,9' },
      { k: 'aliq_ibs_padrao', t: 'Alíquota de IBS usual (%)', tipo: 'num', ph: 'Ex.: 0,1', dica: 'Estadual + municipal.' },
      { k: 'cst_ibs_cbs', t: 'CST do IBS/CBS usual', ph: '000', max: 3 },
      { k: 'cclasstrib', t: 'cClassTrib usual', ph: '000001', max: 6 },
      { k: 'documento_fiscal', t: 'Documento fiscal que emite', tipo: 'select', obrig: true },
      { k: 'ncm_nbs', t: 'Principais NCM (mercadorias) ou NBS (serviços)', full: true, max: 500 },
      { k: 'obs_tributaria', t: 'Observações tributárias', tipo: 'area', full: true, max: 1500,
        ph: 'Benefícios fiscais, regimes especiais, decisões judiciais, retenções…' }
    ]},
    { id: 'banco', titulo: '5. Dados para pagamento', campos: [
      { k: 'banco', t: 'Banco', max: 100 },
      { k: 'agencia', t: 'Agência', max: 20 },
      { k: 'conta', t: 'Conta', max: 30 },
      { k: 'pix_chave', t: 'Chave PIX', max: 120 }
    ]},
    { id: 'decl', titulo: '6. Declaração', campos: [
      { k: 'declarante_nome', t: 'Nome de quem preencheu', obrig: true, max: 120 },
      { k: 'declarante_cargo', t: 'Cargo / função', max: 80 },
      { k: 'declaracao_aceita', t: 'Declaro que as informações são verdadeiras e me comprometo a avisar qualquer mudança de regime ou enquadramento tributário.', tipo: 'chk', obrig: true, full: true }
    ]}
  ];
  var CAMPOS = [];
  SECOES.forEach(function(s){ s.campos.forEach(function(c){ c.secao = s.id; CAMPOS.push(c); }); });
  function campo(k){ for (var i = 0; i < CAMPOS.length; i++) if (CAMPOS[i].k === k) return CAMPOS[i]; return null; }
  function rotulo(k, v){
    var o = OP[k]; if (!o) return v;
    for (var i = 0; i < o.length; i++) if (o[i][0] === v) return o[i][1];
    return v;
  }

  /* ---------- formatação ---------- */
  function fmtDoc(s){
    var d = dig(s);
    if (d.length === 14) return d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    if (d.length === 11) return d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    return s || '';
  }
  function fmtCep(s){ var d = dig(s); return d.length === 8 ? d.slice(0, 5) + '-' + d.slice(5) : (s || ''); }
  function fmtFone(s){
    var d = dig(s), m = d.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
    return m ? '(' + m[1] + ') ' + m[2] + '-' + m[3] : (s || '');
  }
  function normFone(s){ var d = dig(s); return (d.length === 10 || d.length === 11) ? '55' + d : d; }
  function valor(c, f){
    var v = f[c.k];
    if (v == null) return '';
    if (c.mask === 'doc') return fmtDoc(v);
    if (c.mask === 'cep') return fmtCep(v);
    if (c.mask === 'fone') return fmtFone(v);
    if (c.tipo === 'num') return pct(v);
    return v;
  }

  /* ---------- validação ---------- */
  function docValido(s){
    var d = dig(s), i, soma, r;
    if (/^(\d)\1+$/.test(d)) return false;
    if (d.length === 11) {
      for (var t = 9; t < 11; t++) {
        soma = 0; for (i = 0; i < t; i++) soma += Number(d[i]) * (t + 1 - i);
        r = (soma * 10) % 11 % 10; if (r !== Number(d[t])) return false;
      }
      return true;
    }
    if (d.length === 14) {
      var pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      for (var n = 12; n < 14; n++) {
        soma = 0; for (i = 0; i < n; i++) soma += Number(d[i]) * pesos[i + 13 - n];
        r = soma % 11; r = r < 2 ? 0 : 11 - r; if (r !== Number(d[n])) return false;
      }
      return true;
    }
    return false;
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function visivel(c, f){ return !c.quando || c.quando(f); }
  /* problemas: { k, t, msg } — vazio obrigatório ou formato inválido */
  function problemas(f, soFormato){
    var out = [];
    CAMPOS.forEach(function(c){
      if (!visivel(c, f)) return;
      var v = f[c.k], vazio = v == null || v === '' || v === false;
      if (vazio) { if (c.obrig && !soFormato) out.push({ k: c.k, t: c.t, msg: 'preencher' }); return; }
      var m = null;
      if (c.k === 'cnpj' && !docValido(v)) m = 'CNPJ/CPF inválido';
      else if ((c.k === 'email' || c.k === 'email_nfe') && !EMAIL.test(v)) m = 'e-mail inválido';
      else if (c.k === 'telefone' && normFone(v).length < 12) m = 'WhatsApp com DDD';
      else if (c.k === 'cep' && dig(v).length !== 8) m = 'CEP com 8 dígitos';
      else if (c.k === 'municipio_ibge' && !/^\d{7}$/.test(dig(v))) m = 'código IBGE com 7 dígitos';
      else if (c.k === 'cst_ibs_cbs' && !/^\d{3}$/.test(dig(v))) m = 'CST com 3 dígitos';
      else if (c.k === 'cclasstrib' && !/^\d{6}$/.test(dig(v))) m = 'cClassTrib com 6 dígitos';
      else if (c.tipo === 'num' && (isNaN(v) || v < 0 || v > 100)) m = 'percentual entre 0 e 100';
      if (m) out.push({ k: c.k, t: c.t, msg: m });
    });
    return out;
  }
  /* avisos de coerência (não impedem o envio) */
  function avisos(f){
    var a = [], rf = f.regime_federal, ri = f.regime_ibs_cbs;
    if ((rf === 'simples' || rf === 'mei') && (ri === 'regular' || ri === 'nao_contribuinte'))
      a.push('Empresa do Simples/MEI normalmente fica em “Simples Nacional” ou, se optou, “Simples com IBS/CBS por fora”.');
    if ((rf === 'lucro_real' || rf === 'lucro_presumido' || rf === 'lucro_arbitrado') && ri && ri !== 'regular')
      a.push('Empresa do Lucro Real/Presumido/Arbitrado é contribuinte do regime regular de IBS/CBS.');
    if (rf === 'mei' && ri === 'simples_por_fora') a.push('O MEI não pode optar pelo IBS/CBS por fora.');
    if (f.tratamento_ibs_cbs === 'reducao_30' && f.documento_fiscal === 'nfe')
      a.push('A redução de 30% é para serviços de profissões regulamentadas — confira se o documento é NFS-e.');
    return a;
  }
  function status(f){
    if (!f || !f.ficha_atualizada_em && !f.regime_ibs_cbs) return { t: 'Ficha pendente', c: 'var(--text-dim)', completa: false, faltam: problemas(f || {}).length };
    var p = problemas(f), dias = f.ficha_atualizada_em ? (Date.now() - new Date(f.ficha_atualizada_em).getTime()) / 864e5 : null;
    if (p.length) return { t: 'Incompleta (' + p.length + ')', c: 'var(--amber)', completa: false, faltam: p.length };
    if (dias != null && dias > 180) return { t: 'Revisar (> 6 meses)', c: 'var(--amber)', completa: true, faltam: 0 };
    return { t: 'Completa', c: 'var(--teal)', completa: true, faltam: 0 };
  }
  /* regime usado na cotação (cotacao_convites.regime_tributario) */
  function regimeCotacao(f){
    var r = f && f.regime_ibs_cbs;
    return r === 'regular' || r === 'simples' || r === 'simples_por_fora' ? r : null;
  }

  /* ---------- formulário ---------- */
  function opcoes(k, v){
    return '<option value="">Selecione…</option>' + (OP[k] || []).map(function(o){
      return '<option value="' + h(o[0]) + '"' + (v === o[0] ? ' selected' : '') + '>' + h(o[1]) + '</option>';
    }).join('');
  }
  function inputHtml(c, f, dis){
    var v = valor(c, f), d = dis ? ' disabled' : '', obr = c.obrig ? ' <span class="ff-req">*</span>' : '';
    var ph = c.ph ? ' placeholder="' + h(c.ph) + '"' : '', mx = c.max ? ' maxlength="' + c.max + '"' : '';
    var dica = c.dica ? '<span class="ff-dica">' + h(c.dica) + '</span>' : '';
    var cls = 'ff-campo' + (c.full ? ' ff-full' : '') + (c.tipo === 'chk' ? ' ff-chk' : '');
    var corpo;
    if (c.tipo === 'select') corpo = '<select data-fk="' + c.k + '"' + d + '>' + opcoes(c.k, f[c.k]) + '</select>';
    else if (c.tipo === 'area') corpo = '<textarea data-fk="' + c.k + '" rows="3"' + ph + mx + d + '>' + h(v) + '</textarea>';
    else if (c.tipo === 'chk') return '<label class="' + cls + '" data-ffw="' + c.k + '"><input type="checkbox" data-fk="' + c.k + '"' + (f[c.k] ? ' checked' : '') + d + '><span>' + h(c.t) + obr + '</span></label>';
    else {
      var im = c.tipo === 'num' ? ' inputmode="decimal"' : (c.mask || c.k === 'municipio_ibge' || c.k === 'cst_ibs_cbs' || c.k === 'cclasstrib') ? ' inputmode="numeric"' : '';
      if (c.k.indexOf('email') === 0) im = ' inputmode="email" autocomplete="email"';
      corpo = '<input data-fk="' + c.k + '" value="' + h(v) + '"' + ph + mx + im + d + '>';
      if (c.botao === 'cnpj' && !dis) corpo = '<span class="ff-linha">' + corpo + '<button type="button" class="ff-btn" data-ff-cnpj>Buscar dados</button></span>';
    }
    return '<label class="' + cls + '" data-ffw="' + c.k + '"><span>' + h(c.t) + obr + '</span>' + corpo + dica + '</label>';
  }
  /* opts.secoes: lista de ids a mostrar (padrão: todas); opts.disabled */
  function formHtml(f, opts){
    f = f || {}; opts = opts || {};
    return SECOES.filter(function(s){ return !opts.secoes || opts.secoes.indexOf(s.id) >= 0; }).map(function(s){
      return '<fieldset class="ff-sec" data-ffs="' + s.id + '"><legend>' + h(s.titulo) + '</legend>' +
        (s.nota ? '<p class="ff-nota">' + h(s.nota) + '</p>' : '') +
        '<div class="ff-grid">' + s.campos.map(function(c){ return inputHtml(c, f, opts.disabled); }).join('') + '</div>' +
        (s.id === 'trib' ? '<div class="ff-avisos" data-ff-avisos></div>' : '') + '</fieldset>';
    }).join('') + '<div class="ff-status" data-ff-status></div>';
  }
  /* lê o formulário: devolve os valores já normalizados (dígitos, números, booleanos) */
  function ler(root){
    var o = {};
    CAMPOS.forEach(function(c){
      var el = root.querySelector('[data-fk="' + c.k + '"]');
      if (!el) return;
      if (c.tipo === 'chk') { o[c.k] = !!el.checked; return; }
      var v = String(el.value || '').trim();
      if (c.tipo === 'num') { o[c.k] = parseNum(v); return; }
      if (c.mask === 'doc' || c.mask === 'cep' || c.k === 'municipio_ibge' || c.k === 'cst_ibs_cbs' || c.k === 'cclasstrib') v = dig(v);
      if (c.mask === 'fone') v = normFone(v);
      if (c.k === 'uf') v = v.toUpperCase();
      o[c.k] = v || null;
    });
    if (o.cnpj) o.tipo_pessoa = o.cnpj.length === 11 ? 'pf' : 'pj';
    if (o.regime_ibs_cbs !== 'simples_por_fora' && 'opcao_regular_periodo' in o) o.opcao_regular_periodo = null;
    return o;
  }
  function marcar(root, lista){
    Array.prototype.forEach.call(root.querySelectorAll('.ff-falta'), function(e){ e.classList.remove('ff-falta'); });
    lista.forEach(function(p){ var el = root.querySelector('[data-fk="' + p.k + '"]'); if (el) el.classList.add('ff-falta'); });
    if (lista.length) { var el = root.querySelector('[data-fk="' + lista[0].k + '"]'); if (el && el.focus) el.focus(); }
  }
  function preencherVazios(root, dados){
    var n = 0;
    Object.keys(dados).forEach(function(k){
      var el = root.querySelector('[data-fk="' + k + '"]'), v = dados[k];
      if (!el || v == null || v === '' || String(el.value || '').trim()) return;
      var c = campo(k); el.value = c ? valor(c, (function(){ var x = {}; x[k] = v; return x; })()) : v; n++;
    });
    return n;
  }
  function getJSON(url){
    return fetch(url).then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  function buscarCep(root, avisar){
    var el = root.querySelector('[data-fk="cep"]'), d = dig(el && el.value);
    if (d.length !== 8) return;
    getJSON('https://viacep.com.br/ws/' + d + '/json/').then(function(j){
      if (j.erro) { if (avisar) avisar('CEP não encontrado.'); return; }
      preencherVazios(root, { logradouro: j.logradouro, bairro: j.bairro, cidade: j.localidade, uf: j.uf, municipio_ibge: j.ibge, complemento: j.complemento });
      // município e IBGE sempre seguem o CEP
      var ib = root.querySelector('[data-fk="municipio_ibge"]'); if (ib && j.ibge) ib.value = j.ibge;
      atualizar(root);
    }).catch(function(){ if (avisar) avisar('Não foi possível consultar o CEP agora. Preencha o endereço à mão.'); });
  }
  function buscarCnpj(root, avisar){
    var el = root.querySelector('[data-fk="cnpj"]'), d = dig(el && el.value);
    if (d.length !== 14 || !docValido(d)) { if (avisar) avisar('Informe um CNPJ válido (14 dígitos) para buscar.'); return; }
    var b = root.querySelector('[data-ff-cnpj]'); if (b) { b.disabled = true; b.textContent = 'Buscando…'; }
    getJSON('https://brasilapi.com.br/api/cnpj/v1/' + d).then(function(j){
      var cnae = j.cnae_fiscal ? String(j.cnae_fiscal).padStart(7, '0').replace(/^(\d{4})(\d)(\d{2})$/, '$1-$2/$3') : null;
      var log = [j.descricao_tipo_de_logradouro, j.logradouro].filter(Boolean).join(' ');
      var rf = j.opcao_pelo_mei ? 'mei' : j.opcao_pelo_simples ? 'simples' : null;
      var n = preencherVazios(root, {
        nome: j.razao_social, nome_fantasia: j.nome_fantasia, cnae_principal: cnae, cep: j.cep, logradouro: log,
        numero: j.numero, complemento: j.complemento, bairro: j.bairro, cidade: j.municipio, uf: j.uf,
        municipio_ibge: j.codigo_municipio_ibge ? String(j.codigo_municipio_ibge) : null,
        email: j.email ? String(j.email).toLowerCase() : null, regime_federal: rf
      });
      atualizar(root);
      if (avisar) avisar(n ? 'Dados da Receita preenchidos nos campos que estavam vazios (' + n + '). Confira.' :
        'Os campos já estavam preenchidos; nada foi alterado.' + (rf ? '' : ' A Receita não aponta opção pelo Simples/MEI.'));
      if (!root.querySelector('[data-fk="municipio_ibge"]').value) buscarCep(root, avisar);
    }).catch(function(){ if (avisar) avisar('Não foi possível consultar o CNPJ agora. Preencha os campos à mão.'); })
      .then(function(){ if (b) { b.disabled = false; b.textContent = 'Buscar dados'; } });
  }
  function atualizar(root){
    var f = ler(root);
    CAMPOS.forEach(function(c){
      if (!c.quando) return;
      var w = root.querySelector('[data-ffw="' + c.k + '"]'); if (w) w.style.display = visivel(c, f) ? '' : 'none';
    });
    var av = root.querySelector('[data-ff-avisos]');
    if (av) av.innerHTML = avisos(f).map(function(a){ return '<div>⚠ ' + h(a) + '</div>'; }).join('');
  }
  /* liga máscaras, campos condicionais, busca de CNPJ/CEP. avisar(msg) mostra mensagens. */
  function ligar(root, avisar){
    avisar = avisar || function(m){ alert(m); };
    Array.prototype.forEach.call(root.querySelectorAll('[data-fk]'), function(el){
      var c = campo(el.getAttribute('data-fk'));
      el.addEventListener(el.tagName === 'SELECT' || el.type === 'checkbox' ? 'change' : 'input', function(){ el.classList.remove('ff-falta'); atualizar(root); });
      if (c && (c.mask === 'doc' || c.mask === 'cep' || c.mask === 'fone')) el.addEventListener('blur', function(){
        if (c.mask === 'doc') el.value = fmtDoc(dig(el.value) || el.value);
        if (c.mask === 'cep') { el.value = fmtCep(el.value); buscarCep(root, avisar); }
        if (c.mask === 'fone') el.value = fmtFone(normFone(el.value));
      });
    });
    var b = root.querySelector('[data-ff-cnpj]'); if (b) b.addEventListener('click', function(){ buscarCnpj(root, avisar); });
    atualizar(root);
  }

  /* ---------- impressão (ficha preenchida ou em branco) ---------- */
  function impressaoHtml(f, opts){
    f = f || {}; opts = opts || {};
    var branco = !f.nome;
    var linhaCampo = function(c){
      if (c.tipo === 'chk') return '<div class="pc full decl">' + (f[c.k] ? '☒' : '☐') + ' ' + h(c.t) + '</div>';
      if (c.tipo === 'select' && (branco || !f[c.k]) && c.k !== 'uf')
        return '<div class="pc full"><b>' + h(c.t) + '</b><div class="ops">' + OP[c.k].map(function(o){ return '<span>☐ ' + h(o[1]) + '</span>'; }).join('') + '</div></div>';
      var v = c.tipo === 'select' ? rotulo(c.k, f[c.k]) : valor(c, f);
      return '<div class="pc' + (c.full || c.tipo === 'area' ? ' full' : '') + '"><b>' + h(c.t) + '</b><div class="v' + (c.tipo === 'area' ? ' area' : '') + '">' + h(v || '') + '</div></div>';
    };
    var corpo = SECOES.map(function(s){
      return '<section><h2>' + h(s.titulo) + '</h2>' + (s.nota ? '<p class="nota">' + h(s.nota) + '</p>' : '') +
        '<div class="g">' + s.campos.filter(function(c){ return branco || visivel(c, f); }).map(linhaCampo).join('') + '</div></section>';
    }).join('');
    var quando = f.ficha_atualizada_em ? new Date(f.ficha_atualizada_em).toLocaleString('pt-BR') : '';
    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Ficha cadastral — ' + h(f.nome || 'fornecedor') + '</title><style>' +
      '*{box-sizing:border-box}body{font:11.5px/1.35 Arial,Helvetica,sans-serif;color:#111;margin:18px}' +
      'header{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #111;padding-bottom:6px;margin-bottom:10px}' +
      'h1{font-size:17px;margin:0}header small{color:#555}h2{font-size:12.5px;background:#eee;padding:4px 6px;margin:12px 0 6px;border-left:4px solid #A86200}' +
      '.g{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px}.pc b{display:block;font-size:10px;color:#444;font-weight:600;text-transform:uppercase;letter-spacing:.02em}' +
      '.pc .v{border-bottom:1px solid #999;min-height:18px;padding:2px 0}.pc .v.area{min-height:44px}.full{grid-column:1/-1}' +
      '.ops{display:flex;flex-wrap:wrap;gap:2px 14px;padding-top:2px}.nota{color:#444;font-size:10.5px;margin:0 0 6px}.decl{margin-top:4px}' +
      '.ass{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:38px}.ass div{border-top:1px solid #111;padding-top:4px;text-align:center;font-size:10.5px}' +
      'section{break-inside:avoid}@page{margin:12mm}@media print{body{margin:0}}</style></head><body>' +
      '<header><div><h1>Ficha cadastral de fornecedor</h1><small>Informações cadastrais e tributárias — IBS e CBS (LC 214/2025)</small></div>' +
      '<small>' + (opts.empresa ? h(opts.empresa) + '<br>' : '') + (quando ? 'Atualizada em ' + h(quando) : 'Data: ____/____/______') + '</small></header>' +
      corpo + '<div class="ass"><div>Local e data</div><div>Assinatura e carimbo do fornecedor</div></div>' +
      '<script>window.onload=function(){setTimeout(function(){window.print()},200)}<\/script></body></html>';
  }
  function imprimir(f, opts){
    var w = window.open('', '_blank');
    if (!w) { alert('O navegador bloqueou a janela de impressão. Libere pop-ups para este site.'); return; }
    w.document.open(); w.document.write(impressaoHtml(f, opts)); w.document.close();
  }

  /* estilos padrão dos campos (cada página pode sobrepor) */
  var CSS = '.ff-sec{border:1px solid var(--ff-line,rgba(127,127,127,.3));border-radius:10px;padding:10px 12px 12px;margin:0 0 12px}' +
    '.ff-sec legend{font-weight:700;padding:0 6px}.ff-nota{font-size:12.5px;opacity:.8;margin:2px 0 10px;line-height:1.45}' +
    '.ff-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.ff-full{grid-column:1/-1}' +
    '.ff-campo{display:flex;flex-direction:column;gap:4px;font-size:12.5px}.ff-campo>span:first-child{opacity:.85}' +
    '.ff-campo input,.ff-campo select,.ff-campo textarea{width:100%}' +
    '.ff-chk{flex-direction:row;align-items:flex-start;gap:10px;line-height:1.4}.ff-chk input{flex:0 0 auto;margin-top:2px}' +
    '.ff-linha{display:flex;gap:6px}.ff-linha input{flex:1;min-width:0}.ff-btn{white-space:nowrap;cursor:pointer}' +
    '.ff-dica{font-size:11.5px;opacity:.65}.ff-req{color:#D04040;font-weight:700}' +
    '.ff-falta{outline:2px solid #D04040 !important;border-color:#D04040 !important}' +
    '.ff-avisos:empty{display:none}.ff-avisos{margin-top:10px;font-size:12.5px;border:1px solid #D9A000;border-radius:8px;padding:8px 10px;line-height:1.45}' +
    '@media (max-width:560px){.ff-grid{grid-template-columns:1fr}}';
  function instalarCss(){
    if (document.getElementById('ff-css')) return;
    var st = document.createElement('style'); st.id = 'ff-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  window.FICHA_FORN = {
    SECOES: SECOES, CAMPOS: CAMPOS, OP: OP, rotulo: rotulo,
    formHtml: formHtml, ligar: ligar, ler: ler, marcar: marcar,
    problemas: problemas, avisos: avisos, status: status, regimeCotacao: regimeCotacao,
    imprimir: imprimir, impressaoHtml: impressaoHtml, instalarCss: instalarCss,
    fmtDoc: fmtDoc, fmtFone: fmtFone, normFone: normFone, docValido: docValido
  };
})();
