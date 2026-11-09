/* SISMED 2.6.0 */
/* o sistema não deve ser aberto dentro de outra página (proteção contra cliques induzidos) */
if(window.top!==window.self){try{window.top.location=window.self.location}catch(e){}document.documentElement.style.display='none'}

/* =================== CONSTANTS =================== */
const KEY='refeicoes_app_v3', THEME_KEY='refeicoes_theme';
const TIPOS=[
  {id:'cafe',nome:'1. Café',curto:'Café'},
  {id:'almoco',nome:'2. Almoço',curto:'Almoço'},
  {id:'jantar',nome:'3. Jantar',curto:'Jantar'},
  {id:'lanche',nome:'4. Lanche',curto:'Lanche'},
];
const PERMS=[
  {grp:'Restaurante'},
  {id:'rest.registrar',nome:'Registrar refeições (scanner)'},
  {id:'rest.sobras',nome:'Registrar sobras de refeições'},
  {id:'rest.estornar',nome:'Estornar registro do dia'},
  {id:'rest.data_manual',nome:'Registrar refeição com data manual (retroativa)'},
  {id:'rest.validar',nome:'Validar BM (assinatura eletrônica do restaurante)'},
  {grp:'Administrativo'},
  {id:'sup.ver',nome:'Visualizar registros e resumos'},
  {id:'sup.bm',nome:'Emitir, fechar, imprimir e assinar BM'},
  {id:'sup.nf',nome:'Informar nota fiscal e anexar BM assinado'},
  {id:'sup.fechar',nome:'Fechar refeição sem incluir em BM (com justificativa)'},
  {id:'fotos.ver',nome:'Ver fotos do rosto nos registros'},
  {grp:'Analítico'},
  {id:'ana.ver',nome:'Visualizar a aba Analítico (gráficos)'},
  {grp:'Auditoria'},
  {id:'aud.ver',nome:'Visualizar a trilha de auditoria'},
  {id:'fotos.baixar',nome:'Baixar arquivos compactados de fotos'},
  {grp:'Exclusões'},
  {id:'del.bm',nome:'Excluir boletim de medição (o último de cada empresa)'},
  {id:'del.sobras',nome:'Excluir sobras informadas'},
  {id:'del.empresas',nome:'Excluir empresas'},
  {id:'del.obras',nome:'Excluir obras'},
  {grp:'Configurações'},
  {id:'cfg.contratos',nome:'Cadastrar contratos (obras e preços por contrato)'},
  {id:'cfg.usuarios',nome:'Cadastrar usuários e permissões'},
  {id:'cfg.colab',nome:'Cadastrar colaboradores'},
  {id:'cfg.empresas',nome:'Cadastrar empresas e logotipos'},
  {id:'cfg.obras',nome:'Cadastrar obras'},
  {id:'cfg.precos',nome:'Alterar preços'},
  {id:'cfg.contratada',nome:'Cadastrar contratadas (restaurantes)'},
  {id:'cfg.horarios',nome:'Definir horário limite de registro das refeições'},
  {grp:'Privacidade (LGPD)'},
  {id:'lgpd.gerir',nome:'Gerir a privacidade: encarregado, prazos de guarda e relatório de dados do titular'},
];
const PERFIS={
  Administrador:PERMS.filter(p=>p.id).map(p=>p.id),
  Restaurante:['rest.registrar','rest.sobras','rest.estornar','rest.validar','del.sobras'],
  Suprimentos:['sup.ver','sup.bm','sup.nf','ana.ver','cfg.colab','cfg.empresas','cfg.obras','cfg.contratos','cfg.precos'],
  Personalizado:[]
};
let S=null, USER=null;

/* =================== HELPERS =================== */
function pad(n){return String(n).padStart(2,'0')}
function ymd(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function parse(s){const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)}
/* formatação: só devolvem o que montam — nunca repassam texto recebido (v2.5) */
function br(s){const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(typeof s==='string'?s:'');return m?`${m[3]}/${m[2]}/${m[1]}`:''}
function brdt(iso){const d=new Date(iso);if(isNaN(d))return '—';return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`}
function hm(iso){const d=new Date(iso);if(isNaN(d))return '—';return `${pad(d.getHours())}:${pad(d.getMinutes())}`}
function nOk(v,d){v=typeof v==='number'?v:(typeof v==='string'&&v.trim()!==''?Number(v):NaN);return isFinite(v)?v:(d===undefined?0:d)}
function money(v){return nOk(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function num(v){return nOk(v).toLocaleString('pt-BR')}
function addDays(s,n){const d=parse(s);d.setDate(d.getDate()+n);return ymd(d)}
function mondayOf(s){const d=parse(s);const w=(d.getDay()+6)%7;d.setDate(d.getDate()-w);return ymd(d)}
function today(){return ymd(new Date())}
function uid(){return Math.random().toString(36).slice(2,9)}
const WD=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
function wd(s){return WD[parse(s).getDay()]}
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function ini(n){const w=String(n||'?').replace(/[^\p{L}\p{N}\s.]/gu,' ').split(/[\s.]+/).filter(Boolean);return (w.slice(0,2).map(x=>x[0]).join('')||'?').toUpperCase()}
const $=id=>document.getElementById(id);
const TIPO_X={id:'invalido',nome:'(tipo inválido)',curto:'?'};
function tipo(id){return TIPOS.find(t=>t.id===id)||TIPO_X}
function tipoOk(id){return TIPOS.some(t=>t.id===id)}
function emp(id){return S.empresas.find(e=>e.id===id)}
function obra(id){return S.obras.find(o=>o.id===id)}
function can(p){return !!(USER&&(USER.perms.includes(p)||(p==='lgpd.gerir'&&isAdm(USER))))}
function isAdm(u){return !!u&&(u.tipo==='Adm'||u.perfil==='Administrador')}
function perfisQuePosso(){const todos=S.perfis||[];if(isAdm(USER))return todos;return todos.filter(p=>p.tipo!=='Adm'&&(p.perms||[]).every(x=>USER.perms.includes(x)))}
function ativoOk(u){return u&&u.ativo!==false&&u.status!=='pendente'}
function senhaOk(p){return typeof p==='string'&&p.length>=8&&/\d/.test(p)&&/[A-Za-zÀ-ÿ]/.test(p)}
const SENHA_REGRA='no mínimo 8 caracteres, com letras e números';
const TIPOS_PERFIL=['Adm','Suprimentos','Obra','Restaurante'];
function obraOk(obraId){if(!USER||!USER.obras||!USER.obras.length)return true;return USER.obras.includes(obraId)}
function obraNomeOk(nome){if(!USER||!USER.obras||!USER.obras.length)return true;const o=S.obras.find(x=>x.nome===nome);return !!o&&USER.obras.includes(o.id)}
function regOkObra(r){if(!USER||!USER.obras||!USER.obras.length)return true;return r.obraId?USER.obras.includes(r.obraId):obraNomeOk(r.obraNome)}
/* ---- obra ↔ empresa (v2.3): cada obra pertence a uma única empresa ---- */
function obrasDaEmpresa(empId,todas){return S.obras.filter(o=>o.empresaId&&o.empresaId===empId&&(todas||o.ativo!==false)&&obraOk(o.id))}
function obraEmpErro(empId,obraId){const o=obra(obraId);if(!o)return null;
  if(!o.empresaId)return `A obra ${o.nome} ainda não tem empresa definida (Configurações › Obras).`;
  if(empId&&o.empresaId!==empId){const e=emp(o.empresaId),e2=emp(empId);return `A obra ${o.nome} pertence à empresa ${e?e.nome:'—'} e não pode ser usada por ${e2?e2.nome:'outra empresa'}.`}
  return null}
function usoObra(obraId){const m=new Map();const add=(e,k)=>{if(!e)return;const a=m.get(e)||{colab:0,regs:0,sobras:0,bms:0};a[k]++;m.set(e,a)};
  S.colab.forEach(c=>{if(c.obraId===obraId)add(c.empresaId,'colab')});S.registros.forEach(r=>{if(r.obraId===obraId)add(r.empresaId,'regs')});
  (S.sobras||[]).forEach(s=>{if(s.obraId===obraId)add(s.empresaId,'sobras')});S.bms.forEach(b=>{if(b.obraId===obraId)add(b.empresaId,'bms')});return m}
function usoTxt(u){return [u.colab&&`${u.colab} colaborador(es)`,u.regs&&`${u.regs} registro(s)`,u.sobras&&`${u.sobras} sobra(s)`,u.bms&&`${u.bms} BM(s)`].filter(Boolean).join(', ')}
function divergencias(){
  const semEmp=S.obras.filter(o=>!o.empresaId&&obraOk(o.id));
  const colab=S.colab.filter(c=>c.ativo!==false&&c.obraId&&obraOk(c.obraId)&&(obra(c.obraId)||{}).empresaId&&obra(c.obraId).empresaId!==c.empresaId);
  return {semEmp,colab}}
/* ---- contratadas (restaurantes) ---- */
function ct(id){return (S.contratadas||[]).find(c=>c.id===id)}
function ctDefault(){const l=S.contratadas||[];return (l.find(c=>c.id==='ct-legacy')||l[0]||{}).id||null}
function ctOf(x){return (x&&x.contratadaId)||ctDefault()}
function ctOk(id){if(!USER||!USER.contratadas||!USER.contratadas.length)return true;return !id||USER.contratadas.includes(id)}
function ctsAcessiveis(){return (S.contratadas||[]).filter(c=>c.ativo!==false&&ctOk(c.id))}
function regOk(r){return regOkObra(r)&&ctOk(ctOf(r))}
function ctMigrarLegado(){
  if((S.contratadas||[]).length||!S.contratada||!S.contratada.nome||!can('cfg.contratada'))return;
  const K=S.contratada;S.contratadas.push({id:'ct-legacy',nome:K.nome,cnpj:K.cnpj||'',gestor:K.gestor||'',cargo:K.cargo||'',servico:K.servico||'FORNECIMENTO DE REFEIÇÕES',obras:S.obras.map(o=>o.id),ativo:true});
  save();
}
/* ---- balões de mensagem: sucesso (verde ✅), atenção, erro, aviso — todos com X ---- */
const BAL={ok:['✅','Sucesso',6000],warn:['⚠️','Atenção',7000],bad:['❌','Não concluído',0],info:['ℹ️','Aviso',5000]};
function balao(tipo,m){
  const box=$('toasts');if(!box)return;const [ic,tit,ms]=BAL[tipo]||BAL.info;
  const el=document.createElement('div');el.className='tmsg '+tipo;el.setAttribute('role',tipo==='bad'||tipo==='warn'?'alert':'status');
  el.innerHTML=`<span class="ic" aria-hidden="true">${ic}</span><div class="tx"><b>${tit}</b><span></span></div><button type="button" class="xbtn" aria-label="Fechar">×</button>`;
  el.querySelector('.tx span').textContent=m;
  const close=()=>{if(el._c)return;el._c=1;el.classList.add('out');setTimeout(()=>el.remove(),200)};
  el.querySelector('.xbtn').onclick=close;
  box.prepend(el);while(box.children.length>4)box.lastElementChild.remove();
  if(ms){let t=setTimeout(close,ms);el.onmouseenter=()=>clearTimeout(t);el.onmouseleave=()=>{t=setTimeout(close,2500)}}
  return el;
}
function toast(m,tipo){
  tipo=tipo||(/^(Erro|Falha|Não foi possível|Alteração recusada)/.test(m)?'bad':/(…)$|^QR Code lido|^Logotipo carregada|criado — complete|cancelad/.test(m)?'info':'warn');
  return balao(tipo,m);
}
function sucesso(m){return balao('ok',m)}
/* grava e só mostra "Sucesso" depois que o servidor confirmar */
function concluir(msg){
  return save().then(()=>{sucesso(msg);return true},e=>{const m=(e&&e.message)||String(e||'');
    if(/row-level security|permission|policy|42501|violates|JWT|not allowed|denied|Regra obra-empresa|Dados inválidos/i.test(m))toast(`O servidor recusou a gravação — “${msg}” não foi concluído. Verifique suas permissões. (${m.slice(0,90)})`,'bad');
    else toast(`Sem conexão com o servidor: “${msg}” ficou guardado neste aparelho e será enviado automaticamente quando a internet voltar.`,'warn');
    return false});
}
/* ---- avisos (.notice) com X; os avisos fixos (data-hint) ficam fechados neste aparelho ---- */
const HINTS_KEY='sismed_avisos_fechados';
function hintsOff(){try{return JSON.parse(localStorage.getItem(HINTS_KEY))||[]}catch(e){return []}}
function addX(el){if([...el.children].some(c=>c.classList.contains('xbtn')))return;const x=document.createElement('button');x.type='button';x.className='xbtn';x.setAttribute('aria-label','Fechar aviso');x.textContent='×';
  x.onclick=ev=>{ev.stopPropagation();el.hidden=true;const h=el.dataset.hint;if(h){const l=hintsOff();if(!l.includes(h)){l.push(h);try{localStorage.setItem(HINTS_KEY,JSON.stringify(l))}catch(e){}}}};el.appendChild(x)}
function prepNotices(root){const l=[];if(root.classList&&root.classList.contains('notice'))l.push(root);if(root.querySelectorAll)l.push(...root.querySelectorAll('.notice'));
  const off=l.some(e=>e.dataset.hint)?hintsOff():[];l.forEach(el=>{if(el.dataset.hint&&off.includes(el.dataset.hint)){el.hidden=true;return}addX(el)})}
function mostrarAvisos(){try{localStorage.removeItem(HINTS_KEY)}catch(e){}document.querySelectorAll('[data-hint]').forEach(el=>{el.hidden=false;addX(el)})}
prepNotices(document.body);
new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(n=>{if(n.nodeType===1&&!n.classList.contains('xbtn'))prepNotices(n)});const t=m.target;if(t&&t.nodeType===1&&t.classList.contains('notice'))addX(t)})).observe(document.body,{childList:true,subtree:true});
/* preço: primeiro o do contrato da obra; se o contrato não tiver preço próprio, usa a tabela geral */
function precoLista(tipoId,data,cid){return S.precos.filter(p=>p.tipo===tipoId&&p.vigencia<=data&&(p.contratoId||'')===(cid||'')).sort((a,b)=>a.vigencia<b.vigencia?1:a.vigencia>b.vigencia?-1:(a.criadoEm<b.criadoEm?1:-1))}
function precoVigente(tipoId,data,cid){
  if(cid){const l=precoLista(tipoId,data,cid);if(l[0])return l[0].valor}
  const g=precoLista(tipoId,data,'');return g[0]?g[0].valor:null;
}
function contrato(id){return (S.contratos||[]).find(c=>c.id===id)}
function cidOf(obraId){const o=obra(obraId);return o&&o.contratoId||''}
function contratoStatus(c,d){d=d||today();if(!c)return null;if(c.ativo===false)return 'inativo';if(c.fim&&c.fim<d)return 'encerrado';if(c.inicio&&c.inicio>d)return 'a iniciar';return 'vigente'}
function contratoErro(obraId,d){const c=contrato(cidOf(obraId));if(!c)return null;const st=contratoStatus(c,d);if(st==='vigente')return null;
  return `Contrato ${esc(c.numero)} da obra ${(obra(obraId)||{}).nome||''} está ${st}${st==='encerrado'?' desde '+br(c.fim):st==='a iniciar'?' (início '+br(c.inicio)+')':''} — refeição não registrada.`}
function fillSelect(sel,items,val,allLabel){sel.innerHTML=(allLabel!==undefined?`<option value="">${allLabel}</option>`:'')+items.map(i=>`<option value="${esc(i.id)}"${i.id===val?' selected':''}>${esc(i.nome)}</option>`).join('')}

/* =================== AUDITORIA (núcleo) =================== */
const ABAS=Object.assign(Object.create(null),{login:'Login',rest:'Restaurante',sup:'Administrativo',ana:'Analítico',aud:'Auditoria',cfg:'Configurações'});
const ACOES=Object.assign(Object.create(null),{
  'lgpd.ciencia':'Declarou ciência da Política de Privacidade','lgpd.relatorio':'Gerou relatório de dados de titular (LGPD)','lgpd.config':'Alterou dados de privacidade (LGPD)','lgpd.aviso':'Baixou o aviso de privacidade',
  'login.ok':'Login','login.falha':'Tentativa de login inválida','logout':'Logout','nav':'Acessou aba','nav.cfg':'Acessou seção de configurações',
  'refeicao.registrar':'Registrou refeição','refeicao.corrigir_obra':'Corrigiu a obra da refeição','refeicao.fechar':'Fechou refeição sem BM','refeicao.reabrir':'Reabriu refeição fechada sem BM','refeicao.estornar':'Estornou refeição','sobra.registrar':'Registrou sobra','bm.compartilhar':'Compartilhou PDF do BM','sobra.excluir':'Excluiu sobra',
  'bm.emitir':'Gerou rascunho de BM','bm.fechar':'Fechou BM','bm.validar':'Validou BM (assinatura eletrônica do restaurante)','bm.homologar':'Homologou assinatura física do restaurante','bm.assinar_sup':'Registrou assinatura do Gestor / Engenheiro','bm.nf':'Informou nota fiscal','bm.pdf':'Exportou BM em PDF','bm.imprimir':'Imprimiu BM','bm.anexar':'Anexou BM assinado','bm.anexo_remover':'Removeu anexo do BM','bm.anexo_baixar':'Baixou anexo do BM',
  'usuario.salvar':'Cadastrou/alterou usuário','colab.salvar':'Cadastrou/alterou colaborador','colab.realocar':'Realocou colaborador (empresa/obra)','empresa.salvar':'Cadastrou/alterou empresa','obra.salvar':'Cadastrou/alterou obra','preco.salvar':'Cadastrou/alterou preço','contrato.salvar':'Cadastrou/alterou contrato',
  'contratada.salvar':'Cadastrou/alterou contratada (restaurante)','usuario.senha':'Redefiniu senha de usuário','auditoria.csv':'Exportou auditoria em CSV','dados.apagar':'Apagou todos os dados','perfil.salvar':'Cadastrou/alterou perfil','perfil.excluir':'Excluiu perfil','usuario.excluir':'Excluiu usuário','usuario.aprovar':'Aprovou conta','usuario.negar':'Negou conta','bm.excluir':'Excluiu boletim de medição','empresa.excluir':'Excluiu empresa','obra.excluir':'Excluiu obra','auditoria.arquivo':'Baixou arquivo compactado da auditoria','foto.ver':'Visualizou foto do registro','horarios.salvar':'Alterou horário limite de registro','fotos.baixar':'Baixou arquivos compactados de fotos','fotos.compactar':'Compactou fotos (rotina do servidor)'
});
let DEVICE='';try{DEVICE=localStorage.getItem('refeicoes_device')||'';if(!DEVICE){DEVICE='DEV-'+Math.random().toString(36).slice(2,8).toUpperCase();localStorage.setItem('refeicoes_device',DEVICE)}}catch(e){DEVICE='DEV-?'}
function audit(acao,descricao,x){
  x=x||{};const e={id:uid(),em:new Date().toISOString(),usuarioId:USER?USER.id:null,usuario:x.usuario||(USER?USER.nome:'—'),perfil:USER?USER.perfil:'',
    acao,descricao:descricao||'',aba:x.aba||PAGE||'login',obra:x.obra||'',empresa:x.empresa||'',entidade:x.entidade||'',antes:x.antes===undefined?null:x.antes,depois:x.depois===undefined?null:x.depois,
    dispositivo:DEVICE,ip:null,navegador:(navigator.userAgent||'').slice(0,80)};
  S.audit.push(e);if(S.audit.length>5000)S.audit.splice(0,S.audit.length-5000);
}

/* =================== SUPABASE: conexão e sincronização =================== */
const CFG=window.APP_CONFIG||{};
if(!CFG.SUPABASE_URL||!CFG.SUPABASE_ANON_KEY){document.addEventListener('DOMContentLoaded',()=>{const e=document.getElementById('l-status');if(e){e.textContent='config.js não encontrado ou incompleto (SUPABASE_URL / SUPABASE_ANON_KEY).';e.style.color='var(--bad)'}})}
const sb=window.supabase.createClient(CFG.SUPABASE_URL||'https://invalid.supabase.co',CFG.SUPABASE_ANON_KEY||'x',{auth:{persistSession:true,autoRefreshToken:true}});
const EMAIL_DOMAIN=CFG.EMAIL_DOMAIN||'refeicoes.app';
function toEmail(login){login=(login||'').trim().toLowerCase();return login.includes('@')?login:login.replace(/[^a-z0-9._-]/g,'')+'@'+EMAIL_DOMAIN}
const TABLES={perfis:'perfis',empresas:'empresas',obras:'obras',colab:'colaboradores',precos:'precos',contratos:'contratos',contratadas:'contratadas',registros:'registros',sobras:'sobras',bms:'bms',users:'usuarios'};
const CACHE_KEY='refeicoes_cache_v1',CACHE_UID='refeicoes_cache_uid';
let LAST={}, AUDIT_SEEN=new Set(), SYNC={pending:false,running:false,offline:false,timer:null,retry:null,gen:0,again:null};
function fresh(){return {perfis:[],auditArq:[],users:[],empresas:[],obras:[],colab:[],precos:[],contratos:[],contratadas:[],registros:[],sobras:[],bms:[],audit:[],contratada:{nome:'',cnpj:'',gestor:'',cargo:'',servico:'FORNECIMENTO DE REFEIÇÕES'},horarios:null,lgpd:null}}
function rowOf(key,r){const o={...r};delete o.senha;if(key==='users')delete o.id;return o}
function snapshot(){LAST={};Object.keys(TABLES).forEach(k=>{LAST[k]={};(S[k]||[]).forEach(r=>LAST[k][r.id]=JSON.stringify(rowOf(k,r)))});LAST.contratada=JSON.stringify(S.contratada);LAST.horarios=JSON.stringify(S.horarios||null);LAST.lgpd=JSON.stringify(S.lgpd||null);AUDIT_SEEN=new Set((S.audit||[]).map(e=>e.id))}
let SYNCST={c:'sync',t:'Sincronizado'};
function applySync(){document.querySelectorAll('[data-sync]').forEach(d=>{d.className=SYNCST.c;d.title=SYNCST.t;d.setAttribute('aria-label','Conexão: '+SYNCST.t)})}
function setSync(state,msg){SYNCST={c:'sync'+(state==='pend'?' pend':state==='off'?' off':''),t:msg||(state==='pend'?'Enviando alterações…':state==='off'?'Sem conexão — alterações guardadas neste aparelho e enviadas quando voltar':'Sincronizado')};applySync()}
/* =================== DADOS VINDOS DO SERVIDOR (v2.5) ===================
   Quem tem acesso à API consegue gravar qualquer JSON nas linhas que a permissão dele alcança. Antes de usar:
   - textos livres (nomes, descrições, justificativas…) ficam como vieram e SEMPRE vão para a tela com esc();
   - todo o resto (códigos, datas, tipos, números gravados como texto, nomes de campos) perde < > " ' ` ;
   - linhas sem o mínimo para funcionar (tipo de refeição inválido, data fora do formato…) são ignoradas. */
const TXT_LIVRE=new Set(['nome','descricao','texto','just','justificativa','motivo','obs','terceirizada','semFoto','usuario','por','cargo','gestor','gestorCargo','servico','endereco','antes','depois','entidade','obra','empresa','empresaNome','obraNome','contratadaNome','colabNome','deEmpresa','deObra','paraEmpresa','paraObra','navegador','user_agent','perfil','fechadoPor','o','de','email','csv','qr','login','controlador','encarregado','telefone','guardaRegistros','guardaAuditoria']);
const RX_ID=/^[\w.:#@-]{1,80}$/,RX_DATA=/^\d{4}-\d{2}-\d{2}$/,RX_HM=/^([01]\d|2[0-3]):[0-5]\d$/,RX_LOGO=/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+\/=]+$/;
/* campos que o app sempre trata como texto: se vier outra coisa (objeto, lista, verdadeiro/falso, nulo), vira texto vazio */
const SO_TEXTO=new Set([...TXT_LIVRE].filter(k=>k!=='antes'&&k!=='depois').concat(['acao','aba','login','qr','cnpj','status','nf','dispositivo','ip','tipo','data','ini','fim','d','vigencia','inicio','registradoEm','em','emitidoEm','fechadoEm','criadoEm','created_at','contratoNumero','empresaCnpj','contratadaCnpj','modalidade','p','name','type','item']));
function dataOk(x){if(typeof x!=='string'||!RX_DATA.test(x))return false;const [y,m,d]=x.split('-').map(Number);if(y<2000||y>2100)return false;const t=new Date(y,m-1,d);return t.getFullYear()===y&&t.getMonth()===m-1&&t.getDate()===d}
function diasEntre(a,b){return Math.round((parse(b)-parse(a))/864e5)}
function limpaAud(e){e=limpa(e,'');if(!e||typeof e!=='object')return null;if(typeof e.acao!=='string'||!/^[\w.]{1,40}$/.test(e.acao))e.acao='invalida';if(typeof e.aba!=='string'||!/^[a-z]{0,12}$/.test(e.aba))e.aba='';if(isNaN(new Date(e.em)))e.em=new Date(0).toISOString();return e}
let DESCARTADAS=0;
function limpaTxt(x){return x.replace(/[<>"'`]/g,'')}
function limpa(v,k,nivel){
  if(typeof v==='string')return TXT_LIVRE.has(k)?(v.length>4000?v.slice(0,4000):v):limpaTxt(v);
  if(v===null||typeof v!=='object')return v;
  if((nivel||0)>12)return null;
  if(Array.isArray(v))return v.map(x=>limpa(x,k,(nivel||0)+1));
  const o={};Object.keys(v).forEach(kk=>{const k2=limpaTxt(kk).slice(0,80);if(!k2||k2==='__proto__'||k2==='constructor'||k2==='prototype')return;let x=limpa(v[kk],k2,(nivel||0)+1);kk=k2;
    if(SO_TEXTO.has(kk)&&typeof x!=='string'&&x!==undefined)x=typeof x==='number'&&isFinite(x)?String(x):'';
    else if((kk==='antes'||kk==='depois')&&x!==null&&typeof x==='object')x=JSON.stringify(x).slice(0,2000);
    o[kk]=x});return o}
function lst(v){return Array.isArray(v)?v.filter(x=>typeof x==='string'):[]}
function txt(v){return typeof v==='string'?v:(v==null?'':String(v))}
function logoOk(v){return typeof v==='string'&&RX_LOGO.test(v)?v:''}
const VALIDA={
  registros:r=>{if(!tipoOk(r.tipo)||!dataOk(r.data)||isNaN(new Date(r.registradoEm)))return null;r.valor=nOk(r.valor);r.nome=txt(r.nome);r.usuario=txt(r.usuario);r.empresaNome=txt(r.empresaNome);r.obraNome=txt(r.obraNome);
    if(r.modalidade!==undefined&&!['presencial','retirada','terceirizado'].includes(r.modalidade))delete r.modalidade;
    if(r.retiradoPor!==undefined){if(!r.retiradoPor||typeof r.retiradoPor!=='object'||Array.isArray(r.retiradoPor))delete r.retiradoPor;else r.retiradoPor.nome=txt(r.retiradoPor.nome)}
    if(r.foto!==undefined&&!(r.foto&&typeof r.foto==='object'&&/^\d{4}-\d{2}-\d{2}\/[\w-]{1,40}\.(webp|jpg)$/.test(r.foto.p||'')))delete r.foto;
    if(r.semFoto!==undefined)r.semFoto=txt(r.semFoto);if(r.terceirizada!==undefined)r.terceirizada=txt(r.terceirizada);
    if(r.fechado!==undefined&&!(r.fechado&&typeof r.fechado==='object'))delete r.fechado;else if(r.fechado){r.fechado.por=txt(r.fechado.por);r.fechado.motivo=txt(r.fechado.motivo)}
    return r},
  sobras:x=>{if(!tipoOk(x.tipo)||!dataOk(x.data))return null;x.qtd=Math.max(0,Math.min(2000,Math.round(nOk(x.qtd))));if(x.valorUnit!=null)x.valorUnit=nOk(x.valorUnit);if(x.valor!=null)x.valor=nOk(x.valor);x.colabNome=txt(x.colabNome);x.usuario=txt(x.usuario);x.empresaNome=txt(x.empresaNome);x.obraNome=txt(x.obraNome);if(isNaN(new Date(x.registradoEm)))x.registradoEm=x.data+'T12:00:00.000Z';return x},
  precos:p=>{if(!tipoOk(p.tipo)||!dataOk(p.vigencia))return null;p.valor=nOk(p.valor);p.just=txt(p.just);p.usuario=txt(p.usuario);return p},
  users:u=>{u.perms=lst(u.perms);u.obras=lst(u.obras);u.contratadas=lst(u.contratadas);u.nome=txt(u.nome);u.login=txt(u.login);u.perfil=txt(u.perfil);return u},
  perfis:p=>{p.perms=lst(p.perms);p.nome=txt(p.nome);p.tipo=txt(p.tipo);return p},
  colab:c=>{c.nome=txt(c.nome);c.qr=txt(c.qr);if(c.realocacoes!==undefined&&!Array.isArray(c.realocacoes))c.realocacoes=[];else if(c.realocacoes)c.realocacoes=c.realocacoes.filter(x=>x&&typeof x==='object');return c},
  contratadas:c=>{c.nome=txt(c.nome);c.obras=lst(c.obras);return c},
  empresas:e=>{e.nome=txt(e.nome);if(e.logo!==undefined&&!logoOk(e.logo)){delete e.logo;delete e.logoW;delete e.logoH}else if(e.logo){e.logoW=nOk(e.logoW,4);e.logoH=nOk(e.logoH,1)}
    if(e.proximoBM!=null)e.proximoBM=Math.max(1,Math.round(nOk(e.proximoBM,1)));
    if(e.contrato!==undefined){if(!e.contrato||typeof e.contrato!=='object'||Array.isArray(e.contrato))delete e.contrato;else Object.keys(e.contrato).forEach(k=>{const c=e.contrato[k];if(!tipoOk(k)||!c||typeof c!=='object'){delete e.contrato[k];return}['qtd','acumQtd','acumVal'].forEach(f=>{if(c[f]!=null&&c[f]!=='')c[f]=nOk(c[f])})})}
    return e},
  obras:o=>{o.nome=txt(o.nome);return o},
  contratos:c=>{c.numero=txt(c.numero);['inicio','fim'].forEach(k=>{if(c[k]&&!dataOk(c[k]))c[k]=''});return c},
  bms:b=>{if(!dataOk(b.ini)||!dataOk(b.fim)||b.fim<b.ini||diasEntre(b.ini,b.fim)>400)return null;
    if(typeof b.status!=='string'||!(b.status in STATUS))return null;
    ['qtd','valor','liquido','deducoes','adiant','sobrasQtd','sobrasValor'].forEach(k=>{if(b[k]!=null)b[k]=nOk(b[k])});
    const nn=x=>Array.isArray(x)?x.map(v=>nOk(v)):TIPOS.map(()=>0);
    b.dias=(Array.isArray(b.dias)?b.dias:[]).filter(d=>d&&typeof d==='object'&&dataOk(d.d)).slice(0,400).map(d=>({...d,porTipo:nn(d.porTipo),total:nOk(d.total),valor:nOk(d.valor)}));
    b.obras=(Array.isArray(b.obras)?b.obras:[]).filter(o=>o&&typeof o==='object').map(o=>({...o,o:txt(o.o),porTipo:nn(o.porTipo),total:nOk(o.total),valor:nOk(o.valor)}));
    b.itens=(Array.isArray(b.itens)?b.itens:[]).filter(i=>i&&typeof i==='object'&&tipoOk(i.tipo)).map(i=>{const o={...i};Object.keys(o).forEach(k=>{if(k!=='tipo'&&k!=='item'&&o[k]!==null)o[k]=nOk(o[k])});o.item=txt(o.item);return o});
    if(typeof b.numero!=='number')b.numero=txt(b.numero);
    b.empresaNome=txt(b.empresaNome);
    if(b.anexo!==undefined&&!(b.anexo&&typeof b.anexo==='object'&&typeof b.anexo.type==='string'))delete b.anexo;
    ['assRest','assSup'].forEach(k=>{if(b[k]!==undefined&&!(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])))b[k]=undefined;if(b[k]){b[k].usuario=txt(b[k].usuario);b[k].por=txt(b[k].por)}});
    // status que pressupõe assinatura sem a assinatura gravada: mostra como "não informada" em vez de quebrar a tela
    const vazia=()=>({tipo:'',usuario:'(assinatura não informada)',em:''});
    if(['assinado_restaurante','assinado','faturado'].includes(b.status)&&!b.assRest)b.assRest=vazia();
    if(['assinado','faturado'].includes(b.status)&&!b.assSup)b.assSup=vazia();
    return b}
};
function limpaLinha(k,row){
  const r=limpa(row,'');
  if(!r||typeof r.id!=='string'||!RX_ID.test(r.id)){DESCARTADAS++;return null}
  let out=r;try{if(VALIDA[k])out=VALIDA[k](r)}catch(e){out=null}
  if(!out)DESCARTADAS++;return out}
function limpaTabela(k,rows){return (Array.isArray(rows)?rows:[]).map(r=>limpaLinha(k,r)).filter(Boolean)}
function limpaHorarios(h){h=limpa(h,'');if(!h||typeof h!=='object'||!h.tipos||typeof h.tipos!=='object')return null;const tipos={};
  TIPOS.forEach(t=>{const c=h.tipos[t.id];if(c&&typeof c==='object')tipos[t.id]={ativo:c.ativo===true,ini:RX_HM.test(c.ini||'')?c.ini:'',fim:RX_HM.test(c.fim||'')?c.fim:''}});return {ativo:h.ativo===true,tipos}}
function limpaLgpd(x){x=limpa(x,'');if(!x||typeof x!=='object')return null;const o={};LGPD_CAMPOS.forEach(([k])=>{o[k]=txt(x[k]).slice(0,300)});return o}
function limpaEstado(o){ // dados guardados no aparelho (cache) passam pelo mesmo tratamento
  const ns=fresh();if(!o||typeof o!=='object')return ns;
  Object.keys(TABLES).forEach(k=>{ns[k]=limpaTabela(k,o[k])});
  if(o.contratada&&typeof o.contratada==='object')ns.contratada={...ns.contratada,...limpa(o.contratada,'')};
  ns.horarios=o.horarios?limpaHorarios(o.horarios):null;ns.lgpd=o.lgpd?limpaLgpd(o.lgpd):null;
  ns.audit=(Array.isArray(o.audit)?o.audit:[]).map(e=>limpaAud(e)).filter(e=>e&&typeof e.id==='string');
  ns.auditArq=(Array.isArray(o.auditArq)?o.auditArq:[]).map(e=>limpa(e,'')).filter(e=>e&&typeof e==='object');
  return ns}
async function loadAll(){
  const g0=SYNC.gen; // quantas gravações este aparelho já tinha feito quando a leitura começou
  const ns=fresh();
  for(const [k,t] of Object.entries(TABLES)){
    let q=sb.from(t).select('id,data');
    if(t==='registros'){const lim=addDays(today(),-(CFG.DIAS_HISTORICO||400));q=q.gte('data->>data',lim)}
    const {data,error}=await q;if(error)throw error;
    ns[k]=limpaTabela(k,(data||[]).map(r=>({...(r.data&&typeof r.data==='object'&&!Array.isArray(r.data)?r.data:{}),id:r.id})));
  }
  const c=await sb.from('config').select('data').eq('id','contratada').maybeSingle();if(c.error)throw c.error;if(c.data&&c.data.data&&typeof c.data.data==='object')ns.contratada={...ns.contratada,...limpa(c.data.data,'')};
  const hz=await sb.from('config').select('data').eq('id','horarios').maybeSingle();if(!hz.error&&hz.data)ns.horarios=limpaHorarios(hz.data.data);
  const lg=await sb.from('config').select('data').eq('id','lgpd').maybeSingle();if(!lg.error&&lg.data)ns.lgpd=limpaLgpd(lg.data.data);
  const a=await sb.from('auditoria').select('id,data,ip,user_agent,created_at').order('created_at',{ascending:false}).limit(3000);
  const arq=await sb.from('auditoria_arquivos').select('id,de,ate,qtd,criado_em').order('criado_em',{ascending:false});ns.auditArq=arq.error?[]:(arq.data||[]).map(r=>limpa(r,''));
  ns.audit=a.error?[]:a.data.map(r=>limpaAud({...(r.data&&typeof r.data==='object'?r.data:{}),id:String(r.id),ip:r.ip,navegador:r.user_agent||(r.data&&r.data.navegador),em:r.created_at||(r.data&&r.data.em)})).filter(Boolean).reverse();
  // Algo foi gravado neste aparelho — ou estava sendo enviado — enquanto os dados eram lidos: o que foi lido pode não ter essa gravação.
  // Não substitui nada (senão o registro recém-feito sumiria da tela e poderia até ser apagado do servidor); a próxima atualização traz tudo.
  if(USER&&(SYNC.gen!==g0||SYNC.pending||SYNC.running))return false;
  // Entrada no sistema com alterações que ficaram sem enviar (aparelho estava sem internet): mantém no aparelho e CONTINUA devendo o envio
  const pend=[],audPend=[];let hzSrv,ctSrv,lgSrv;
  if(S&&SYNC.pending){
    Object.keys(TABLES).forEach(k=>{const L=LAST[k]||{};const tem=new Set();
      (S[k]||[]).forEach(r=>{tem.add(r.id);if(L[r.id]===JSON.stringify(rowOf(k,r)))return;
        const i=ns[k].findIndex(x=>x.id===r.id);pend.push([k,r.id,i>=0?JSON.stringify(rowOf(k,ns[k][i])):undefined]);if(i>=0)ns[k][i]=r;else ns[k].push(r)});
      if(k!=='users')Object.keys(L).forEach(id=>{if(tem.has(id))return;const i=ns[k].findIndex(x=>x.id===id);if(i>=0){pend.push([k,id,JSON.stringify(rowOf(k,ns[k][i]))]);ns[k].splice(i,1)}})});
    (S.audit||[]).forEach(e=>{if(!AUDIT_SEEN.has(e.id)){ns.audit.push(e);audPend.push(e.id)}});
    if(LAST.horarios!==undefined&&LAST.horarios!==JSON.stringify(S.horarios||null)){hzSrv=JSON.stringify(ns.horarios||null);ns.horarios=S.horarios}
    if(LAST.contratada!==undefined&&LAST.contratada!==JSON.stringify(S.contratada)){ctSrv=JSON.stringify(ns.contratada);ns.contratada=S.contratada}
    if(LAST.lgpd!==undefined&&LAST.lgpd!==JSON.stringify(S.lgpd||null)){lgSrv=JSON.stringify(ns.lgpd||null);ns.lgpd=S.lgpd}
  }
  ns.perfis=ns.perfis||[];ns.users.forEach(u=>{if(isAdm(u))u.perms=[...PERFIS.Administrador]});
  ns.contratadas=ns.contratadas||[];ns.contratos=ns.contratos||[];
  S=ns;snapshot();
  if(DESCARTADAS&&!loadAll.avisou){loadAll.avisou=true;console.warn('SISMED: '+DESCARTADAS+' linha(s) com dados inválidos foram ignoradas');setTimeout(()=>{if(USER&&isAdm(USER))toast(`${DESCARTADAS} linha(s) com dados fora do padrão vieram do servidor e foram ignoradas. Pode ser tentativa de adulteração — verifique a Auditoria.`,'bad')},1500)}
  DESCARTADAS=0;
  // o que ainda não foi enviado continua marcado como "a enviar" (o retrato acima marcaria tudo como já enviado)
  pend.forEach(([k,id,srv])=>{if(srv===undefined)delete LAST[k][id];else LAST[k][id]=srv});audPend.forEach(id=>AUDIT_SEEN.delete(id));
  if(hzSrv!==undefined)LAST.horarios=hzSrv;if(ctSrv!==undefined)LAST.contratada=ctSrv;if(lgSrv!==undefined)LAST.lgpd=lgSrv;
  try{localStorage.setItem(CACHE_KEY,JSON.stringify(S))}catch(e){}
  return true;
}
function save(){
  try{localStorage.setItem(CACHE_KEY,JSON.stringify(S))}catch(e){}
  SYNC.gen++;SYNC.pending=true;if(USER)SYNC.dono=USER.id;setSync('pend');clearTimeout(SYNC.timer);SYNC.timer=setTimeout(sync,350);
  const pr=new Promise((res,rej)=>(SYNC.waiters=SYNC.waiters||[]).push({res,rej}));pr.catch(()=>{});return pr;
}
/* o banco recusa obra de outra empresa ("Regra obra-empresa"): envia linha a linha, descarta só a linha recusada e avisa */
const REGRA_OBRA=/Regra obra-empresa|Dados inválidos/i;
async function upsertComRegra(k,t,rows,cur){
  const {error}=await sb.from(t).upsert(rows);if(!error)return;
  if(!REGRA_OBRA.test(String(error.message||'')))throw error;
  for(const row of rows){
    const {error:e1}=await sb.from(t).upsert([row]);if(!e1)continue;
    if(!REGRA_OBRA.test(String(e1.message||'')))throw e1;
    S[k]=(S[k]||[]).filter(x=>x.id!==row.id);delete cur[row.id];const d=row.data||{};
    toast(`O servidor recusou ${k==='registros'?'a refeição de '+(d.nome||''):k==='sobras'?'a sobra de '+(d.colabNome||''):k==='colab'?'o colaborador '+(d.nome||''):k==='obras'?'a obra '+(d.nome||''):'a gravação'}: ${String(e1.message||'').replace(/^(Regra obra-empresa|Dados inválidos):\s*/i,'')}`,'bad');
    if(PAGE==='rest')setTimeout(renderRest,50);
  }
}
/* o servidor recusou a alteração de uma linha que já existia: ela volta a ser como estava no servidor e o usuário é avisado */
function desfazLinha(k,id,cur,err){
  try{const antigo=JSON.parse(LAST[k][id]);const i=(S[k]||[]).findIndex(x=>x.id===id);if(i>=0)S[k][i]=k==='users'?{...antigo,id}:antigo;cur[id]=LAST[k][id]}catch(e){}
  toast(`O servidor recusou uma alteração (${String(err&&err.message||'').replace(/^(Regra obra-empresa|Dados inválidos):\s*/i,'').slice(0,120)}). Ela foi desfeita neste aparelho; o restante foi enviado.`,'bad');
  setTimeout(()=>{try{if(PAGE==='rest')renderRest();else if(PAGE==='sup'&&!$('bm-modal').classList.contains('on'))renderSup();else if(PAGE==='cfg')renderCfg()}catch(e){}},60);
}
async function sync(){
  if(SYNC.running||!USER)return;SYNC.running=true;SYNC.pending=false;clearTimeout(SYNC.retry);
  const batch=(SYNC.waiters||[]).splice(0);
  try{
    for(const [k,t] of Object.entries(TABLES)){
      const cur={};(S[k]||[]).forEach(r=>cur[r.id]=JSON.stringify(rowOf(k,r)));
      const ups=[],dels=[];
      for(const id in cur){if(LAST[k][id]!==cur[id])ups.push({id,data:JSON.parse(cur[id])})}
      if(k!=='users'){for(const id in LAST[k]){if(!(id in cur))dels.push(id)}}
      if(ups.length){
        const velhos=ups.filter(r=>LAST[k][r.id]!==undefined);let resto=ups.filter(r=>LAST[k][r.id]===undefined);
        if(velhos.length){const {data,error}=await sb.rpc('sync_update',{p_table:t,p_rows:velhos});
          if(error&&REGRA_OBRA.test(String(error.message||''))){ // o servidor recusou alguma linha do lote: envia uma a uma e desfaz só a recusada
            for(const row of velhos){const r1=await sb.rpc('sync_update',{p_table:t,p_rows:[row]});
              if(!r1.error){if(!(r1.data||[]).includes(row.id))resto.push(row);continue}
              if(!REGRA_OBRA.test(String(r1.error.message||'')))throw r1.error;
              desfazLinha(k,row.id,cur,r1.error)}
          }else if(error){if(/sync_update|PGRST202|function/i.test((error.message||'')+(error.code||'')))resto=ups;else throw error}
          else{const ok=new Set(data||[]);resto=resto.concat(velhos.filter(r=>!ok.has(r.id)))}}
        if(resto.length)await upsertComRegra(k,t,resto,cur);
      }
      if(dels.length){const {error}=await sb.from(t).delete().in('id',dels);if(error)throw error}
      LAST[k]=cur;
    }
    const cj=JSON.stringify(S.contratada);if(LAST.contratada!==cj){const {error}=await sb.from('config').upsert({id:'contratada',data:S.contratada});if(error)throw error;LAST.contratada=cj}
    const hj=JSON.stringify(S.horarios||null);if(LAST.horarios!==hj&&S.horarios){const {error}=await sb.from('config').upsert({id:'horarios',data:S.horarios});if(error)throw error;LAST.horarios=hj}
    const lj=JSON.stringify(S.lgpd||null);if(LAST.lgpd!==lj&&S.lgpd){const {error}=await sb.from('config').upsert({id:'lgpd',data:S.lgpd});if(error)throw error;LAST.lgpd=lj}
    const novos=(S.audit||[]).filter(e=>!AUDIT_SEEN.has(e.id));
    if(novos.length){const {error}=await sb.from('auditoria').insert(novos.map(e=>({id:e.id,data:e})));if(error)throw error;novos.forEach(e=>AUDIT_SEEN.add(e.id));
      if(S.audit.length>=1000){setTimeout(async()=>{try{await loadAll();if(PAGE==='aud')renderAud()}catch(e){}},300)}}
    SYNC.offline=false;setSync(SYNC.pending?'pend':'ok');batch.forEach(w=>w.res());
  }catch(e){
    SYNC.pending=true;SYNC.offline=true;const msg=(e&&e.message)||'';setSync('off',msg?'Falha ao enviar: '+msg:undefined);
    if(batch.length)batch.forEach(w=>w.rej(e));else if(/row-level security|permission|policy/i.test(msg))toast('Alteração recusada pelo servidor: sem permissão ('+msg.slice(0,80)+')','bad');
    SYNC.retry=setTimeout(sync,15000);
  }finally{SYNC.running=false;if(SYNC.pending&&!SYNC.offline)setTimeout(sync,200)}
}
window.addEventListener('online',()=>{if(SYNC.pending)sync();fotoEnviar()});
// atualização periódica com dados de outros aparelhos
async function atualizarDados(){if(!USER||SYNC.pending||SYNC.running||document.hidden)return;try{
  if(await loadAll()===false){clearTimeout(SYNC.again);SYNC.again=setTimeout(atualizarDados,8000);return} // houve gravação durante a leitura: tenta de novo em instantes
  refreshBadges();if(PAGE==='rest')renderRest(true);else if(PAGE==='sup'&&!$('bm-modal').classList.contains('on'))renderSup();else if(PAGE==='aud')renderAud();else if(PAGE==='ana')renderAna()}catch(e){}}
setInterval(atualizarDados,45000);

/* =================== THEME =================== */
function isDark(){const t=document.documentElement.getAttribute('data-theme');return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches}
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem(THEME_KEY,t)}catch(e){}renderThemeBtn()}
function renderThemeBtn(){const d=isDark();$('theme-txt').textContent=d?'Claro':'Escuro';
  $('theme-ico').innerHTML=d?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>':'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'}
$('theme-btn').onclick=()=>applyTheme(isDark()?'light':'dark');
try{const t=localStorage.getItem(THEME_KEY);if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}
renderThemeBtn();

/* =================== LOGIN (Supabase Auth) =================== */
function lstatus(m,bad){const e=$('l-status');e.textContent=m||'';e.style.color=bad?'var(--bad)':''}
function lshow(which){['l-form','l-signup','l-sent','l-wait','l-boot'].forEach(id=>$(id).hidden=id!==which);$('l-tabs').hidden=!(which==='l-form'||which==='l-signup');
  $('l-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',(b.dataset.lt==='login'&&which==='l-form')||(b.dataset.lt==='signup'&&which==='l-signup')))}
$('l-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{lshow(b.dataset.lt==='login'?'l-form':'l-signup');lstatus('')});
async function enterApp(){
  // alterações que ficaram sem enviar pertencem a quem as fez: se outra pessoa entra, são descartadas (nunca enviadas em nome dela)
  if(SYNC.pending&&SYNC.dono){let quem=null;try{const {data:{session:s0}}=await sb.auth.getSession();quem=s0&&s0.user&&s0.user.id}catch(e){}
    if(quem&&quem!==SYNC.dono){S=fresh();snapshot();SYNC.pending=false;SYNC.dono=null;(SYNC.waiters||[]).splice(0);setTimeout(()=>toast('Havia alterações não enviadas de outro usuário neste aparelho. Elas foram descartadas.','warn'),1200)}}
  try{await loadAll()}catch(e){
    // sem conexão: usa o que ficou guardado neste aparelho, mas só se for do mesmo usuário
    let cached=null;try{const {data:{session:ss}}=await sb.auth.getSession();const dono=localStorage.getItem(CACHE_UID);
      if(ss&&ss.user&&dono&&dono===ss.user.id)cached=JSON.parse(localStorage.getItem(CACHE_KEY))}catch(x){}
    if(!cached){lstatus('Não foi possível carregar os dados: '+(e.message||e),true);return false}
    S=limpaEstado(cached);snapshot();SYNC.offline=true;setSync('off');toast('Sem conexão — usando dados guardados neste aparelho');
  }
  const {data:{user}}=await sb.auth.getUser();
  USER=S.users.find(u=>u.id===(user&&user.id));
  if(!USER){lstatus('Seu usuário ainda não está liberado no sistema. Peça ao administrador.',true);await sb.auth.signOut();return false}
  if(USER.status==='pendente'){$('l-wait-user').textContent=(USER.login||'').toUpperCase();lshow('l-wait');lstatus('');USER=null;return false}
  if(USER.ativo===false){lstatus('Usuário inativo. Procure o administrador.',true);await sb.auth.signOut();USER=null;return false}
  try{localStorage.setItem(CACHE_UID,USER.id)}catch(e){}
  $('login').style.display='none';$('app').classList.add('on');
  $('who-name').textContent=USER.nome;$('who-role').textContent=USER.tipo||USER.perfil;
  audit('login.ok','',{aba:'login'});save();
  seedPerfis();buildNav();loadSocial();setTimeout(fotoEnviar,1500);lgpdPedeCiencia();return true;
}
async function resolveEmail(login){login=login.trim();if(login.includes('@'))return login.toLowerCase();
  try{const {data}=await sb.rpc('email_por_login',{p_login:login});if(data)return data}catch(e){}return toEmail(login)}
async function doLogin(){
  const login=$('l-user').value.trim(),pass=$('l-pass').value;if(!login||!pass)return;
  $('l-go').disabled=true;$('l-err').hidden=true;lstatus('Entrando…');
  const {error}=await sb.auth.signInWithPassword({email:await resolveEmail(login),password:pass});
  $('l-go').disabled=false;
  if(error){$('l-err').hidden=false;$('l-err').textContent=/confirm/i.test(error.message)?'E-mail ainda não confirmado. Abra o link de confirmação que enviamos para o seu e-mail.':'Usuário ou senha inválidos.'+(login.includes('@')?'':' Se você criou a conta com o seu e-mail, entre com o e-mail.');lstatus('');return}
  lstatus('Carregando dados…');await enterApp();lstatus('');
}
async function doSignup(){
  const err=$('su-err');const show=m=>{err.hidden=false;err.textContent=m};
  const login=$('su-user').value.trim().toUpperCase(),email=$('su-email').value.trim().toUpperCase(),p1=$('su-pass').value,p2=$('su-pass2').value;
  if(!/^[A-Z0-9._-]{3,30}$/.test(login))return show('Usuário: de 3 a 30 caracteres, apenas letras, números, ponto, hífen ou sublinhado.');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return show('Informe um e-mail corporativo válido.');
  if(!senhaOk(p1))return show('A senha precisa ter '+SENHA_REGRA+'.');
  if(p1!==p2)return show('As senhas não conferem.');
  if(!$('su-lgpd').checked)return show('Para criar a conta, leia a Política de Privacidade e marque a caixa de ciência.');
  err.hidden=true;$('su-go').disabled=true;
  // o servidor diz se o usuário está livre (sem revelar e-mail de ninguém); em servidor antigo, usa a consulta anterior
  try{const r=await sb.rpc('login_livre',{p_login:login});
    if(!r.error){if(r.data===false){$('su-go').disabled=false;return show('Este usuário já existe. Escolha outro.')}}
    else{const {data:ex}=await sb.rpc('email_por_login',{p_login:login});if(ex){$('su-go').disabled=false;return show('Este usuário já existe. Escolha outro.')}}}catch(e){}
  const {data,error}=await sb.auth.signUp({email:email.toLowerCase(),password:p1,options:{data:{nome:login,login},emailRedirectTo:location.origin+location.pathname}});
  $('su-go').disabled=false;
  if(error)return show(/already|registered/i.test(error.message)?'Já existe uma conta com este e-mail.':/rate/i.test(error.message)?'Limite de envio de e-mails atingido no servidor. Tente novamente em alguns minutos.':'Erro: '+error.message);
  if(data.session){await enterApp();return}
  $('l-sent-email').textContent=email;$('l-sent-sim').hidden=!window.__simularConfirmacao;lshow('l-sent');
}
async function doBootstrap(){
  const nome=$('b-nome').value.trim(),login=$('b-login').value.trim(),pass=$('b-pass').value;const err=$('b-err');
  if(!nome||!login||!senhaOk(pass)){err.hidden=false;err.textContent='Preencha nome, login e uma senha com '+SENHA_REGRA+'.';return}
  err.hidden=true;$('b-go').disabled=true;
  const {data,error}=await sb.auth.signUp({email:toEmail(login),password:pass,options:{data:{nome,login}}});
  $('b-go').disabled=false;
  if(error){err.hidden=false;err.textContent=error.message;return}
  if(!data.session){err.hidden=false;err.textContent='Usuário criado. Confirme o e-mail pelo link enviado e depois entre.';lshow('l-form');return}
  lshow('l-form');await enterApp();
}
$('l-go').onclick=doLogin;$('l-pass').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin()});
$('l-user').addEventListener('input',e=>{if(!e.target.value.includes('@'))e.target.value=e.target.value.toUpperCase()});
$('su-user').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase());$('su-email').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase());
$('su-go').onclick=doSignup;$('b-go').onclick=doBootstrap;
$('l-sent-back').onclick=()=>{lshow('l-form');lstatus('')};
$('l-sent-sim').onclick=async()=>{if(window.__simularConfirmacao){await window.__simularConfirmacao($('l-sent-email').textContent.toLowerCase());await enterApp()}};
$('l-wait-check').onclick=async()=>{lstatus('Verificando…');if(await enterApp())lstatus('');else if(!$('l-wait').hidden)lstatus('Ainda aguardando aprovação.')};
$('l-wait-out').onclick=async()=>{await sb.auth.signOut();lshow('l-form');lstatus('')};
async function doLogout(){closeScanner();try{fotoFechar();mfotoReset()}catch(e){}$('user-menu').hidden=true;if(USER){audit('logout','');save();if(SYNC.pending){await sync()}
    if(SYNC.pending&&!(doLogout.aviso&&Date.now()-doLogout.aviso<30000)){doLogout.aviso=Date.now();
      toast('Há alterações que ainda não foram enviadas ao servidor (sem conexão). Conecte à internet e saia de novo. Para sair mesmo assim, toque em Sair outra vez: elas só serão enviadas quando VOCÊ entrar de novo neste aparelho, e se perdem se outra pessoa entrar antes.','warn');return}}
  doLogout.aviso=0;USER=null;await sb.auth.signOut();
  // LGPD/segurança: nada do usuário que saiu fica guardado no aparelho (o que ainda não foi enviado fica só na memória desta aba)
  try{localStorage.removeItem(CACHE_KEY);localStorage.removeItem(CACHE_UID)}catch(e){}
  if(!SYNC.pending){S=fresh();snapshot()}NOTIFS=[];MSGS=[];CUR=null;try{fotoReset()}catch(e){}$('confirm-card').hidden=true;
  document.querySelectorAll('.modal.on').forEach(m=>m.classList.remove('on'));$('app').classList.remove('on');$('login').style.display='grid';$('l-pass').value='';lshow('l-form');lstatus('')}
async function boot(){
  S=fresh();lgpdCarregaPublico();
  try{
    const {data:{session}}=await sb.auth.getSession();
    if(session){lstatus('Carregando dados…');if(await enterApp()){lstatus('');return}if(!$('l-wait').hidden)return}
    const {data:need,error}=await sb.rpc('bootstrap_needed');
    if(error)throw error;
    if(need){lshow('l-boot');lstatus('Nenhum usuário cadastrado ainda.')}
    else{lshow('l-form');lstatus('')}
  }catch(e){lstatus('Sem conexão com o servidor: '+(e.message||e),true)}
}

/* =================== PRIVACIDADE — LGPD (v2.5) ===================
   Texto-base para validação do jurídico / encarregado. Os dados do controlador e do encarregado vêm de
   Configurações › Privacidade (config "lgpd"); antes do login, de lgpd_publico() no servidor ou de APP_CONFIG.LGPD. */
const LGPD_VERSAO='1.0',LGPD_DATA='2026-10-02';
const LGPD_CAMPOS=[['controlador','Razão social do controlador (empresa responsável pelos dados)'],['cnpj','CNPJ'],['endereco','Endereço'],['encarregado','Encarregado pelo tratamento de dados pessoais (DPO) — nome'],['email','E-mail do encarregado'],['telefone','Telefone do encarregado'],['guardaRegistros','Prazo de guarda dos registros de refeição e Boletins de Medição'],['guardaAuditoria','Prazo de guarda da trilha de auditoria']];
const LGPD_PADRAO={controlador:'',cnpj:'',endereco:'',encarregado:'',email:'',telefone:'',guardaRegistros:'5 anos após o encerramento do contrato com o restaurante',guardaAuditoria:'5 anos'};
let LGPD_PUB=null;
function lgpdDados(){const base=(S&&S.lgpd)||LGPD_PUB||(window.APP_CONFIG&&window.APP_CONFIG.LGPD)||{};const o={};LGPD_CAMPOS.forEach(([k])=>{o[k]=txt(base[k]).trim()||LGPD_PADRAO[k]});return o}
async function lgpdCarregaPublico(){try{const {data,error}=await sb.rpc('lgpd_publico');if(!error&&data&&typeof data==='object')LGPD_PUB=limpaLgpd(data)}catch(e){}}
function lgpdFalta(){const d=lgpdDados();return ['controlador','encarregado','email'].filter(k=>!d[k])}
function politicaHtml(){
  const d=lgpdDados();const nd=v=>v?esc(v):'<span class="pill warn">a definir pelo administrador</span>';
  return `<div class="pp">
  <p class="small muted">Versão ${LGPD_VERSAO} — vigente a partir de ${br(LGPD_DATA)}.</p>
  <h3>1. Quem é responsável pelos seus dados</h3>
  <p>O SISMED (Sistema de Medição de Refeições) é usado por <b>${nd(d.controlador)}</b>${d.cnpj?', CNPJ '+esc(d.cnpj):''}${d.endereco?', '+esc(d.endereco):''}, que é a empresa responsável pelo tratamento dos dados pessoais (“controlador”), para controlar e medir as refeições fornecidas aos colaboradores nas obras.</p>
  <p><b>Encarregado pelo tratamento de dados pessoais (DPO):</b> ${nd(d.encarregado)} — e-mail ${nd(d.email)}${d.telefone?' — telefone '+esc(d.telefone):''}.</p>
  <h3>2. Quais dados o sistema trata</h3>
  <ul><li><b>De quem recebe a refeição (colaboradores):</b> nome, código do crachá (QR Code), empresa e obra; data, hora, tipo de refeição e restaurante de cada registro; <b>foto do rosto</b> tirada no momento do registro (ou de quem retira a refeição em nome de outra pessoa); nome de terceirizados informados no registro manual.</li>
  <li><b>De quem opera o sistema (usuários):</b> nome, login, e-mail, perfil e permissões; registro das ações feitas (data e hora, endereço IP, identificador do aparelho e navegador); mensagens trocadas pelo sistema.</li>
  <li><b>De quem assina os Boletins de Medição:</b> nome e cargo do Gestor / Engenheiro de cada obra e nome de quem assina pelo restaurante.</li>
  <li>O sistema <b>não</b> coleta CPF, endereço residencial, dados de saúde ou localização e <b>não</b> faz reconhecimento facial automático.</li></ul>
  <h3>3. Para que os dados são usados e com que base legal</h3>
  <ul><li><b>Controlar as refeições, emitir os Boletins de Medição e conferir a cobrança do restaurante</b> — execução de contrato e legítimo interesse do controlador (LGPD, art. 7º, V e IX).</li>
  <li><b>Foto no registro</b> — comprovar que a refeição foi entregue à pessoa certa e prevenir fraudes e cobranças indevidas: legítimo interesse (art. 7º, IX). A foto não é usada para reconhecimento facial nem para avaliar o colaborador. Quem não quiser ser fotografado pode pedir o <b>registro sem foto</b>; o operador anota a justificativa.</li>
  <li><b>Trilha de auditoria e registros de acesso</b> — segurança do sistema, prevenção a fraudes e cumprimento de obrigações legais (art. 7º, II e IX).</li>
  <li><b>Cadastro de usuários</b> — permitir o acesso e definir o que cada um pode fazer (art. 7º, V).</li></ul>
  <h3>4. Com quem os dados são compartilhados</h3>
  <ul><li><b>Restaurantes contratados</b>, que registram as refeições e validam os Boletins de Medição, e as <b>empresas responsáveis pelas obras e contratos</b>, para conferência e pagamento.</li>
  <li><b>Fornecedores de tecnologia</b> que guardam os dados em nome do controlador: Supabase (banco de dados e arquivos, em servidores na região de São Paulo, Brasil) e GitHub (hospedagem das páginas do sistema, sem os dados do cadastro).</li>
  <li><b>Autoridades</b>, quando houver obrigação legal ou ordem judicial.</li></ul>
  <p>Os dados não são vendidos nem usados para publicidade.</p>
  <h3>5. Por quanto tempo os dados ficam guardados</h3>
  <ul><li><b>Fotos:</b> ficam disponíveis para consulta por ${FOTO_CFG.dias} dias; depois vão para um arquivo de acesso restrito, guardado por até 12 meses, e são apagadas.</li>
  <li><b>Mensagens:</b> 7 dias. <b>Notificações:</b> 30 dias.</li>
  <li><b>Registros de refeição e Boletins de Medição:</b> ${esc(d.guardaRegistros)}, para cumprir obrigações contratuais e fiscais e para defesa em processos.</li>
  <li><b>Trilha de auditoria:</b> ${esc(d.guardaAuditoria)}.</li>
  <li><b>Dados guardados no aparelho:</b> apagados quando o usuário sai do sistema.</li></ul>
  <h3>6. Como os dados são protegidos</h3>
  <p>Acesso com usuário e senha individuais e permissões por perfil; conexão criptografada (HTTPS); regras de acesso aplicadas no servidor; fotos em área privada, visíveis só a quem tem permissão específica; toda consulta a foto e todo download ficam registrados na auditoria.</p>
  <h3>7. Seus direitos</h3>
  <p>Você pode pedir a confirmação do tratamento, o acesso aos seus dados, a correção, a anonimização, o bloqueio ou a eliminação do que for desnecessário ou excessivo, a portabilidade, a informação sobre compartilhamento e pode se opor ao tratamento (LGPD, art. 18). Faça o pedido ao encarregado, pelos contatos do item 1; a resposta é dada em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</p>
  <h3>8. O que fica guardado no aparelho</h3>
  <p>O sistema não usa cookies de publicidade nem rastreadores. Guarda no navegador só o necessário para funcionar: a sessão de acesso, preferências de tela e, enquanto não houver internet, os registros e as fotos ainda não enviados.</p>
  <h3>9. Termos de uso (para quem opera o sistema)</h3>
  <ul><li>A conta é pessoal: não compartilhe a senha nem use a conta de outra pessoa.</li>
  <li>Use os dados e as fotos somente para o controle de refeições. Não copie, não fotografe a tela e não envie por aplicativos de mensagem.</li>
  <li>Fotografe apenas o rosto de quem está recebendo ou retirando a refeição.</li>
  <li>Saia do sistema ao terminar, principalmente em aparelho compartilhado.</li>
  <li>Avise imediatamente o administrador ou o encarregado em caso de suspeita de acesso indevido, perda do aparelho ou vazamento de dados.</li>
  <li>Suas ações ficam registradas na auditoria, com usuário, data, hora e aparelho. As mensagens enviadas pelo sistema podem ser consultadas pelo administrador.</li></ul>
  <h3>10. Alterações desta política</h3>
  <p>Esta política pode ser atualizada. A versão vigente fica sempre disponível no sistema e uma nova ciência é pedida quando houver mudança relevante.</p></div>`;
}
let PP_CIENCIA=false;
function abrirPolitica(ciencia){
  PP_CIENCIA=!!ciencia;$('pp-body').innerHTML=politicaHtml();
  $('pp-close').hidden=PP_CIENCIA;$('pp-rodape').hidden=!PP_CIENCIA;$('pp-intro').hidden=!PP_CIENCIA;
  $('pp-modal').classList.add('on');$('pp-modal').querySelector('.sheet').scrollTop=0;
}
$('pp-close').onclick=()=>$('pp-modal').classList.remove('on');
$('pp-ciente').onclick=()=>{
  if(!USER)return;try{localStorage.setItem('sismed_lgpd_'+USER.id,LGPD_VERSAO)}catch(e){}
  audit('lgpd.ciencia',`Política de Privacidade e Termos de Uso — versão ${LGPD_VERSAO} (${br(LGPD_DATA)})`,{entidade:'usuário '+USER.login});save();
  PP_CIENCIA=false;$('pp-modal').classList.remove('on');
};
$('pp-sair').onclick=()=>{PP_CIENCIA=false;$('pp-modal').classList.remove('on');doLogout()};
function lgpdPedeCiencia(){if(!USER)return;let v=null;try{v=localStorage.getItem('sismed_lgpd_'+USER.id)}catch(e){}if(v!==LGPD_VERSAO)abrirPolitica(true)}
document.querySelectorAll('[data-pp]').forEach(b=>b.onclick=e=>{e.preventDefault();abrirPolitica(false)});
/* aviso de privacidade para afixar no restaurante (PDF, A4) */
function avisoPdf(){
  if(!window.jspdf){toast('Biblioteca de PDF não carregada. Verifique a internet e recarregue a página.','bad');return}
  const d=lgpdDados();const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});const M=18,W=210-2*M;let y=22;
  doc.setFont('helvetica','bold');doc.setFontSize(20);doc.setTextColor(15,60,90);doc.text('AVISO DE PRIVACIDADE',M,y);y+=8;
  doc.setFontSize(13);doc.setTextColor(40);doc.text('Registro de refeições — SISMED',M,y);y+=4;doc.setDrawColor(15,60,90);doc.setLineWidth(.6);doc.line(M,y,210-M,y);y+=9;
  const bloco=(t,txts)=>{doc.setFont('helvetica','bold');doc.setFontSize(12.5);doc.setTextColor(15,60,90);doc.text(t,M,y);y+=6.2;doc.setFont('helvetica','normal');doc.setFontSize(11.5);doc.setTextColor(30);
    txts.forEach(x=>{const l=doc.splitTextToSize(x,W);doc.text(l,M,y);y+=l.length*5.3+1.6});y+=3.2};
  bloco('O que é registrado',['Ao retirar a refeição, o sistema registra seu nome, o código do crachá, a empresa, a obra, a data, a hora, o tipo de refeição e uma FOTO DO SEU ROSTO. Quando alguém retira a refeição para outra pessoa, a foto é de quem está retirando.']);
  bloco('Para que serve',['Para comprovar que a refeição foi entregue à pessoa certa, conferir a cobrança do restaurante e evitar fraudes. A foto NÃO é usada para reconhecimento facial automático nem para avaliar o seu trabalho.']);
  bloco('Quem pode ver',['Somente pessoas autorizadas da empresa responsável. Toda consulta a uma foto fica registrada. Os dados não são vendidos nem usados para publicidade.']);
  bloco('Por quanto tempo',[`A foto fica disponível para consulta por ${FOTO_CFG.dias} dias, depois é guardada em arquivo de acesso restrito por até 12 meses e então é apagada. Os registros de refeição são guardados por: ${d.guardaRegistros}.`]);
  bloco('Se você não quiser ser fotografado',['Avise o operador: o registro pode ser feito sem foto, com a anotação do motivo.']);
  bloco('Seus direitos (Lei nº 13.709/2018 — LGPD)',['Você pode pedir para saber quais dados seus estão guardados, corrigi-los, pedir a eliminação do que for desnecessário e se opor ao uso. A resposta é dada em até 15 dias.']);
  bloco('Com quem falar',[`Responsável pelos dados (controlador): ${d.controlador||'________________________________'}${d.cnpj?' — CNPJ '+d.cnpj:''}`,`Encarregado de dados (DPO): ${d.encarregado||'________________________________'}`,`E-mail: ${d.email||'________________________'}${d.telefone?'      Telefone: '+d.telefone:''}`]);
  doc.setFontSize(9);doc.setTextColor(110);doc.text(`Política de Privacidade do SISMED — versão ${LGPD_VERSAO} (${br(LGPD_DATA)}). A política completa está disponível no sistema e com o encarregado.`,M,285,{maxWidth:W});
  doc.save('aviso-de-privacidade-sismed.pdf');audit('lgpd.aviso','Aviso de privacidade (PDF) para afixar no restaurante');save();
}
/* Configurações › Privacidade (LGPD) */
function renderLgpd(){
  const d=(S.lgpd&&{...LGPD_PADRAO,...S.lgpd})||{...LGPD_PADRAO,...(LGPD_PUB||{})};
  $('lg-form').innerHTML=LGPD_CAMPOS.map(([k,l])=>`<div class="field"><label for="lg-${k}">${l}</label><input id="lg-${k}" maxlength="300" value="${esc(d[k]||'')}"${k==='email'?' type="email"':''}></div>`).join('');
  const f=lgpdFalta();$('lg-falta').hidden=!f.length;$('lg-falta').textContent=f.length?'Preencha o controlador, o encarregado e o e-mail do encarregado: eles aparecem na Política de Privacidade e no aviso do restaurante.':'';
  const tit=$('lg-tipo').value||'colab';const sel=$('lg-titular');const cur=sel.value;
  const l=tit==='colab'?[...S.colab].sort((a,b)=>a.nome.localeCompare(b.nome)).map(c=>({id:c.id,nome:c.nome+' — '+c.qr})):[...S.users].sort((a,b)=>a.nome.localeCompare(b.nome)).map(u=>({id:u.id,nome:u.nome+' — '+(u.login||'').toUpperCase()}));
  sel.innerHTML='<option value="">Selecione…</option>'+l.map(x=>`<option value="${esc(x.id)}"${x.id===cur?' selected':''}>${esc(x.nome)}</option>`).join('');
  $('lg-guarda').innerHTML=[['Foto para consulta',FOTO_CFG.dias+' dias','automático'],['Foto em arquivo compactado','12 meses','automático'],['Mensagens entre usuários','7 dias','automático'],['Notificações','30 dias','automático'],['Dados guardados no aparelho','até o usuário sair','automático'],['Registros de refeição e BMs',d.guardaRegistros,'definido acima — eliminação a pedido'],['Trilha de auditoria',d.guardaAuditoria,'definido acima — eliminação a pedido']]
    .map(r=>`<tr><td>${esc(r[0])}</td><td><b>${esc(r[1])}</b></td><td class="muted">${esc(r[2])}</td></tr>`).join('');
}
$('lg-tipo').onchange=()=>{$('lg-titular').value='';renderLgpd()};
$('lg-save').onclick=()=>{
  if(!can('lgpd.gerir'))return;const o={};LGPD_CAMPOS.forEach(([k])=>{o[k]=$('lg-'+k).value.trim().replace(/\s+/g,' ')});
  if(o.email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(o.email)){toast('E-mail do encarregado inválido');return}
  const antes=JSON.stringify(S.lgpd||null);S.lgpd=o;
  audit('lgpd.config',`Controlador: ${o.controlador||'—'} · Encarregado: ${o.encarregado||'—'} (${o.email||'sem e-mail'})`,{entidade:'privacidade (LGPD)',antes,depois:JSON.stringify(o)});
  concluir('Dados de privacidade salvos');renderLgpd();
};
$('lg-politica').onclick=()=>abrirPolitica(false);$('lg-aviso').onclick=avisoPdf;
$('lg-relatorio').onclick=()=>{const tipoT=$('lg-tipo').value||'colab',id=$('lg-titular').value;if(!id){toast('Selecione o titular dos dados');return}relatorioTitular(tipoT,id)};
/* relatório de dados do titular (LGPD, art. 18 — confirmação e acesso) */
function relatorioTitular(tipoT,id){
  if(!can('lgpd.gerir'))return;
  if(!window.jspdf){toast('Biblioteca de PDF não carregada. Verifique a internet e recarregue a página.','bad');return}
  const d=lgpdDados();const doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});const M=14;let y=16;
  const titular=tipoT==='colab'?S.colab.find(c=>c.id===id):S.users.find(u=>u.id===id);if(!titular)return;
  doc.setFont('helvetica','bold');doc.setFontSize(14);doc.text('Relatório de dados pessoais do titular',M,y);y+=6;
  doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor(90);
  doc.text(`LGPD, art. 18, I e II (confirmação e acesso) · emitido em ${brdt(new Date().toISOString())} por ${USER.nome} · SISMED`,M,y);y+=4.5;
  {const l=doc.splitTextToSize(`Controlador: ${d.controlador||'—'}${d.cnpj?' — CNPJ '+d.cnpj:''} · Encarregado: ${d.encarregado||'—'}${d.email?' — '+d.email:''}`,182);doc.text(l,M,y);y+=l.length*4.2+5}doc.setTextColor(20);
  const tab=(head,body,opt)=>{doc.autoTable(Object.assign({startY:y,head:[head],body,theme:'grid',styles:{fontSize:8.5,cellPadding:1.6},headStyles:{fillColor:[18,84,110]},margin:{left:M,right:M}},opt||{}));y=doc.lastAutoTable.finalY+7};
  const tit=t=>{if(y>265){doc.addPage();y=16}doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text(t,M,y);y+=2.5;doc.setFont('helvetica','normal')};
  let nReg=0;
  if(tipoT==='colab'){
    const c=titular,e=emp(c.empresaId),o=obra(c.obraId);
    tit('1. Dados cadastrais');tab(['Dado','Valor'],[['Nome',c.nome],['Código do crachá (QR Code)',c.qr],['Empresa',e?e.nome:'—'],['Obra',o?o.nome:'—'],['Situação',c.ativo===false?'inativo':'ativo']]);
    if((c.realocacoes||[]).length){tit('2. Mudanças de empresa/obra');tab(['Data','De','Para','Motivo','Por'],c.realocacoes.map(x=>[brdt(x.em),`${txt(x.deEmpresa)} / ${txt(x.deObra)}`,`${txt(x.paraEmpresa)} / ${txt(x.paraObra)}`,txt(x.motivo),txt(x.usuario)]))}
    const regs=S.registros.filter(r=>r.colabId===c.id||(r.retiradoPor&&r.retiradoPor.colabId===c.id)).sort((a,b)=>a.registradoEm<b.registradoEm?-1:1);nReg=regs.length;
    tit(`3. Registros de refeição (${regs.length}) — últimos ${CFG.DIAS_HISTORICO||400} dias`);
    tab(['Data','Hora','Refeição','Modalidade','Restaurante','Obra','Registrado por','Foto'],regs.map(r=>[br(r.data),hm(r.registradoEm),tipo(r.tipo).curto,MODS[modOf(r)]+(r.colabId!==c.id?' (retirou para '+r.nome+')':modOf(r)==='retirada'?' (retirada por '+((r.retiradoPor||{}).nome||'—')+')':''),(ct(ctOf(r))||{}).nome||r.contratadaNome||'—',r.obraNome||'—',r.usuario||'—',r.foto?(fotoArquivada(r)?'em arquivo':'disponível'):r.semFoto?'sem foto: '+r.semFoto:'—']),{styles:{fontSize:7.5,cellPadding:1.3}});
    const sob=(S.sobras||[]).filter(x=>x.colabId===c.id);if(sob.length){tit(`4. Sobras lançadas em seu nome (${sob.length})`);tab(['Data','Refeição','Qtd.','Obra','Lançado por'],sob.map(x=>[br(x.data),tipo(x.tipo).curto,String(x.qtd),x.obraNome||'—',x.usuario||'—']))}
  }else{
    const u=titular;
    tit('1. Dados cadastrais');tab(['Dado','Valor'],[['Nome',u.nome],['Login',(u.login||'').toUpperCase()],['E-mail',u.email||'—'],['Tipo / perfil',`${u.tipo||'—'} / ${u.perfil||'—'}`],['Situação',u.status==='pendente'?'aguardando aprovação':u.ativo===false?'inativo':'ativo'],['Permissões',String((u.perms||[]).length)],['Obras liberadas',u.obras&&u.obras.length?u.obras.map(i=>(obra(i)||{}).nome).filter(Boolean).join(', '):'todas'],['Restaurantes liberados',u.contratadas&&u.contratadas.length?u.contratadas.map(i=>(ct(i)||{}).nome).filter(Boolean).join(', '):'todos']]);
    const ev=S.audit.filter(a=>a.usuarioId===u.id);nReg=ev.length;const por={};ev.forEach(a=>{por[a.acao]=(por[a.acao]||0)+1});
    tit(`2. Ações registradas na auditoria (${ev.length} nos eventos mais recentes)`);tab(['Ação','Quantidade'],Object.entries(por).sort((a,b)=>b[1]-a[1]).map(([k,n])=>[ACOES[k]||k,String(n)]));
    const ult=ev.slice(-60).reverse();if(ult.length){tit('3. Últimas ações (até 60)');tab(['Data e hora','Ação','Descrição','IP','Aparelho'],ult.map(a=>[brdt(a.em),ACOES[a.acao]||a.acao,String(a.descricao||'').slice(0,90),a.ip||'—',a.dispositivo||'—']),{styles:{fontSize:7.5,cellPadding:1.3}})}
  }
  tit('Sobre o tratamento');
  tab(['Item','Informação'],[['Finalidade','Controle e medição das refeições fornecidas, conferência da cobrança do restaurante, prevenção a fraudes e segurança do sistema.'],['Base legal','Execução de contrato e legítimo interesse do controlador (LGPD, art. 7º, V e IX); obrigação legal para registros de acesso (art. 7º, II).'],['Compartilhamento','Restaurantes contratados e empresas responsáveis pelas obras; fornecedores de tecnologia (Supabase — servidores em São Paulo; GitHub — hospedagem das páginas).'],['Fotos',`Consulta por ${FOTO_CFG.dias} dias; arquivo de acesso restrito por até 12 meses. As fotos podem ser apresentadas ao titular pelo encarregado, mediante pedido.`],['Prazo de guarda',`Registros e BMs: ${d.guardaRegistros}. Auditoria: ${d.guardaAuditoria}.`],['Direitos','Correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade e oposição: pedido ao encarregado, com resposta em até 15 dias.']],{columnStyles:{0:{cellWidth:36,fontStyle:'bold'}}});
  const n=doc.getNumberOfPages();for(let i=1;i<=n;i++){doc.setPage(i);doc.setFontSize(8);doc.setTextColor(120);doc.text(`Documento com dados pessoais — entregar somente ao titular ou a seu representante legal · página ${i} de ${n}`,M,290)}
  doc.save(`dados-titular-${(titular.nome||'titular').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^\w]+/g,'-').slice(0,40)}.pdf`);
  audit('lgpd.relatorio',`${tipoT==='colab'?'Colaborador':'Usuário'}: ${titular.nome} — ${nReg} ${tipoT==='colab'?'registro(s) de refeição':'ação(ões) na auditoria'}`,{entidade:(tipoT==='colab'?'colaborador '+titular.qr:'usuário '+titular.login)});save();
  sucesso('Relatório gerado — entregue somente ao titular');
}

/* =================== ALTERAR A PRÓPRIA SENHA (v2.5) =================== */
function abrirMinhaSenha(){['ms-atual','ms-nova','ms-rep'].forEach(id=>$(id).value='');$('ms-err').hidden=true;$('ms-modal').classList.add('on');setTimeout(()=>$('ms-atual').focus(),50)}
$('ms-close').onclick=$('ms-cancel').onclick=()=>$('ms-modal').classList.remove('on');
$('ms-go').onclick=async()=>{
  const atual=$('ms-atual').value,nova=$('ms-nova').value,rep=$('ms-rep').value;const err=$('ms-err');const show=m=>{err.hidden=false;err.textContent=m};
  if(!atual)return show('Informe a senha atual.');
  if(!senhaOk(nova))return show('A nova senha precisa ter '+SENHA_REGRA+'.');
  if(nova!==rep)return show('As senhas novas não conferem.');
  if(nova===atual)return show('A nova senha precisa ser diferente da atual.');
  err.hidden=true;$('ms-go').disabled=true;
  try{
    const {data:{user}}=await sb.auth.getUser();if(!user||!user.email)throw new Error('sessão expirada — entre de novo');
    const r1=await sb.auth.signInWithPassword({email:user.email,password:atual});if(r1.error){$('ms-go').disabled=false;return show('Senha atual incorreta.')}
    const r2=await sb.auth.updateUser({password:nova});if(r2.error)throw r2.error;
    audit('usuario.senha','Alterou a própria senha',{entidade:'usuário '+USER.login});
    $('ms-modal').classList.remove('on');concluir('Senha alterada');
  }catch(e){show('Não foi possível alterar a senha: '+(e.message||e))}
  $('ms-go').disabled=false;
};

/* =================== MENU DO USUÁRIO =================== */
function userMenu(anchor){
  const m=$('user-menu');if(!m.hidden){m.hidden=true;return}
  m.innerHTML=`<div class="row" style="flex-wrap:nowrap"><div class="avatar">${ini(USER.nome)}</div><div style="min-width:0"><b style="display:block">${esc(USER.nome)}</b><span class="small muted mono">${esc((USER.login||'').toUpperCase())}</span></div></div>
    <div class="kv" style="margin:10px 0;display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:12.5px"><span class="muted">Tipo de perfil</span><span><span class="pill ${isAdm(USER)?'warn':'neutral'}">${esc(USER.tipo||'—')}</span></span><span class="muted">Perfil</span><span>${esc(USER.perfil||'—')}</span></div>
    ${hintsOff().length?'<button class="btn sec sm" id="um-avisos" style="width:100%;margin-bottom:8px">Mostrar avisos fechados</button>':''}<button class="btn sec sm" id="um-senha" style="width:100%;margin-bottom:8px">Alterar minha senha</button><button class="btn sec sm" id="um-pp" style="width:100%;margin-bottom:8px">Política de Privacidade</button><button class="btn danger" id="um-sair" style="width:100%">Sair</button>`;
  $('um-sair').onclick=doLogout;$('um-senha').onclick=()=>{m.hidden=true;abrirMinhaSenha()};$('um-pp').onclick=()=>{m.hidden=true;abrirPolitica(false)};if($('um-avisos'))$('um-avisos').onclick=()=>{mostrarAvisos();m.hidden=true;sucesso('Avisos reexibidos')};
  const r=anchor.getBoundingClientRect();m.hidden=false;
  if(innerWidth>=900){m.style.left=r.left+'px';m.style.top='';m.style.right='';m.style.bottom=(innerHeight-r.top+8)+'px'}
  else{m.style.right='12px';m.style.left='';m.style.bottom='';m.style.top=(r.bottom+8)+'px'}
}
document.addEventListener('click',e=>{const m=$('user-menu');if(!m.hidden&&!m.contains(e.target)&&!e.target.closest('#nav-user,#who-btn'))m.hidden=true});
$('who-btn').onclick=e=>userMenu(e.currentTarget);

/* =================== NOTIFICAÇÕES E MENSAGENS =================== */
let NOTIFS=[],MSGS=[],NTAB='n',MSG_PAIR=null;
function seenGet(k,d){try{const v=localStorage.getItem('sismed_'+k+'_'+USER.id);return v?JSON.parse(v):d}catch(e){return d}}
function seenSet(k,v){try{localStorage.setItem('sismed_'+k+'_'+USER.id,JSON.stringify(v))}catch(e){}}
function pairKey(a,b){return [a,b].sort().join('|')}
function uname(id){const u=S.users.find(x=>x.id===id);return u?u.nome:'(usuário removido)'}
async function loadSocial(){
  if(!USER)return;
  try{const n=await sb.from('notificacoes').select('id,data,created_at').order('created_at',{ascending:false}).limit(150);
    NOTIFS=n.error?[]:(n.data||[]).map(r=>limpa({...(r.data&&typeof r.data==='object'?r.data:{}),id:String(r.id),em:r.created_at||(r.data&&r.data.em)},'')).filter(x=>{x.para=lst(x.para);x.texto=txt(x.texto);x.de=txt(x.de);return x.para.includes(USER.id)}).sort((a,b)=>a.em<b.em?1:-1)}catch(e){}
  try{const since=new Date(Date.now()-7*864e5).toISOString();const m=await sb.from('mensagens').select('id,de,para,texto,created_at').gte('created_at',since).order('created_at',{ascending:true});
    MSGS=m.error?[]:(m.data||[]).map(x=>limpa(x,'')).filter(x=>x&&typeof x.de==='string'&&typeof x.para==='string'&&typeof x.texto==='string'&&typeof x.created_at==='string'&&x.created_at>=since&&(isAdm(USER)||x.de===USER.id||x.para===USER.id)).sort((a,b)=>a.created_at<b.created_at?-1:1)}catch(e){}
  updBell();if(!$('notif-modal').hidden&&$('notif-modal').classList.contains('on'))renderNotif();
}
function unread(){const sn=seenGet('n','');const sm=seenGet('m',{});
  const n=NOTIFS.filter(x=>x.em>sn).length;const m=MSGS.filter(x=>x.para===USER.id&&x.created_at>(sm[pairKey(x.de,x.para)]||'')).length;return {n,m}}
function updBell(){if(!USER)return;const u=unread();const t=u.n+u.m;$('bell-badge').hidden=!t;$('bell-badge').textContent=t>99?'99+':t;
  $('nt-n-b').hidden=!u.n;$('nt-n-b').textContent=u.n;$('nt-m-b').hidden=!u.m;$('nt-m-b').textContent=u.m}
function notify(tipo,texto,para,extra){
  const ids=[...new Set((para||[]).filter(id=>id&&(!USER||id!==USER.id)))];if(!ids.length)return;
  sb.from('notificacoes').insert({id:uid(),data:{tipo,texto,para:ids,de:USER?USER.nome:'SISMED',em:new Date().toISOString(),...(extra||{})}}).then(()=>{},()=>{});
}
function destRest(ctId){return S.users.filter(u=>ativoOk(u)&&(u.perms||[]).includes('rest.validar')&&(!u.contratadas||!u.contratadas.length||u.contratadas.includes(ctId))).map(u=>u.id)}
function destSup(){return S.users.filter(u=>ativoOk(u)&&((u.perms||[]).includes('sup.bm')||(u.perms||[]).includes('sup.ver')||isAdm(u))).map(u=>u.id)}
$('bell').onclick=()=>{const u=unread();NTAB=u.n?'n':u.m?'m':NTAB;MSG_PAIR=null;$('notif-modal').classList.add('on');renderNotif()};
$('notif-close').onclick=()=>{$('notif-modal').classList.remove('on');MSG_PAIR=null};
$('notif-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{NTAB=b.dataset.nt;MSG_PAIR=null;renderNotif()});
function renderNotif(){
  $('notif-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.nt===NTAB));
  const B=$('notif-body');
  if(NTAB==='n'){
    const sn=seenGet('n','');
    B.innerHTML=NOTIFS.length?NOTIFS.map(x=>`<div class="nitem${x.em>sn?'':' lida'}"><span class="dot"></span><div class="t">${esc(x.texto)}<small>${brdt(x.em)} · ${esc(x.de||'')}</small></div>${x.bmId&&S.bms.find(b=>b.id===x.bmId)?`<button class="btn sec sm" data-nbm="${esc(x.bmId)}">Abrir BM</button>`:''}${x.tipo==='conta.pendente'&&can('cfg.usuarios')?`<button class="btn sec sm" data-npend="1">Ver solicitação</button>`:''}</div>`).join(''):'<div class="small muted" style="padding:10px 0">Nenhuma notificação.</div>';
    B.querySelectorAll('[data-nbm]').forEach(b=>b.onclick=()=>{$('notif-modal').classList.remove('on');openBM(S.bms.find(x=>x.id===b.dataset.nbm))});
    B.querySelectorAll('[data-npend]').forEach(b=>b.onclick=()=>{$('notif-modal').classList.remove('on');CFGTAB='usuarios';go('cfg')});
    seenSet('n',new Date().toISOString());updBell();return;
  }
  // mensagens
  const outros=S.users.filter(u=>ativoOk(u)&&u.id!==USER.id).sort((a,b)=>a.nome.localeCompare(b.nome));
  if(MSG_PAIR){
    const [a,b]=MSG_PAIR.split('|');const parte=a===USER.id||b===USER.id;const other=a===USER.id?b:a;
    const l=MSGS.filter(m=>pairKey(m.de,m.para)===MSG_PAIR);
    B.innerHTML=`<div class="row" style="justify-content:space-between;margin-bottom:8px"><button class="btn sec sm" id="msg-back">‹ Conversas</button><b>${parte?esc(uname(other)):esc(uname(a))+' ↔ '+esc(uname(b))}</b></div>
      ${parte?'':'<div class="notice info small" style="margin-bottom:8px">Visualização de administrador — somente leitura.</div>'}
      <div class="thread" id="msg-thread">${l.map(m=>`<div class="bub${m.de===USER.id?' mine':''}">${parte?'':`<b style="font-size:11.5px">${esc(uname(m.de))}</b><br>`}${esc(m.texto)}<small>${brdt(m.created_at)}</small></div>`).join('')||'<div class="small muted">Sem mensagens nos últimos 7 dias.</div>'}</div>
      ${parte?`<div class="row" style="flex-wrap:nowrap;margin-top:8px"><textarea id="msg-reply" rows="2" maxlength="1000" placeholder="Escreva uma mensagem…"></textarea><button class="btn" id="msg-send-r">Enviar</button></div>`:''}`;
    $('msg-back').onclick=()=>{MSG_PAIR=null;renderNotif()};
    const th=$('msg-thread');th.scrollTop=th.scrollHeight;
    if(parte){$('msg-send-r').onclick=()=>sendMsg(other,$('msg-reply').value,$('msg-send-r'));const sm=seenGet('m',{});sm[MSG_PAIR]=new Date().toISOString();seenSet('m',sm);updBell()}
    return;
  }
  const pares={};MSGS.forEach(m=>{const k=pairKey(m.de,m.para);(pares[k]=pares[k]||[]).push(m)});
  const sm=seenGet('m',{});
  const lista=Object.entries(pares).map(([k,l])=>({k,l,last:l[l.length-1]})).sort((x,y)=>x.last.created_at<y.last.created_at?1:-1);
  B.innerHTML=`<div class="card" style="padding:12px;margin-bottom:12px"><div class="stack" style="gap:8px">
      <div class="field"><label for="msg-to">Enviar mensagem para</label><select id="msg-to"><option value="">Selecione o usuário…</option>${outros.map(u=>`<option value="${esc(u.id)}">${esc(u.nome)} — ${esc(u.tipo||u.perfil||'')}</option>`).join('')}</select></div>
      <textarea id="msg-text" rows="2" maxlength="1000" placeholder="Mensagem (guardada por 7 dias; visível para vocês dois e para o administrador)"></textarea>
      <div class="row" style="justify-content:flex-end"><button class="btn" id="msg-send">Enviar</button></div></div></div>
    <div class="small muted" style="margin-bottom:6px">${isAdm(USER)?'Como administrador, você vê todas as conversas (somente leitura). ':''}As mensagens são apagadas depois de 7 dias e podem ser consultadas pelo administrador do sistema.</div>
    <div class="stack" style="gap:6px">${lista.map(({k,l,last})=>{const [a,b]=k.split('|');const parte=a===USER.id||b===USER.id;const other=a===USER.id?b:a;const nu=l.filter(m=>m.para===USER.id&&m.created_at>(sm[k]||'')).length;
      return `<button class="conv" data-pair="${esc(k)}"><div class="avatar">${ini(parte?uname(other):uname(a))}</div><div class="t"><b>${parte?esc(uname(other)):esc(uname(a))+' ↔ '+esc(uname(b))}</b><span>${esc(last.texto)}</span></div><span class="small muted num">${hm(last.created_at)}</span>${nu?`<span class="badge">${nu}</span>`:''}</button>`}).join('')||'<div class="small muted">Nenhuma conversa nos últimos 7 dias.</div>'}</div>`;
  $('msg-send').onclick=()=>sendMsg($('msg-to').value,$('msg-text').value,$('msg-send'),true);
  B.querySelectorAll('[data-pair]').forEach(b=>b.onclick=()=>{MSG_PAIR=b.dataset.pair;renderNotif()});
}
async function sendMsg(para,texto,btn,abrir){
  texto=(texto||'').trim();if(!para){toast('Selecione o destinatário');return}if(!texto){toast('Escreva a mensagem');return}
  btn.disabled=true;
  const {error}=await sb.from('mensagens').insert({id:uid(),de:USER.id,para,texto:texto.slice(0,1000)});
  btn.disabled=false;
  if(error){toast('Não foi possível enviar: '+error.message);return}
  sucesso('Mensagem enviada');await loadSocial();if(abrir)MSG_PAIR=pairKey(USER.id,para);renderNotif();
}
setInterval(()=>{if(USER&&!document.hidden)loadSocial()},30000);

/* =================== NAV =================== */
const ICONS={ana:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 20h18M6 16v-4M11 16V7M16 16v-7M21 16V4"/></svg>',aud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>',rest:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3M4 12h16"/></svg>',
 sup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/></svg>',
 cfg:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>'};
function navItems(){
  const it=[];
  if(['rest.registrar','rest.sobras','rest.estornar'].some(can))it.push({id:'rest',n:'Restaurante'});
  if(can('sup.ver')||can('sup.bm'))it.push({id:'sup',n:'Administrativo'});
  if(can('ana.ver'))it.push({id:'ana',n:'Analítico'});
  if(can('aud.ver'))it.push({id:'aud',n:'Auditoria'});
  if(['cfg.usuarios','cfg.colab','cfg.empresas','cfg.obras','cfg.contratos','cfg.precos','cfg.contratada','cfg.horarios'].some(can))it.push({id:'cfg',n:'Configurações'});
  return it;
}
let PAGE=null;
function buildNav(){
  const it=navItems();const h=it.map(i=>`<button data-p="${esc(i.id)}">${ICONS[i.id]}<span>${i.n}</span><span class="badge" data-badge="${esc(i.id)}" hidden></span></button>`).join('');
  $('tabbar').innerHTML=h;$('sidenav').innerHTML='<div class="nav-title">Menu</div>'+h+`<button class="nav-user" id="nav-user" type="button" aria-haspopup="true"><span class="av">${ini(USER.nome)}</span><span class="nm"><span class="nm-top"><b>${esc(USER.nome)}</b><span class="sync" data-sync></span></span><span>${esc(USER.tipo||USER.perfil||'')}</span></span><span style="color:var(--nav-ink)">▴</span></button>`;
  document.querySelectorAll('#tabbar button,#sidenav button[data-p]').forEach(b=>b.onclick=()=>go(b.dataset.p));
  $('nav-user').onclick=e=>userMenu(e.currentTarget);applySync();
  refreshBadges();
  go(it[0]?it[0].id:null);
}
function pendRest(){return S.bms.filter(b=>b.status==='fechado'&&ctOk(ctOf(b)))}
function pendSup(){return S.bms.filter(b=>b.status==='assinado_restaurante'&&ctOk(ctOf(b)))}
function refreshBadges(){const n={rest:can('rest.validar')?pendRest().length:0,sup:can('sup.bm')?pendSup().length:0};
  document.querySelectorAll('[data-badge]').forEach(e=>{const v=n[e.dataset.badge]||0;e.hidden=!v;e.textContent=v})}
function go(p){
  if(p&&p!==PAGE&&USER){PAGE=p;audit('nav',ABAS[p]||p);save()}
  PAGE=p;
  document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id==='page-'+p));
  document.querySelectorAll('#tabbar button,#sidenav button').forEach(b=>b.classList.toggle('on',b.dataset.p===p));
  if(p==='rest')renderRest();if(p==='sup')renderSup();if(p==='cfg')renderCfg();if(p==='aud')renderAud();if(p==='ana')renderAna();vizTipHide();
}

/* =================== SCANNER (shared) =================== */
let SCAN_CB=null, stream=null, scanTimer=null, canvas=null;
function camMsg(m){const e=$('cam-msg');e.hidden=!m;e.textContent=m||''}
function openScanner(title,cb){SCAN_CB=cb;$('scan-title').textContent=title;$('scan-manual').value='';camMsg('');$('scan-modal').classList.add('on');startCam()}
function closeScanner(){stopCam();$('scan-modal').classList.remove('on');SCAN_CB=null}
function scanned(code){code=(code||'').trim();if(!code)return;const cb=SCAN_CB;closeScanner();if(cb)cb(code)}
async function startCam(){
  stopCam();
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){camMsg('Câmera indisponível neste navegador. Use a foto do crachá ou digite o código.');$('scan-idle').innerHTML='<div class="small">Sem câmera</div>';return}
  try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}})}
  catch(e){camMsg('A câmera não pôde ser aberta aqui (o visualizador de artefatos bloqueia câmera; no celular, abra o arquivo HTML e permita o acesso). Use a foto do crachá ou digite o código.');$('scan-idle').innerHTML='<div class="small">Câmera bloqueada</div>';stream=null;return}
  const v=$('video');v.srcObject=stream;v.hidden=false;$('scan-idle').hidden=true;$('scan-frame').hidden=false;
  await v.play();
  const det=('BarcodeDetector' in window)?new BarcodeDetector({formats:['qr_code']}):null;
  if(!canvas)canvas=document.createElement('canvas');
  scanTimer=setInterval(async()=>{
    if(!stream||!v.videoWidth)return;
    try{
      if(det){const codes=await det.detect(v);if(codes.length){scanned(codes[0].rawValue);return}}
      if(typeof jsQR==='function'){canvas.width=v.videoWidth;canvas.height=v.videoHeight;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(v,0,0);
        const img=ctx.getImageData(0,0,canvas.width,canvas.height);const r=jsQR(img.data,img.width,img.height,{inversionAttempts:'dontInvert'});if(r&&r.data){scanned(r.data)}}
    }catch(e){}
  },350);
}
function stopCam(){clearInterval(scanTimer);scanTimer=null;if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
  const v=$('video');v.hidden=true;v.srcObject=null;$('scan-idle').hidden=false;$('scan-idle').innerHTML='<div class="small">Iniciando câmera…</div>';$('scan-frame').hidden=true}
$('scan-close').onclick=closeScanner;$('btn-cam-retry').onclick=startCam;
$('scan-manual-go').onclick=()=>scanned($('scan-manual').value);
$('scan-manual').addEventListener('keydown',e=>{if(e.key==='Enter')scanned(e.target.value)});
$('qr-file').onchange=async e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  try{
    const bmp=await createImageBitmap(f);
    if('BarcodeDetector' in window){const codes=await new BarcodeDetector({formats:['qr_code']}).detect(bmp);if(codes.length){scanned(codes[0].rawValue);return}}
    if(typeof jsQR==='function'){const c=document.createElement('canvas');const scale=Math.min(1,1200/Math.max(bmp.width,bmp.height));c.width=Math.round(bmp.width*scale);c.height=Math.round(bmp.height*scale);const ctx=c.getContext('2d');ctx.drawImage(bmp,0,0,c.width,c.height);
      const img=ctx.getImageData(0,0,c.width,c.height);const r=jsQR(img.data,img.width,img.height);if(r&&r.data){scanned(r.data);return}}
    camMsg('Nenhum QR Code encontrado na foto. Tente aproximar e manter o código nítido.');
  }catch(err){camMsg('Não foi possível ler a foto.')}
};

/* =================== RESTAURANTE =================== */
let CUR=null, CURTIPO=null;
function suggestTipo(){const H=horarios();if(H.ativo){const ok=TIPOS.find(t=>janela(t.id)&&!horarioErro(t.id));if(ok)return ok.id}const h=new Date().getHours();return h<10?'cafe':h<15?'almoco':h<17?'lanche':'jantar'}
let REST_CT=null;try{REST_CT=localStorage.getItem('sismed_rest_ct')}catch(e){}
function restCt(){const l=ctsAcessiveis();if(!l.find(c=>c.id===REST_CT))REST_CT=l[0]?l[0].id:null;return REST_CT?ct(REST_CT):null}
$('rest-ct').onchange=()=>{REST_CT=$('rest-ct').value;try{localStorage.setItem('sismed_rest_ct',REST_CT)}catch(e){}CUR=null;$('confirm-card').hidden=true;renderRest()};
function renderRest(bg){ // bg=true: redesenho em segundo plano (atualização periódica, foto enviada) — não apaga a mensagem do formulário
  ctMigrarLegado();const RC=restCt();
  fillSelect($('rest-ct'),ctsAcessiveis(),REST_CT);$('rest-ct-wrap').hidden=ctsAcessiveis().length<2;
  const t=today();const d=parse(t);
  $('rest-date').textContent=`${WD[d.getDay()]}, ${br(t)} · operador: ${USER.nome}${RC?' · restaurante: '+RC.nome:''}`;
  renderHorariosRest();
  const missing=[];if(!RC)missing.push('uma contratada (restaurante) vinculada às obras');if(!S.colab.length)missing.push('colaboradores');if(!S.precos.length)missing.push('preços das refeições');
  $('rest-setup').hidden=!missing.length;$('rest-setup').textContent=missing.length?`Antes de registrar refeições, cadastre em Configurações: ${missing.join(' e ')}.`:'';
  setupDateManual('dm');
  const regs=S.registros.filter(r=>r.data===t&&regOk(r)&&(!RC||ctOf(r)===RC.id));
  const sobHoje=(S.sobras||[]).filter(s=>s.data===t&&sobraOk(s)&&(!RC||ctOf(s)===RC.id));
  $('rest-tiles').innerHTML=TIPOS.map(tp=>{const l=regs.filter(r=>r.tipo===tp.id);const so=sobHoje.filter(s=>s.tipo===tp.id);const ns=so.reduce((a,s)=>a+s.qtd,0);const v=l.reduce((a,r)=>a+r.valor,0)+so.reduce((a,s)=>a+sobraTotal(s),0);return `<div class="tile ${tp.id}"><div class="k">${tp.curto} hoje</div><div class="v num">${l.length+ns}</div><div class="s num">${money(v)}${ns?` · inclui ${ns} sobra${ns>1?'s':''}`:''}</div></div>`}).join('');
  const recent=S.registros.filter(r=>regOk(r)&&(!RC||ctOf(r)===RC.id)&&(r.data===t||r.registradoEm.slice(0,10)===t)).sort((a,b)=>a.registradoEm<b.registradoEm?1:-1).slice(0,12);
  // notificações de BM fechado
  const pend=pendRest();$('rest-notif').hidden=!(pend.length&&can('rest.validar'));
  $('rest-notif-list').innerHTML=pend.map(b=>`<div class="item"><span class="pill warn">Atenção</span><div class="t"><b>BM nº ${esc(b.numero)} — ${esc(b.empresaNome)}</b><span>${esc(bmK(b).nome)} · Período ${br(b.ini)} à ${br(b.fim)} fechado em ${brdt(b.fechadoEm)} · ${esc(b.qtd)} refeições · ${money(b.liquido)}</span></div><button class="btn sm" data-vbm="${esc(b.id)}">Ver e validar</button></div>`).join('');
  $('rest-notif-list').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  const itensRec=recent.map(r=>({em:r.registradoEm,r})).concat(sobHoje.map(o=>({em:o.registradoEm,o}))).sort((a,b)=>a.em<b.em?1:-1).slice(0,12);
  $('rest-recent').innerHTML=itensRec.length?itensRec.map(({r,o})=>o?sobraItemRec(o):`<div class="item"><div class="avatar">${ini(r.nome)}</div><div class="t"><b>${esc(r.nome)} ${modPill(r)}${fotoPill(r)}${r.dataManual?' <span class="pill warn">data '+br(r.data)+'</span>':''}</b><span>${esc(r.empresaNome)} · ${esc(r.obraNome||'obra não informada')}${modOf(r)==='retirada'?' · '+esc(retInfo(r)):''}${r.terceirizada?' · terc.: '+esc(r.terceirizada):''} · ${hm(r.registradoEm)}</span></div><span class="pill ${r.tipo}">${tipo(r.tipo).curto}</span>${r.fechado?'<span class="pill bad">fechada</span>':can('rest.estornar')&&!r.bmId?`<button class="btn sec sm" data-undo="${esc(r.id)}">Estornar</button>`:''}</div>`).join(''):'<div class="small muted">Nenhum registro hoje ainda.</div>';
  $('rest-recent').querySelectorAll('[data-rsdel]').forEach(b=>b.onclick=()=>excluirSobra(b.dataset.rsdel,renderRest));
  $('rest-recent').querySelectorAll('[data-undo]').forEach(b=>b.onclick=()=>{const rr=S.registros.find(r=>r.id===b.dataset.undo);S.registros=S.registros.filter(r=>r.id!==b.dataset.undo);if(rr)audit('refeicao.estornar',`${tipo(rr.tipo).curto} de ${rr.nome} (${money(rr.valor)}) registrada às ${hm(rr.registradoEm)}`,{obra:rr.obraNome,empresa:rr.empresaNome,entidade:'registro '+rr.id});concluir('Registro estornado');renderRest()});
  $('btn-scan-rest').disabled=!can('rest.registrar');$('qr-manual-go').disabled=!can('rest.registrar');
  // registro manual (terceirizados sem QR)
  $('manual-card').hidden=!(can('rest.registrar')||can('rest.sobras'));renderManual(bg===true);
  // sobras (modalidade "Sobras" do Registro manual)
  const sob=sobHoje.slice().sort((a,b)=>a.registradoEm<b.registradoEm?1:-1);
  $('sobras-list').innerHTML=sob.length?sob.map(s=>{const bm=s.bmId?S.bms.find(x=>x.id===s.bmId):null;return `<div class="item"><span class="pill ${s.tipo}">${tipo(s.tipo).curto}</span><div class="t"><b>${esc(s.qtd)} ${s.qtd===1?'refeição':'refeições'} — ${esc(s.colabNome)}</b><span>${esc(s.empresaNome||'empresa não informada')} · ${esc(s.obraNome||'obra não informada')} · ${money(sobraTotal(s))} · ${hm(s.registradoEm)}</span></div>${bm?`<span class="pill neutral">BM ${esc(bm.numero)}</span>`:can('del.sobras')?`<button class="btn sec sm" data-sdel="${esc(s.id)}">Excluir</button>`:''}</div>`}).join(''):'<div class="small muted">Nenhuma sobra informada hoje.</div>';
  $('sobras-list').querySelectorAll('[data-sdel]').forEach(b=>b.onclick=()=>excluirSobra(b.dataset.sdel,renderRest));
}
function sobraItemRec(o){const bm=o.bmId?S.bms.find(x=>x.id===o.bmId):null;
  return `<div class="item"><div class="avatar sobra" title="Sobra de refeição">S</div><div class="t"><b>Sobra — ${esc(o.qtd)} ${o.qtd===1?'refeição':'refeições'}${o.colabNome?' · '+esc(o.colabNome):''} <span class="pill warn">sobra</span></b><span>${esc(o.empresaNome||'empresa não informada')} · ${esc(o.obraNome||'obra não informada')} · ${money(sobraTotal(o))} · ${hm(o.registradoEm)}</span></div><span class="pill ${o.tipo}">${tipo(o.tipo).curto}</span>${bm?`<span class="pill neutral">BM ${esc(bm.numero)}</span>`:can('del.sobras')?`<button class="btn sec sm" data-rsdel="${esc(o.id)}">Excluir</button>`:''}</div>`}
/* ---- data manual (permissão rest.data_manual) ---- */
function regDate(prefix){const chk=$(prefix+'-check'),dt=$(prefix+'-date');if(can('rest.data_manual')&&chk&&chk.checked&&dt&&dt.value&&dt.value<=today())return dt.value;return today()}
function setupDateManual(prefix){const row=$(prefix+'-row'),chk=$(prefix+'-check'),dt=$(prefix+'-date');row.hidden=!can('rest.data_manual');dt.max=today();dt.min=addDays(today(),-90);if(!dt.value)dt.value=today();
  chk.onchange=()=>{dt.hidden=!chk.checked;if(prefix==='dm'&&CUR)renderMeal();if(prefix==='mdm')renderManual()};dt.onchange=()=>{if(dt.value>today())dt.value=today();if(prefix==='dm'&&CUR)renderMeal();if(prefix==='mdm')renderManual()}}
function lookup(code){
  code=(code||'').trim();if(!code)return;
  const c=S.colab.find(x=>x.qr.toLowerCase()===code.toLowerCase());
  if(!c){toast('QR Code não cadastrado: '+code.slice(0,40));CUR=null;$('confirm-card').hidden=true;return}
  if(!c.ativo){toast('Colaborador inativo — procure o Suprimentos');return}
  const ce=emp(c.empresaId);if(ce&&ce.ativo===false){toast(`Empresa ${ce.nome} está inativa — refeição não registrada`);return}
  if(!obraOk(c.obraId)){toast('Colaborador de obra fora do seu acesso');return}
  const oe=obraEmpErro(c.empresaId,c.obraId);if(oe){toast(`${c.nome}: ${oe} Realoque o colaborador em Configurações › Colaboradores — refeição não registrada.`,'bad');return}
  const RC=restCt();if(!RC){toast('Nenhuma contratada (restaurante) cadastrada ou liberada para você');return}
  if(!(RC.obras||[]).includes(c.obraId)){const o=obra(c.obraId);toast(`O restaurante ${RC.nome} não atende a obra ${o?o.nome:''} deste colaborador`);return}
  CUR=c;CURTIPO=suggestTipo();fotoReset();
  $('confirm-card').hidden=false;
  renderColabCard();renderMeal();
  $('confirm-card').scrollIntoView({behavior:'smooth',block:'nearest'});
  fotoAbrir();
}
function renderColabCard(){
  if(!CUR)return;const c=CUR,e=emp(c.empresaId),o=obra(c.obraId);
  $('colab-card').innerHTML=`${FOTO.thumb?`<img class="fotothumb" src="${FOTO.thumb}" alt="Foto de ${esc(c.nome)}">`:`<div class="avatar">${ini(c.nome)}</div>`}<div><b>${esc(c.nome)}</b><div class="meta">${esc(e?e.nome:'—')}<br>${esc(o?o.nome:'—')} · <span class="mono">${esc(c.qr)}</span></div></div>`;
  $('foto-slot').innerHTML=FOTO.raw?`<div class="row" style="gap:10px"><span class="pill ok">📷 Foto tirada</span><button type="button" class="linkbtn" id="fs-tirar">Refazer foto</button></div>`
    :FOTO.skip?`<div class="row" style="gap:8px"><span class="pill warn">Sem foto</span><span class="small">${esc(FOTO.skip)}</span><button type="button" class="linkbtn" id="fs-tirar">Tirar foto</button></div>`
    :`<button type="button" class="btn sec" id="fs-tirar" style="width:100%">📸 Tirar foto do colaborador <span class="small muted">(obrigatória)</span></button>`;
  $('fs-tirar').onclick=()=>fotoAbrir();
}
function renderMeal(){
  const t=regDate('dm');const regs=S.registros.filter(r=>r.data===t&&r.colabId===CUR.id);
  $('mealbtns').innerHTML=TIPOS.map(tp=>{const done=regs.find(r=>r.tipo===tp.id);const p=precoVigente(tp.id,t,cidOf(CUR.obraId));const her=horarioErro(tp.id,t);const off=done||p===null||her;const jn=janela(tp.id);
    return `<button class="mealbtn${CURTIPO===tp.id?' on':''}" data-t="${esc(tp.id)}" ${off?'disabled':''}>${tp.curto}<small>${done?'já registrado '+hm(done.registradoEm):p===null?'sem preço cadastrado':her?'fora do horário '+esc(jn.ini+'–'+jn.fim):money(p)}</small></button>`}).join('');
  $('mealbtns').querySelectorAll('button').forEach(b=>b.onclick=()=>{CURTIPO=b.dataset.t;renderMeal()});
  const dup=regs.find(r=>r.tipo===CURTIPO);const p=precoVigente(CURTIPO,t,cidOf(CUR.obraId));const cerr=contratoErro(CUR.obraId,t);
  const herr=horarioErro(CURTIPO,t);
  $('dup-msg').hidden=!(dup||p===null||cerr||herr);
  if(cerr)$('dup-msg').textContent=cerr;
  else if(herr)$('dup-msg').textContent=herr+' Escolha outro tipo ou procure o administrador.';
  else if(dup)$('dup-msg').textContent=`${tipo(CURTIPO).curto} já registrado em ${br(t)} às ${hm(dup.registradoEm)}. Escolha outro tipo ou cancele.`;
  else if(p===null)$('dup-msg').textContent=`${tipo(CURTIPO).curto} não tem preço cadastrado. Cadastre em Configurações › Preços.`;
  $('btn-confirm').disabled=!!dup||p===null||!!cerr||!!herr||!(FOTO.raw||FOTO.skip);
}
$('btn-confirm').onclick=async()=>{
  if(!CUR||!CURTIPO||FOTO.busy)return;if(!(FOTO.raw||FOTO.skip)){fotoAbrir();return}
  const c=CUR,tp=CURTIPO,raw=FOTO.raw,skip=FOTO.skip;const t=regDate('dm');const p=precoVigente(tp,t,cidOf(c.obraId));const manualDate=t!==today();
  const dup=()=>S.registros.some(r=>r.data===t&&r.colabId===c.id&&r.tipo===tp);
  if(p===null||contratoErro(c.obraId,t)||dup())return;
  const herr=horarioErro(tp,t);if(herr){toast(herr,'warn');renderMeal();return}
  const e=emp(c.empresaId),o=obra(c.obraId);
  const RC=restCt();if(!RC)return;
  const reg={id:uid(),data:t,colabId:c.id,modalidade:'presencial',nome:c.nome,empresaId:c.empresaId,empresaNome:e?e.nome:'',obraId:c.obraId,obraNome:o?o.nome:'',contratoId:cidOf(c.obraId)||undefined,contratoNumero:(contrato(cidOf(c.obraId))||{}).numero||undefined,contratadaId:RC.id,contratadaNome:RC.nome,tipo:tp,valor:p,registradoEm:new Date().toISOString(),usuario:USER.nome,bmId:null,dataManual:manualDate||undefined};
  let item=null;
  if(raw){
    // 1º prepara e guarda a foto no aparelho; só depois grava o registro (sem espera entre gravar e sincronizar)
    FOTO.busy=true;$('btn-confirm').disabled=true;$('btn-cancel').disabled=true;
    try{const g=await fotoGerar(raw,fotoLinhas(reg));const fp=`${ymd(new Date(reg.registradoEm))}/${reg.id}.${g.ext}`;reg.foto={p:fp};
      item={p:fp,tipo:g.tipo,c:await g.c.arrayBuffer(),a:await g.a.arrayBuffer(),em:reg.registradoEm};await fotoEnfileirar(item)}
    catch(err){FOTO.busy=false;$('btn-cancel').disabled=false;if(CUR===c)renderMeal();toast('Não foi possível processar a foto: '+(err.message||err)+'. Tire a foto novamente.','bad');return}
    FOTO.busy=false;$('btn-cancel').disabled=false;
  }else reg.semFoto=skip;
  if(dup()){fotoDescartar(item);if(CUR===c)renderMeal();return}
  S.registros.push(reg);
  audit('refeicao.registrar',`${tipo(tp).curto} — ${c.nome} (${money(p)})${manualDate?' — DATA MANUAL '+br(t):''}${reg.semFoto?' — SEM FOTO: '+reg.semFoto:' — com foto'}`,{obra:o?o.nome:'',empresa:e?e.nome:'',entidade:'colaborador '+c.qr});
  concluir(`${tipo(tp).curto} registrado — ${c.nome.split(' ')[0]}${manualDate?' ('+br(t)+')':''}${reg.semFoto?' (sem foto)':''}`);
  if(CUR===c){CUR=null;fotoReset();$('confirm-card').hidden=true;$('qr-manual').value=''}
  renderRest();
  if(item)fotoEnviar();
};
$('btn-cancel').onclick=()=>{CUR=null;fotoReset();$('confirm-card').hidden=true};
/* ---- registro manual: Retirada (alguém leva a refeição de outro) ou Terceirizado (sem QR Code) ---- */
let MTIPO=null,MMOD='',MRET=null;
/* foto de quem está retirando (v2.4): vale para a pessoa identificada em "Quem está retirando" — se ela mudar, a foto é descartada */
let MFOTO={raw:null,thumb:null,skip:null,key:null,em:0,busy:false};const MFOTO_MIN=10; // minutos de validade da foto/justificativa ainda não usada
function retKey(){return MRET?(MRET.colabId?'c:'+MRET.colabId:'n:'+MRET.nome.toLowerCase()):null}
function mfotoReset(){MFOTO.raw=null;MFOTO.thumb=null;MFOTO.skip=null;MFOTO.key=null;MFOTO.em=0}
function mfotoVelha(){return !!(MFOTO.raw||MFOTO.skip)&&Date.now()-MFOTO.em>MFOTO_MIN*60000}
function renderRetFoto(){
  const el=$('m-foto-slot');
  el.innerHTML=MFOTO.raw?`<div class="row" style="gap:10px;flex-wrap:nowrap"><img class="fotothumb" src="${MFOTO.thumb}" alt="Foto de quem está retirando"><div><span class="pill ok">📷 Foto tirada</span><div style="margin-top:4px"><button type="button" class="linkbtn" id="mf-tirar">Refazer foto</button></div></div></div>`
    :MFOTO.skip?`<div class="row" style="gap:8px"><span class="pill warn">Sem foto</span><span class="small">${esc(MFOTO.skip)}</span><button type="button" class="linkbtn" id="mf-tirar">Tirar foto</button></div>`
    :`<button type="button" class="btn sec" id="mf-tirar" style="width:100%;white-space:normal;flex-wrap:wrap;text-align:center;line-height:1.3">📸 Tirar foto de quem está retirando <span class="small muted">(obrigatória)</span></button>`;
  $('mf-tirar').onclick=()=>fotoAbrirRet();
}
function fotoAbrirRet(depois){
  resolveRet();const msg=$('m-msg');
  if(!MRET){msg.hidden=false;msg.textContent='Informe quem está retirando (QR Code do crachá ou nome) antes de tirar a foto.';$('m-ret').focus();return}
  const r={...MRET},k=retKey();const e=emp($('m-emp').value),o=obra($('m-obra').value),d=S.colab.find(c=>c.id===$('m-dest').value);
  fotoAbrir({titulo:'Foto de quem está retirando',nome:r.nome,
    quem:`<b>${esc(r.nome)}</b> · retirando a refeição${d?' de <b>'+esc(d.nome)+'</b>':''}`,
    aviso:`A retirada feita por <b>${esc(r.nome)}</b> ficará marcada como <b>sem foto</b>`,
    usarTxt:depois?'✓ Usar esta foto e registrar':'',
    linhas:()=>fotoLinhas({registradoEm:new Date().toISOString(),modalidade:'retirada',retiradoPor:r,empresaNome:e&&e.nome,obraNome:o&&o.nome,nome:d?d.nome:''},true),
    vale:()=>MMOD==='retirada'&&retKey()===k,
    usar:raw=>{MFOTO.raw=raw;MFOTO.skip=null;MFOTO.key=k;MFOTO.em=Date.now();MFOTO.thumb=fotoThumb(raw);msg.hidden=true;renderRetFoto();if(depois)depois()},
    pular:m=>{MFOTO.raw=null;MFOTO.thumb=null;MFOTO.skip=m;MFOTO.key=k;MFOTO.em=Date.now();msg.hidden=true;renderRetFoto();if(depois)depois()},
    fechar:()=>{renderRetFoto();if(depois&&!(MFOTO.raw||MFOTO.skip)){msg.hidden=false;msg.textContent='A foto de quem está retirando é obrigatória. Tire a foto ou registre sem foto, com justificativa.'}}});
}
const MODS=Object.assign(Object.create(null),{presencial:'Presencial',retirada:'Retirada',terceirizado:'Terceirizado'});
function modOf(r){const m=r.modalidade||(r.manual?'terceirizado':'presencial');return typeof m==='string'&&m in MODS?m:(r.manual?'terceirizado':'presencial')}
function modPill(r){const m=modOf(r);return `<span class="pill mod-${m}">${MODS[m]}</span>`}
function retInfo(r){const x=r.retiradoPor||{};return `retirada por ${x.nome||'—'}${x.qr?' (QR '+x.qr+')':' (digitado)'}`}
function resolveRet(){
  const v=$('m-ret').value.trim();const c=v?S.colab.find(x=>x.qr.toLowerCase()===v.toLowerCase()):null;const el=$('m-ret-info');
  if(c){const e=emp(c.empresaId);MRET={nome:c.nome,qr:c.qr,colabId:c.id};el.innerHTML=`<span class="pill ok">✓ QR Code</span> <b>${esc(c.nome)}</b> <span class="muted">· ${esc(e?e.nome:'—')}</span>`}
  else if(v.length>=3){MRET={nome:v.replace(/\s+/g,' '),qr:null,colabId:null};el.innerHTML=`<span class="pill warn">Digitado</span> <span class="muted">sem QR Code — será registrado o nome informado</span>`}
  else{MRET=null;el.innerHTML=''}
  if((MFOTO.raw||MFOTO.skip)&&MFOTO.key!==retKey()){mfotoReset();toast('Quem está retirando mudou — tire a foto novamente.','warn')}
  renderRetFoto();
}
$('m-ret').addEventListener('input',resolveRet);
$('m-ret-scan').onclick=()=>openScanner('Ler QR Code de quem está retirando',code=>{const c=S.colab.find(x=>x.qr.toLowerCase()===String(code).trim().toLowerCase());
  if(!c){toast('QR Code não cadastrado: '+String(code).slice(0,40));return}
  if(!c.ativo){toast('Colaborador inativo — procure o Administrativo');return}
  $('m-ret').value=c.qr;mfotoReset();resolveRet();fotoAbrirRet()});
$('m-mod').querySelectorAll('button').forEach(b=>b.onclick=()=>{MMOD=b.dataset.m;$('m-msg').hidden=true;$('s-msg').hidden=true;renderManual()});
function colabOpts(sel,obraId,val){const l=obraId?S.colab.filter(c=>c.ativo&&c.obraId===obraId).sort((a,b)=>a.nome.localeCompare(b.nome)):[];
  sel.innerHTML=(obraId?(l.length?'<option value="">Selecione o colaborador…</option>':'<option value="">Nenhum colaborador ativo nesta obra</option>'):'<option value="">Selecione a obra primeiro</option>')+l.map(c=>`<option value="${esc(c.id)}"${c.id===val?' selected':''}>${esc(c.nome)} — ${esc(c.qr)}</option>`).join('');sel.disabled=!obraId||!l.length}
function renderManual(manter){
  const podeReg=can('rest.registrar'),podeSob=can('rest.sobras');
  $('m-mod').querySelectorAll('button').forEach(b=>{const m=b.dataset.m;b.hidden=(m==='sobras'&&!podeSob)||((m==='retirada'||m==='terceirizado')&&!podeReg);b.classList.toggle('on',m===MMOD)});
  if((MMOD==='sobras'&&!podeSob)||((MMOD==='retirada'||MMOD==='terceirizado')&&!podeReg))MMOD='';
  $('m-sob').hidden=MMOD!=='sobras';if(MMOD==='sobras')renderSobrasForm();
  $('m-body').hidden=!MMOD||MMOD==='sobras';const ret=MMOD==='retirada';
  $('m-ret-wrap').hidden=!ret;$('m-terc-wrap').hidden=ret;$('m-nome-wrap').hidden=ret;$('m-dest-wrap').hidden=!ret;
  $('m-hint-ret').style.display=ret?'':'none';$('m-hint-terc').style.display=ret?'none':'';
  $('m-nome-lbl').textContent=ret?'Refeição destinada a (nome do colaborador — obrigatório)':'Nome do colaborador';
  $('m-save').textContent=ret?'Registrar retirada':'Registrar refeição manual';if(ret)renderRetFoto();
  setupDateManual('mdm');const t=regDate('mdm');if(!MTIPO)MTIPO=suggestTipo();
  fillSelect($('m-emp'),S.empresas.filter(e=>e.ativo!==false),$('m-emp').value);const RC=restCt();const mObras=obrasDaEmpresa($('m-emp').value).filter(o=>RC&&(RC.obras||[]).includes(o.id));fillSelect($('m-obra'),mObras,$('m-obra').value,mObras.length?undefined:'Nenhuma obra desta empresa neste restaurante');
  $('m-emp').onchange=()=>{$('m-obra').value='';renderManual()};
  const man=S.registros.filter(r=>modOf(r)===(ret?'retirada':'terceirizado'));
  const nomes=man.map(r=>r.nome);
  $('manual-names').innerHTML=[...new Set(nomes)].sort().map(n=>`<option value="${esc(n)}">`).join('');
  $('terc-names').innerHTML=[...new Set(man.map(r=>r.terceirizada).filter(Boolean))].sort().map(n=>`<option value="${esc(n)}">`).join('');
  $('m-obra').onchange=renderManual;
  colabOpts($('m-dest'),$('m-obra').value,$('m-dest').value);
  $('m-mealbtns').innerHTML=TIPOS.map(tp=>{const p=precoVigente(tp.id,t,cidOf($('m-obra').value));const her=horarioErro(tp.id,t);const jn=janela(tp.id);return `<button class="mealbtn${MTIPO===tp.id?' on':''}" data-t="${esc(tp.id)}" ${p===null||her?'disabled':''}>${tp.curto}<small>${p===null?'sem preço cadastrado':her?'fora do horário '+esc(jn.ini+'–'+jn.fim):money(p)}</small></button>`}).join('');
  $('m-mealbtns').querySelectorAll('button').forEach(b=>b.onclick=()=>{MTIPO=b.dataset.t;renderManual()});
  if(!manter)$('m-msg').hidden=true;
}
async function salvarManual(){
  if(MFOTO.busy)return;
  const t=regDate('mdm');const manualDate=t!==today();const nome=$('m-nome').value.trim().replace(/\s+/g,' ');const empId=$('m-emp').value,obraId=$('m-obra').value,terc=$('m-terc').value.trim();const msg=$('m-msg');
  const show=m=>{msg.hidden=false;msg.textContent=m};
  const ret=MMOD==='retirada';if(!MMOD)return;const tp=MTIPO;
  if(ret){resolveRet();if(!MRET)return show('Informe quem está retirando: leia o QR Code do crachá ou digite o código / nome (obrigatório).')}
  const dest=ret?S.colab.find(c=>c.id===$('m-dest').value):null;
  if(ret&&!dest)return show('Selecione o colaborador para quem é a refeição (cadastrado).');
  if(!ret&&!nome)return show('Informe o nome do colaborador.');
  if(!empId||!obraId)return show('Selecione a empresa e a obra (a obra precisa ser da empresa e estar vinculada ao restaurante selecionado).');
  const oe=obraEmpErro(empId,obraId);if(oe)return show(oe);
  const RC=restCt();if(!RC)return show('Nenhuma contratada (restaurante) disponível.');
  const cerr=contratoErro(obraId,t);if(cerr)return show(cerr);
  const p=precoVigente(tp,t,cidOf(obraId));if(p===null)return show(`${tipo(tp).curto} não tem preço cadastrado para o contrato desta obra.`);
  const herr=horarioErro(tp,t);if(herr)return show(herr);
  const nomeR=ret?dest.nome:nome;
  const dupF=()=>S.registros.find(r=>r.data===t&&r.tipo===tp&&(ret?r.colabId===dest.id:(r.manual&&r.nome.toLowerCase()===nome.toLowerCase()&&r.empresaId===empId)));
  const dupMsg=d=>`${tipo(tp).curto} de ${nomeR} já registrado em ${br(t)} às ${hm(d.registradoEm)} (${MODS[modOf(d)].toLowerCase()}).`;
  let dup=dupF();if(dup)return show(dupMsg(dup));
  // Retirada: foto de quem está retirando é obrigatória (ou justificativa) — abre a câmera e volta para cá ao concluir
  if(ret&&mfotoVelha()){mfotoReset();renderRetFoto();toast(`A foto foi tirada há mais de ${MFOTO_MIN} minutos — tire novamente.`,'warn')}
  if(ret&&!(MFOTO.raw||MFOTO.skip)){fotoAbrirRet(salvarManual);return}
  const mret=ret?{...MRET}:null,k=ret?retKey():null,raw=ret?MFOTO.raw:null,skip=ret?MFOTO.skip:null;
  const e=emp(empId),o=obra(obraId);
  const reg={id:uid(),data:t,colabId:dest?dest.id:null,manual:true,modalidade:ret?'retirada':'terceirizado',retiradoPor:mret||undefined,nome:nomeR,empresaId:empId,empresaNome:e?e.nome:'',obraId,obraNome:o?o.nome:'',contratoId:cidOf(obraId)||undefined,contratoNumero:(contrato(cidOf(obraId))||{}).numero||undefined,contratadaId:RC.id,contratadaNome:RC.nome,terceirizada:ret?'':terc,tipo:tp,valor:p,registradoEm:new Date().toISOString(),usuario:USER.nome,bmId:null,dataManual:manualDate||undefined};
  let item=null;
  if(raw){
    // 1º prepara e guarda a foto no aparelho; só depois grava o registro (sem espera entre gravar e sincronizar)
    MFOTO.busy=true;$('m-save').disabled=true;
    try{const g=await fotoGerar(raw,fotoLinhas(reg));const fp=`${ymd(new Date(reg.registradoEm))}/${reg.id}.${g.ext}`;reg.foto={p:fp};
      item={p:fp,tipo:g.tipo,c:await g.c.arrayBuffer(),a:await g.a.arrayBuffer(),em:reg.registradoEm};await fotoEnfileirar(item)}
    catch(err){return show('Não foi possível processar a foto: '+(err.message||err)+'. Tire a foto novamente.')}
    finally{MFOTO.busy=false;$('m-save').disabled=false}
    dup=dupF();if(dup){fotoDescartar(item);return show(dupMsg(dup))}
  }else if(ret)reg.semFoto=skip;
  S.registros.push(reg);
  audit('refeicao.registrar',ret?`${tipo(tp).curto} — ${nomeR} (${money(p)}) — RETIRADA por ${mret.nome}${mret.qr?' (QR '+mret.qr+')':' (digitado, sem QR Code)'}${manualDate?' — DATA MANUAL '+br(t):''}${reg.semFoto?' — SEM FOTO: '+reg.semFoto:' — com foto de quem retirou'}`:`${tipo(tp).curto} — ${nome} (${money(p)}) — registro manual, terceirizado${terc?' de '+terc:''}${manualDate?' — DATA MANUAL '+br(t):''}`,{obra:o?o.nome:'',empresa:e?e.nome:'',entidade:ret?'retirada':'registro manual'});
  concluir(ret?`${tipo(tp).curto} registrado — ${nomeR.split(' ')[0]} (retirada por ${mret.nome.split(' ')[0]}${reg.semFoto?', sem foto':''})`:`${tipo(tp).curto} registrado — ${nome.split(' ')[0]} (terceirizado)`);
  msg.hidden=true;
  if(!ret){$('m-nome').value='';$('m-terc').value=''}
  else if(retKey()===k){mfotoReset();$('m-ret').value='';$('m-dest').value='';resolveRet()}
  renderRest();
  if(item)fotoEnviar();
}
$('m-save').onclick=()=>salvarManual();
$('btn-scan-rest').onclick=()=>openScanner('Ler QR Code do crachá',lookup);
$('qr-manual-go').onclick=()=>lookup($('qr-manual').value);
$('qr-manual').addEventListener('keydown',e=>{if(e.key==='Enter')lookup(e.target.value)});
/* sobras: cobradas como refeições consumidas — empresa, obra e colaborador cadastrado obrigatórios */
function renderSobrasForm(){
  const RC=restCt();
  if(!$('s-tipo').options.length)TIPOS.forEach(tp=>{const o=document.createElement('option');o.value=tp.id;o.textContent=tp.curto;$('s-tipo').appendChild(o)});
  fillSelect($('s-emp'),S.empresas.filter(e=>e.ativo!==false),$('s-emp').value,'Selecione…');
  const sObras=obrasDaEmpresa($('s-emp').value).filter(o=>RC&&(RC.obras||[]).includes(o.id));fillSelect($('s-obra'),sObras,$('s-obra').value,$('s-emp').value?(sObras.length?'Selecione…':'Nenhuma obra desta empresa neste restaurante'):'Selecione a empresa primeiro');
  colabOpts($('s-colab'),$('s-obra').value,$('s-colab').value);sobraPrecoHint();
}
$('s-obra').addEventListener('change',()=>colabOpts($('s-colab'),$('s-obra').value,$('s-colab').value));
$('s-emp').addEventListener('change',()=>{$('s-obra').value='';renderSobrasForm()});
function sobraPrecoHint(){
  const el=$('s-preco');if(!el)return;const obraId=$('s-obra').value,tp=$('s-tipo').value,q=parseInt($('s-qtd').value,10)||0;
  if(!obraId||!tp){el.textContent='Selecione empresa e obra para ver o preço cobrado.';return}
  const p=precoVigente(tp,today(),cidOf(obraId));
  el.textContent=p===null?`${tipo(tp).curto} sem preço cadastrado para o contrato desta obra.`:`Preço unitário ${money(p)}${q>0?` · total ${money(Math.round(q*p*100)/100)}`:''} — entra no BM da empresa selecionada.`;
}
['s-emp','s-obra','s-tipo'].forEach(id=>$(id).addEventListener('change',()=>{$('s-msg').hidden=true;sobraPrecoHint()}));$('s-qtd').addEventListener('input',sobraPrecoHint);
$('s-save').onclick=()=>{
  const q=parseInt($('s-qtd').value,10),colSel=S.colab.find(x=>x.id===$('s-colab').value),empId=$('s-emp').value,obraId=$('s-obra').value,tp=$('s-tipo').value,t=today();
  const msg=$('s-msg');const show=m=>{msg.hidden=false;msg.textContent=m};msg.hidden=true;
  if(!empId||!obraId)return show('Informe a empresa e a obra da sobra (obrigatórias).');
  const oeS=obraEmpErro(empId,obraId);if(oeS)return show(oeS);
  if(!(q>0))return show('Informe a quantidade que sobrou.');
  if(!colSel)return show('Selecione o colaborador que sobrou (cadastrado).');
  const RC=restCt();if(!RC)return show('Nenhuma contratada (restaurante) disponível.');
  if(!(RC.obras||[]).includes(obraId))return show(`O restaurante ${RC.nome} não atende esta obra.`);
  const E=emp(empId),o=obra(obraId);if(!E||E.ativo===false)return show('Empresa inativa — sobra não registrada.');
  const cerr=contratoErro(obraId,t);if(cerr)return show(cerr.replace('refeição não registrada','sobra não registrada'));
  const p=precoVigente(tp,t,cidOf(obraId));if(p===null)return show(`${tipo(tp).curto} não tem preço cadastrado para o contrato desta obra.`);
  const c=colSel;const total=Math.round(q*p*100)/100;
  S.sobras.push({id:uid(),data:t,contratadaId:RC.id,contratadaNome:RC.nome,tipo:tp,qtd:q,valorUnit:p,valor:total,colabNome:c.nome,colabId:c.id,empresaId:empId,empresaNome:E.nome,obraId,obraNome:o?o.nome:'',contratoId:cidOf(obraId)||undefined,contratoNumero:(contrato(cidOf(obraId))||{}).numero||undefined,registradoEm:new Date().toISOString(),usuario:USER.nome,bmId:null});
  audit('sobra.registrar',`${q} ${tipo(tp).curto} — ${c.nome} — ${money(p)} cada = ${money(total)} (cobrada)`,{empresa:E.nome,obra:o?o.nome:''});
  concluir(`Sobra registrada — ${q} ${tipo(tp).curto} · ${money(total)}`);$('s-qtd').value='';$('s-emp').value='';$('s-obra').value='';$('s-colab').value='';renderRest();
};

/* =================== SUPRIMENTOS =================== */
let WK=mondayOf(today());
const STATUS=Object.assign(Object.create(null),{rascunho:['Rascunho','warn'],fechado:['Aguardando restaurante','warn'],assinado_restaurante:['Assinado pelo restaurante','ok'],assinado:['Assinado (ambos)','ok'],faturado:['Faturado','ok']});
function statusPill(b){const s=typeof b.status==='string'&&b.status in STATUS?STATUS[b.status]:[String(b.status||'—'),'neutral'];return `<span class="pill ${s[1]}">${esc(s[0])}</span>`}
const SEM_CT='-';
function cidReg(x){return x.contratoId||cidOf(x.obraId)||SEM_CT}
function noEscopo(x,empId,ctId,obraId,cid){return (!empId||x.empresaId===empId)&&(!ctId||ctOf(x)===ctId)&&(!obraId||x.obraId===obraId)&&(!cid||cidReg(x)===cid)}
function periodRegs(ini,fim,empId,ctId,obraId,cid){return S.registros.filter(r=>r.data>=ini&&r.data<=fim&&noEscopo(r,empId,ctId,obraId,cid))}
/* sobras entram na medição como refeições (1 unidade por refeição que sobrou) */
function sobraOk(s){return ctOk(ctOf(s))&&(s.obraId?obraOk(s.obraId):(!s.obraNome||obraNomeOk(s.obraNome)))}
function sobraUnit(s){if(s.valorUnit!=null)return s.valorUnit;const p=precoVigente(s.tipo,s.data,s.contratoId||cidOf(s.obraId));return p===null?0:p}
function sobraTotal(s){return Math.round((s.qtd||0)*sobraUnit(s)*100)/100}
function sobraUnits(s){const v=sobraUnit(s);return Array.from({length:s.qtd||0},(_,i)=>({id:s.id+'#'+i,data:s.data,tipo:s.tipo,valor:v,empresaId:s.empresaId,empresaNome:s.empresaNome,obraId:s.obraId,obraNome:s.obraNome||'',contratadaId:s.contratadaId,bmId:s.bmId||null,sobra:true,sobraId:s.id,registradoEm:s.registradoEm,usuario:s.usuario,nome:'Sobra'}))}
function periodSobras(ini,fim,empId,ctId,obraId,cid){return (S.sobras||[]).filter(s=>s.empresaId&&s.data>=ini&&s.data<=fim&&noEscopo(s,empId,ctId,obraId,cid))}
function periodItens(ini,fim,empId,ctId,obraId,cid){return periodRegs(ini,fim,empId,ctId,obraId,cid).concat(...periodSobras(ini,fim,empId,ctId,obraId,cid).map(sobraUnits))}
let PREG=null,PBM=null;
function renderSup(){
  const fim=addDays(WK,6);
  $('wk-label').textContent=`${br(WK)} a ${br(fim)}`;
  fillSelect($('f-emp'),S.empresas,$('f-emp').value,'Todas');
  if($('f-tipo').options.length<2)TIPOS.forEach(t=>{const o=document.createElement('option');o.value=t.id;o.textContent=t.curto;$('f-tipo').appendChild(o)});
  fillSelect($('f-ct'),(S.contratadas||[]).filter(c=>ctOk(c.id)),$('f-ct').value,'Todos');
  const empId=$('f-emp').value,ctF=$('f-ct').value,tp=$('f-tipo').value,q=$('f-busca').value.trim().toLowerCase();
  const regs=periodRegs(WK,fim).filter(r=>regOk(r)&&(!ctF||ctOf(r)===ctF)&&(!empId||r.empresaId===empId)&&(!tp||r.tipo===tp)&&(!q||r.nome.toLowerCase().includes(q))).sort((a,b)=>a.registradoEm<b.registradoEm?1:-1);
  const fech=regs.filter(r=>r.fechado&&!r.bmId);const tot=regs.filter(r=>!(r.fechado&&!r.bmId)).reduce((s,r)=>s+r.valor,0);const nReg=regs.length-fech.length;
  const sob=S.sobras.filter(s=>s.data>=WK&&s.data<=fim&&sobraOk(s)&&(!ctF||ctOf(s)===ctF)&&(!empId||s.empresaId===empId)&&(!tp||s.tipo===tp)).sort((a,b)=>a.data<b.data?1:a.data>b.data?-1:(a.registradoEm<b.registradoEm?1:-1));
  const qs=sob.reduce((a,s)=>a+s.qtd,0),vs=sob.reduce((a,s)=>a+sobraTotal(s),0);
  $('sup-count').textContent=(qs?`${nReg} registro(s) + ${qs} sobra(s) = ${nReg+qs} refeições na semana · ${money(tot+vs)}`:`${nReg} registro(s) na semana · ${money(tot)}`)+(fech.length?` · ${fech.length} fechada(s) sem BM`:'');
  // notificações: assinados pelo restaurante
  const ps=pendSup();$('sup-notif').hidden=!(ps.length&&can('sup.bm'));
  $('sup-notif-list').innerHTML=ps.map(b=>`<div class="item"><span class="pill ok">Assinado</span><div class="t"><b>BM nº ${esc(b.numero)} — ${esc(b.empresaNome)}</b><span>Período ${br(b.ini)} à ${br(b.fim)} · assinatura ${b.assRest.tipo==='eletronica'?'eletrônica':'física homologada'} em ${brdt(b.assRest.em)} · ${money(b.liquido)}</span></div><button class="btn sm" data-vbm="${esc(b.id)}">Ver / imprimir</button></div>`).join('');
  $('sup-notif-list').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  $('sup-table').innerHTML=`<thead><tr><th>Data refeição</th><th>Colaborador</th><th>Empresa</th><th>Obra</th><th>Restaurante</th><th>Tipo</th><th class="r">Valor</th><th>Foto</th><th>Por</th><th>Nº BM</th></tr></thead><tbody>${(PREG=paginate('supRegs',regs,30)).rows.map(r=>{const b=r.bmId?S.bms.find(x=>x.id===r.bmId):null;return `<tr><td class="num">${br(r.data)}${r.dataManual?' <span class="pill warn" title="data informada manualmente">manual</span>':''}</td><td>${esc(r.nome)}${modOf(r)!=='presencial'?`<div class="small muted">${modOf(r)==='retirada'?esc(retInfo(r)):'terceirizado'+(r.terceirizada?' · terc.: '+esc(r.terceirizada):'')}</div>`:''}</td><td>${esc(r.empresaNome)}</td><td>${esc(r.obraNome)}</td><td>${esc((ct(ctOf(r))||{}).nome||r.contratadaNome||'—')}</td><td><span class="pill ${r.tipo}">${tipo(r.tipo).curto}</span></td><td class="r num">${money(r.valor)}</td><td>${fotoBtn(r)}</td><td>${esc(r.usuario)}</td><td style="min-width:150px">${b?`<button class="btn sec sm num" data-vbm="${esc(b.id)}">BM ${esc(b.numero)}</button>`:r.fechado?`<div class="row" style="gap:6px"><span class="pill bad" title="${esc(r.fechado.motivo)}">fechada sem BM</span>${can('sup.fechar')?`<button class="btn sec sm" data-reabrir="${esc(r.id)}">Reabrir</button>`:''}</div><div class="small muted" style="margin-top:4px;max-width:210px">${esc(r.fechado.motivo)} — ${esc(r.fechado.por)}, ${brdt(r.fechado.em)}</div>`:`<div class="row" style="gap:6px"><span class="pill neutral">em aberto</span>${can('sup.fechar')?`<button class="btn sec sm" data-fechar="${esc(r.id)}">Fechar</button>`:''}</div>`}</td></tr>`}).join('')||'<tr><td colspan="10" class="empty">Nenhum registro com esses filtros.</td></tr>'}</tbody>`;
  renderPager($('sup-pager'),'supRegs',PREG,['registro','registros'],renderSup);
  $('sup-table').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  $('sup-table').querySelectorAll('[data-foto]').forEach(x=>x.onclick=()=>verRegistro(S.registros.find(r=>r.id===x.dataset.foto)));
  $('sup-table').querySelectorAll('[data-fechar]').forEach(x=>x.onclick=()=>fecharRefeicao(S.registros.find(r=>r.id===x.dataset.fechar)));
  $('sup-table').querySelectorAll('[data-reabrir]').forEach(x=>x.onclick=()=>reabrirRefeicao(S.registros.find(r=>r.id===x.dataset.reabrir)));
  $('sup-sobras').innerHTML=`<thead><tr><th>Data</th><th>Tipo</th><th class="r">Qtd</th><th class="r">Preço unit.</th><th class="r">Total</th><th>Colaborador</th><th>Empresa</th><th>Obra</th><th>Restaurante</th><th>Informado por</th><th>Nº BM</th><th></th></tr></thead><tbody>${sob.map(s=>{const b=s.bmId?S.bms.find(x=>x.id===s.bmId):null;return `<tr><td class="num">${br(s.data)}</td><td><span class="pill ${s.tipo}">${tipo(s.tipo).curto}</span></td><td class="r num">${esc(s.qtd)}</td><td class="r num">${money(sobraUnit(s))}</td><td class="r num">${money(sobraTotal(s))}</td><td>${esc(s.colabNome)}</td><td>${s.empresaId?esc(s.empresaNome||'—'):'<span class="pill bad" title="Sem empresa: não entra em BM. Exclua e registre novamente.">sem empresa</span>'}</td><td>${s.obraId?esc(s.obraNome||'—'):'<span class="pill warn">não informada</span>'}</td><td>${esc((ct(ctOf(s))||{}).nome||s.contratadaNome||'—')}</td><td>${esc(s.usuario)}</td><td>${b?`<button class="btn sec sm num" data-vbm="${esc(b.id)}">BM ${esc(b.numero)}</button>`:'<span class="pill neutral">em aberto</span>'}</td><td>${can('del.sobras')&&!s.bmId?`<button class="btn danger sm" data-sdel2="${esc(s.id)}">Excluir</button>`:''}</td></tr>`}).join('')||'<tr><td colspan="12" class="empty">Nenhuma sobra informada na semana.</td></tr>'}</tbody>`;
  $('sup-sobras').querySelectorAll('[data-vbm]').forEach(x=>x.onclick=()=>openBM(S.bms.find(b=>b.id===x.dataset.vbm)));
  $('sup-sobras').querySelectorAll('[data-sdel2]').forEach(b=>b.onclick=()=>excluirSobra(b.dataset.sdel2,renderSup));
  $('btn-emitir').disabled=!can('sup.bm')||!S.empresas.length;
  $('btn-emitir').onclick=openEmitir;
  $('bm-list').innerHTML=`<thead><tr><th>Nº</th><th>Empresa</th><th>Obra / contrato</th><th>Restaurante</th><th>Período</th><th class="r">Qtd</th><th class="r">Valor líquido</th><th>Situação</th><th>Nota fiscal</th><th>BM assinado</th><th></th></tr></thead><tbody>${(PBM=paginate('bms',[...S.bms].filter(b=>ctOk(ctOf(b))&&(!ctF||ctOf(b)===ctF)).sort((a,b)=>b.emitidoEm<a.emitidoEm?-1:1),10)).rows.map(b=>`<tr><td class="num"><b>${esc(b.numero)}</b></td><td>${esc(b.empresaNome)}</td><td>${b.obraNome?`${esc(b.obraNome)}<div class="small muted">${esc(b.contratoNumero||'')}</div>`:'<span class="small muted">todas as obras</span>'}</td><td>${esc(bmK(b).nome||'—')}</td><td class="num">${br(b.ini)} – ${br(b.fim)}</td><td class="r num">${esc(b.qtd)}</td><td class="r num">${money(b.liquido)}</td><td>${statusPill(b)}</td><td>${b.nf?esc(b.nf):'<span class="muted">—</span>'}</td><td>${b.anexo?`<button class="btn sec sm" data-anx="${esc(b.id)}">${b.anexo.type.startsWith('image/')?'Ver imagem':'Ver PDF'}</button>`:'<span class="muted small">sem anexo</span>'}</td><td style="white-space:nowrap"><button class="btn sec sm" data-vbm="${esc(b.id)}">Ver BM</button> ${can('sup.nf')&&b.status!=='rascunho'&&b.status!=='fechado'?`<button class="btn sec sm" data-att="${esc(b.id)}" title="Anexar BM assinado">📎 Anexar</button>`:''} ${can('del.bm')?(bmPosterior(b)?`<button class="btn sec sm" disabled title="Existe o BM ${esc(bmPosterior(b).numero)} posterior desta empresa">Excluir</button>`:`<button class="btn danger sm" data-bdel="${esc(b.id)}">Excluir</button>`):''}</td></tr>`).join('')||'<tr><td colspan="11" class="empty">Nenhum BM emitido ainda.</td></tr>'}</tbody>`;
  renderPager($('bm-pager'),'bms',PBM,['boletim','boletins'],renderSup);
  $('bm-list').querySelectorAll('[data-vbm]').forEach(b=>b.onclick=()=>openBM(S.bms.find(x=>x.id===b.dataset.vbm)));
  $('bm-list').querySelectorAll('[data-att]').forEach(b=>b.onclick=()=>{ATT_BM=b.dataset.att;$('bm-anexo-file').click()});
  $('bm-list').querySelectorAll('[data-anx]').forEach(b=>b.onclick=()=>viewAnexo(S.bms.find(x=>x.id===b.dataset.anx)));
  $('bm-list').querySelectorAll('[data-bdel]').forEach(x=>x.onclick=()=>excluirBM(S.bms.find(b=>b.id===x.dataset.bdel)));
  refreshBadges();
}
$('wk-prev').onclick=()=>{WK=addDays(WK,-7);PAGES.supRegs=1;renderSup()};$('wk-next').onclick=()=>{WK=addDays(WK,7);PAGES.supRegs=1;renderSup()};
['f-emp','f-ct','f-tipo'].forEach(id=>$(id).onchange=()=>{PAGES.supRegs=1;if(id==='f-ct')PAGES.bms=1;renderSup()});$('f-busca').oninput=()=>{PAGES.supRegs=1;renderSup()};

/* ---- fechar refeição sem incluir em BM (permissão sup.fechar) ---- */
function justModal({titulo,resumo,botao,classe,onOk}){
  infoModal(titulo,`<div class="stack">${resumo}<div class="field"><label for="jm-txt">Justificativa (obrigatória)</label><textarea id="jm-txt" rows="3"></textarea></div><div id="jm-err" class="notice bad" hidden></div>
    <div class="row" style="justify-content:flex-end"><button class="btn sec" id="jm-cancel">Cancelar</button><button class="btn ${classe||''}" id="jm-go">${botao}</button></div></div>`);
  $('jm-cancel').onclick=()=>$('info-modal').classList.remove('on');
  $('jm-go').onclick=()=>{const t=$('jm-txt').value.trim();if(t.length<5){$('jm-err').hidden=false;$('jm-err').textContent='Informe a justificativa (mínimo 5 caracteres).';return}$('info-modal').classList.remove('on');onOk(t)};
}
function fecharRefeicao(r){
  if(!r||!can('sup.fechar')||r.bmId||r.fechado)return;
  justModal({titulo:'Fechar refeição sem BM',resumo:`<div class="notice warn">${br(r.data)} · ${tipo(r.tipo).curto} — <b>${esc(r.nome)}</b> (${esc(r.empresaNome)} · ${esc(r.obraNome||'—')}) · ${money(r.valor)} · ${MODS[modOf(r)]}.<br>A refeição deixa de entrar em qualquer BM e não pode mais ser estornada pelo restaurante.</div>`,botao:'Fechar refeição',classe:'danger',
    onOk:motivo=>{r.fechado={em:new Date().toISOString(),por:USER.nome,motivo};audit('refeicao.fechar',`${tipo(r.tipo).curto} de ${r.nome} em ${br(r.data)} (${money(r.valor)}) — motivo: ${motivo}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:'registro '+r.id,antes:'em aberto',depois:'fechada sem BM'});concluir(`Refeição de ${r.nome.split(' ')[0]} fechada sem BM`);renderSup()}});
}
function reabrirRefeicao(r){
  if(!r||!can('sup.fechar')||!r.fechado||r.bmId)return;
  justModal({titulo:'Reabrir refeição',resumo:`<div class="notice info">${br(r.data)} · ${tipo(r.tipo).curto} — <b>${esc(r.nome)}</b> · ${money(r.valor)}. Fechada por ${esc(r.fechado.por)} em ${brdt(r.fechado.em)}: “${esc(r.fechado.motivo)}”.<br>Ao reabrir, ela volta a poder entrar em um BM.</div>`,botao:'Reabrir refeição',
    onOk:motivo=>{const antes=r.fechado.motivo;delete r.fechado;audit('refeicao.reabrir',`${tipo(r.tipo).curto} de ${r.nome} em ${br(r.data)} — motivo: ${motivo}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:'registro '+r.id,antes:'fechada sem BM ('+antes+')',depois:'em aberto'});concluir(`Refeição de ${r.nome.split(' ')[0]} reaberta`);renderSup()}});
}
function excluirSobra(id,after){
  const ss=S.sobras.find(s=>s.id===id);if(!ss||!can('del.sobras'))return;
  if(ss.bmId){const b=S.bms.find(x=>x.id===ss.bmId);toast(`Sobra já está no BM nº ${b?b.numero:''} — exclua o BM antes`);return}
  confirmDelete({titulo:'Excluir sobra informada',resumo:`<div class="notice warn">${br(ss.data)} · ${esc(ss.qtd)} ${tipo(ss.tipo).curto} — ${esc(ss.colabNome)} (${esc(ss.empresaNome||'—')} · ${esc(ss.obraNome||'—')}) · ${money(sobraTotal(ss))}, informada por ${esc(ss.usuario)}.</div>`,botao:'Excluir sobra',
    onOk:async(_,motivo)=>{S.sobras=S.sobras.filter(s=>s.id!==id);audit('sobra.excluir',`${br(ss.data)} — ${esc(ss.qtd)} ${tipo(ss.tipo).curto} — ${ss.colabNome} — ${money(sobraTotal(ss))} — motivo: ${motivo}`,{empresa:ss.empresaNome,obra:ss.obraNome||''});concluir('Sobra excluída');after()}});
}
/* ---- exclusão de BM: só o último de cada empresa ---- */
function bmPosterior(b){return S.bms.filter(x=>x.empresaId===b.empresaId&&x.id!==b.id&&(x.numero>b.numero||(x.numero===b.numero&&x.emitidoEm>b.emitidoEm))).sort((a,c)=>c.numero-a.numero)[0]||null}
function excluirBM(b){
  if(!b||!can('del.bm'))return;const post=bmPosterior(b);if(post){toast(`Não é possível: existe o BM ${esc(post.numero)} posterior desta empresa`);return}
  const nsb=(S.sobras||[]).filter(s=>s.bmId===b.id).reduce((a,s)=>a+s.qtd,0);const n=S.registros.filter(r=>r.bmId===b.id).length+nsb;
  confirmDelete({titulo:`Excluir BM nº ${esc(b.numero)} — ${esc(b.empresaNome)}`,
    resumo:`<div class="notice warn">Período ${br(b.ini)} à ${br(b.fim)} · ${statusPill(b)} · ${money(b.liquido)}.<br>As <b>${n} refeições</b>${nsb?` (${nsb} de sobras)`:''} voltam a ficar "em aberto" (podem entrar em um novo BM), ${b.anexo?'o anexo assinado é apagado, ':''}e o próximo número de BM da empresa volta para <b>${esc(b.numero)}</b>.${b.nf?`<br><b>Atenção:</b> este BM já tem a nota fiscal ${esc(b.nf)} informada.`:''}</div>`,
    botao:'Excluir BM',
    onOk:async(_,motivo)=>{
      if(b.anexo&&b.anexo.path){try{await sb.storage.from('anexos').remove([b.anexo.path])}catch(e){}}
      S.registros.forEach(r=>{if(r.bmId===b.id)r.bmId=null});(S.sobras||[]).forEach(s=>{if(s.bmId===b.id)s.bmId=null});
      S.bms=S.bms.filter(x=>x.id!==b.id);
      const E=emp(b.empresaId);if(E&&(E.proximoBM||1)===b.numero+1)E.proximoBM=b.numero;
      audit('bm.excluir',`BM ${esc(b.numero)} — ${b.empresaNome} — ${br(b.ini)} à ${br(b.fim)} — ${n} refeições liberadas — motivo: ${motivo}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:b.status,depois:'excluído'});
      concluir(`BM ${esc(b.numero)} excluído`);renderSup();
    }});
}
/* ---- anexo do BM assinado ---- */
let ATT_BM=null;
$('bm-anexo-file').onchange=async e=>{
  const f=e.target.files[0];e.target.value='';if(!f||!ATT_BM)return;const b=S.bms.find(x=>x.id===ATT_BM);if(!b)return;
  if(f.size>10*1024*1024){toast('Arquivo acima de 10 MB');return}
  toast('Enviando anexo…');
  const safe=f.name.replace(/[^\w.\-]+/g,'_').slice(0,80);const path=`bm/${b.id}/${Date.now()}-${safe}`;
  const {error}=await sb.storage.from('anexos').upload(path,f,{contentType:f.type||'application/octet-stream',upsert:false});
  if(error){toast('Falha no envio: '+error.message);return}
  if(b.anexo&&b.anexo.path){sb.storage.from('anexos').remove([b.anexo.path])}
  b.anexo={name:f.name,type:f.type,path,size:f.size,em:new Date().toISOString(),usuario:USER.nome};
  audit('bm.anexar',`BM ${esc(b.numero)} — ${f.name}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});concluir('BM assinado anexado');renderSup();
};
async function viewAnexo(b){
  $('anexo-title').textContent=`BM ${esc(b.numero)} assinado — ${b.anexo.name}`;
  $('anexo-body').innerHTML='<div class="small muted">Carregando…</div>';$('anexo-modal').classList.add('on');
  const {data,error}=await sb.storage.from('anexos').createSignedUrl(b.anexo.path,3600);
  if(error){$('anexo-body').innerHTML=`<div class="notice bad">Não foi possível abrir o anexo: ${esc(error.message)}</div>`;return}
  const url=data.signedUrl;
  $('anexo-body').innerHTML=`<div class="small muted" style="margin-bottom:8px">Anexado em ${brdt(b.anexo.em)} por ${esc(b.anexo.usuario)} · ${Math.round((b.anexo.size||0)/1024)} KB</div>${b.anexo.type.startsWith('image/')?`<img src="${esc(url)}" alt="BM assinado" style="width:100%;border-radius:8px;border:1px solid var(--line)">`:`<iframe src="${esc(url)}" style="width:100%;height:60vh;border:1px solid var(--line);border-radius:8px;background:#fff"></iframe>`}<div class="row" style="margin-top:10px"><a class="btn sec sm" href="${esc(url)}" target="_blank" rel="noopener" id="anexo-dl">Abrir / baixar</a>${can('sup.nf')?`<button class="btn danger sm" id="anexo-rm">Remover anexo</button>`:''}</div>`;
  $('anexo-dl').onclick=()=>{audit('bm.anexo_baixar',`BM ${esc(b.numero)} — ${b.anexo.name}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});save()};
  const rm=$('anexo-rm');if(rm)rm.onclick=async()=>{await sb.storage.from('anexos').remove([b.anexo.path]);audit('bm.anexo_remover',`BM ${esc(b.numero)} — ${b.anexo.name}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});delete b.anexo;concluir('Anexo removido');$('anexo-modal').classList.remove('on');renderSup()};
}
$('anexo-close').onclick=()=>$('anexo-modal').classList.remove('on');
/* confirmação de exclusão: motivo obrigatório + escolha opcional */
function confirmDelete({titulo,resumo,opcoes,botao,onOk}){
  infoModal(titulo,`<div class="stack">${resumo}
    ${opcoes?`<div class="stack" id="del-opts" style="gap:8px">${opcoes.map((o,i)=>`<label class="card" style="display:flex;gap:10px;align-items:flex-start;padding:10px 12px;cursor:pointer;text-transform:none;letter-spacing:0;font-size:13px;color:var(--ink);margin:0"><input type="radio" name="del-opt" value="${esc(o.v)}" ${i===0?'checked':''} style="width:auto;margin-top:3px"><span><b>${o.t}</b><br><span class="muted">${o.d}</span></span></label>`).join('')}</div>`:''}
    <div class="field"><label for="del-motivo">Motivo da exclusão (obrigatório)</label><textarea id="del-motivo" rows="2"></textarea></div>
    <div id="del-err" class="notice bad" hidden></div>
    <div class="row" style="justify-content:flex-end"><button class="btn sec" id="del-cancel">Cancelar</button><button class="btn danger" id="del-go">${botao||'Excluir'}</button></div></div>`);
  $('del-cancel').onclick=()=>$('info-modal').classList.remove('on');
  let armed=false;
  $('del-go').onclick=async()=>{const motivo=$('del-motivo').value.trim();if(motivo.length<5){$('del-err').hidden=false;$('del-err').textContent='Informe o motivo (mínimo 5 caracteres).';return}
    if(!armed){armed=true;$('del-go').textContent='Confirmar exclusão definitiva';$('del-go').style.background='var(--bad)';$('del-go').style.color='#fff';return}
    const opt=(document.querySelector('input[name="del-opt"]:checked')||{}).value;$('del-go').disabled=true;
    try{await onOk(opt,motivo);$('info-modal').classList.remove('on');refreshBadges()}catch(e){$('del-err').hidden=false;$('del-err').textContent='Erro: '+(e.message||e);$('del-go').disabled=false}};
}
function infoModal(title,html){$('info-title').innerHTML=title;$('info-body').innerHTML=html;$('info-modal').classList.add('on')}
$('info-close').onclick=()=>$('info-modal').classList.remove('on');

/* ---- Emitir BM: empresa → restaurante, obra e contrato vinculados + período ---- */
/* vínculos da empresa: colaboradores (obra) × restaurantes que atendem a obra × contrato da obra, e o que já foi registrado */
function bmTuplas(empId){
  const T=new Map();const add=(k,o,c)=>{if(!k||!o||!ctOk(k)||!obraOk(o))return;const key=k+'|'+o+'|'+c;if(!T.has(key))T.set(key,{k,o,c})};
  const obs=new Set();S.colab.forEach(c=>{if(c.empresaId===empId&&c.obraId)obs.add(c.obraId)});
  ctsAcessiveis().forEach(K=>(K.obras||[]).forEach(o=>{const O=obra(o)||{};if(O.ativo!==false&&(O.empresaId?O.empresaId===empId:obs.has(o)))add(K.id,o,cidOf(o)||SEM_CT)}));
  S.registros.forEach(r=>{if(r.empresaId===empId&&r.obraId)add(ctOf(r),r.obraId,cidReg(r))});
  (S.sobras||[]).forEach(s=>{if(s.empresaId===empId&&s.obraId)add(ctOf(s),s.obraId,cidReg(s))});
  return [...T.values()];
}
function bmCtLabel(c){if(c===SEM_CT)return 'Sem contrato';const C=contrato(c);if(!C)return c;const st=contratoStatus(C);return C.numero+(st&&st!=='vigente'?` (${st})`:'')}
function bmOpcoes(mudou){
  const T=bmTuplas($('bm-emp').value);const sel={k:$('bm-ct').value,o:$('bm-obra').value,c:$('bm-contrato').value};
  // o campo que acabou de mudar manda: limpa os outros que ficaram incompatíveis com ele
  if(mudou&&sel[mudou])['k','o','c'].forEach(f=>{if(f!==mudou&&sel[f]&&!T.some(t=>t[mudou]===sel[mudou]&&t[f]===sel[f]))sel[f]=''});
  for(let volta=0;volta<3;volta++){
    ['k','o','c'].forEach(f=>{const vals=[...new Set(T.filter(t=>['k','o','c'].every(g=>g===f||!sel[g]||t[g]===sel[g])).map(t=>t[f]))];
      if(sel[f]&&!vals.includes(sel[f]))sel[f]='';if(!sel[f]&&vals.length===1)sel[f]=vals[0]});
  }
  const opts=f=>[...new Set(T.filter(t=>['k','o','c'].every(g=>g===f||!sel[g]||t[g]===sel[g])).map(t=>t[f]))];
  const nome={k:v=>(ct(v)||{}).nome||v,o:v=>(obra(v)||{}).nome||v,c:bmCtLabel};
  [['k','bm-ct'],['o','bm-obra'],['c','bm-contrato']].forEach(([f,id])=>{const vs=opts(f).sort((a,b)=>String(nome[f](a)||'').localeCompare(String(nome[f](b)||'')));
    $(id).innerHTML=(vs.length>1?'<option value="">Selecione…</option>':vs.length?'':'<option value="">Nenhum vínculo</option>')+vs.map(v=>`<option value="${esc(v)}"${v===sel[f]?' selected':''}>${esc(nome[f](v)||'—')}</option>`).join('');
    $(id).value=sel[f]||'';$(id).disabled=!vs.length});
  previewBM();
}
function openEmitir(){
  const ativas=S.empresas.filter(e=>e.ativo!==false);if(!ativas.length){toast('Nenhuma empresa ativa');return}
  if(!ctsAcessiveis().length){toast('Cadastre uma contratada (restaurante) em Configurações');return}
  fillSelect($('bm-emp'),ativas,$('f-emp').value||ativas[0].id);
  $('bm-ct').innerHTML=`<option value="${esc($('f-ct').value||'')}"></option>`;$('bm-ct').value=$('f-ct').value||'';$('bm-obra').value='';$('bm-contrato').value='';
  $('bm-ini').value=WK;$('bm-fim').value=addDays(WK,6);
  bmOpcoes('k');$('emp-modal').classList.add('on');
}
function bmEscolha(){return {ini:$('bm-ini').value,fim:$('bm-fim').value,empId:$('bm-emp').value,ctId:$('bm-ct').value,obraId:$('bm-obra').value,cid:$('bm-contrato').value}}
function previewBM(){
  const {ini,fim,empId,ctId,obraId,cid}=bmEscolha();const msg=$('bm-prev-msg');
  const falta=[!ctId&&'restaurante',!obraId&&'obra',!cid&&'contrato'].filter(Boolean);
  if(falta.length){$('bm-prev-tiles').innerHTML='';msg.hidden=false;msg.className='notice warn small';msg.textContent=bmTuplas(empId).length?`Selecione ${falta.join(', ').replace(/, ([^,]*)$/,' e $1')} — o BM é fechado por empresa, restaurante, obra e contrato.`:'Esta empresa não tem obra vinculada (colaboradores ou registros) a um restaurante que você acessa.';$('bm-emit-go').disabled=true;return}
  if(!ini||!fim||fim<ini){$('bm-prev-tiles').innerHTML='';msg.hidden=false;msg.className='notice bad small';msg.textContent='Informe um período válido (fim igual ou posterior ao início).';$('bm-emit-go').disabled=true;return}
  const all=periodItens(ini,fim,empId,ctId,obraId,cid);const livres=all.filter(r=>!r.bmId&&!r.fechado);const fechadas=all.filter(r=>r.fechado&&!r.bmId).length;const presos=all.length-livres.length-fechadas;const nsob=livres.filter(r=>r.sobra).length;const nterc=livres.filter(r=>!r.sobra&&modOf(r)==='terceirizado').length;
  $('bm-prev-tiles').innerHTML=TIPOS.map(t=>{const l=livres.filter(r=>r.tipo===t.id);return `<div class="tile ${t.id}"><div class="k">${t.curto}</div><div class="v num">${l.length}</div><div class="s num">${money(l.reduce((s,r)=>s+r.valor,0))}</div></div>`}).join('')+`<div class="tile total"><div class="k">Total</div><div class="v num">${livres.length}</div><div class="s num">${money(livres.reduce((s,r)=>s+r.valor,0))}</div></div>`;
  const dias=Math.round((parse(fim)-parse(ini))/864e5)+1;
  let t=`${dias} dia(s) · ${livres.length} refeições em aberto${nsob||nterc?` (inclui ${[nsob&&nsob+' de sobras',nterc&&nterc+' de terceirizados'].filter(Boolean).join(' e ')})`:''}.`;if(presos)t+=` ${presos} refeição(ões) do período já pertencem a outro BM e ficam de fora.`;if(fechadas)t+=` ${fechadas} refeição(ões) fechada(s) sem BM também ficam de fora.`;
  msg.hidden=false;msg.className='notice '+(livres.length?'info':'warn')+' small';msg.textContent=t;
  $('bm-emit-go').disabled=!livres.length||dias>62;if(dias>62){msg.className='notice bad small';msg.textContent='Período máximo de 62 dias.'}
}
$('bm-emp').onchange=()=>{$('bm-ct').value='';$('bm-obra').value='';$('bm-contrato').value='';bmOpcoes()};
$('bm-ct').onchange=()=>bmOpcoes('k');$('bm-obra').onchange=()=>bmOpcoes('o');$('bm-contrato').onchange=()=>bmOpcoes('c');
['bm-ini','bm-fim'].forEach(id=>$(id).onchange=previewBM);
document.querySelectorAll('#emp-modal [data-q]').forEach(b=>b.onclick=()=>{
  const t=today();const q=b.dataset.q;let ini,fim;
  if(q==='semana'){ini=mondayOf(t);fim=addDays(ini,6)}
  else if(q==='semana-ant'){ini=addDays(mondayOf(t),-7);fim=addDays(ini,6)}
  else if(q==='quinzena'){fim=t;ini=addDays(t,-14)}
  else{const d=parse(t);const first=new Date(d.getFullYear(),d.getMonth()-1,1);const last=new Date(d.getFullYear(),d.getMonth(),0);ini=ymd(first);fim=ymd(last)}
  $('bm-ini').value=ini;$('bm-fim').value=fim;previewBM();
});
$('bm-emit-go').onclick=()=>{const e=bmEscolha();if(!e.ctId||!e.obraId||!e.cid)return;$('emp-modal').classList.remove('on');const nb=buildBM(e.ini,e.fim,e.empId,e.ctId,e.obraId,e.cid);audit('bm.emitir',`BM ${esc(nb.numero)} — ${nb.empresaNome} — ${nb.obraNome} (${nb.contratoNumero||'—'}) — ${nb.contratadaNome} — ${br(nb.ini)} à ${br(nb.fim)} — ${esc(nb.qtd)} refeições — ${money(nb.valor)}`,{empresa:nb.empresaNome,obra:nb.obraNome,entidade:'BM '+nb.numero});concluir(`Rascunho do BM nº ${esc(nb.numero)} gerado — confira a lista e feche o BM`);openBM(nb)};
$('emp-close').onclick=()=>$('emp-modal').classList.remove('on');

/* ---- BM build ---- */
function buildBM(ini,fim,empId,ctId,obraId,cid){
  const E=emp(empId);const C=ct(ctId)||{};const O=obra(obraId)||{};const CT=cid&&cid!==SEM_CT?contrato(cid):null;
  const regs=periodItens(ini,fim,empId,ctId,obraId,cid).filter(r=>!r.bmId&&!r.fechado);
  const contr=E.contrato||{};
  // acumulado anterior: BMs anteriores da empresa com o mesmo restaurante (a quantidade contratada fica no cadastro da empresa)
  const prev=new Set(S.bms.filter(x=>x.empresaId===empId&&ctOf(x)===ctId&&x.numero<(E.proximoBM||1)).map(x=>x.id));
  const antesAll=S.registros.filter(r=>r.bmId&&prev.has(r.bmId)).concat(...(S.sobras||[]).filter(s=>s.bmId&&prev.has(s.bmId)).map(sobraUnits));
  const itens=TIPOS.map((t,i)=>{
    const c=contr[t.id]||{};const antes=antesAll.filter(r=>r.tipo===t.id);
    const acumQtd=(c.acumQtd||0)+antes.length;const acumVal=(c.acumVal||0)+antes.reduce((s,r)=>s+r.valor,0);
    const atual=regs.filter(r=>r.tipo===t.id);const atualQtd=atual.length;const atualVal=atual.reduce((s,r)=>s+r.valor,0);
    const preco=atual.length?atual[atual.length-1].valor:precoVigente(t.id,fim,cid&&cid!==SEM_CT?cid:cidOf(obraId));const qtdCt=c.qtd||null;const totalCt=qtdCt&&preco!==null?Math.trunc(qtdCt*preco*100)/100:null;
    return {tipo:t.id,item:'1.'+(i+1),preco,qtdCt,totalCt,acumQtd,acumVal,atualQtd,atualVal,totAcQtd:acumQtd+atualQtd,totAcVal:acumVal+atualVal,saldoQtd:qtdCt!==null?qtdCt-acumQtd-atualQtd:null,saldoVal:totalCt!==null?totalCt-acumVal-atualVal:null};
  });
  const dias=[];for(let d=ini;d<=fim;d=addDays(d,1)){const l=regs.filter(r=>r.data===d);dias.push({d,porTipo:TIPOS.map(t=>l.filter(r=>r.tipo===t.id).length),total:l.length,valor:l.reduce((s,r)=>s+r.valor,0)})}
  const obrasN=[...new Set(regs.map(r=>r.obraNome))];
  const obras=obrasN.map(o=>{const l=regs.filter(r=>r.obraNome===o);return {o,porTipo:TIPOS.map(t=>l.filter(r=>r.tipo===t.id).length),total:l.length,valor:l.reduce((s,r)=>s+r.valor,0)}});
  const valor=regs.reduce((s,r)=>s+r.valor,0);const sobU=regs.filter(r=>r.sobra);
  return {id:uid(),sobrasQtd:sobU.length,sobrasValor:sobU.reduce((s,r)=>s+r.valor,0),numero:E.proximoBM||1,empresaId:empId,empresaNome:E.nome,empresaCnpj:E.cnpj||'',obraId:obraId||null,obraNome:O.nome||'',contratoId:cid||null,contratoNumero:CT?CT.numero:cid===SEM_CT?'sem contrato':'',contratadaId:ctId,contratadaNome:C.nome||'',contratadaCnpj:C.cnpj||'',gestor:O.gestor||'',cargo:O.gestorCargo||'',servico:C.servico||'FORNECIMENTO DE REFEIÇÕES',ini,fim,itens,dias,obras,qtd:regs.length,valor,deducoes:0,adiant:0,liquido:valor,status:'rascunho',emitidoEm:new Date().toISOString(),usuario:USER.nome,nf:'',obs:'',assRest:null,assSup:null};
}
/* Quem assina o BM pela empresa é o Gestor / Engenheiro da OBRA (Configurações › Obras) — nunca o gestor cadastrado no restaurante.
   Enquanto a assinatura não é registrada vale o cadastro atual da obra; depois de registrada, vale o nome que assinou. */
function bmObraId(b){if(b.obraId)return b.obraId;   // BM antigo, sem obra gravada: vale a obra das refeições, se for uma só
  const ids=[...new Set(S.registros.filter(r=>r.bmId===b.id).map(r=>r.obraId).filter(Boolean))];return ids.length===1?ids[0]:null}
function bmGestor(b){
  if(b.assSup&&(b.status==='assinado'||b.status==='faturado'))return {gestor:b.gestor||'',cargo:b.cargo||''};
  const O=obra(bmObraId(b))||{};return {gestor:O.gestor||'',cargo:O.gestorCargo||''}}
function bmK(b){const C=ct(ctOf(b))||{};const L=S.contratada||{};return {nome:b.contratadaNome||C.nome||L.nome||'',cnpj:b.contratadaCnpj||C.cnpj||L.cnpj||'',...bmGestor(b),servico:b.servico||C.servico||L.servico||'FORNECIMENTO DE REFEIÇÕES'}}
let BM=null, BMTAB='bm'; const LISTA_VISTA=new Set();
function openBM(b){BM=b;BMTAB='bm';renderBM();$('bm-modal').classList.add('on');$('bm-modal').querySelector('.sheet').scrollTop=0}
const TIPO_ORD={cafe:0,almoco:1,jantar:2,lanche:3};
function bmRegs(b){
  const l=b.status==='rascunho'?periodRegs(b.ini,b.fim,b.empresaId,ctOf(b),b.obraId,b.contratoId).filter(r=>!r.bmId&&!r.fechado):S.registros.filter(r=>r.bmId===b.id);
  return l.sort((a,c)=>a.data<c.data?-1:a.data>c.data?1:(TIPO_ORD[a.tipo]-TIPO_ORD[c.tipo])||(a.registradoEm<c.registradoEm?-1:1));
}
function bmSobras(b){
  const l=b.status==='rascunho'?periodSobras(b.ini,b.fim,b.empresaId,ctOf(b),b.obraId,b.contratoId).filter(s=>!s.bmId):(S.sobras||[]).filter(s=>s.bmId===b.id);
  return l.sort((a,c)=>a.data<c.data?-1:a.data>c.data?1:(a.registradoEm<c.registradoEm?-1:1));
}
function bmQtdLista(b){return bmRegs(b).length+bmSobras(b).reduce((a,s)=>a+s.qtd,0)}
function bmGrupos(b){
  const g=[];const regs=bmRegs(b),sob=bmSobras(b);
  for(let d=b.ini;d<=b.fim;d=addDays(d,1))TIPOS.forEach(t=>{const l=regs.filter(r=>r.data===d&&r.tipo===t.id);const so=sob.filter(s=>s.data===d&&s.tipo===t.id);if(l.length||so.length)g.push({d,tipo:t,regs:l,sobras:so,total:l.length+so.reduce((a,s)=>a+s.qtd,0)})});
  return g;
}
function sobraLinha(s){return `Sobra — ${esc(s.qtd)} ${s.qtd===1?'refeição':'refeições'}${s.colabNome?' · '+s.colabNome:''}`}
function sobraAssTxt(s){return `Sobra informada · ${hm(s.registradoEm)} · por ${s.usuario}`}
function assinaturaTxt(r){const m=modOf(r);if(m==='retirada')return `Retirada · ${hm(r.registradoEm)} · ${retInfo(r)} · lançado por ${r.usuario}`;return m==='terceirizado'?`Manual · ${hm(r.registradoEm)} · ${r.terceirizada?'terc.: '+r.terceirizada+' · ':''}por ${r.usuario}`:`QR Code · ${hm(r.registradoEm)}`}
/* terceirizados: separados por empresa terceirizada (no boletim, na lista e no PDF) */
function tercNome(r){return String(r.terceirizada||'').trim()||'Empresa não informada'}
function tercGrupos(regs){const m=new Map();regs.filter(r=>modOf(r)==='terceirizado').forEach(r=>{const k=tercNome(r);const a=m.get(k)||{nome:k,porTipo:TIPOS.map(()=>0),total:0,valor:0};const ix=TIPOS.findIndex(t=>t.id===r.tipo);if(ix>=0)a.porTipo[ix]++;a.total++;a.valor+=r.valor||0;m.set(k,a)});return [...m.values()].sort((a,b)=>a.nome.localeCompare(b.nome))}
function listaLinhas(regs){const out=[];let i=0;regs.filter(r=>modOf(r)!=='terceirizado').forEach(r=>out.push({i:++i,r}));
  const g=new Map();regs.filter(r=>modOf(r)==='terceirizado').forEach(r=>{const k=tercNome(r);if(!g.has(k))g.set(k,[]);g.get(k).push(r)});
  [...g.keys()].sort((a,b)=>a.localeCompare(b)).forEach(k=>{out.push({sub:k,n:g.get(k).length});g.get(k).forEach(r=>out.push({i:++i,r}))});return out}
function renderLista(b){
  const g=bmGrupos(b);const tot=g.reduce((s,x)=>s+x.total,0);const ts=g.reduce((s,x)=>s+x.sobras.reduce((a,o)=>a+o.qtd,0),0);
  if(!g.length)return '<div class="notice warn">Nenhuma refeição no período.</div>';
  return `<div class="notice info small" style="margin-bottom:10px">${tot} refeições em ${g.length} lista(s) por dia e tipo${ts?`, das quais <b>${ts} são sobras</b>`:''}. <b>Assinatura digital</b> = leitura do QR Code do crachá do colaborador; <b>retirada</b> = refeição levada por outro colaborador, identificado pelo QR Code do crachá (ou digitado); registros <b>manuais</b> são de terceirizados sem crachá, lançados pelo restaurante; <b>sobras</b> são refeições preparadas e não consumidas, informadas pelo restaurante e cobradas.</div>`+
  g.map((x,i)=>`<div class="card" style="margin-bottom:10px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${i+1}. ${br(x.d)} — ${x.tipo.curto}</h3><span class="pill ${x.tipo.id}">${esc(x.total)} refeições</span></div>
    <div class="tablewrap" style="margin-top:8px"><table><thead><tr><th>#</th><th>Colaborador</th><th>Obra</th><th>Assinatura digital</th></tr></thead><tbody>
    ${listaLinhas(x.regs).map(l=>l.sub?`<tr class="subgrp"><td colspan="4">Terceirizada: <b>${esc(l.sub)}</b> · ${l.n} ${l.n===1?'refeição':'refeições'}</td></tr>`:`<tr><td class="num">${l.i}</td><td>${esc(l.r.nome)}${modOf(l.r)!=='presencial'?' '+modPill(l.r):''}</td><td>${esc(l.r.obraNome||'—')}</td><td class="small">${modOf(l.r)==='retirada'?'<span class="pill warn">Retirada</span>':modOf(l.r)==='terceirizado'?'<span class="pill warn">Manual</span>':'<span class="pill ok">✓ QR Code</span>'} <span class="muted">${esc(modOf(l.r)==='presencial'?hm(l.r.registradoEm):assinaturaTxt(l.r).replace(/^(Manual|Retirada) · /,''))}</span></td></tr>`).join('')}
    ${x.sobras.map((s,k)=>`<tr><td class="num">${x.regs.length+k+1}</td><td>${esc(sobraLinha(s))} <span class="pill warn">sobra</span></td><td>${esc(s.obraNome||'—')}</td><td class="small"><span class="pill neutral">Sobra</span> <span class="muted">${esc(sobraAssTxt(s).replace(/^Sobra informada · /,''))}</span></td></tr>`).join('')}
    </tbody></table></div></div>`).join('');
}
$('bm-close').onclick=()=>$('bm-modal').classList.remove('on');
function stampHtml(a,who){
  if(!a)return `<div class="stamp pend">Aguardando assinatura<small>${who}</small></div>`;
  return `<div class="stamp">${a.tipo==='eletronica'?'Assinado eletronicamente':'Assinatura física homologada'}<small>${esc(a.usuario)} · ${brdt(a.em)}${a.tipo==='fisica'?' · homologado por '+esc(a.por):''}</small></div>`;
}
function renderBM(){
  const b=BM,K=bmK(b),E=emp(b.empresaId);const mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).toUpperCase();
  const isDraft=b.status==='rascunho';const st=b.status;
  b.liquido=b.valor-(b.deducoes||0)-(b.adiant||0);
  $('bm-title').textContent=`BM nº ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' · '+b.obraNome:''}`;
  const TG=tercGrupos(bmRegs(b));
  const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0);const anyCt=b.itens.some(i=>i.qtdCt!==null);
  const dash=v=>v===null||v===undefined?'—':v;
  const order=['rascunho','fechado','assinado_restaurante','assinado','faturado'];const idx=order.indexOf(st);
  const steps=[['Emitido','rascunho'],['Fechado → Restaurante','fechado'],['Assinado Restaurante','assinado_restaurante'],['Assinado Gestor / Eng.','assinado'],['NF / Pagamento','faturado']].map(([n,s])=>{const i=order.indexOf(s);return `<span class="${i<idx?'done':i===idx?'cur':''}">${n}</span>`}).join('');
  let banner='';
  if(st==='rascunho')banner=`<div class="notice warn">Rascunho — confira os quantitativos. Ao <b>fechar</b>, os ${esc(b.qtd)} registros de ${esc(b.empresaNome)} no período ficam vinculados ao BM ${esc(b.numero)}, não podem mais ser estornados, e o restaurante recebe a notificação para validar.</div>`;
  else if(st==='fechado')banner=`<div class="notice warn"><b>Atenção: BM nº ${esc(b.numero)} — Período ${br(b.ini)} à ${br(b.fim)} fechado</b> em ${brdt(b.fechadoEm)} por ${esc(b.fechadoPor)}. Aguardando assinatura do restaurante (eletrônica pelo app ou física, homologada pelo Suprimentos).</div>`;
  else if(st==='assinado_restaurante')banner=`<div class="notice ok">Assinado pelo restaurante em ${brdt(b.assRest.em)}. ${K.gestor?`Imprima o BM para assinatura do Gestor / Engenheiro da obra (<b>${esc(K.gestor)}</b>) e registre a assinatura abaixo.`:''}</div>`+(K.gestor?'':bmObraId(b)?`<div class="notice warn" style="margin-top:8px">A obra <b>${esc((obra(bmObraId(b))||{}).nome||b.obraNome||'—')}</b> ainda não tem Gestor / Engenheiro cadastrado. Cadastre em Configurações › Obras: é o nome que assina este BM.</div>`
    :`<div class="notice warn" style="margin-top:8px">Este BM é antigo e reúne mais de uma obra. Informe abaixo o Gestor / Engenheiro que assina.</div>${can('sup.bm')?'<div class="field" style="margin-top:8px"><label for="bm-gestor-manual">Gestor / Engenheiro que assina este BM</label><input id="bm-gestor-manual" maxlength="80" placeholder="nome completo" autocomplete="off"></div>':''}`);
  else if(st==='assinado')banner=`<div class="notice ok">BM assinado por ambas as partes. Aguardando nota fiscal do restaurante.</div>`;
  else banner=`<div class="notice ok">Nota fiscal ${esc(b.nf)} informada — BM pronto para inclusão em pagamento.</div>`;
  const nRegs=bmQtdLista(b);
  $('bm-body').innerHTML=`
  <div class="steps">${steps}</div>
  <div style="margin-bottom:10px">${banner}</div>
  ${!K.nome?'<div class="notice info small" style="margin-bottom:10px">Dados da contratada ainda não preenchidos (Configurações › Contratadas).</div>':''}
  <div class="subtabs" id="bm-tabs"><button data-t="bm" class="${BMTAB==='bm'?'on':''}">Boletim de Medição</button><button data-t="lista" class="${BMTAB==='lista'?'on':''}">Lista de colaboradores (${nRegs})${isDraft&&!LISTA_VISTA.has(b.id)?' <span class="badge">!</span>':''}</button></div>
  <div id="bm-pane-lista" ${BMTAB==='lista'?'':'hidden'}>${BMTAB==='lista'?renderLista(b):''}</div>
  <div id="bm-pane-bm" ${BMTAB==='bm'?'':'hidden'}>
  <div class="bmdoc">
    <div class="hd">
      ${E&&logoOk(E.logo)?`<img class="lg" src="${esc(logoOk(E.logo))}" alt="Logotipo ${esc(E.nome)}">`:`<div class="lg-empty">logotipo da empresa<br>(Configurações › Empresas)</div>`}
      <div><h2>Medição do contrato de ${esc((K.servico||'fornecimento de refeições').toLowerCase())}</h2>
      <div class="kv" style="margin-top:6px"><span>Empresa</span><span><b>${esc(b.empresaNome)}</b>${b.empresaCnpj?` · CNPJ ${esc(b.empresaCnpj)}`:''}</span><span>Contratada</span><span>${esc(K.nome||'—')}${K.cnpj?` · CNPJ ${esc(K.cnpj)}`:''}</span>${b.obraNome?`<span>Obra</span><span><b>${esc(b.obraNome)}</b></span><span>Contrato</span><span>${esc(b.contratoNumero||'—')}</span>`:''}</div></div>
      <div class="kv"><span>Medição</span><span><b class="num">${esc(b.numero)}</b></span><span>Período</span><span class="num">${br(b.ini)} à ${br(b.fim)}</span><span>Ref.</span><span>${mes}</span></div></div>
    <div class="tablewrap"><table>
      <thead><tr><th>Item</th><th>Descrição</th><th class="c">Unid</th><th class="r">Preço unit.</th>${anyCt?'<th class="r">Qtd contrato</th><th class="r">Total contrato</th>':''}<th class="r">Acum. anterior</th><th class="r">Atual</th><th class="r">Total acum.</th>${anyCt?'<th class="r">Saldo</th>':''}<th class="r">R$ acum. anterior</th><th class="r">R$ desta medição</th><th class="r">R$ acum. atual</th>${anyCt?'<th class="r">R$ saldo</th>':''}</tr></thead>
      <tbody><tr class="grp"><td>1</td><td colspan="${anyCt?13:9}">${esc(K.servico||'FORNECIMENTO DE REFEIÇÕES')}</td></tr>
      ${b.itens.map(i=>`<tr><td class="num">${esc(i.item)}</td><td>${tipo(i.tipo).nome}</td><td class="c">un</td><td class="r num">${i.preco===null?'—':money(i.preco)}</td>${anyCt?`<td class="r num">${dash(i.qtdCt&&num(i.qtdCt))}</td><td class="r num">${i.totalCt===null?'—':money(i.totalCt)}</td>`:''}<td class="r num">${num(i.acumQtd)}</td><td class="r num"><b>${num(i.atualQtd)}</b></td><td class="r num">${num(i.totAcQtd)}</td>${anyCt?`<td class="r num">${i.saldoQtd===null?'—':num(i.saldoQtd)}</td>`:''}<td class="r num">${money(i.acumVal)}</td><td class="r num"><b>${money(i.atualVal)}</b></td><td class="r num">${money(i.totAcVal)}</td>${anyCt?`<td class="r num">${i.saldoVal===null?'—':money(i.saldoVal)}</td>`:''}</tr>`).join('')}
      <tr class="tot"><td colspan="4">TOTAL</td>${anyCt?`<td></td><td class="r num">${money(tot('totalCt'))}</td>`:''}<td class="r num">${num(tot('acumQtd'))}</td><td class="r num">${num(tot('atualQtd'))}</td><td class="r num">${num(tot('totAcQtd'))}</td>${anyCt?`<td class="r num">${num(tot('saldoQtd'))}</td>`:''}<td class="r num">${money(tot('acumVal'))}</td><td class="r num">${money(tot('atualVal'))}</td><td class="r num">${money(tot('totAcVal'))}</td>${anyCt?`<td class="r num">${money(tot('saldoVal'))}</td>`:''}</tr></tbody></table></div>
    <div class="cols" style="margin-top:16px">
      <div>
        <h3>Resumo por data</h3>
        <div class="tablewrap" style="max-height:340px;overflow:auto"><table><thead><tr><th>Data</th>${TIPOS.map(t=>`<th class="r">${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>
        ${b.dias.map(d=>`<tr><td class="num">${wd(d.d)} ${br(d.d)}</td>${d.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(d.total)}</b></td><td class="r num">${money(d.valor)}</td></tr>`).join('')}
        <tr class="tot"><td>Total geral</td>${TIPOS.map((t,i)=>`<td class="r num">${b.dias.reduce((s,d)=>s+d.porTipo[i],0)}</td>`).join('')}<td class="r num">${esc(b.qtd)}</td><td class="r num">${money(b.valor)}</td></tr></tbody></table></div>
        ${b.sobrasQtd?`<div class="small muted" style="margin-top:6px">Inclui <b>${esc(b.sobrasQtd)}</b> refeições de sobras (${money(b.sobrasValor)}), cobradas pelo preço do contrato da obra.</div>`:''}
        ${b.obras.length>1?`<h3 style="margin-top:14px">Resumo por obra</h3>
        <div class="tablewrap"><table><thead><tr><th>Obra</th>${TIPOS.map(t=>`<th class="r">${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>
        ${b.obras.map(e=>`<tr><td>${esc(e.o||'—')}</td>${e.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(e.total)}</b></td><td class="r num">${money(e.valor)}</td></tr>`).join('')}</tbody></table></div>`:''}
        ${TG.length?`<h3 style="margin-top:14px">Terceirizados por empresa</h3>
        <div class="tablewrap"><table><thead><tr><th>Empresa terceirizada</th>${TIPOS.map(t=>`<th class="r">${t.curto}</th>`).join('')}<th class="r">Total</th><th class="r">Valor</th></tr></thead><tbody>
        ${TG.map(g=>`<tr><td>${esc(g.nome)}</td>${g.porTipo.map(n=>`<td class="r num">${esc(n||'–')}</td>`).join('')}<td class="r num"><b>${esc(g.total)}</b></td><td class="r num">${money(g.valor)}</td></tr>`).join('')}
        <tr class="tot"><td>Total terceirizados</td>${TIPOS.map((t,i)=>`<td class="r num">${TG.reduce((s,g)=>s+g.porTipo[i],0)}</td>`).join('')}<td class="r num">${TG.reduce((s,g)=>s+g.total,0)}</td><td class="r num">${money(TG.reduce((s,g)=>s+g.valor,0))}</td></tr></tbody></table></div>
        <div class="small muted" style="margin-top:6px">Refeições lançadas manualmente para terceirizados (sem crachá). Já estão incluídas nos totais acima; o custo é de ${esc(b.empresaNome)}.</div>`:''}
      </div>
      <div>
        <div class="fin">
          <span>Valor da medição</span><span class="num" style="text-align:right">${money(b.valor)}</span>
          <span>Deduções / descontos</span><span style="text-align:right">${isDraft?`<input id="bm-ded" type="number" step="0.01" min="0" value="${esc(b.deducoes||0)}" class="num">`:`<span class="num">${money(b.deducoes)}</span>`}</span>
          <span>Adiantamentos e outros</span><span style="text-align:right">${isDraft?`<input id="bm-adi" type="number" step="0.01" min="0" value="${esc(b.adiant||0)}" class="num">`:`<span class="num">${money(b.adiant)}</span>`}</span>
          <span>Total da fatura</span><span class="num" style="text-align:right">${money(b.liquido)}</span>
          <span>Total líquido da medição</span><span class="num big" style="text-align:right">${money(b.liquido)}</span>
        </div>
        <div class="field" style="margin-top:12px"><label for="bm-obs">Obs.</label>${isDraft?`<textarea id="bm-obs" rows="2">${esc(b.obs||'')}</textarea>`:`<div class="small">${esc(b.obs||'—')}</div>`}</div>
        <div class="sig">
          <div>${isDraft?'':stampHtml(b.assSup,'Gestor / Engenheiro')}${K.gestor?esc(K.gestor):`<span class="pill warn">Gestor / Engenheiro ${bmObraId(b)?'não cadastrado na obra':'não informado'}</span>`}<br><span class="muted">${esc(K.cargo||'Gestor / Engenheiro')} — ${esc(b.empresaNome)}</span></div>
          <div>${isDraft?'':stampHtml(b.assRest,'Restaurante')}${esc(K.nome||'________________')}<br><span class="muted">Contratada</span></div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div id="bm-hint" class="notice warn small" style="margin-top:12px" hidden></div>
  <div class="row" style="margin-top:14px;justify-content:flex-end" id="bm-actions"></div>`;
  $('bm-tabs').querySelectorAll('button').forEach(x=>x.onclick=()=>{BMTAB=x.dataset.t;if(BMTAB==='lista')LISTA_VISTA.add(b.id);renderBM();$('bm-modal').querySelector('.sheet').scrollTop=0});
  // actions by status and permission
  const A=$('bm-actions');const acts=[];
  const listaOk=LISTA_VISTA.has(b.id)||nRegs===0;
  if(st==='rascunho'&&can('sup.bm')){acts.push(['bm-fechar','good',`Fechar BM ${esc(b.numero)} e enviar ao restaurante`]);if(!listaOk){$('bm-hint').hidden=false;$('bm-hint').innerHTML='Antes de fechar, confira a aba <b>Lista de colaboradores</b> (nomes, obras e assinaturas digitais por dia e refeição). A lista acompanha o BM na validação do restaurante e no PDF.'}}
  if(st==='fechado'&&can('rest.validar')&&ctOk(ctOf(b)))acts.push(['bm-validar','good','Validar BM (assinar eletronicamente pelo restaurante)']);
  if(st==='fechado'&&can('sup.bm'))acts.push(['bm-homologar','sec','Homologar assinatura física do restaurante']);
  if((st==='assinado_restaurante'||st==='assinado'||st==='faturado')&&can('sup.bm'))acts.push(['bm-print','','Imprimir BM']);
  if(st==='assinado_restaurante'&&can('sup.bm'))acts.push(['bm-ass-sup','good','Registrar assinatura do Gestor / Engenheiro']);
  A.innerHTML=acts.map(a=>`<button class="btn ${a[1]}" id="${a[0]}"${a[0]==='bm-fechar'&&!listaOk?' disabled':''}>${a[2]}</button>`).join('')+((st==='assinado'||st==='faturado')&&can('sup.nf')?`<div class="row" style="flex-wrap:nowrap"><input id="bm-nf" placeholder="nº da nota fiscal" value="${esc(b.nf||'')}" style="width:180px"><button class="btn" id="bm-nf-save">Registrar NF</button></div>`:'');
  const ded=$('bm-ded'),adi=$('bm-adi'),obs=$('bm-obs');
  if(ded)ded.onchange=()=>{b.deducoes=+ded.value||0;renderBM()};if(adi)adi.onchange=()=>{b.adiant=+adi.value||0;renderBM()};if(obs)obs.oninput=()=>b.obs=obs.value;
  const on=(id,fn)=>{const e=$(id);if(e)e.onclick=fn};
  on('bm-fechar',()=>{
    b.status='fechado';b.fechadoEm=new Date().toISOString();b.fechadoPor=USER.nome;
    S.registros.forEach(r=>{if(noEscopo(r,b.empresaId,ctOf(b),b.obraId,b.contratoId)&&r.data>=b.ini&&r.data<=b.fim&&!r.bmId&&!r.fechado)r.bmId=b.id});
    (S.sobras||[]).forEach(s=>{if(s.empresaId&&noEscopo(s,b.empresaId,ctOf(b),b.obraId,b.contratoId)&&s.data>=b.ini&&s.data<=b.fim&&!s.bmId){s.valorUnit=sobraUnit(s);s.valor=sobraTotal(s);s.bmId=b.id}});
    S.bms.push(b);if(E)E.proximoBM=b.numero+1;audit('bm.fechar',`BM ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' — '+b.obraNome+(b.contratoNumero?' ('+b.contratoNumero+')':''):''} — ${br(b.ini)} à ${br(b.fim)} — ${esc(b.qtd)} refeições — líquido ${money(b.liquido)}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,depois:'fechado'});concluir(`BM ${esc(b.numero)} fechado e enviado ao restaurante`);notify('bm.fechado',`BM nº ${esc(b.numero)} — ${b.empresaNome} — período ${br(b.ini)} à ${br(b.fim)} fechado e aguardando validação do restaurante`,destRest(ctOf(b)),{bmId:b.id});renderBM();renderSup();
  });
  on('bm-validar',()=>{b.status='assinado_restaurante';b.assRest={tipo:'eletronica',usuario:USER.nome,em:new Date().toISOString()};audit('bm.validar',`BM ${esc(b.numero)} — ${b.empresaNome}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:'fechado',depois:'assinado_restaurante'});concluir(`BM ${esc(b.numero)} validado — devolvido ao Suprimentos assinado`);notify('bm.validado',`BM nº ${esc(b.numero)} — ${b.empresaNome} validado (assinatura eletrônica) pelo restaurante ${bmK(b).nome}`,destSup(),{bmId:b.id});$('bm-modal').classList.remove('on');refreshBadges();if(can('sup.ver')){go('sup');openBM(b)}else renderRest()});
  on('bm-homologar',()=>{b.status='assinado_restaurante';b.assRest={tipo:'fisica',usuario:K.nome||'Restaurante',por:USER.nome,em:new Date().toISOString()};audit('bm.homologar',`BM ${esc(b.numero)} — ${b.empresaNome}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:'fechado',depois:'assinado_restaurante'});concluir('Assinatura física do restaurante homologada');notify('bm.validado',`BM nº ${esc(b.numero)} — ${b.empresaNome}: assinatura física do restaurante homologada`,destSup().concat(destRest(ctOf(b))),{bmId:b.id});renderBM();renderSup()});
  on('bm-ass-sup',()=>{const G=bmGestor(b);const oid=bmObraId(b);
    if(!G.gestor&&!oid){G.gestor=(($('bm-gestor-manual')||{}).value||'').trim().replace(/\s+/g,' ');if(!G.gestor){toast('Informe o Gestor / Engenheiro que assina este BM.','warn');const i=$('bm-gestor-manual');if(i)i.focus();return}}
    if(!G.gestor){toast(`Cadastre o Gestor / Engenheiro da obra ${(obra(oid)||{}).nome||b.obraNome||''} em Configurações › Obras antes de registrar a assinatura.`,'warn');return}
    b.gestor=G.gestor;b.cargo=G.cargo;b.status='assinado';b.assSup={tipo:'fisica',usuario:G.gestor,por:USER.nome,em:new Date().toISOString()};audit('bm.assinar_sup',`BM ${esc(b.numero)} — ${b.empresaNome}${b.obraNome?' — '+b.obraNome:''} — Gestor / Engenheiro: ${G.gestor}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:'assinado_restaurante',depois:'assinado'});concluir('Assinatura do Gestor / Engenheiro registrada');notify('bm.concluido',`BM nº ${esc(b.numero)} — ${b.empresaNome} concluído: assinado pelo restaurante e pelo Gestor / Engenheiro da obra`,destSup().concat(destRest(ctOf(b))),{bmId:b.id});renderBM();renderSup()});
  on('bm-print',()=>exportBM(b,true));
  on('bm-nf-save',()=>{const nfAntes=b.nf;b.nf=$('bm-nf').value.trim();if(b.nf)b.status='faturado';audit('bm.nf',`BM ${esc(b.numero)} — NF ${b.nf}`,{empresa:b.empresaNome,entidade:'BM '+b.numero,antes:nfAntes||null,depois:b.nf});concluir('Nota fiscal registrada — pronta para inclusão em pagamento');notify('bm.nf',`BM nº ${esc(b.numero)} — ${b.empresaNome}: nota fiscal ${b.nf} registrada`,destSup(),{bmId:b.id});renderBM();renderSup()});
  $('bm-pdf').disabled=!(can('sup.bm')||can('rest.validar'));
  $('bm-share').hidden=!isMobile();$('bm-share').disabled=$('bm-pdf').disabled;
}

/* ---- PDF export / print (jsPDF + AutoTable) ---- */
function bmPdf(b){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  const K=bmK(b),E=emp(b.empresaId);const W=297,M=10;let y=M;
  const mes=parse(b.ini).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).toUpperCase();
  let x=M;
  if(E&&logoOk(E.logo)){try{const maxW=42,maxH=18;const ratio=(E.logoW||4)/(E.logoH||1);let w=maxW,h=w/ratio;if(h>maxH){h=maxH;w=h*ratio}
    doc.addImage(E.logo,E.logo.startsWith('data:image/jpeg')?'JPEG':'PNG',M,y,w,h);x=M+w+6}catch(e){}}
  doc.setFont('helvetica','bold');doc.setFontSize(13);doc.text(('MEDIÇÃO DO CONTRATO DE '+(K.servico||'FORNECIMENTO DE REFEIÇÕES')).toUpperCase(),x,y+5);
  doc.setFontSize(9);doc.setFont('helvetica','normal');
  doc.text(`Empresa: ${b.empresaNome}${b.empresaCnpj?'   CNPJ: '+b.empresaCnpj:''}`,x,y+11);
  doc.text(`Contratada: ${K.nome||'—'}${K.cnpj?'   CNPJ: '+K.cnpj:''}`,x,y+16);
  if(b.obraNome)doc.text(`Obra: ${b.obraNome}${b.contratoNumero?'   Contrato: '+b.contratoNumero:''}`,x,y+21);
  doc.setFont('helvetica','bold');doc.text(`MEDIÇÃO Nº ${esc(b.numero)}`,W-M,y+5,{align:'right'});
  doc.setFont('helvetica','normal');doc.text(`Período: ${br(b.ini)} à ${br(b.fim)}`,W-M,y+11,{align:'right'});doc.text(`Ref.: ${mes}`,W-M,y+16,{align:'right'});
  y+=b.obraNome?27:22;doc.setDrawColor(23,33,43);doc.setLineWidth(.5);doc.line(M,y,W-M,y);y+=3;
  const anyCt=b.itens.some(i=>i.qtdCt!==null);const dash=v=>v===null||v===undefined?'—':v;
  const head=['Item','Descrição','Unid','Preço unit.'].concat(anyCt?['Qtd contrato','Total contrato']:[]).concat(['Acum. anterior','Atual','Total acum.']).concat(anyCt?['Saldo']:[]).concat(['R$ acum. ant.','R$ desta medição','R$ acum. atual']).concat(anyCt?['R$ saldo']:[]);
  const body=b.itens.map(i=>[i.item,tipo(i.tipo).nome,'un',i.preco===null?'—':money(i.preco)].concat(anyCt?[dash(i.qtdCt&&num(i.qtdCt)),i.totalCt===null?'—':money(i.totalCt)]:[]).concat([num(i.acumQtd),num(i.atualQtd),num(i.totAcQtd)]).concat(anyCt?[i.saldoQtd===null?'—':num(i.saldoQtd)]:[]).concat([money(i.acumVal),money(i.atualVal),money(i.totAcVal)]).concat(anyCt?[i.saldoVal===null?'—':money(i.saldoVal)]:[]));
  const tot=k=>b.itens.reduce((s,i)=>s+(i[k]||0),0);
  body.push(['','TOTAL','',''].concat(anyCt?['',money(tot('totalCt'))]:[]).concat([num(tot('acumQtd')),num(tot('atualQtd')),num(tot('totAcQtd'))]).concat(anyCt?[num(tot('saldoQtd'))]:[]).concat([money(tot('acumVal')),money(tot('atualVal')),money(tot('totAcVal'))]).concat(anyCt?[money(tot('saldoVal'))]:[]));
  const right={halign:'right'};const colStyles={};head.forEach((h,i)=>{if(i>=3)colStyles[i]=right;if(i===2)colStyles[i]={halign:'center'}});
  const base={theme:'grid',styles:{fontSize:7.5,cellPadding:1.5,lineColor:[200,208,214],lineWidth:.2,textColor:[23,33,43]}};
  doc.autoTable({...base,startY:y,head:[head],body,headStyles:{fillColor:[15,92,112],textColor:255,fontSize:7},columnStyles:colStyles,didParseCell:d=>{if(d.section==='body'&&d.row.index===body.length-1)d.cell.styles.fontStyle='bold'}});
  y=doc.lastAutoTable.finalY+6;
  const leftW=150;
  doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('RESUMO POR DATA',M,y);
  const dHead=['Data'].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor']);
  const dBody=b.dias.map(d=>[`${wd(d.d)} ${br(d.d)}`].concat(d.porTipo.map(n=>n||'–')).concat([String(d.total),money(d.valor)]));
  dBody.push(['Total geral'].concat(TIPOS.map((t,i)=>String(b.dias.reduce((s,d)=>s+d.porTipo[i],0)))).concat([String(b.qtd),money(b.valor)]));
  const dCols={};dHead.forEach((h,i)=>{if(i>0)dCols[i]=right});
  const grey={fillColor:[236,241,244],textColor:[23,33,43],fontSize:7};
  doc.autoTable({...base,startY:y+2,head:[dHead],body:dBody,tableWidth:leftW,margin:{left:M,bottom:30},headStyles:grey,columnStyles:dCols,didParseCell:d=>{if(d.section==='body'&&d.row.index===dBody.length-1)d.cell.styles.fontStyle='bold'}});
  let yL=doc.lastAutoTable.finalY;
  if(b.obras.length>1){
    const oHead=['Obra'].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor']);
    const oBody=b.obras.map(e=>[e.o||'—'].concat(e.porTipo.map(n=>n||'–')).concat([String(e.total),money(e.valor)]));
    doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('RESUMO POR OBRA',M,yL+7);
    doc.autoTable({...base,startY:yL+9,head:[oHead],body:oBody,tableWidth:leftW,margin:{left:M,bottom:30},headStyles:grey,columnStyles:dCols});
    yL=doc.lastAutoTable.finalY;
  }
  const TGp=tercGrupos(bmRegs(b));
  if(TGp.length){
    const tHead=['Empresa terceirizada'].concat(TIPOS.map(t=>t.curto)).concat(['Total','Valor']);
    const tBody=TGp.map(g=>[g.nome].concat(g.porTipo.map(n=>n||'–')).concat([String(g.total),money(g.valor)]));
    tBody.push(['Total terceirizados'].concat(TIPOS.map((t,i)=>String(TGp.reduce((s,g)=>s+g.porTipo[i],0)))).concat([String(TGp.reduce((s,g)=>s+g.total,0)),money(TGp.reduce((s,g)=>s+g.valor,0))]));
    doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text('TERCEIRIZADOS POR EMPRESA (já incluídos nos totais)',M,yL+7);
    doc.autoTable({...base,startY:yL+9,head:[tHead],body:tBody,tableWidth:leftW,margin:{left:M,bottom:30},headStyles:grey,columnStyles:dCols,didParseCell:d=>{if(d.section==='body'&&d.row.index===tBody.length-1)d.cell.styles.fontStyle='bold'}});
    yL=doc.lastAutoTable.finalY;
  }
  // financial block on the first page position of the resumo (if resumo spilled to a new page, place fin on that page)
  const fx=M+leftW+12,fw=W-M-fx;let fy=y;
  doc.setPage(doc.internal.getNumberOfPages());const lastPage=doc.internal.getNumberOfPages();
  if(lastPage>1){doc.setPage(1)}
  const line=(k,v,bold)=>{doc.setFont('helvetica',bold?'bold':'normal');doc.setFontSize(bold?10:8.5);doc.text(k,fx,fy);doc.text(v,fx+fw,fy,{align:'right'});fy+=bold?7:6};
  line('VALOR DA MEDIÇÃO:',money(b.valor));line('DEDUÇÕES / DESCONTOS:',money(b.deducoes));line('ADIANTAMENTOS E OUTROS:',money(b.adiant));line('TOTAL DA FATURA:',money(b.liquido));
  doc.setDrawColor(23,33,43);doc.line(fx,fy-3,fx+fw,fy-3);fy+=2.5;line('TOTAL LÍQUIDO DA MEDIÇÃO:',money(b.liquido),true);
  doc.setFont('helvetica','normal');doc.setFontSize(8);doc.text('Obs.: '+([b.obs,b.sobrasQtd?`Inclui ${esc(b.sobrasQtd)} refeições de sobras (${money(b.sobrasValor)}).`:''].filter(Boolean).join(' · ')||'—'),fx,fy+2,{maxWidth:fw});
  if(b.nf)doc.text('Nota fiscal: '+b.nf,fx,fy+12);
  // signatures on the last page
  doc.setPage(lastPage);
  let sy=lastPage>1?Math.min(yL+20,180):Math.max(yL,fy+20)+16;if(sy>180)sy=180;
  const stamp=(a,cx,who)=>{if(!a){doc.setTextColor(150);doc.setFontSize(7);doc.text(`aguardando assinatura — ${who}`,cx,sy-4,{align:'center'});doc.setTextColor(23,33,43);return}
    doc.setDrawColor(35,122,75);doc.setTextColor(35,122,75);doc.setLineWidth(.5);doc.roundedRect(cx-45,sy-16,90,13,1.5,1.5);doc.setFont('helvetica','bold');doc.setFontSize(8);
    doc.text(a.tipo==='eletronica'?'ASSINADO ELETRONICAMENTE':'ASSINATURA FÍSICA HOMOLOGADA',cx,sy-11,{align:'center'});doc.setFont('helvetica','normal');doc.setFontSize(6.5);
    doc.text(`${a.usuario} · ${brdt(a.em)}${a.tipo==='fisica'?' · homologado por '+a.por:''}`,cx,sy-6.5,{align:'center'});doc.setTextColor(23,33,43);doc.setDrawColor(23,33,43)};
  const lx=M+60,rx=W-M-60;
  if(b.status!=='rascunho'){stamp(b.assSup,lx,'Gestor / Engenheiro');stamp(b.assRest,rx,'Restaurante')}
  doc.setLineWidth(.3);doc.line(lx-50,sy,lx+50,sy);doc.line(rx-50,sy,rx+50,sy);
  doc.setFontSize(8);doc.text(K.gestor||'',lx,sy+4,{align:'center'});doc.text(`${K.cargo||'Gestor / Engenheiro'} — ${b.empresaNome}`,lx,sy+8,{align:'center'});
  doc.text(K.nome||'',rx,sy+4,{align:'center'});doc.text('Contratada',rx,sy+8,{align:'center'});
  doc.setFontSize(7);doc.setTextColor(120);doc.text(`Emitido em ${brdt(b.emitidoEm)} por ${b.usuario}${b.status==='rascunho'?' · RASCUNHO':b.fechadoEm?' · fechado em '+brdt(b.fechadoEm)+' por '+b.fechadoPor:''}`,M,205);
  doc.setTextColor(23,33,43);
  // ---- Anexo: lista de colaboradores por dia e refeição ----
  const grupos=bmGrupos(b);
  if(grupos.length){
    doc.addPage();let ly=M+4;
    doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text(`LISTA DE COLABORADORES — BM Nº ${esc(b.numero)} — ${b.empresaNome}`,M,ly);
    doc.setFont('helvetica','normal');doc.setFontSize(8.5);ly+=5;doc.text(`Período ${br(b.ini)} à ${br(b.fim)} · ${grupos.reduce((s,x)=>s+x.total,0)} refeições · Assinatura digital = leitura do QR Code do crachá; "Retirada" = levada por outro colaborador; "Manual" = terceirizado sem crachá, lançado pelo restaurante; "Sobra" = preparada e não consumida, cobrada.`,M,ly,{maxWidth:W-2*M});
    ly+=5;
    grupos.forEach((x,i)=>{
      if(ly>175){doc.addPage();ly=M+4}
      doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.text(`${i+1}. ${br(x.d)} — ${x.tipo.curto} (${esc(x.total)})`,M,ly+4);
      doc.autoTable({startY:ly+6,head:[['#','Colaborador','Obra','Assinatura digital']],
        body:listaLinhas(x.regs).map(l=>l.sub?[{content:`Terceirizada: ${l.sub} — ${l.n} ${l.n===1?'refeição':'refeições'}`,colSpan:4,styles:{fillColor:[245,247,248],fontStyle:'bold',fontSize:7.5,halign:'left'}}]:[String(l.i),l.r.nome,l.r.obraNome||'—',assinaturaTxt(l.r)]).concat(x.sobras.map((o,k)=>[String(x.regs.length+k+1),sobraLinha(o),o.obraNome||'—',sobraAssTxt(o)])),
        theme:'grid',margin:{left:M,right:M,bottom:14},styles:{fontSize:8,cellPadding:1.4,lineColor:[200,208,214],lineWidth:.2,textColor:[23,33,43]},
        headStyles:{fillColor:[236,241,244],textColor:[23,33,43],fontSize:7.5},columnStyles:{0:{cellWidth:10,halign:'right'},1:{cellWidth:110},2:{cellWidth:70}}});
      ly=doc.lastAutoTable.finalY+4;
    });
    const pages=doc.internal.getNumberOfPages();
    for(let pg=lastPage+1;pg<=pages;pg++){doc.setPage(pg);doc.setFontSize(7);doc.setTextColor(120);doc.text(`BM ${esc(b.numero)} — ${b.empresaNome} — lista de colaboradores — página ${pg} de ${pages}`,M,205);doc.setTextColor(23,33,43)}
  }
  return doc;
}
async function exportBM(b,print){
  if(!window.jspdf||!window.jspdf.jsPDF){toast('Biblioteca de PDF não carregou — verifique a conexão');return}
  const btn=print?$('bm-print'):$('bm-pdf');const old=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent='Gerando…'}
  try{
    audit(print?'bm.imprimir':'bm.pdf',`BM ${esc(b.numero)} — ${b.empresaNome}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});save();
    const doc=bmPdf(b);const name=bmNomeArq(b);
    const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
    if(dl){try{await dl.save({filename:name,data:doc.output('blob')});sucesso(print?'PDF salvo — abra e imprima para assinatura':'PDF salvo')}catch(e){if(e&&e.code==='declined')toast('Download cancelado');else doc.save(name)}}
    else if(print){doc.autoPrint();const w=window.open(doc.output('bloburl'),'_blank');if(!w){doc.save(name);sucesso('PDF gerado — abra e imprima')}else sucesso('PDF aberto para impressão')}
    else{doc.save(name);sucesso('PDF gerado')}
  }catch(e){toast('Falha ao gerar o PDF')}
  if(btn){btn.disabled=false;btn.textContent=old}
}
$('bm-pdf').onclick=()=>{if(BM)exportBM(BM,false)};
function isMobile(){return matchMedia('(max-width: 899px)').matches||matchMedia('(pointer: coarse)').matches}
function bmNomeArq(b){return `BM-${esc(b.numero)}-${b.empresaNome.replace(/[^\w\-]+/g,'_').slice(0,40)}-${b.ini}.pdf`}
async function shareBM(b){
  if(!window.jspdf||!window.jspdf.jsPDF){toast('Biblioteca de PDF não carregou — verifique a conexão');return}
  const btn=$('bm-share');btn.disabled=true;
  try{
    const doc=bmPdf(b);const name=bmNomeArq(b);const file=new File([doc.output('blob')],name,{type:'application/pdf'});
    const txt=`Boletim de Medição nº ${esc(b.numero)} — ${b.empresaNome} — ${bmK(b).nome||''} — período ${br(b.ini)} à ${br(b.fim)} — ${money(b.liquido)}`;
    if(navigator.canShare&&navigator.canShare({files:[file]})){
      try{await navigator.share({files:[file],title:`BM nº ${esc(b.numero)} — ${b.empresaNome}`,text:txt});
        audit('bm.compartilhar',`BM ${esc(b.numero)} — ${b.empresaNome}`,{empresa:b.empresaNome,entidade:'BM '+b.numero});concluir(`PDF do BM nº ${esc(b.numero)} compartilhado`)}
      catch(e){if(e&&e.name==='AbortError')toast('Compartilhamento cancelado','info');else toast('Não foi possível compartilhar: '+((e&&e.message)||e),'bad')}
    }else{doc.save(name);toast('Este navegador não permite compartilhar arquivos — o PDF foi baixado; envie-o pelo WhatsApp ou outro app','info')}
  }catch(e){toast('Falha ao gerar o PDF','bad')}
  btn.disabled=false;
}
$('bm-share').onclick=()=>{if(BM)shareBM(BM)};

/* =================== CONFIGURAÇÕES =================== */
let CFGTAB=null, UEDIT=null, CEDIT=null, EEDIT=null, OEDIT=null, ELOGO=null;
function renderSetup(){
  const t=today();
  const steps=[
    ['cfg.empresas','empresas',S.empresas.length,'Cadastrar ao menos uma empresa (com logotipo para o BM)'],
    ['cfg.obras','obras',S.obras.length,'Cadastrar ao menos uma obra'],
    ['cfg.obras','obras',S.obras.length&&S.obras.every(o=>o.ativo===false||o.gestor)?1:0,'Informar o Gestor / Engenheiro de cada obra (é quem assina o BM)'],
    ['cfg.contratos','contratos',(S.contratos||[]).length,'Cadastrar os contratos (Nº, vigência) e vincular às obras'],
    ['cfg.precos','precos',S.precos.length,'Cadastrar os preços das refeições por contrato'],
    ['cfg.colab','colab',S.colab.length,'Cadastrar colaboradores lendo o QR Code do crachá'],
    ['cfg.contratada','contratada',(S.contratadas||[]).length,'Cadastrar as contratadas (restaurantes) e as obras que atendem'],
    ['cfg.usuarios','usuarios',S.users.length-1,'Criar usuários do Restaurante e do Suprimentos'],
  ].filter(s=>can(s[0]));
  const done=steps.every(s=>s[2]>0);
  $('setup-card').hidden=done||!steps.length;
  $('setup-list').innerHTML=steps.map(s=>`<div class="st ${s[2]>0?'ok':'todo'}"><div class="dot">${s[2]>0?'✓':'!'}</div><button class="link" data-t="${s[1]}" style="background:none;border:0;padding:0;text-align:left;color:inherit;${s[2]>0?'':'font-weight:600'}">${s[3]}</button></div>`).join('');
  $('setup-list').querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{CFGTAB=b.dataset.t;renderCfg()});
}
function renderCfg(){
  const tabs=[];if(can('cfg.usuarios'))tabs.push(['usuarios','Usuários']);if(can('cfg.usuarios')&&isAdm(USER))tabs.push(['perfis','Perfis']);if(can('cfg.colab'))tabs.push(['colab','Colaboradores']);if(can('cfg.empresas'))tabs.push(['empresas','Empresas']);if(can('cfg.obras'))tabs.push(['obras','Obras']);if(can('cfg.contratos'))tabs.push(['contratos','Contratos']);if(can('cfg.precos'))tabs.push(['precos','Preços']);if(can('cfg.contratada'))tabs.push(['contratada','Contratadas']);if(can('cfg.horarios'))tabs.push(['horarios','Horários']);if(can('lgpd.gerir'))tabs.push(['lgpd','Privacidade (LGPD)']);
  if(!tabs.some(t=>t[0]===CFGTAB))CFGTAB=tabs[0]&&tabs[0][0];
  $('cfg-tabs').innerHTML=tabs.map(t=>`<button data-t="${t[0]}" class="${CFGTAB===t[0]?'on':''}">${t[1]}</button>`).join('');
  $('cfg-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(CFGTAB!==b.dataset.t){audit('nav.cfg','Configurações › '+b.textContent);save()}CFGTAB=b.dataset.t;renderCfg()});
  document.querySelectorAll('.cfg-pane').forEach(p=>p.hidden=p.id!=='cfg-'+CFGTAB);
  renderSetup();
  ({perfis:renderPerfis,usuarios:renderUsers,colab:renderColab,empresas:renderEmpresas,obras:renderObras,precos:renderPrecos,contratos:renderContratos,contratada:renderContratada,horarios:renderHorarios,lgpd:renderLgpd}[CFGTAB]||(()=>{}))();
}
/* users */
/* perfis */
let PFEDIT=null;
function seedPerfis(){
  if((S.perfis||[]).length||!can('cfg.usuarios')||!isAdm(USER))return;
  const base=[['Administrador','Adm',PERFIS.Administrador],['Suprimentos','Suprimentos',PERFIS.Suprimentos],['Restaurante','Restaurante',PERFIS.Restaurante],['Obra','Obra',['sup.ver']]];
  base.forEach(([nome,tipo,perms])=>S.perfis.push({id:'pf-'+tipo.toLowerCase(),nome,tipo,perms:[...perms]}));
  S.users.forEach(u=>{const pf=S.perfis.find(p=>p.nome===u.perfil);if(pf&&!u.perfilId){u.perfilId=pf.id;u.tipo=u.tipo||pf.tipo}});
  save();
}
function perfil(id){return (S.perfis||[]).find(p=>p.id===id)}
function renderPerfis(){
  $('pf-list').innerHTML=(S.perfis||[]).map(p=>{const n=S.users.filter(u=>u.perfilId===p.id).length;return `<div class="item"><div class="avatar">${ini(p.nome)}</div><div class="t"><b>${esc(p.nome)} <span class="pill ${p.tipo==='Adm'?'warn':'neutral'}">${esc(p.tipo)}</span></b><span>${p.tipo==='Adm'?'todas as':p.perms.length} permissões · ${n} usuário(s)</span></div><button class="btn sec sm" data-pf="${esc(p.id)}">Editar</button></div>`}).join('')||'<div class="small muted">Nenhum perfil.</div>';
  $('pf-list').querySelectorAll('[data-pf]').forEach(b=>b.onclick=()=>{PFEDIT=perfil(b.dataset.pf);fillPerfil()});
  if(!$('pf-perms').innerHTML)fillPerfil();
}
function fillPerfil(){
  const p=PFEDIT||{nome:'',tipo:'Obra',perms:[]};
  $('pf-form-title').textContent=PFEDIT?'Editar perfil':'Novo perfil';$('pf-nome').value=p.nome;$('pf-tipo').value=p.tipo;$('pf-err').hidden=true;
  $('pf-del').hidden=!PFEDIT;renderPfPerms(new Set(p.tipo==='Adm'?PERFIS.Administrador:p.perms));
}
function renderPfPerms(set){
  const adm=$('pf-tipo').value==='Adm';$('pf-adm-note').hidden=!adm;
  $('pf-perms').innerHTML=PERMS.map(q=>q.grp?`<div class="grp">${q.grp}</div>`:`<span>${q.nome}</span><button type="button" class="switch${adm||set.has(q.id)?' on':''}" data-pp="${esc(q.id)}" role="switch" aria-checked="${adm||set.has(q.id)}" ${adm?'disabled':''} aria-label="${esc(q.nome)}"></button>`).join('');
  const upd=()=>{$('pf-perms-sum').textContent=`${$('pf-perms').querySelectorAll('.switch.on').length} de ${PERMS.filter(q=>q.id).length} ligadas`};
  $('pf-perms').querySelectorAll('.switch').forEach(b=>b.onclick=()=>{b.classList.toggle('on');b.setAttribute('aria-checked',b.classList.contains('on'));upd()});upd();
}
$('pf-tipo').onchange=()=>renderPfPerms(new Set([...$('pf-perms').querySelectorAll('.switch.on')].map(b=>b.dataset.pp)));
$('pf-new').onclick=()=>{PFEDIT=null;fillPerfil()};$('pf-cancel').onclick=()=>{PFEDIT=null;fillPerfil()};
$('pf-save').onclick=()=>{
  const err=$('pf-err');const show=m=>{err.hidden=false;err.textContent=m};
  const nome=$('pf-nome').value.trim(),tipo=$('pf-tipo').value;if(!nome)return show('Informe o nome do perfil.');
  if(S.perfis.some(p=>p.nome.toLowerCase()===nome.toLowerCase()&&p!==PFEDIT))return show('Já existe perfil com este nome.');
  const perms=tipo==='Adm'?[...PERFIS.Administrador]:[...$('pf-perms').querySelectorAll('.switch.on')].map(b=>b.dataset.pp);
  if(PFEDIT&&PFEDIT.tipo==='Adm'&&tipo!=='Adm'&&S.users.some(u=>u.perfilId===PFEDIT.id&&u.id===USER.id))return show('Você não pode tirar o tipo Adm do seu próprio perfil.');
  audit('perfil.salvar',`${PFEDIT?'Alterou':'Criou'} perfil ${nome} (${tipo}) — ${perms.length} permissões`,{entidade:'perfil '+nome,antes:PFEDIT?JSON.stringify({nome:PFEDIT.nome,tipo:PFEDIT.tipo,perms:PFEDIT.perms}):null,depois:JSON.stringify({nome,tipo,perms})});
  if(PFEDIT){Object.assign(PFEDIT,{nome,tipo,perms});S.users.filter(u=>u.perfilId===PFEDIT.id).forEach(u=>{u.perms=[...perms];u.perfil=nome;u.tipo=tipo})}
  else S.perfis.push({id:uid(),nome,tipo,perms});
  concluir('Perfil salvo');PFEDIT=null;fillPerfil();renderPerfis();
};
$('pf-del').onclick=()=>{if(!PFEDIT)return;const n=S.users.filter(u=>u.perfilId===PFEDIT.id).length;if(n){toast(`Há ${n} usuário(s) com este perfil — troque o perfil deles antes`);return}
  const p=PFEDIT;confirmDelete({titulo:`Excluir perfil ${esc(p.nome)}`,resumo:'<div class="notice warn">O perfil deixa de aparecer no cadastro de usuários.</div>',botao:'Excluir perfil',onOk:async(_,motivo)=>{S.perfis=S.perfis.filter(x=>x!==p);audit('perfil.excluir',`${p.nome} — motivo: ${motivo}`,{entidade:'perfil '+p.nome});concluir(`Perfil ${p.nome} excluído`);PFEDIT=null;fillPerfil();renderPerfis()}})};
function renderUsers(){
  const pend=S.users.filter(u=>u.status==='pendente');$('u-pend-card').hidden=!pend.length;
  $('u-pend').innerHTML=pend.map(u=>`<div class="item"><div class="avatar">${ini(u.login||u.nome)}</div><div class="t"><b class="mono">${esc((u.login||'').toUpperCase())}</b><span>${esc((u.email||'').toUpperCase())}</span></div><select data-pp-pf="${esc(u.id)}" style="width:auto">${perfisQuePosso().map(p=>`<option value="${esc(p.id)}">${esc(p.nome)} (${esc(p.tipo)})</option>`).join('')}</select><button class="btn good sm" data-ap="${esc(u.id)}">Aprovar</button>${isAdm(USER)?`<button class="btn danger sm" data-ng="${esc(u.id)}">Negar</button>`:''}</div>`).join('');
  $('u-pend').querySelectorAll('[data-ap]').forEach(b=>b.onclick=()=>{const u=S.users.find(x=>x.id===b.dataset.ap);const pf=perfil($('u-pend').querySelector(`[data-pp-pf="${u.id}"]`).value);if(!pf){toast(isAdm(USER)?'Cadastre um perfil antes':'Somente o administrador aprova esta conta: os perfis cadastrados têm acessos que você não tem','warn');return}
    Object.assign(u,{status:'aprovado',ativo:true,perfilId:pf.id,perfil:pf.nome,tipo:pf.tipo,perms:pf.tipo==='Adm'?[...PERFIS.Administrador]:[...pf.perms],nome:u.nome||u.login});
    audit('usuario.aprovar',`${(u.login||'').toUpperCase()} (${u.email}) aprovado com o perfil ${pf.nome}`,{entidade:'usuário '+u.login});notify('conta.aprovada',`Sua conta foi aprovada com o perfil ${pf.nome}. Bem-vindo ao SISMED!`,[u.id]);concluir('Conta aprovada');renderUsers()});
  $('u-pend').querySelectorAll('[data-ng]').forEach(b=>b.onclick=()=>{const u=S.users.find(x=>x.id===b.dataset.ng);
    confirmDelete({titulo:`Negar conta ${esc((u.login||'').toUpperCase())}`,resumo:`<div class="notice warn">A conta ${esc(u.email)} será excluída. A pessoa poderá se cadastrar de novo.</div>`,botao:'Negar e excluir',onOk:async(_,motivo)=>{const {error}=await sb.rpc('admin_delete_user',{target:u.id});if(error)throw error;S.users=S.users.filter(x=>x!==u);audit('usuario.negar',`${(u.login||'').toUpperCase()} (${u.email}) — motivo: ${motivo}`,{entidade:'usuário '+u.login});concluir('Conta negada e excluída');renderUsers()}})});
  $('u-list').innerHTML=S.users.filter(u=>u.status!=='pendente').map(u=>`<div class="item"><div class="avatar">${ini(u.nome)}</div><div class="t"><b>${esc(u.nome)} <span class="pill ${isAdm(u)?'warn':'neutral'}">${esc(u.tipo||'—')}</span></b><span>${esc(u.perfil)} · <span class="mono">${esc(u.login)}</span> · ${u.perms.length} permissões · ${u.obras&&u.obras.length?u.obras.length+' obra(s)':'todas as obras'} · ${u.contratadas&&u.contratadas.length?esc(u.contratadas.map(id=>(ct(id)||{}).nome).filter(Boolean).join(', ')):'todos os restaurantes'}</span></div>${u.ativo?'':'<span class="pill bad">inativo</span>'}${isAdm(u)&&!isAdm(USER)?'<span class="small muted" title="Somente um administrador altera contas de administrador">só o Adm altera</span>':`<button class="btn sec sm" data-u="${esc(u.id)}">Editar</button>`}</div>`).join('');
  $('u-list').querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{UEDIT=S.users.find(u=>u.id===b.dataset.u);fillUser()});
  if(!$('u-perms').innerHTML)fillUser();
}
function fillUser(){
  const pfR=(S.perfis||[]).find(p=>p.tipo==='Restaurante')||(S.perfis||[])[0];
  const u=UEDIT||{nome:'',login:'',senha:'',perfilId:pfR&&pfR.id,perfil:pfR?pfR.nome:'',tipo:pfR?pfR.tipo:'Restaurante',perms:pfR?[...pfR.perms]:[...PERFIS.Restaurante],ativo:true};
  $('u-form-title').textContent=UEDIT?'Editar usuário':'Novo usuário';
  $('u-perfil').innerHTML=(S.perfis||[]).filter(p=>perfisQuePosso().includes(p)||(UEDIT&&UEDIT.perfilId===p.id)).map(p=>`<option value="${esc(p.id)}">${esc(p.nome)} (${esc(p.tipo)})</option>`).join('')+'<option value="custom">Personalizado</option>';
  const pfId=u.perfilId&&perfil(u.perfilId)?u.perfilId:((S.perfis||[]).find(p=>p.nome===u.perfil)||{}).id;
  $('u-nome').value=u.nome;$('u-login').value=(u.login||'').toUpperCase();$('u-email').value=(UEDIT&&u.email||'').toUpperCase();$('u-email').disabled=!!UEDIT;$('u-senha').value='';$('u-perfil').value=pfId||'custom';$('u-tipo').value=u.tipo||'Obra';$('u-tipo').disabled=$('u-perfil').value!=='custom';$('u-ativo').value=u.ativo?'1':'0';
  $('u-del').hidden=!(UEDIT&&isAdm(USER)&&!isAdm(UEDIT)&&UEDIT!==USER);
  $('u-login').disabled=!!UEDIT;$('u-senha').placeholder=UEDIT?'nova senha — deixe em branco para manter':'mín. 8 caracteres, com letras e números';$('u-senha').disabled=false;$('u-senha').type='password';$('u-senha-hint').hidden=!UEDIT;
  renderPerms(new Set(u.perms));
  renderSwitchList('u-obras',S.obras.map(o=>({id:o.id,nome:o.nome+(o.ativo===false?' (encerrada)':'')})),new Set(u.obras||[]),'data-ob','todas');
  renderSwitchList('u-cts',(S.contratadas||[]).map(c=>({id:c.id,nome:c.nome+(c.ativo===false?' (inativa)':'')})),new Set(u.contratadas||[]),'data-uct','todos');
  document.querySelectorAll('#u-form-card [data-coll], .coll[data-coll]').forEach(c=>{c.classList.remove('open');c.querySelector('.coll-b').hidden=true;c.querySelector('.coll-h').setAttribute('aria-expanded','false')});
}
function renderSwitchList(id,items,sel,attr,todos){
  $(id).innerHTML=items.map(o=>`<span>${esc(o.nome)}</span><button type="button" class="switch${sel.has(o.id)?' on':''}" ${attr}="${esc(o.id)}" role="switch" aria-checked="${sel.has(o.id)}" aria-label="${esc(o.nome)}"></button>`).join('')||'<span class="small muted">Nada cadastrado ainda.</span>';
  const upd=()=>{const n=$(id).querySelectorAll('.switch.on').length;$(id+'-sum').textContent=n?`${n} de ${items.length}`:`${todos} (${items.length})`};
  $(id).querySelectorAll('.switch').forEach(b=>b.onclick=()=>{b.classList.toggle('on');b.setAttribute('aria-checked',b.classList.contains('on'));upd()});upd();
}
document.querySelectorAll('.coll[data-coll] .coll-h').forEach(h=>h.onclick=()=>{const c=h.parentElement;const open=!c.classList.contains('open');c.classList.toggle('open',open);c.querySelector('.coll-b').hidden=!open;h.setAttribute('aria-expanded',open)});
function renderPerms(set){
  $('u-perms').innerHTML=PERMS.map(p=>p.grp?`<div class="grp">${p.grp}</div>`:`<span>${p.nome}</span><button class="switch${set.has(p.id)?' on':''}" data-p="${esc(p.id)}" role="switch" aria-checked="${set.has(p.id)}" aria-label="${esc(p.nome)}"></button>`).join('');
  const upd=()=>{$('u-perms-sum').textContent=`${$('u-perms').querySelectorAll('.switch.on').length} de ${PERMS.filter(p=>p.id).length} ligadas`};
  $('u-perms').querySelectorAll('.switch').forEach(b=>b.onclick=()=>{b.classList.toggle('on');b.setAttribute('aria-checked',b.classList.contains('on'));$('u-perfil').value='custom';$('u-tipo').disabled=false;upd()});upd();
}
$('u-perfil').onchange=()=>{const pf=perfil($('u-perfil').value);$('u-tipo').disabled=!!pf;if(pf){$('u-tipo').value=pf.tipo;renderPerms(new Set(pf.tipo==='Adm'?PERFIS.Administrador:pf.perms))}};
$('u-del').onclick=()=>{const u=UEDIT;if(!u||!isAdm(USER)||isAdm(u))return;
  confirmDelete({titulo:`Excluir usuário ${esc(u.nome)}`,resumo:`<div class="notice warn">A conta <b>${esc((u.login||'').toUpperCase())}</b> (${esc(u.email||'')}) perde o acesso imediatamente. Os registros feitos por ela continuam no histórico e na auditoria.</div>`,botao:'Excluir usuário',
    onOk:async(_,motivo)=>{const {error}=await sb.rpc('admin_delete_user',{target:u.id});if(error)throw error;S.users=S.users.filter(x=>x!==u);if(LAST.users)delete LAST.users[u.id];audit('usuario.excluir',`${u.nome} (${u.login}) — motivo: ${motivo}`,{entidade:'usuário '+u.login});concluir('Usuário excluído');UEDIT=null;fillUser();renderUsers()}})};
$('u-new').onclick=()=>{UEDIT=null;fillUser()};
$('u-senha-gen').onclick=()=>{const a='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';let p='';do{p='';const r=new Uint32Array(12);crypto.getRandomValues(r);r.forEach(x=>p+=a[x%a.length])}while(!senhaOk(p));$('u-senha').type='text';$('u-senha').value=p;$('u-senha').select()};$('u-cancel').onclick=()=>{UEDIT=null;fillUser()};
$('u-save').onclick=async()=>{
  const nome=$('u-nome').value.trim(),login=$('u-login').value.trim().toUpperCase(),senha=$('u-senha').value,emailIn=$('u-email').value.trim().toLowerCase();
  if(!nome||!login){toast('Preencha nome e usuário');return}
  if(!UEDIT&&!senhaOk(senha)){toast('Senha: '+SENHA_REGRA);return}
  if(S.users.some(u=>(u.login||'').toUpperCase()===login&&u!==UEDIT)){toast('Já existe usuário com este login');return}
  const perms=[...$('u-perms').querySelectorAll('.switch.on')].map(b=>b.dataset.p);
  if(UEDIT===USER&&!perms.includes('cfg.usuarios')){toast('Você não pode remover sua própria permissão de usuários');return}
  const obras=[...$('u-obras').querySelectorAll('.switch.on')].map(i=>i.dataset.ob);
  const contratadas=[...$('u-cts').querySelectorAll('.switch.on')].map(i=>i.dataset.uct);
  const pf=perfil($('u-perfil').value);const tipo=pf?pf.tipo:$('u-tipo').value;
  if(UEDIT===USER&&isAdm(USER)&&tipo!=='Adm'){toast('Você não pode remover o tipo Adm da própria conta');return}
  if(!isAdm(USER)){ // o servidor aplica as mesmas regras
    if(UEDIT&&isAdm(UEDIT)){toast('Somente um administrador altera contas de administrador');return}
    if(tipo==='Adm'){toast('Somente um administrador pode criar ou promover outro administrador');return}
    const jaTinha=new Set(UEDIT?UEDIT.perms||[]:[]);const semTer=perms.filter(x=>!jaTinha.has(x)&&!USER.perms.includes(x));if(semTer.length){toast('Você só pode conceder permissões que você mesmo tem. Desmarque: '+semTer.map(x=>(PERMS.find(q=>q.id===x)||{}).nome||x).join('; '));return}
    if(UEDIT===USER&&(perms.length!==USER.perms.length||perms.some(x=>!USER.perms.includes(x)))){toast('Você não pode alterar as próprias permissões — peça a um administrador');return}
  }
  const obj={nome,login,perfilId:pf?pf.id:null,perfil:pf?pf.nome:'Personalizado',tipo,perms:tipo==='Adm'?[...PERFIS.Administrador]:perms,ativo:$('u-ativo').value==='1',obras,contratadas,status:'aprovado'};
  $('u-save').disabled=true;let okMsg=UEDIT?'Usuário salvo':`Usuário ${login} criado`;
  try{
    if(UEDIT){
      if(senha){
        if(!senhaOk(senha))throw new Error('a nova senha precisa ter '+SENHA_REGRA);
        if(UEDIT===USER){const {error}=await sb.auth.updateUser({password:senha});if(error)throw error}
        else{const {error}=await sb.rpc('admin_set_password',{target:UEDIT.id,new_password:senha});if(error)throw error}
        audit('usuario.senha',`${UEDIT===USER?'Alterou a própria senha':'Redefiniu a senha de '+UEDIT.nome+' ('+UEDIT.login+')'}`,{entidade:'usuário '+UEDIT.login});
        okMsg=UEDIT===USER?'Usuário salvo — sua senha foi alterada':`Usuário salvo — senha de ${UEDIT.nome} redefinida, informe ao usuário`;
      }
      audit('usuario.salvar',`Alterou usuário ${nome} (${login}) — perfil ${obj.perfil}, ${perms.length} permissões${obj.ativo?'':', inativo'}`,{entidade:'usuário '+login,antes:JSON.stringify({nome:UEDIT.nome,perfil:UEDIT.perfil,perms:UEDIT.perms,ativo:UEDIT.ativo}),depois:JSON.stringify(obj)});
      Object.assign(UEDIT,obj);
      if(UEDIT===USER){$('who-name').textContent=USER.nome;$('who-role').textContent=USER.tipo||USER.perfil;buildNav();CFGTAB='usuarios';go('cfg')}
    }else{
      // conta criada no servidor já com e-mail confirmado (não envia e-mail e não derruba a sessão do administrador)
      const email=emailIn||toEmail(login);
      const {data:newId,error}=await sb.rpc('admin_create_user',{p_email:email,p_password:senha,p_nome:nome,p_login:login});
      if(error)throw error;if(!newId)throw new Error('o servidor não retornou o usuário criado');
      audit('usuario.salvar',`Criou usuário ${nome} (${login}) — perfil ${obj.perfil}, ${obj.perms.length} permissões`,{entidade:'usuário '+login,depois:JSON.stringify(obj)});
      S.users.push({id:newId,email,...obj});
    }
    concluir(okMsg);UEDIT=null;fillUser();renderUsers();renderSetup();
  }catch(e){toast('Erro: '+(e.message||e))}
  $('u-save').disabled=false;
};
/* paginação das listas de Configurações */
const PAGES={};
function paginate(key,list,pp){const pages=Math.max(1,Math.ceil(list.length/pp));let pg=PAGES[key]||1;if(pg>pages)pg=pages;if(pg<1)pg=1;PAGES[key]=pg;const i0=(pg-1)*pp;return {rows:list.slice(i0,i0+pp),pg,pages,i0,total:list.length}}
function renderPager(el,key,P,unit,rerender){
  if(!el)return;
  const un=Array.isArray(unit)?(P.total===1?unit[0]:unit[1]):unit;const faixa=P.total?`${P.i0+1}–${P.i0+P.rows.length} de ${esc(P.total)} ${un}`:'';
  el.innerHTML=P.pages>1?`<button class="btn sec sm" data-pg="1" ${P.pg===1?'disabled':''}>« Primeira</button><button class="btn sec sm" data-pg="${P.pg-1}" ${P.pg===1?'disabled':''}>‹ Anterior</button><span class="small num" style="padding:0 8px;text-align:center">Página <b>${P.pg}</b> de ${P.pages}<br><span class="muted">${faixa}</span></span><button class="btn sec sm" data-pg="${P.pg+1}" ${P.pg===P.pages?'disabled':''}>Próxima ›</button><button class="btn sec sm" data-pg="${esc(P.pages)}" ${P.pg===P.pages?'disabled':''}>Última »</button>`:(P.total?`<span class="small muted">${faixa}</span>`:'');
  el.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{PAGES[key]=+b.dataset.pg;rerender()});
}
/* colaboradores */
function renderColab(){
  if(!CEDIT){fillSelect($('c-emp'),S.empresas.filter(e=>e.ativo!==false),$('c-emp').value);colabObraOpts($('c-emp').value,$('c-obra').value)}
  const need=[];if(!S.empresas.length)need.push('empresa');if(!S.obras.length)need.push('obra');
  $('c-need').hidden=!need.length;$('c-need').textContent=need.length?`Cadastre antes ao menos uma ${need.join(' e uma ')} nas abas correspondentes.`:'';
  $('c-save').disabled=!!need.length;
  const q=$('c-busca').value.trim().toLowerCase();
  const l=S.colab.filter(c=>obraOk(c.obraId)).filter(c=>{const e=emp(c.empresaId);return !q||[c.nome,c.qr,e?e.nome:''].some(x=>x.toLowerCase().includes(q))});
  renderRealoc();const P=paginate('colab',l,25);
  $('c-table').innerHTML=`<thead><tr><th>QR Code</th><th>Nome</th><th>Empresa</th><th>Obra</th><th></th></tr></thead><tbody>${P.rows.map(c=>{const e=emp(c.empresaId),o=obra(c.obraId);const dv=o&&o.empresaId&&o.empresaId!==c.empresaId;return `<tr><td class="mono">${esc(c.qr)}</td><td>${esc(c.nome)}${c.ativo?'':' <span class="pill bad">inativo</span>'}</td><td>${esc(e?e.nome:'—')}${e&&e.ativo===false?' <span class="pill bad">inativa</span>':''}</td><td>${esc(o?o.nome:'—')}${dv?` <span class="pill bad" title="A obra pertence a ${esc((emp(o.empresaId)||{}).nome||'outra empresa')} — realoque o colaborador">obra de outra empresa</span>`:o&&!o.empresaId?' <span class="pill warn" title="Defina a empresa da obra em Configurações › Obras">obra sem empresa</span>':''}${c.realocacoes&&c.realocacoes.length?` <span class="pill neutral" title="realocações">${c.realocacoes.length}×</span>`:''}</td><td><button class="btn sec sm" data-c="${esc(c.id)}">Editar</button></td></tr>`}).join('')||'<tr><td colspan="5" class="empty">Nenhum colaborador cadastrado. Leia o QR Code do crachá para começar.</td></tr>'}</tbody>`;
  $('c-table').querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{CEDIT=S.colab.find(c=>c.id===b.dataset.c);fillColab()});
  renderPager($('c-pager'),'colab',P,['colaborador','colaboradores'],renderColab);
}
function fillColab(){const c=CEDIT||{qr:'',nome:'',empresaId:(S.empresas.find(e=>e.ativo!==false)||{}).id,obraId:(S.obras.find(o=>o.ativo!==false&&obraOk(o.id))||{}).id,ativo:true};
  $('c-form-title').textContent=CEDIT?'Editar colaborador':'Novo colaborador';$('c-qr').value=c.qr;$('c-qr').readOnly=true;$('c-nome').value=c.nome;
  fillSelect($('c-emp'),S.empresas.filter(e=>e.ativo!==false||e.id===c.empresaId),c.empresaId);
  if(CEDIT)fillSelect($('c-obra'),S.obras.filter(o=>o.id===c.obraId),c.obraId);else colabObraOpts(c.empresaId,c.obraId);
  $('c-emp').value=c.empresaId||'';$('c-obra').value=c.obraId||'';$('c-ativo').value=c.ativo?'1':'0';
  $('c-emp').disabled=!!CEDIT;$('c-obra').disabled=!!CEDIT;$('c-realoc-hint').hidden=!CEDIT;$('c-realoc').hidden=!CEDIT}
function colabObraOpts(empId,val,sel){sel=sel||$('c-obra');const l=obrasDaEmpresa(empId);
  sel.innerHTML=l.length?l.map(o=>`<option value="${esc(o.id)}"${o.id===val?' selected':''}>${esc(o.nome)}</option>`).join(''):`<option value="">${empId?'Nenhuma obra desta empresa — cadastre em Obras':'Selecione a empresa'}</option>`;
  if(!l.some(o=>o.id===val))sel.value=l[0]?l[0].id:''}
$('c-emp').addEventListener('change',()=>{if(!CEDIT)colabObraOpts($('c-emp').value,'')});
function renderRealoc(){
  const q=($('rl-busca').value||'').trim().toLowerCase();
  const rows=[];S.colab.forEach(c=>(c.realocacoes||[]).forEach(r=>rows.push({...r,colab:c.nome,qr:c.qr})));
  rows.sort((a,b)=>a.em<b.em?1:-1);
  const l=rows.filter(r=>!q||[r.colab,r.deEmpresa,r.paraEmpresa,r.deObra,r.paraObra,r.motivo].join(' ').toLowerCase().includes(q));
  $('rl-table').innerHTML=`<thead><tr><th>Data</th><th>Colaborador</th><th>Empresa</th><th>Obra</th><th>Motivo</th><th>Por</th></tr></thead><tbody>${l.map(r=>`<tr><td class="num">${brdt(r.em)}</td><td>${esc(r.colab)}<div class="small muted mono">${esc(r.qr)}</div></td><td>${r.deEmpresa===r.paraEmpresa?esc(r.paraEmpresa):`<span class="muted">${esc(r.deEmpresa)}</span> → <b>${esc(r.paraEmpresa)}</b>`}</td><td>${r.deObra===r.paraObra?esc(r.paraObra):`<span class="muted">${esc(r.deObra)}</span> → <b>${esc(r.paraObra)}</b>`}</td><td>${esc(r.motivo)}</td><td>${esc(r.usuario)}</td></tr>`).join('')||'<tr><td colspan="6" class="empty">Nenhuma realocação registrada.</td></tr>'}</tbody>`;
}
$('rl-busca').oninput=renderRealoc;
$('c-realoc').onclick=()=>{
  if(!CEDIT)return;const c=CEDIT;const e0=emp(c.empresaId),o0=obra(c.obraId);
  infoModal(`Realocar — ${esc(c.nome)}`,`<div class="stack">
    <div class="notice info small">Atual: <b>${esc(e0?e0.nome:'—')}</b> / <b>${esc(o0?o0.nome:'—')}</b>. Altere a empresa, a obra ou ambas e informe o motivo.</div>
    <div class="grid2"><div class="field"><label for="rl-emp">Nova empresa</label><select id="rl-emp"></select></div><div class="field"><label for="rl-obra">Nova obra</label><select id="rl-obra"></select></div></div>
    <div class="field"><label for="rl-motivo">Motivo da realocação (obrigatório)</label><textarea id="rl-motivo" rows="3" placeholder="ex.: transferido para a obra X a pedido do gestor"></textarea></div>
    <div id="rl-err" class="notice bad" hidden></div>
    <button class="btn" id="rl-go">Confirmar realocação</button></div>`);
  fillSelect($('rl-emp'),S.empresas.filter(e=>e.ativo!==false||e.id===c.empresaId),c.empresaId);colabObraOpts(c.empresaId,c.obraId,$('rl-obra'));
  $('rl-emp').onchange=()=>colabObraOpts($('rl-emp').value,'',$('rl-obra'));
  $('rl-go').onclick=()=>{
    const ne=$('rl-emp').value,no=$('rl-obra').value,motivo=$('rl-motivo').value.trim();const err=$('rl-err');
    if(ne===c.empresaId&&no===c.obraId){err.hidden=false;err.textContent='Nada mudou: escolha outra empresa e/ou outra obra.';return}
    if(motivo.length<5){err.hidden=false;err.textContent='Informe o motivo da realocação.';return}
    if(!no){err.hidden=false;err.textContent='Escolha uma obra da nova empresa.';return}
    const oeR=obraEmpErro(ne,no);if(oeR){err.hidden=false;err.textContent=oeR;return}
    const e1=emp(ne),o1=obra(no);
    const rl={id:uid(),em:new Date().toISOString(),usuario:USER.nome,deEmpresaId:c.empresaId,deEmpresa:e0?e0.nome:'',paraEmpresaId:ne,paraEmpresa:e1?e1.nome:'',deObraId:c.obraId,deObra:o0?o0.nome:'',paraObraId:no,paraObra:o1?o1.nome:'',motivo};
    c.realocacoes=c.realocacoes||[];c.realocacoes.push(rl);c.empresaId=ne;c.obraId=no;
    audit('colab.realocar',`${c.nome}: ${rl.deEmpresa} / ${rl.deObra} → ${rl.paraEmpresa} / ${rl.paraObra} — motivo: ${motivo}`,{obra:rl.paraObra,empresa:rl.paraEmpresa,entidade:'colaborador '+c.qr,antes:`${rl.deEmpresa} / ${rl.deObra}`,depois:`${rl.paraEmpresa} / ${rl.paraObra}`});
    concluir('Colaborador realocado');$('info-modal').classList.remove('on');fillColab();renderColab();
  };
};
$('c-busca').oninput=()=>{PAGES.colab=1;renderColab()};$('c-new').onclick=()=>{CEDIT=null;fillColab()};$('c-cancel').onclick=()=>{CEDIT=null;fillColab()};
$('btn-scan-colab').onclick=()=>openScanner('Ler QR Code do crachá para cadastro',code=>{
  const dup=S.colab.find(x=>x.qr.toLowerCase()===code.toLowerCase()&&x!==CEDIT);
  $('c-qr').value=code;
  if(dup)toast(`Atenção: este QR Code já pertence a ${dup.nome}`);else toast('QR Code lido — complete os dados e salve');
  $('c-nome').focus();
});
$('c-qr-manual').onclick=()=>{$('c-qr').readOnly=false;$('c-qr').placeholder='digite o conteúdo do QR Code';$('c-qr').focus()};
$('c-save').onclick=()=>{
  const qr=$('c-qr').value.trim(),nome=$('c-nome').value.trim();
  if(!qr){toast('Leia o QR Code do crachá antes de salvar');return}
  if(!nome){toast('Informe o nome do colaborador');return}
  if(!$('c-emp').value||!$('c-obra').value){toast('Selecione empresa e obra');return}
  if(!CEDIT){const oeC=obraEmpErro($('c-emp').value,$('c-obra').value);if(oeC){toast(oeC,'bad');return}}
  if(S.colab.some(c=>c.qr.toLowerCase()===qr.toLowerCase()&&c!==CEDIT)){toast('Este QR Code já está cadastrado para outro colaborador');return}
  const obj={qr,nome,empresaId:CEDIT?CEDIT.empresaId:$('c-emp').value,obraId:CEDIT?CEDIT.obraId:$('c-obra').value,ativo:$('c-ativo').value==='1'};
  const ce=emp(obj.empresaId),co=obra(obj.obraId);audit('colab.salvar',`${CEDIT?'Alterou':'Cadastrou'} colaborador ${nome} — QR ${qr} — ${ce?ce.nome:''} / ${co?co.nome:''}${obj.ativo?'':' — inativo'}`,{obra:co?co.nome:'',empresa:ce?ce.nome:'',entidade:'colaborador '+qr,antes:CEDIT?JSON.stringify({nome:CEDIT.nome,qr:CEDIT.qr,empresa:(emp(CEDIT.empresaId)||{}).nome,obra:(obra(CEDIT.obraId)||{}).nome,ativo:CEDIT.ativo}):null,depois:JSON.stringify({nome,qr,empresa:ce&&ce.nome,obra:co&&co.nome,ativo:obj.ativo})});
  if(CEDIT)Object.assign(CEDIT,obj);else S.colab.push({id:uid(),...obj});
  concluir('Colaborador salvo');CEDIT=null;fillColab();renderColab();renderSetup();
};
/* empresas */
function renderEmpresas(){
  $('e-list').innerHTML=S.empresas.map(e=>`<div class="item">${logoOk(e.logo)?`<img class="logo-thumb" src="${esc(logoOk(e.logo))}" alt="">`:`<div class="avatar">${ini(e.nome)}</div>`}<div class="t"><b>${esc(e.nome)}${e.ativo===false?' <span class="pill bad">inativa</span>':''}</b><span>${e.cnpj?esc(e.cnpj)+' · ':''}${S.obras.filter(o=>o.empresaId===e.id).length} obra(s) · ${S.colab.filter(c=>c.empresaId===e.id).length} colaboradores · próximo BM ${e.proximoBM||1}${e.logo?'':' · <span style="color:var(--warn)">sem logotipo</span>'}</span></div><button class="btn sec sm" data-e="${esc(e.id)}">Editar</button>${can('del.empresas')?`<button class="btn danger sm" data-edel="${esc(e.id)}">Excluir</button>`:''}</div>`).join('')||'<div class="small muted">Nenhuma empresa cadastrada.</div>';
  $('e-list').querySelectorAll('[data-edel]').forEach(b=>b.onclick=()=>excluirEmpresa(emp(b.dataset.edel)));
  $('e-list').querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{EEDIT=emp(b.dataset.e);fillEmpresa()});
  if(!$('e-ct').parentElement.querySelector('[data-ct]'))fillEmpresa();
}
function fillEmpresa(){
  const e=EEDIT||{nome:'',cnpj:'',proximoBM:1,logo:null,contrato:{}};
  $('e-form-title').textContent=EEDIT?'Editar empresa':'Nova empresa';$('e-nome').value=e.nome;$('e-cnpj').value=e.cnpj||'';$('e-prox').value=e.proximoBM||1;$('e-ativo').value=e.ativo===false?'0':'1';
  ELOGO=e.logo?{data:e.logo,w:e.logoW,h:e.logoH}:null;showLogo();
  const grid=$('e-ct').parentElement;grid.querySelectorAll('[data-ct]').forEach(x=>x.remove());
  TIPOS.forEach(t=>{const c=(e.contrato||{})[t.id]||{};grid.insertAdjacentHTML('beforeend',`<div data-ct>${t.curto}</div><input data-ct data-k="qtd" data-t="${esc(t.id)}" type="number" min="0" value="${esc(c.qtd||'')}" placeholder="—"><input data-ct data-k="acumQtd" data-t="${esc(t.id)}" type="number" min="0" value="${esc(c.acumQtd||'')}" placeholder="0"><input data-ct data-k="acumVal" data-t="${esc(t.id)}" type="number" min="0" step="0.01" value="${esc(c.acumVal||'')}" placeholder="0,00">`)});
}
function showLogo(){$('e-logo-prev').hidden=!ELOGO;$('e-logo-empty').hidden=!!ELOGO;if(ELOGO)$('e-logo-prev').src=ELOGO.data}
$('e-logo').onchange=e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  const img=new Image();const url=URL.createObjectURL(f);
  img.onload=()=>{const max=600;const sc=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
    const ctx=c.getContext('2d');if(f.type==='image/jpeg'){ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height)}ctx.drawImage(img,0,0,c.width,c.height);
    ELOGO={data:c.toDataURL(f.type==='image/jpeg'?'image/jpeg':'image/png',.9),w:c.width,h:c.height};URL.revokeObjectURL(url);showLogo();toast('Logotipo carregada — salve a empresa')};
  img.onerror=()=>{URL.revokeObjectURL(url);toast('Não foi possível ler a imagem')};
  img.src=url;
};
$('e-logo-rm').onclick=()=>{ELOGO=null;showLogo()};
$('e-new').onclick=()=>{EEDIT=null;fillEmpresa()};$('e-cancel').onclick=()=>{EEDIT=null;fillEmpresa()};
$('e-save').onclick=()=>{
  const nome=$('e-nome').value.trim();if(!nome){toast('Informe o nome da empresa');return}
  if(S.empresas.some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==EEDIT)){toast('Já existe empresa com este nome');return}
  const contrato={};$('e-ct').parentElement.querySelectorAll('input[data-ct]').forEach(i=>{const v=parseFloat(i.value);if(!contrato[i.dataset.t])contrato[i.dataset.t]={};contrato[i.dataset.t][i.dataset.k]=isNaN(v)?null:v});
  const obj={nome,cnpj:$('e-cnpj').value.trim(),proximoBM:parseInt($('e-prox').value,10)||1,logo:ELOGO?ELOGO.data:null,logoW:ELOGO?ELOGO.w:null,logoH:ELOGO?ELOGO.h:null,contrato,ativo:$('e-ativo').value==='1'};
  audit('empresa.salvar',`${EEDIT?'Alterou':'Cadastrou'} empresa ${nome}${obj.cnpj?' — CNPJ '+obj.cnpj:''}${ELOGO?' — com logotipo':''} — próximo BM ${esc(obj.proximoBM)}${obj.ativo?'':' — INATIVA'}`,{empresa:nome,entidade:'empresa '+nome});
  if(EEDIT){Object.assign(EEDIT,obj);if(can('sup.bm')||can('del.bm')){S.registros.forEach(r=>{if(r.empresaId===EEDIT.id)r.empresaNome=nome});S.sobras.forEach(s=>{if(s.empresaId===EEDIT.id)s.empresaNome=nome})}}else S.empresas.push({id:uid(),...obj});
  concluir('Empresa salva');EEDIT=null;fillEmpresa();renderEmpresas();renderSetup();
};
function excluirEmpresa(E){
  if(!E||!can('del.empresas'))return;
  const regs=S.registros.filter(r=>r.empresaId===E.id),sob=S.sobras.filter(s=>s.empresaId===E.id),bms=S.bms.filter(b=>b.empresaId===E.id),col=S.colab.filter(c=>c.empresaId===E.id);
  confirmDelete({titulo:`Excluir empresa — ${esc(E.nome)}`,
    resumo:`<div class="notice info small">Vinculados a esta empresa: <b>${regs.length}</b> refeições registradas, <b>${sob.length}</b> sobras, <b>${bms.length}</b> BMs, <b>${col.length}</b> colaboradores. Em qualquer opção, os colaboradores ficam <b>inativos</b> e sem empresa — para voltarem a comer, use <i>Realocar</i>.</div>`,
    opcoes:[{v:'so',t:'Excluir somente a empresa',d:'Refeições, sobras e BMs continuam no histórico com o nome da empresa.'},
            {v:'tudo',t:'Excluir a empresa e os registros vinculados',d:`Apaga também as ${regs.length} refeições, ${sob.length} sobras e ${bms.length} BMs (com anexos) desta empresa. Não pode ser desfeito.`}],
    botao:'Excluir empresa',
    onOk:async(opt,motivo)=>{
      if(opt==='tudo'){
        const paths=bms.filter(b=>b.anexo&&b.anexo.path).map(b=>b.anexo.path);if(paths.length){try{await sb.storage.from('anexos').remove(paths)}catch(e){}}
        S.registros=S.registros.filter(r=>r.empresaId!==E.id);S.sobras=S.sobras.filter(s=>s.empresaId!==E.id);S.bms=S.bms.filter(b=>b.empresaId!==E.id);
      }
      col.forEach(c=>{c.ativo=false;c.empresaId=null});
      S.empresas=S.empresas.filter(x=>x.id!==E.id);
      audit('empresa.excluir',`${E.nome} — ${opt==='tudo'?`com ${regs.length} refeições, ${sob.length} sobras e ${bms.length} BMs`:'somente a empresa'} — ${col.length} colaboradores inativados — motivo: ${motivo}`,{empresa:E.nome,entidade:'empresa '+E.nome,antes:'ativa',depois:'excluída'});
      concluir(`Empresa ${E.nome} excluída`);EEDIT=null;fillEmpresa();renderEmpresas();renderSetup();
    }});
}
function excluirObra(O){
  if(!O||!can('del.obras'))return;
  const daObra=r=>r.obraId?r.obraId===O.id:r.obraNome===O.nome;
  const regs=S.registros.filter(daObra),emBM=regs.filter(r=>r.bmId),livres=regs.filter(r=>!r.bmId);
  const col=S.colab.filter(c=>c.obraId===O.id);const colIds=new Set(col.map(c=>c.id));const sobAll=S.sobras.filter(s=>s.obraId?s.obraId===O.id:(s.colabId&&colIds.has(s.colabId)));const sob=sobAll.filter(s=>!s.bmId);
  confirmDelete({titulo:`Excluir obra — ${esc(O.nome)}`,
    resumo:`<div class="notice info small">Vinculados a esta obra: <b>${regs.length}</b> refeições (${emBM.length} já em BMs), <b>${sobAll.length}</b> sobras (${sobAll.length-sob.length} já em BMs), <b>${col.length}</b> colaboradores. Em qualquer opção, os colaboradores ficam <b>inativos</b> e a obra sai dos restaurantes que a atendiam.</div>`,
    opcoes:[{v:'so',t:'Excluir somente a obra',d:'Refeições e sobras continuam no histórico com o nome da obra.'},
            {v:'tudo',t:'Excluir a obra e os registros vinculados',d:`Apaga ${livres.length} refeições em aberto e ${sob.length} sobras em aberto.${emBM.length||sobAll.length>sob.length?` Refeições e sobras que já estão em BMs são mantidas — exclua os BMs antes se quiser apagá-las.`:''} Não pode ser desfeito.`}],
    botao:'Excluir obra',
    onOk:async(opt,motivo)=>{
      if(opt==='tudo'){const ids=new Set(livres.map(r=>r.id));S.registros=S.registros.filter(r=>!ids.has(r.id));const sids=new Set(sob.map(s=>s.id));S.sobras=S.sobras.filter(s=>!sids.has(s.id))}
      col.forEach(c=>{c.ativo=false;c.obraId=null});
      (S.contratadas||[]).forEach(c=>{if((c.obras||[]).includes(O.id))c.obras=c.obras.filter(x=>x!==O.id)});
      S.obras=S.obras.filter(x=>x.id!==O.id);
      audit('obra.excluir',`${O.nome} — ${opt==='tudo'?`com ${livres.length} refeições e ${sob.length} sobras`:'somente a obra'} — ${col.length} colaboradores inativados — motivo: ${motivo}`,{obra:O.nome,entidade:'obra '+O.nome,antes:'ativa',depois:'excluída'});
      concluir(`Obra ${O.nome} excluída`);OEDIT=null;fillObra();renderObras();renderSetup();
    }});
}
/* obras */
function renderObras(){
  fillSelect($('o-f-emp'),S.empresas,$('o-f-emp').value,'Todas as empresas');const fEmp=$('o-f-emp').value;if(!$('o-emp').options.length)fillObraEmp();
  renderDivergencias();
  const PO=paginate('obras',S.obras.filter(o=>obraOk(o.id)&&(!fEmp||o.empresaId===fEmp)).sort((a,b)=>((emp(a.empresaId)||{}).nome||'~').localeCompare((emp(b.empresaId)||{}).nome||'~')||a.nome.localeCompare(b.nome)),10);
  $('o-list').innerHTML=PO.rows.map(o=>{const E=emp(o.empresaId);const outros=S.colab.filter(c=>c.obraId===o.id&&c.ativo!==false&&o.empresaId&&c.empresaId!==o.empresaId).length;return `<div class="item"><div class="avatar">${ini(o.nome)}</div><div class="t"><b>${esc(o.nome)} ${contrato(o.contratoId)?`<span class="pill neutral mono">${esc(contrato(o.contratoId).numero)}</span>`:'<span class="pill warn">sem contrato</span>'}</b><span>${E?`<b style="color:var(--ink)">${esc(E.nome)}</b> · `:'<span class="pill bad">sem empresa</span> · '}${o.gestor?`Gestor / Engenheiro: <span style="color:var(--ink);font-weight:600">${esc(o.gestor)}</span>${o.gestorCargo?' ('+esc(o.gestorCargo)+')':''} · `:o.ativo===false?'':'<span class="pill warn">sem Gestor / Engenheiro</span> · '}${outros?`<span class="pill bad">${outros} colaborador(es) de outra empresa</span> · `:''}${o.endereco?esc(o.endereco)+' · ':''}${S.colab.filter(c=>c.obraId===o.id).length} colaboradores · restaurante: ${esc((S.contratadas||[]).filter(c=>(c.obras||[]).includes(o.id)).map(c=>c.nome).join(', ')||'nenhum')}${o.ativo===false?' · encerrada':''}</span></div><button class="btn sec sm" data-func="${esc(o.id)}">Funcionários</button><button class="btn sec sm" data-o="${esc(o.id)}">Editar</button>${can('del.obras')?`<button class="btn danger sm" data-odel="${esc(o.id)}">Excluir</button>`:''}</div>`}).join('')||`<div class="small muted">${fEmp?'Nenhuma obra desta empresa.':'Nenhuma obra cadastrada.'}</div>`;
  $('o-list').querySelectorAll('[data-odel]').forEach(b=>b.onclick=()=>excluirObra(obra(b.dataset.odel)));
  renderPager($('o-pager'),'obras',PO,['obra','obras'],renderObras);
  $('o-list').querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{OEDIT=obra(b.dataset.o);fillObra()});
  $('o-list').querySelectorAll('[data-func]').forEach(b=>b.onclick=()=>{const o=obra(b.dataset.func);const l=S.colab.filter(c=>c.obraId===o.id).sort((a,c)=>a.nome.localeCompare(c.nome));
    infoModal(`Funcionários — ${esc(o.nome)} (${l.length})`,`<div class="tablewrap"><table><thead><tr><th>#</th><th>Nome</th><th>Empresa</th><th>QR Code</th><th>Situação</th></tr></thead><tbody>${l.map((c,i)=>{const e=emp(c.empresaId);return `<tr><td class="num">${i+1}</td><td>${esc(c.nome)}</td><td>${esc(e?e.nome:'—')}</td><td class="mono">${esc(c.qr)}</td><td>${c.ativo?'<span class="pill ok">ativo</span>':'<span class="pill bad">inativo</span>'}</td></tr>`}).join('')||'<tr><td colspan="5" class="empty">Nenhum colaborador alocado nesta obra.</td></tr>'}</tbody></table></div>`)});
}
function renderDivergencias(){
  const el=$('o-div');const D=divergencias();const partes=[];
  if(D.semEmp.length)partes.push(`<div class="notice warn small" style="margin:0"><b>${D.semEmp.length} obra(s) sem empresa definida.</b> Edite e escolha a empresa dona — enquanto isso, não há registro de refeição nessas obras.<div class="row" style="gap:6px;margin-top:6px">${D.semEmp.map(o=>`<button type="button" class="btn sec sm" data-dobra="${esc(o.id)}">${esc(o.nome)}</button>`).join('')}</div></div>`);
  if(D.colab.length)partes.push(`<div class="notice bad small" style="margin:0"><b>${D.colab.length} colaborador(es) em obra de outra empresa.</b> O registro de refeição deles fica bloqueado até a realocação (Colaboradores › Editar › Realocar).<div class="row" style="gap:6px;margin-top:6px">${D.colab.map(c=>{const o=obra(c.obraId),e=emp(c.empresaId);return `<button type="button" class="btn sec sm" data-dcol="${esc(c.id)}" title="${esc(o?o.nome:'')} pertence a ${esc((emp(o&&o.empresaId)||{}).nome||'')}">${esc(c.nome)} · ${esc(e?e.nome:'—')} → ${esc(o?o.nome:'—')}</button>`}).join('')}</div></div>`);
  el.innerHTML=partes.join('');el.hidden=!partes.length;
  el.querySelectorAll('[data-dobra]').forEach(b=>b.onclick=()=>{OEDIT=obra(b.dataset.dobra);fillObra();$('o-emp').focus()});
  el.querySelectorAll('[data-dcol]').forEach(b=>b.onclick=()=>{if(!can('cfg.colab')){toast('Sem permissão para alterar colaboradores');return}CFGTAB='colab';renderCfg();CEDIT=S.colab.find(c=>c.id===b.dataset.dcol);fillColab();$('c-realoc').click()});
}
$('o-f-emp').onchange=()=>{PAGES.obras=1;renderObras()};
function obraEmpTravada(o){if(!o||!o.empresaId)return false;const u=usoObra(o.id);return [...u.values()].some(x=>x.colab||x.regs||x.sobras||x.bms)}
function fillObraEmp(){
  const o=OEDIT;const trav=obraEmpTravada(o);const hint=$('o-emp-hint');
  fillSelect($('o-emp'),S.empresas.filter(e=>e.ativo!==false||(o&&e.id===o.empresaId)),o&&o.empresaId||'','Selecione a empresa…');
  $('o-emp').disabled=trav;hint.style.color='';
  if(trav){const u=usoObra(o.id).get(o.empresaId)||{};hint.textContent=`Empresa travada: a obra já tem ${usoTxt(u)||'movimento'} desta empresa. Para outra empresa, cadastre uma nova obra.`}
  else if(o&&!o.empresaId){const u=usoObra(o.id);const l=[...u.entries()];
    if(l.length===1){$('o-emp').value=l[0][0];hint.textContent=`Sugestão pelo uso atual: ${(emp(l[0][0])||{}).nome||''} (${usoTxt(l[0][1])}). Confirme e salve.`}
    else if(l.length>1){hint.style.color='var(--bad)';hint.textContent='Obra usada por mais de uma empresa: '+l.map(([e,x])=>`${(emp(e)||{}).nome||'—'} (${usoTxt(x)})`).join('; ')+'. Escolha a empresa dona; os colaboradores da outra empresa ficarão bloqueados até serem realocados para uma obra da empresa deles.'}
    else hint.textContent='Obra antiga sem empresa: escolha a empresa dona e salve.'}
  else hint.textContent=o?'':'A obra fica vinculada só a esta empresa; não pode ser usada por outra.';
}
function fillObra(){const o=OEDIT||{nome:'',endereco:'',ativo:true};$('o-form-title').textContent=OEDIT?'Editar obra':'Nova obra';fillObraEmp();$('o-nome').value=o.nome;$('o-contrato').value=(contrato(o.contratoId)||{}).numero||'';$('contratos-list').innerHTML=(S.contratos||[]).map(c=>`<option value="${esc(c.numero)}">${esc(c.descricao||'')}</option>`).join('');$('o-end').value=o.endereco||'';$('o-ativo').value=o.ativo===false?'0':'1';$('o-gestor').value=o.gestor||'';$('o-gcargo').value=o.gestorCargo||''}
$('o-new').onclick=()=>{OEDIT=null;fillObra()};$('o-cancel').onclick=()=>{OEDIT=null;fillObra()};
$('o-save').onclick=()=>{
  const nome=$('o-nome').value.trim();if(!nome){toast('Informe o nome da obra');return}
  const empO=OEDIT&&obraEmpTravada(OEDIT)?OEDIT.empresaId:$('o-emp').value;
  if(!empO){toast('Escolha a empresa dona da obra');$('o-emp').focus();return}
  if(S.obras.some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==OEDIT)){toast('Já existe obra com este nome');return}
  const num=$('o-contrato').value.trim().toUpperCase();
  if(!num){toast('Informe o Nº do contrato da obra');$('o-contrato').focus();return}
  if($('o-ativo').value==='1'&&!$('o-gestor').value.trim()){toast('Informe o Gestor / Engenheiro da obra: é o nome que assina o BM','warn');$('o-gestor').focus();return}
  if(num.length>7){toast('O Nº do contrato tem no máximo 7 caracteres');return}
  let C=(S.contratos||[]).find(c=>c.numero.toUpperCase()===num);
  if(!C){C={id:uid(),numero:num,descricao:'',inicio:'',fim:'',ativo:true};S.contratos.push(C);audit('contrato.salvar',`Criou contrato ${num} ao cadastrar a obra ${nome}`,{obra:nome,entidade:'contrato '+num});toast(`Contrato ${num} criado — complete as datas na aba Contratos`)}
  const antesCt=OEDIT?(contrato(OEDIT.contratoId)||{}).numero||'':'';
  const gestor=$('o-gestor').value.trim().replace(/\s+/g,' '),gestorCargo=$('o-gcargo').value.trim().replace(/\s+/g,' ');
  const obj={nome,endereco:$('o-end').value.trim(),ativo:$('o-ativo').value==='1',contratoId:C.id,empresaId:empO,gestor,gestorCargo};
  const EO=emp(empO);const empAntes=OEDIT?(emp(OEDIT.empresaId)||{}).nome||'sem empresa':null;
  audit('obra.salvar',`${OEDIT?'Alterou':'Cadastrou'} obra ${nome} — empresa ${EO?EO.nome:''} — contrato ${num}${gestor?' — Gestor / Engenheiro: '+gestor+(gestorCargo?' ('+gestorCargo+')':''):''}${OEDIT&&(OEDIT.gestor||'')!==gestor?' (antes: '+(OEDIT.gestor||'não informado')+')':''}${obj.ativo?'':' — encerrada'}`,{obra:nome,empresa:EO?EO.nome:'',entidade:'obra '+nome,antes:OEDIT&&(antesCt!==num||OEDIT.empresaId!==empO)?`${empAntes} / ${antesCt||'sem contrato'}`:null,depois:OEDIT&&(antesCt!==num||OEDIT.empresaId!==empO)?`${EO?EO.nome:''} / ${num}`:null});
  if(OEDIT){Object.assign(OEDIT,obj);if(can('sup.bm')||can('del.bm')){S.registros.forEach(r=>{const c=S.colab.find(x=>x.id===r.colabId);if(r.obraId?r.obraId===OEDIT.id:(c&&c.obraId===OEDIT.id))r.obraNome=nome});S.sobras.forEach(s=>{if(s.obraId===OEDIT.id)s.obraNome=nome})}}else S.obras.push({id:uid(),...obj});
  concluir('Obra salva');OEDIT=null;fillObra();renderObras();renderSetup();
};
/* preços (por contrato) */
function pCt(){return $('p-ct').value||''}
function ctLabel(c){return c?`${esc(c.numero)}${c.descricao?' — '+c.descricao:''}${contratoStatus(c)!=='vigente'?' ('+contratoStatus(c)+')':''}`:'Tabela geral'}
function renderPrecos(){
  const t=today();const cur0=$('p-ct').value;
  $('p-ct').innerHTML='<option value="">Tabela geral</option>'+(S.contratos||[]).map(c=>`<option value="${esc(c.id)}"${c.id===cur0?' selected':''}>${esc(ctLabel(c))}</option>`).join('');
  const cid=pCt();const C=contrato(cid);
  $('p-vig-title').textContent='Preços vigentes — '+(C?'contrato '+C.numero:'tabela geral');
  $('p-table').innerHTML=`<thead><tr><th>Refeição</th><th class="r">Valor vigente</th><th>Desde</th><th>Origem</th></tr></thead><tbody>${TIPOS.map(tp=>{
    const own=precoLista(tp.id,t,cid)[0];const ger=cid?precoLista(tp.id,t,'')[0]:null;const cur=own||ger;
    const fut=S.precos.filter(p=>p.tipo===tp.id&&(p.contratoId||'')===cid&&p.vigencia>t).sort((a,b)=>a.vigencia>b.vigencia?1:-1)[0];
    return `<tr><td><span class="pill ${tp.id}">${tp.curto}</span></td><td class="r num">${cur?'<b>'+money(cur.valor)+'</b>':'<span class="muted">não cadastrado</span>'}${fut?`<div class="small" style="color:var(--warn)">→ ${money(fut.valor)} a partir de ${br(fut.vigencia)}</div>`:''}</td><td class="num">${cur?br(cur.vigencia):'—'}</td><td class="small">${own?(cid?'<span class="pill ok">contrato</span>':'tabela geral'):ger?'<span class="pill neutral">tabela geral</span>':'—'}</td></tr>`}).join('')}</tbody>`;
  const h=S.precos.filter(p=>(p.contratoId||'')===cid).sort((a,b)=>a.criadoEm<b.criadoEm?1:-1);
  $('p-hist').innerHTML=`<thead><tr><th>Alterado em</th><th>Refeição</th><th class="r">De</th><th class="r">Para</th><th>Vigência</th><th>Usuário</th><th>Justificativa</th></tr></thead><tbody>${h.map(p=>{const prev=S.precos.filter(x=>x.tipo===p.tipo&&(x.contratoId||'')===cid&&x.criadoEm<p.criadoEm).sort((a,b)=>a.criadoEm<b.criadoEm?1:-1)[0];
    return `<tr><td class="num">${brdt(p.criadoEm)}</td><td>${tipo(p.tipo).curto}</td><td class="r num">${prev?money(prev.valor):'—'}</td><td class="r num"><b>${money(p.valor)}</b></td><td class="num">${br(p.vigencia)}</td><td>${esc(p.usuario)}</td><td>${esc(p.just||'—')}</td></tr>`}).join('')||'<tr><td colspan="7" class="empty">Nenhum preço cadastrado para '+(C?'este contrato':'a tabela geral')+'.</td></tr>'}</tbody>`;
  if(!$('p-tipo').options.length)TIPOS.forEach(tp=>{const o=document.createElement('option');o.value=tp.id;o.textContent=tp.curto;$('p-tipo').appendChild(o)});
  if(!$('p-vig').value)$('p-vig').value=t;
  updJustReq();
}
function updJustReq(){const has=S.precos.some(p=>p.tipo===$('p-tipo').value&&(p.contratoId||'')===pCt());$('p-just-req').textContent=has?'(obrigatória — alteração de preço)':'(opcional no cadastro inicial)'}
$('p-tipo').onchange=updJustReq;$('p-ct').onchange=renderPrecos;
$('p-save').onclick=()=>{
  const tp=$('p-tipo').value,cid=pCt(),C=contrato(cid),v=parseFloat($('p-valor').value),vig=$('p-vig').value,just=$('p-just').value.trim();const err=$('p-err');
  const isChange=S.precos.some(p=>p.tipo===tp&&(p.contratoId||'')===cid);
  if(!(v>0)){err.hidden=false;err.textContent='Informe um valor maior que zero.';return}
  if(!vig){err.hidden=false;err.textContent='Informe a data de vigência.';return}
  if(isChange&&vig<today()){err.hidden=false;err.textContent='A vigência de uma alteração não pode ser retroativa: registros já feitos mantêm o preço da época.';return}
  if(isChange&&just.length<10){err.hidden=false;err.textContent='Em alteração de preço a justificativa é obrigatória (mínimo 10 caracteres).';return}
  const pAntes=(precoLista(tp,today(),cid)[0]||{}).valor;const onde=C?'contrato '+C.numero:'tabela geral';
  audit('preco.salvar',`${tipo(tp).curto} (${onde}): ${pAntes===undefined?'—':money(pAntes)} → ${money(v)} a partir de ${br(vig)}${just?' — '+just:''}`,{entidade:'preço '+tp+' · '+onde,antes:pAntes===undefined?null:pAntes,depois:Math.round(v*100)/100});
  err.hidden=true;S.precos.push({id:uid(),tipo:tp,contratoId:cid||undefined,contratoNumero:C?C.numero:undefined,valor:Math.round(v*100)/100,vigencia:vig,criadoEm:new Date().toISOString(),usuario:USER.nome,just:just||(isChange?'':'Cadastro inicial')});
  concluir(isChange?'Preço alterado — histórico registrado':'Preço cadastrado');$('p-valor').value='';$('p-just').value='';renderPrecos();renderSetup();
};
/* contratos */
let CTREDIT=null;
function renderContratos(){
  const f=$('ctr-filtro').value;const t=today();
  const l=(S.contratos||[]).filter(c=>{const st=contratoStatus(c,t);return !f||(f==='ativos'?(st==='vigente'||st==='a iniciar'):(st==='inativo'||st==='encerrado'))}).sort((a,b)=>a.numero.localeCompare(b.numero));
  const pill={vigente:'ok','a iniciar':'warn',encerrado:'bad',inativo:'bad'};const PC=paginate('contratos',l,25);
  $('ctr-table').innerHTML=`<thead><tr><th>Nº</th><th>Início</th><th>Término</th><th>Situação</th><th>Obras</th><th></th></tr></thead><tbody>${PC.rows.map(c=>{const st=contratoStatus(c,t);const ob=S.obras.filter(o=>o.contratoId===c.id);
    return `<tr><td class="mono"><b>${esc(c.numero)}</b></td><td class="num">${c.inicio?br(c.inicio):'<span class="muted">—</span>'}</td><td class="num">${c.fim?br(c.fim):'<span class="muted">—</span>'}</td><td><span class="pill ${pill[st]}">${st}</span></td><td class="small">${esc(ob.map(o=>o.nome).join(', ')||'—')}</td><td><button class="btn sec sm" data-ctr="${esc(c.id)}">Editar</button></td></tr>`}).join('')||'<tr><td colspan="6" class="empty">Nenhum contrato.</td></tr>'}</tbody>`;
  $('ctr-table').querySelectorAll('[data-ctr]').forEach(b=>b.onclick=()=>{CTREDIT=contrato(b.dataset.ctr);fillContrato()});
  renderPager($('ctr-pager'),'contratos',PC,['contrato','contratos'],renderContratos);
  if(!$('ctr-form-title').dataset.init){$('ctr-form-title').dataset.init=1;fillContrato()}
}
function fillContrato(){const c=CTREDIT||{numero:'',descricao:'',inicio:'',fim:'',ativo:true};
  $('ctr-form-title').textContent=CTREDIT?'Editar contrato':'Novo contrato';$('ctr-num').value=c.numero;$('ctr-ini').value=c.inicio||'';$('ctr-fim').value=c.fim||'';$('ctr-ativo').value=c.ativo===false?'0':'1';$('ctr-err').hidden=true;$('ctr-precos').hidden=!CTREDIT}
$('ctr-filtro').onchange=()=>{PAGES.contratos=1;renderContratos()};$('ctr-new').onclick=()=>{CTREDIT=null;fillContrato()};$('ctr-cancel').onclick=()=>{CTREDIT=null;fillContrato()};
$('ctr-precos').onclick=()=>{if(!CTREDIT||!can('cfg.precos'))return;const id=CTREDIT.id;CFGTAB='precos';renderCfg();$('p-ct').value=id;renderPrecos()};
$('ctr-save').onclick=()=>{
  const err=$('ctr-err');const show=m=>{err.hidden=false;err.textContent=m};
  const numero=$('ctr-num').value.trim().toUpperCase(),ini=$('ctr-ini').value,fim=$('ctr-fim').value;
  if(!numero)return show('Informe o Nº do contrato.');if(numero.length>7)return show('O Nº do contrato tem no máximo 7 caracteres.');
  if((S.contratos||[]).some(c=>c.numero.toUpperCase()===numero&&c!==CTREDIT))return show('Já existe contrato com este número.');
  if(ini&&fim&&fim<ini)return show('A data de término não pode ser anterior à de início.');
  const obj={numero,descricao:CTREDIT?CTREDIT.descricao||'':'',inicio:ini,fim,ativo:$('ctr-ativo').value==='1'};
  audit('contrato.salvar',`${CTREDIT?'Alterou':'Cadastrou'} contrato ${numero} — ${ini?br(ini):'sem início'} a ${fim?br(fim):'sem término'}${obj.ativo?'':' — INATIVO'}`,{entidade:'contrato '+numero,antes:CTREDIT?JSON.stringify({numero:CTREDIT.numero,inicio:CTREDIT.inicio,fim:CTREDIT.fim,ativo:CTREDIT.ativo}):null,depois:JSON.stringify({numero,inicio:ini,fim,ativo:obj.ativo})});
  if(CTREDIT)Object.assign(CTREDIT,obj);else S.contratos.push({id:uid(),...obj});
  concluir('Contrato salvo');CTREDIT=null;fillContrato();renderContratos();renderSetup();
};
/* contratadas (restaurantes) */
let KEDIT=null;
function chipToggle(i){i.parentElement.style.cssText='cursor:pointer;font-family:var(--font);'+(i.checked?'border-style:solid;border-color:var(--accent);color:var(--accent-2)':'')}
function chipsHtml(items,sel,attr){return items.map(o=>`<label class="chip" style="cursor:pointer;font-family:var(--font);${sel.has(o.id)?'border-style:solid;border-color:var(--accent);color:var(--accent-2)':''}"><input type="checkbox" ${attr}="${esc(o.id)}" ${sel.has(o.id)?'checked':''} style="width:auto;margin:0 6px 0 0;vertical-align:middle">${esc(o.nome)}${o.ativo===false?' (inativa)':''}</label>`).join('')}
function renderContratada(){
  ctMigrarLegado();
  $('k-list').innerHTML=(S.contratadas||[]).map(c=>{const ob=(c.obras||[]).map(id=>(obra(id)||{}).nome).filter(Boolean);const nu=S.users.filter(u=>!u.contratadas||!u.contratadas.length||u.contratadas.includes(c.id)).length;
    return `<div class="item"><div class="avatar">${ini(c.nome)}</div><div class="t"><b>${esc(c.nome)}${c.ativo===false?' <span class="pill bad">inativa</span>':''}</b><span>${c.cnpj?esc(c.cnpj)+' · ':''}${ob.length} obra(s): ${esc(ob.join(', ')||'—')} · ${nu} usuário(s) com acesso</span></div><button class="btn sec sm" data-k="${esc(c.id)}">Editar</button></div>`}).join('')||'<div class="small muted">Nenhuma contratada cadastrada.</div>';
  $('k-list').querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{KEDIT=ct(b.dataset.k);fillContratada()});
  if(!$('k-obras').innerHTML)fillContratada();
}
function fillContratada(){
  const c=KEDIT||{nome:'',cnpj:'',gestor:'',cargo:'',servico:'FORNECIMENTO DE REFEIÇÕES',obras:[],ativo:true};
  $('k-form-title').textContent=KEDIT?'Editar contratada':'Nova contratada';
  $('k-contratada').value=c.nome;$('k-cnpj').value=c.cnpj||'';$('k-servico').value=c.servico||'FORNECIMENTO DE REFEIÇÕES';$('k-ativo').value=c.ativo===false?'0':'1';$('k-err').hidden=true;
  $('k-obras').innerHTML=chipsHtml(S.obras.map(o=>({...o,nome:o.nome+' · '+((emp(o.empresaId)||{}).nome||'sem empresa')})),new Set(c.obras||[]),'data-kob')||'<span class="small muted">Cadastre as obras primeiro (aba Obras).</span>';
  $('k-obras').querySelectorAll('input').forEach(i=>i.onchange=()=>chipToggle(i));
}
$('k-new').onclick=()=>{KEDIT=null;fillContratada()};$('k-cancel').onclick=()=>{KEDIT=null;fillContratada()};
$('k-save').onclick=()=>{
  const err=$('k-err');const show=m=>{err.hidden=false;err.textContent=m};
  const nome=$('k-contratada').value.trim();if(!nome)return show('Informe a razão social do restaurante.');
  if((S.contratadas||[]).some(x=>x.nome.toLowerCase()===nome.toLowerCase()&&x!==KEDIT))return show('Já existe contratada com este nome.');
  const obras=[...$('k-obras').querySelectorAll('input:checked')].map(i=>i.dataset.kob);
  if(!obras.length)return show('Vincule a contratada a pelo menos uma obra.');
  const obj={nome,cnpj:$('k-cnpj').value.trim(),servico:$('k-servico').value.trim()||'FORNECIMENTO DE REFEIÇÕES',obras,ativo:$('k-ativo').value==='1'};
  const nomesOb=obras.map(id=>(obra(id)||{}).nome).join(', ');
  audit('contratada.salvar',`${KEDIT?'Alterou':'Cadastrou'} contratada ${nome} — obras: ${nomesOb}${obj.ativo?'':' — INATIVA'}`,{entidade:'contratada '+nome,antes:KEDIT?JSON.stringify({nome:KEDIT.nome,obras:(KEDIT.obras||[]).map(id=>(obra(id)||{}).nome),ativo:KEDIT.ativo}):null,depois:JSON.stringify({nome,obras:nomesOb,ativo:obj.ativo})});
  if(KEDIT)Object.assign(KEDIT,obj);else S.contratadas.push({id:uid(),...obj});
  concluir('Contratada salva');KEDIT=null;fillContratada();renderContratada();renderSetup();
};
/* =================== AUDITORIA (tela) =================== */
let AUD_PAGE=1;const AUD_PP=25;
function renderAud(){
  renderAudArq();
  const A=S.audit;
  const keep=(id)=>$(id).value;
  const users=[...new Set(A.map(e=>e.usuario))].sort();const obras=[...new Set(A.map(e=>e.obra).filter(Boolean))].sort();const emps=[...new Set(A.map(e=>e.empresa).filter(Boolean))].sort();
  const acoes=[...new Set(A.map(e=>e.acao))].sort((a,b)=>(ACOES[a]||a).localeCompare(ACOES[b]||b));
  const setOpts=(id,list,label,fmt)=>{const sel=$(id);const v=sel.value;sel.innerHTML=`<option value="">${label}</option>`+list.map(x=>`<option value="${esc(x)}"${x===v?' selected':''}>${esc(fmt?fmt(x):x)}</option>`).join('')};
  setOpts('a-user',users,'Todos');setOpts('a-obra',obras,'Todas');setOpts('a-emp',emps,'Todas');setOpts('a-acao',acoes,'Todas',x=>ACOES[x]||x);setOpts('a-aba',Object.keys(ABAS).filter(k=>A.some(e=>e.aba===k)),'Todas',x=>ABAS[x]);
  const u=keep('a-user'),ab=keep('a-aba'),ac=keep('a-acao'),ob=keep('a-obra'),em=keep('a-emp'),de=keep('a-de'),ate=keep('a-ate'),q=keep('a-busca').trim().toLowerCase();
  const rows=A.filter(e=>!e.obra||obraNomeOk(e.obra)).filter(e=>{const d=e.em.slice(0,10);return (!u||e.usuario===u)&&(!ab||e.aba===ab)&&(!ac||e.acao===ac)&&(!ob||e.obra===ob)&&(!em||e.empresa===em)&&(!de||d>=de)&&(!ate||d<=ate)&&(!q||[e.descricao,e.entidade,e.usuario,ACOES[e.acao]||''].join(' ').toLowerCase().includes(q))}).sort((a,b)=>a.em<b.em?1:-1);
  const byUser={};rows.forEach(e=>byUser[e.usuario]=(byUser[e.usuario]||0)+1);const top=Object.entries(byUser).sort((a,b)=>b[1]-a[1])[0];
  const mov=rows.filter(e=>!/^nav|^login|^logout/.test(e.acao)).length;
  $('aud-tiles').innerHTML=`<div class="tile total"><div class="k">Eventos filtrados</div><div class="v num">${rows.length}</div><div class="s">de ${A.length} no total</div></div><div class="tile almoco"><div class="k">Movimentações</div><div class="v num">${mov}</div><div class="s">exclui navegação e login</div></div><div class="tile jantar"><div class="k">Usuários</div><div class="v num">${Object.keys(byUser).length}</div><div class="s">${top?esc(top[0])+' · '+top[1]+' eventos':'—'}</div></div><div class="tile lanche"><div class="k">Dispositivos</div><div class="v num">${new Set(rows.map(e=>e.dispositivo)).size}</div><div class="s">${new Set(rows.map(e=>e.ip).filter(Boolean)).size} IP(s) distintos</div></div>`;
  const pages=Math.max(1,Math.ceil(rows.length/AUD_PP));if(AUD_PAGE>pages)AUD_PAGE=pages;if(AUD_PAGE<1)AUD_PAGE=1;
  const i0=(AUD_PAGE-1)*AUD_PP;const pageRows=rows.slice(i0,i0+AUD_PP);
  $('aud-count').textContent=rows.length?`${i0+1}–${i0+pageRows.length} de ${rows.length} evento(s)`:'0 eventos';
  $('aud-pager').innerHTML=pages>1?`<button class="btn sec sm" data-pg="1" ${AUD_PAGE===1?'disabled':''}>« Primeira</button><button class="btn sec sm" data-pg="${AUD_PAGE-1}" ${AUD_PAGE===1?'disabled':''}>‹ Anterior</button><span class="small num" style="padding:0 8px">Página <b>${AUD_PAGE}</b> de ${pages}</span><button class="btn sec sm" data-pg="${AUD_PAGE+1}" ${AUD_PAGE===pages?'disabled':''}>Próxima ›</button><button class="btn sec sm" data-pg="${pages}" ${AUD_PAGE===pages?'disabled':''}>Última »</button>`:'';
  $('aud-pager').querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{AUD_PAGE=+b.dataset.pg;renderAud()});
  $('aud-table').innerHTML=`<thead><tr><th>Data / hora</th><th>Usuário</th><th>Aba</th><th>Ação</th><th>Descrição</th><th>Obra</th><th>Empresa</th><th>Antes → Depois</th><th>Dispositivo</th><th>IP</th></tr></thead><tbody>${pageRows.map(e=>`<tr><td class="num">${brdt(e.em)}:${pad(new Date(e.em).getSeconds())}</td><td><b>${esc(e.usuario)}</b><div class="small muted">${esc(e.perfil)}</div></td><td>${esc(ABAS[e.aba]||e.aba)}</td><td>${esc(ACOES[e.acao]||e.acao)}</td><td style="max-width:360px">${esc(e.descricao)}${e.entidade?`<div class="small muted">${esc(e.entidade)}</div>`:''}</td><td>${esc(e.obra||'—')}</td><td>${esc(e.empresa||'—')}</td><td class="small mono" style="max-width:220px;overflow-wrap:anywhere">${e.antes===null&&e.depois===null?'—':`${fmtAD(e.antes)} → ${fmtAD(e.depois)}`}</td><td class="mono">${esc(e.dispositivo)}</td><td class="mono small">${e.ip?esc(e.ip):'<span class="muted">—</span>'}</td></tr>`).join('')||'<tr><td colspan="10" class="empty">Nenhum evento com esses filtros.</td></tr>'}</tbody>`;
}
function renderAudArq(){
  const podeF=can('fotos.baixar');if(!podeF)ARQ_TAB='aud';
  $('arq-tabs').hidden=!podeF;$('arq-tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.at===ARQ_TAB));
  $('arq-aud').hidden=ARQ_TAB!=='aud';$('arq-fotos').hidden=ARQ_TAB!=='fotos';
  if(ARQ_TAB==='fotos')renderFotosArq();
  const l=S.auditArq||[];
  $('aud-arq').innerHTML=`<thead><tr><th>Compactado em</th><th>Eventos de</th><th>até</th><th class="r">Qtd</th><th></th></tr></thead><tbody>${l.map(a=>`<tr><td class="num">${brdt(a.criado_em)}</td><td class="num">${brdt(a.de)}</td><td class="num">${brdt(a.ate)}</td><td class="r num">${num(a.qtd)}</td><td><button class="btn sec sm" data-arq="${esc(String(a.id))}">Baixar CSV</button></td></tr>`).join('')||'<tr><td colspan="5" class="empty">Nenhum arquivo ainda — a primeira compactação acontece ao atingir 1.000 eventos.</td></tr>'}</tbody>`;
  $('aud-arq').querySelectorAll('[data-arq]').forEach(b=>b.onclick=async()=>{
    b.disabled=true;const id=b.dataset.arq;
    try{const {data,error}=await sb.from('auditoria_arquivos').select('csv,de,ate').eq('id',isNaN(+id)?id:+id).maybeSingle();if(error)throw error;if(!data)throw new Error('arquivo não encontrado');
      const name=`auditoria-${String(data.de).slice(0,10)}_a_${String(data.ate).slice(0,10)}.csv`;const csv='\ufeff'+data.csv;
      audit('auditoria.arquivo',name);save();
      const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
      if(dl){try{await dl.save({filename:name,data:csv});sucesso('CSV salvo')}catch(e){}}else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=name;a.click();sucesso('CSV baixado')}
    }catch(e){toast('Falha ao baixar: '+(e.message||e))}b.disabled=false});
}
function fmtAD(v){if(v===null||v===undefined)return '—';if(typeof v==='number')return money(v);const s=String(v);return esc(s.length>90?s.slice(0,90)+'…':s)}
['a-user','a-aba','a-acao','a-obra','a-emp','a-de','a-ate'].forEach(id=>$(id).onchange=()=>{AUD_PAGE=1;renderAud()});$('a-busca').oninput=()=>{AUD_PAGE=1;renderAud()};
$('a-limpar').onclick=()=>{AUD_PAGE=1;['a-user','a-aba','a-acao','a-obra','a-emp','a-de','a-ate','a-busca'].forEach(id=>$(id).value='');renderAud()};
$('aud-csv').onclick=async()=>{
  const cols=['Data/hora','Usuário','Perfil','Aba','Ação','Descrição','Obra','Empresa','Entidade','Antes','Depois','Dispositivo','IP','Navegador'];
  const cell=v=>{let t=String(v??'');if(/^[=+\-@\t\r]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'};
  const lines=[cols.join(';')].concat([...S.audit].sort((a,b)=>a.em<b.em?1:-1).map(e=>[brdt(e.em),e.usuario,e.perfil,ABAS[e.aba]||e.aba,ACOES[e.acao]||e.acao,e.descricao,e.obra,e.empresa,e.entidade,typeof e.antes==='number'?money(e.antes):e.antes,typeof e.depois==='number'?money(e.depois):e.depois,e.dispositivo,e.ip||'',e.navegador].map(cell).join(';')));
  audit('auditoria.csv',`${S.audit.length} eventos`);save();
  const csv='﻿'+lines.join('\r\n');const name=`auditoria-${today()}.csv`;
  const dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null;
  if(dl){try{await dl.save({filename:name,data:csv});sucesso('CSV salvo')}catch(e){if(e&&e.code!=='declined')toast('Não foi possível salvar o CSV')}}
  else{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=name;a.click();sucesso('CSV gerado')}
};

/* =================== FOTO DO ROSTO NO REGISTRO POR QR CODE (v2.1) E NA RETIRADA (v2.4) ===================
   Bucket "fotos" (privado):  c/AAAA-MM-DD/<registro>.webp  consulta 360x480, fica 20 dias
                              a/AAAA-MM-DD/<registro>.webp  cópia 240x320 → vai para z/AAAA-MM-DD.zip de madrugada
   O texto (data e hora, empresa, obra, colaborador) é gravado na própria imagem. */
const FOTO_CFG={c:{w:360,h:480,q:.6},a:{w:240,h:320,q:.5},dias:20};
let FOTO={raw:null,tmp:null,thumb:null,skip:null,busy:false,stream:null,facing:'environment',camSeq:0};
try{FOTO.facing=localStorage.getItem('sismed_foto_cam')||'environment'}catch(e){}
function fotoReset(){FOTO.raw=null;FOTO.tmp=null;FOTO.thumb=null;FOTO.skip=null;FOTO.busy=false}
/* texto gravado na imagem. Retirada: a foto é de QUEM RETIROU; a refeição é de r.nome. previa=true omite o que ainda não foi escolhido no formulário */
function fotoLinhas(r,previa){
  const up=x=>String(x||'').toUpperCase();
  const eo=previa&&!r.empresaNome&&!r.obraNome?null:up(`${r.empresaNome||'—'} · ${r.obraNome||'—'}`);
  const l=r.modalidade==='retirada'?[brdt(r.registradoEm),eo,'RETIROU: '+up((r.retiradoPor||{}).nome||'—'),previa&&!r.nome?null:'PARA: '+up(r.nome)]:[brdt(r.registradoEm),eo,up(r.nome)];
  return l.filter(x=>x!==null)}
function fotoThumb(raw){return fotoCanvas(raw,96,128).toDataURL('image/jpeg',.75)}
/* recorte central 3:4 em 480x640 (o mesmo enquadramento que aparece na tela) */
function fotoCrop(src,sw,sh){const W=480,H=640;let cw=sw,ch=sw*4/3;if(ch>sh){ch=sh;cw=sh*3/4}
  const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(src,(sw-cw)/2,(sh-ch)/2,cw,ch,0,0,W,H);return c}
function fotoCanvas(raw,w,h,linhas){
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(raw,0,0,w,h);
  if(linhas&&linhas.length){
    const fs=Math.max(8,Math.round(w*.043)),lh=Math.round(fs*1.3),pad=Math.round(fs*.6),bh=lh*linhas.length+pad*2-Math.round(fs*.25);
    x.fillStyle='rgba(0,0,0,.62)';x.fillRect(0,h-bh,w,bh);x.fillStyle='#fff';x.textBaseline='top';
    linhas.forEach((t,i)=>{let f=fs;const fnt=()=>x.font=`${i===0?700:600} ${f}px Arial,Helvetica,sans-serif`;fnt();while(f>6&&x.measureText(t).width>w-pad*2){f--;fnt()}x.fillText(t,pad,h-bh+pad+i*lh+Math.round((fs-f)/2))});
  }
  return c}
function canvasBlob(c,q,tipo){return new Promise(res=>{const jpg=()=>c.toBlob(b=>res(b),'image/jpeg',q);
  if(tipo==='image/jpeg')return jpg();try{c.toBlob(b=>{if(b&&b.type==='image/webp')res(b);else jpg()},'image/webp',q)}catch(e){jpg()}})}
async function fotoGerar(raw,linhas){
  let c=await canvasBlob(fotoCanvas(raw,FOTO_CFG.c.w,FOTO_CFG.c.h,linhas),FOTO_CFG.c.q);
  let a=await canvasBlob(fotoCanvas(raw,FOTO_CFG.a.w,FOTO_CFG.a.h,linhas),FOTO_CFG.a.q,c&&c.type);
  if(!c||!a)throw new Error('o navegador não gerou a imagem');
  if(c.type!==a.type){c=await canvasBlob(fotoCanvas(raw,FOTO_CFG.c.w,FOTO_CFG.c.h,linhas),FOTO_CFG.c.q,'image/jpeg');a=await canvasBlob(fotoCanvas(raw,FOTO_CFG.a.w,FOTO_CFG.a.h,linhas),FOTO_CFG.a.q,'image/jpeg')}
  const tipo=c.type==='image/webp'?'image/webp':'image/jpeg';
  return {c,a,tipo,ext:tipo==='image/webp'?'webp':'jpg'}}

/* ---- câmera ---- */
function fotoMsg(m){const e=$('foto-msg');e.hidden=!m;e.textContent=m||''}
function fotoModo(m){$('foto-acoes-cam').hidden=m!=='cam';$('foto-acoes-ok').hidden=m!=='ok';$('foto-prev').hidden=m!=='ok';
  if(m==='ok'){$('foto-video').hidden=true;$('foto-oval').hidden=true;$('foto-dica').hidden=true;$('foto-idle').hidden=true}}
function fotoCamStop(){FOTO.camSeq++;if(FOTO.stream){FOTO.stream.getTracks().forEach(t=>t.stop());FOTO.stream=null}const v=$('foto-video');v.srcObject=null;v.hidden=true;$('foto-oval').hidden=true;$('foto-dica').hidden=true}
function fotoSemCam(m){$('foto-idle').hidden=false;$('foto-idle').textContent='Sem câmera';$('foto-tirar').disabled=true;fotoMsg(m+' Use “Usar o app de câmera do celular” ou registre sem foto, com justificativa.')}
async function fotoCamStart(){
  fotoCamStop();const seq=FOTO.camSeq;fotoMsg('');$('foto-idle').hidden=false;$('foto-idle').textContent='Iniciando câmera…';$('foto-tirar').disabled=true;
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){fotoSemCam('Câmera indisponível neste navegador.');return}
  let st=null;try{st=await navigator.mediaDevices.getUserMedia({video:{facingMode:FOTO.facing,width:{ideal:1280},height:{ideal:960}},audio:false})}
  catch(e){if(seq===FOTO.camSeq)fotoSemCam('A câmera não pôde ser aberta (permissão negada ou em uso).');return}
  if(seq!==FOTO.camSeq||!$('foto-modal').classList.contains('on')){st.getTracks().forEach(t=>t.stop());return}
  FOTO.stream=st;const v=$('foto-video');v.srcObject=st;v.hidden=false;v.classList.toggle('espelho',FOTO.facing==='user');
  $('foto-idle').hidden=true;$('foto-oval').hidden=false;$('foto-dica').hidden=false;
  try{await v.play()}catch(e){}
  $('foto-tirar').disabled=false;
}
/* contexto do modal: de quem é a foto e o que fazer com ela (usar / pular com justificativa / fechar) */
let FCTX=null;
function fotoCtxColab(){
  const c=CUR;if(!c)return null;const e=emp(c.empresaId),o=obra(c.obraId);
  return {titulo:'Foto do colaborador',nome:c.nome,usarTxt:'',
    quem:`<b>${esc(c.nome)}</b> · ${esc((e||{}).nome||'—')} · ${esc((o||{}).nome||'—')}`,
    aviso:`O registro de <b>${esc(c.nome)}</b> ficará marcado como <b>sem foto</b>`,
    linhas:()=>fotoLinhas({registradoEm:new Date().toISOString(),empresaNome:e&&e.nome,obraNome:o&&o.nome,nome:c.nome}),
    vale:()=>CUR===c,
    usar:raw=>{FOTO.raw=raw;FOTO.skip=null;FOTO.thumb=fotoThumb(raw);renderColabCard();renderMeal()},
    pular:m=>{FOTO.raw=null;FOTO.thumb=null;FOTO.skip=m;renderColabCard();renderMeal()},
    fechar:()=>{renderColabCard();renderMeal()}};
}
function fotoAbrir(ctx){
  ctx=ctx&&typeof ctx.vale==='function'?ctx:fotoCtxColab();if(!ctx)return;
  FCTX=ctx;FOTO.tmp=null;
  $('foto-titulo').textContent=ctx.titulo;$('foto-quem').innerHTML=ctx.quem;$('foto-usar').textContent=ctx.usarTxt||'✓ Usar esta foto';
  fotoModo('cam');$('foto-modal').classList.add('on');fotoCamStart();
}
function fotoFechar(){fotoCamStop();$('foto-modal').classList.remove('on');FCTX=null}
function fotoPreview(raw){
  if(!FCTX)return;FOTO.tmp=raw;
  $('foto-prev').src=fotoCanvas(raw,FOTO_CFG.c.w,FOTO_CFG.c.h,FCTX.linhas()).toDataURL('image/jpeg',.85);
  fotoCamStop();fotoModo('ok');fotoMsg('');
}
async function imagemDeArquivo(f){
  try{return await createImageBitmap(f,{imageOrientation:'from-image'})}catch(e){}
  try{return await createImageBitmap(f)}catch(e){}
  return await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error('imagem inválida'));i.src=URL.createObjectURL(f)});
}
$('foto-tirar').onclick=()=>{const v=$('foto-video');if(!FOTO.stream||!v.videoWidth)return;fotoPreview(fotoCrop(v,v.videoWidth,v.videoHeight))};
$('foto-refazer').onclick=()=>{FOTO.tmp=null;fotoModo('cam');fotoCamStart()};
$('foto-usar').onclick=()=>{const ctx=FCTX,raw=FOTO.tmp;if(!raw||!ctx)return;FOTO.tmp=null;fotoFechar();if(ctx.vale())ctx.usar(raw)};
$('foto-virar').onclick=()=>{FOTO.facing=FOTO.facing==='user'?'environment':'user';try{localStorage.setItem('sismed_foto_cam',FOTO.facing)}catch(e){}fotoCamStart()};
$('foto-close').onclick=()=>{const ctx=FCTX;fotoFechar();if(ctx&&ctx.vale())ctx.fechar()};
$('foto-file').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
  try{const im=await imagemDeArquivo(f);const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;fotoPreview(fotoCrop(im,w,h))}catch(err){fotoMsg('Não foi possível ler a foto. Tente de novo.')}};
$('foto-pular').onclick=()=>{
  const ctx=FCTX;if(!ctx)return;fotoFechar();
  justModal({titulo:'Registrar sem foto',resumo:`<div class="notice warn">${ctx.aviso}, com a justificativa, em Administrativo › Registros e na Auditoria.</div><div class="row" style="gap:6px">${['Câmera com defeito','Colaborador recusou a foto','Sem iluminação adequada'].map(m=>`<button type="button" class="btn sec sm" data-jmm="${esc(m)}">${esc(m)}</button>`).join('')}</div>`,
    botao:'Confirmar sem foto',onOk:m=>{if(ctx.vale())ctx.pular(m)}});
  document.querySelectorAll('[data-jmm]').forEach(b=>b.onclick=()=>{$('jm-txt').value=b.dataset.jmm;$('jm-txt').focus()});
};

/* ---- fila de envio (IndexedDB): a foto fica no aparelho até o servidor confirmar ---- */
const FQ={db:undefined,mem:new Map(),pend:new Set(),busy:false,timer:null,avisou:false};
function fqDb(){if(FQ.db!==undefined)return Promise.resolve(FQ.db);
  return new Promise(res=>{try{const r=indexedDB.open('sismed_fotos',1);r.onupgradeneeded=()=>r.result.createObjectStore('fila',{keyPath:'p'});
    r.onsuccess=()=>{FQ.db=r.result;FQ.db.onclose=()=>{FQ.db=undefined};res(FQ.db)};r.onerror=r.onblocked=()=>{FQ.db=null;res(null)}}catch(e){FQ.db=null;res(null)}})}
async function fqOp(mode,fn){const db=await fqDb();if(!db)return fn(null);
  return new Promise((res,rej)=>{let out;try{const tx=db.transaction('fila',mode);out=fn(tx.objectStore('fila'));tx.oncomplete=()=>res(out&&typeof out==='object'&&'result' in out?out.result:out);tx.onerror=tx.onabort=()=>{FQ.db=undefined;rej(tx.error)}}catch(e){FQ.db=undefined;rej(e)}})}
const fqPut=it=>fqOp('readwrite',st=>{if(!st){FQ.mem.set(it.p,it);return}return st.put(it)});
const fqDel=p=>fqOp('readwrite',st=>{if(!st){FQ.mem.delete(p);return}return st.delete(p)});
const fqAll=()=>fqOp('readonly',st=>st?st.getAll():[...FQ.mem.values()]);
function fotoDescartar(it){if(!it)return;FQ.pend.delete(it.p);FQ.mem.delete(it.p);fqDel(it.p).catch(()=>{})}
async function fotoEnfileirar(it){FQ.pend.add(it.p);try{await fqPut(it)}catch(e){FQ.mem.set(it.p,it)}}
async function fotoLocal(p){try{const l=await fqAll();const it=(l||[]).find(i=>i.p===p)||FQ.mem.get(p);return it?new Blob([it.c],{type:it.tipo}):null}catch(e){const it=FQ.mem.get(p);return it?new Blob([it.c],{type:it.tipo}):null}}
async function fotoEnviar(){
  if(FQ.busy||!USER)return;FQ.busy=true;clearTimeout(FQ.timer);let erro=null,enviou=false;
  try{
    let itens=[];try{itens=(await fqAll())||[]}catch(e){}
    FQ.mem.forEach(v=>{if(!itens.some(i=>i.p===v.p))itens.push(v)});
    itens.forEach(i=>FQ.pend.add(i.p));
    for(const it of itens){
      let falhou=null;
      for(const k of ['c','a']){
        if(it['ok_'+k])continue;
        const {error}=await sb.storage.from('fotos').upload(`${k}/${it.p}`,new Blob([it[k]],{type:it.tipo}),{contentType:it.tipo,upsert:false,cacheControl:'86400'});
        if(error&&!/exist|duplicate|409/i.test(`${error.message||''} ${error.statusCode||''} ${error.error||''}`)){falhou=error;break}
        it['ok_'+k]=true;try{await fqPut(it)}catch(e){}
      }
      if(falhou){erro=falhou;const st=String(falhou.statusCode||falhou.status||'');if(!st||/^5/.test(st)||/fetch|network|timeout/i.test(falhou.message||''))break;continue} // sem rede: para; recusa de uma foto: segue com as outras
      try{await fqDel(it.p)}catch(e){}FQ.mem.delete(it.p);FQ.pend.delete(it.p);enviou=true;
    }
  }catch(e){erro=e}
  finally{
    FQ.busy=false;
    if(erro&&!FQ.avisou&&/row-level security|permission|policy|403|Unauthorized/i.test(String(erro.message||erro))){FQ.avisou=true;toast('O servidor recusou o envio da foto (sem permissão). A foto continua guardada neste aparelho.','bad')}
    if(FQ.pend.size)FQ.timer=setTimeout(fotoEnviar,erro?30000:1500);
    if(enviou&&PAGE==='rest'&&USER)renderRest(true);
  }
}
setInterval(()=>{if(FQ.pend.size&&!FQ.busy)fotoEnviar()},60000);

/* ---- indicadores e visualização ---- */
function fotoPill(r){
  if(r.foto)return FQ.pend.has(r.foto.p)?' <span class="pill warn" title="Foto guardada neste aparelho — será enviada quando houver internet">📷 enviando</span>':' <span class="pill neutral" title="Foto registrada">📷</span>';
  return r.semFoto?` <span class="pill warn" title="${esc(r.semFoto)}">sem foto</span>`:'';
}
function fotoBtn(r){
  if(r.foto&&can('fotos.ver'))return `<button class="btn sec sm" data-foto="${esc(r.id)}" title="Foto, data e hora do registro" style="white-space:nowrap">📷 Ver foto</button>`;
  return `<button class="btn sec sm" data-foto="${esc(r.id)}" title="Data, hora e detalhes do registro" style="white-space:nowrap">${r.semFoto?'<span style="color:var(--warn)">Sem foto</span>':'Detalhes'}</button>`;
}
function fotoDia(r){return r.foto&&r.foto.p?r.foto.p.slice(0,10):''}
function fotoArquivada(r){return !!(r.foto&&fotoDia(r)<=addDays(today(),-FOTO_CFG.dias))}
let FV_SEQ=0;
async function verRegistro(r){
  if(!r)return;const m=modOf(r),seq=++FV_SEQ;
  const rp=r.retiradoPor||{};
  $('fv-title').textContent=r.foto&&can('fotos.ver')?(m==='retirada'?'Foto de quem retirou':'Foto do registro'):'Detalhes do registro';
  const linhas=[['Data e hora do registro',`<b class="num">${brdt(r.registradoEm)}</b>`],['Colaborador',`<b>${esc(r.nome)}</b>`],...(m==='retirada'?[['Retirado por',`<b>${esc(rp.nome||'—')}</b><div class="small muted">${rp.qr?'QR '+esc(rp.qr):'nome digitado, sem QR Code'}${r.foto?' · é a pessoa da foto':''}</div>`]]:[]),[m==='terceirizado'?'Empresa (custo)':'Empresa',esc(r.empresaNome||'—')],...(m==='terceirizado'?[['Empresa terceirizada',`<b>${esc(r.terceirizada||'não informada')}</b>`]]:[]),['Obra',esc(r.obraNome||'—')],
    ['Refeição',`${tipo(r.tipo).curto} · ${br(r.data)}${r.dataManual?' <span class="pill warn">data manual</span>':''}`],
    ['Modalidade',modPill(r)],
    ['Restaurante',esc((ct(ctOf(r))||{}).nome||r.contratadaNome||'—')],['Registrado por',esc(r.usuario||'—')]];
  if(r.semFoto)linhas.push(['Foto',`<span class="pill warn">sem foto</span> ${esc(r.semFoto)}`]);
  $('fv-body').innerHTML=`<div class="fvimg" id="fv-img"><div class="vazio">Carregando a foto…</div></div><dl class="fvinfo">${linhas.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
  $('fv-modal').classList.add('on');
  const box=$('fv-img');const vazio=t=>{box.classList.add('sem');box.innerHTML=`<div class="vazio">${t}</div>`};
  if(!r.foto)return vazio(r.semFoto?'📷 Registro feito <b>sem foto</b> (justificativa abaixo).':m==='presencial'?'Registro sem foto — feito antes da foto obrigatória.':m==='retirada'?'Retirada sem foto — feita antes da foto obrigatória.':'Registro manual — sem foto.');
  if(!can('fotos.ver'))return vazio('Você não tem permissão para ver fotos.<br>Peça ao administrador a permissão “Ver fotos do rosto nos registros”.');
  if(fotoArquivada(r)){
    vazio(`A foto tem mais de ${FOTO_CFG.dias} dias e foi para o arquivo compactado.<br>Baixe em <b>Auditoria › Arquivos compactados › Fotos</b> — dia <b>${br(fotoDia(r))}</b>.${can('fotos.baixar')&&can('aud.ver')?'<div style="margin-top:10px"><button class="btn sec sm" id="fv-ir" type="button">Ir para os arquivos de fotos</button></div>':''}`);
    const b=$('fv-ir');if(b)b.onclick=()=>{$('fv-modal').classList.remove('on');ARQ_TAB='fotos';FA_DIA=fotoDia(r);go('aud');setTimeout(()=>{const c=$('arq-card');if(c)c.scrollIntoView({behavior:'smooth',block:'start'})},150)};
    return;
  }
  let url=null;const loc=await fotoLocal(r.foto.p);if(loc)url=URL.createObjectURL(loc);
  if(!url){try{const {data,error}=await sb.storage.from('fotos').createSignedUrl('c/'+r.foto.p,300);if(!error&&data)url=data.signedUrl}catch(e){}}
  if(seq!==FV_SEQ)return;
  const naoChegou='A foto ainda não chegou ao servidor — o aparelho que fez o registro pode estar sem internet. Tente de novo mais tarde.';
  if(!url)return vazio(naoChegou);
  const img=new Image();img.alt=m==='retirada'?`Foto de ${rp.nome||'quem retirou'}, que retirou a refeição de ${r.nome} — ${brdt(r.registradoEm)}`:`Foto de ${r.nome} — ${brdt(r.registradoEm)}`;
  img.onload=()=>{if(seq!==FV_SEQ)return;box.classList.remove('sem');box.innerHTML='';box.appendChild(img)};img.onerror=()=>{if(seq===FV_SEQ)vazio(naoChegou)};img.src=url;
  audit('foto.ver',`${r.nome} — ${tipo(r.tipo).curto} de ${br(r.data)} (registrado em ${brdt(r.registradoEm)})${m==='retirada'?' — foto de quem retirou: '+(rp.nome||'—'):''}`,{obra:r.obraNome,empresa:r.empresaNome,entidade:'registro '+r.id});save();
}
$('fv-close').onclick=()=>{$('fv-modal').classList.remove('on');FV_SEQ++};

/* ---- Auditoria › Arquivos compactados › Fotos ---- */
let ARQ_TAB='aud',FA_DIA=null,FA_KEY='',FA_LIST=[],FA_USO=null,FA_BUSY=false;
function tamanho(b){b=+b||0;if(!b)return '0 KB';return b<1048576?`${Math.max(1,Math.round(b/1024))} KB`:b<1073741824?`${(b/1048576).toFixed(1).replace('.',',')} MB`:`${(b/1073741824).toFixed(2).replace('.',',').replace(/,00$/,'')} GB`}
$('arq-tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{ARQ_TAB=b.dataset.at;renderAudArq()});
async function renderFotosArq(forcar){
  const de=$('fa-de'),ate=$('fa-ate');
  if(FA_DIA){de.value=FA_DIA;ate.value=FA_DIA;FA_DIA=null;forcar=true}
  if(!de.value)de.value=addDays(today(),-30);if(!ate.value)ate.value=today();
  if(de.value>ate.value){const x=de.value;de.value=ate.value;ate.value=x}
  $('fa-agora').hidden=!isAdm(USER);
  const key=de.value+'|'+ate.value;
  if(forcar||FA_KEY!==key){
    FA_KEY=key;$('fa-table').innerHTML='<tbody><tr><td class="empty">Carregando…</td></tr></tbody>';
    try{
      const [l,u]=await Promise.all([sb.from('fotos_arquivos').select('dia,qtd,bytes,atualizado_em').gte('dia',de.value).lte('dia',ate.value).order('dia',{ascending:false}),sb.rpc('fotos_uso')]);
      if(l.error)throw l.error;FA_LIST=l.data||[];FA_USO=u&&!u.error?u.data:null;
    }catch(e){FA_LIST=[];FA_KEY='';$('fa-table').innerHTML=`<tbody><tr><td class="empty">Não foi possível carregar os arquivos: ${esc(e.message||e)}</td></tr></tbody>`;return}
  }
  const U=FA_USO;
  $('fotos-uso').innerHTML=U?`<div class="tile total"><div class="k">Fotos em consulta</div><div class="v num">${num(U.consulta_qtd)}</div><div class="s">${tamanho(U.consulta_bytes)} · últimos ${FOTO_CFG.dias} dias</div></div>
    <div class="tile almoco"><div class="k">Aguardando compactação</div><div class="v num">${num(U.pendente_qtd)}</div><div class="s">${tamanho(U.pendente_bytes)} · compacta às 03h</div></div>
    <div class="tile jantar"><div class="k">Arquivos compactados</div><div class="v num">${num(U.zip_qtd)}</div><div class="s">${tamanho(U.zip_bytes)} · guardados 12 meses</div></div>
    <div class="tile lanche"><div class="k">Espaço de arquivos usado</div><div class="v num">${((U.total_bytes||0)/(U.limite_bytes||1073741824)*100).toFixed(1).replace('.',',')}%</div><div class="s">${tamanho(U.total_bytes)} de ${tamanho(U.limite_bytes||1073741824)} (inclui anexos de BM)</div></div>`:'';
  const tq=FA_LIST.reduce((s,a)=>s+(a.qtd||0),0),tb=FA_LIST.reduce((s,a)=>s+(+a.bytes||0),0);
  if(!FA_BUSY)$('fa-resumo').textContent=FA_LIST.length?`${FA_LIST.length} arquivo(s) no período · ${num(tq)} foto(s) · ${tamanho(tb)}`:'';
  $('fa-baixar').disabled=!FA_LIST.length||FA_BUSY;
  $('fa-table').innerHTML=`<thead><tr><th>Dia</th><th class="r">Fotos</th><th class="r">Tamanho</th><th>Atualizado em</th><th></th></tr></thead><tbody>${FA_LIST.map(a=>`<tr><td class="num">${wd(a.dia)}, ${br(a.dia)}</td><td class="r num">${num(a.qtd)}</td><td class="r num">${tamanho(a.bytes)}</td><td class="num small">${a.atualizado_em?brdt(a.atualizado_em):'—'}</td><td><button class="btn sec sm" type="button" data-fadia="${esc(a.dia)}">Baixar</button></td></tr>`).join('')||`<tr><td colspan="5" class="empty">Nenhum arquivo compactado neste período. O arquivo de cada dia fica pronto na madrugada seguinte.</td></tr>`}</tbody>`;
  $('fa-table').querySelectorAll('[data-fadia]').forEach(b=>b.onclick=()=>baixarFotos(FA_LIST.filter(a=>a.dia===b.dataset.fadia)));
}
['fa-de','fa-ate'].forEach(id=>$(id).onchange=()=>renderFotosArq());
$('fa-baixar').onclick=()=>baixarFotos(FA_LIST);
function carregarFflate(){
  if(window.fflate)return Promise.resolve(window.fflate);
  return new Promise((res,rej)=>{const s=document.createElement('script');s.src='lib/fflate.js';
    s.onload=()=>window.fflate?res(window.fflate):rej(new Error('a biblioteca de compactação não carregou'));s.onerror=()=>rej(new Error('sem conexão para carregar a biblioteca de compactação'));document.head.appendChild(s)})}
function salvarArquivo(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},5000)}
async function baixarFotos(lista){
  if(!lista.length||FA_BUSY)return;FA_BUSY=true;$('fa-baixar').disabled=true;const st=$('fa-resumo');
  const ord=lista.slice().sort((a,b)=>a.dia<b.dia?-1:1);const de=ord[0].dia,ate=ord[ord.length-1].dia;const qtd=ord.reduce((s,a)=>s+(a.qtd||0),0);
  try{
    let blob,name;
    if(ord.length===1){st.textContent=`Baixando ${br(de)}…`;const {data,error}=await sb.storage.from('fotos').download(`z/${de}.zip`);if(error)throw error;blob=data;name=`fotos-${de}.zip`}
    else{
      if(ord.reduce((s,a)=>s+(+a.bytes||0),0)>350*1048576)throw new Error('período grande demais para um único arquivo (mais de 350 MB). Escolha um período menor.');
      const ff=await carregarFflate();const ent={};
      for(let i=0;i<ord.length;i++){const a=ord[i];st.textContent=`Baixando ${i+1} de ${ord.length} (${br(a.dia)})…`;
        const {data,error}=await sb.storage.from('fotos').download(`z/${a.dia}.zip`);if(error)throw new Error(`${br(a.dia)}: ${error.message||error}`);
        const z=ff.unzipSync(new Uint8Array(await data.arrayBuffer()));for(const [k,v] of Object.entries(z))if(!k.endsWith('/'))ent[k]=[v,{level:0}]}
      st.textContent='Montando o arquivo…';await new Promise(r=>setTimeout(r,30));
      blob=new Blob([ff.zipSync(ent)],{type:'application/zip'});name=`fotos-${de}_a_${ate}.zip`;
    }
    audit('fotos.baixar',`${br(de)}${de!==ate?' a '+br(ate):''} — ${ord.length} arquivo(s), ${qtd} foto(s)`,{entidade:'fotos'});save();
    salvarArquivo(blob,name);sucesso(`${num(qtd)} foto(s) baixada(s) — ${name}`);
  }catch(e){toast('Não foi possível baixar as fotos: '+(e.message||e),'bad')}
  FA_BUSY=false;renderFotosArq();
}
$('fa-agora').onclick=async()=>{
  const b=$('fa-agora');b.disabled=true;const t=b.textContent;b.textContent='Compactando…';
  try{const {data,error}=await sb.functions.invoke('fotos-compactar',{body:{incluirHoje:true}});if(error)throw error;if(data&&data.error)throw new Error(data.error);
    sucesso(data&&data.fotosCompactadas?`${data.fotosCompactadas} foto(s) compactada(s)`:'Nenhuma foto nova para compactar');
    try{await loadAll()}catch(e){}FA_KEY='';renderAud();
  }catch(e){let m=e.message||String(e);try{if(e.context&&typeof e.context.json==='function'){const j=await e.context.json();if(j&&j.error)m=j.error}}catch(x){}toast('Não foi possível compactar agora: '+m,'bad')}
  b.disabled=false;b.textContent=t;
};

/* =================== HORÁRIO LIMITE DE REGISTRO (v2.2) ===================
   Configurações › Horários (permissão cfg.horarios). Guardado em config id "horarios".
   Bloqueia QR, código digitado e registro manual (Retirada/Terceirizado) fora da janela do tipo, pelo relógio do aparelho.
   Não bloqueia sobras nem registros com data manual (retroativa). */
const HORARIOS_PADRAO={ativo:false,tipos:{cafe:{ativo:true,ini:'06:00',fim:'08:00'},almoco:{ativo:true,ini:'11:00',fim:'13:00'},jantar:{ativo:true,ini:'18:00',fim:'21:00'},lanche:{ativo:false,ini:'15:00',fim:'16:00'}}};
function horarios(){const h=(S&&S.horarios)||{};const tipos={};TIPOS.forEach(t=>{tipos[t.id]=Object.assign({},HORARIOS_PADRAO.tipos[t.id],(h.tipos||{})[t.id]||{})});return {ativo:!!h.ativo,tipos}}
function agoraHM(){const d=new Date();return pad(d.getHours())+':'+pad(d.getMinutes())}
function janela(tipoId){const H=horarios();if(!H.ativo)return null;const c=H.tipos[tipoId];return c&&c.ativo&&c.ini&&c.fim?c:null}
function horarioErro(tipoId,dataRef){
  if(dataRef&&dataRef!==today())return null;const c=janela(tipoId);if(!c)return null;const h=agoraHM();
  const dentro=c.ini<=c.fim?(h>=c.ini&&h<=c.fim):(h>=c.ini||h<=c.fim);
  return dentro?null:`${tipo(tipoId).curto}: registro permitido das ${c.ini} às ${c.fim} (agora são ${h}).`}
function renderHorariosRest(){
  const el=$('rest-horarios');const H=horarios();el.hidden=!H.ativo;if(!H.ativo){el.innerHTML='';return}
  el.innerHTML='<span class="muted">Horário de registro:</span>'+TIPOS.map(t=>{const c=janela(t.id);const livre=!horarioErro(t.id);return `<span class="pill ${c?(livre?'ok':'neutral'):'neutral'}" title="${c?(livre?'aberto agora':'fechado agora'):'sem limite de horário'}">${t.curto} ${c?esc(c.ini+'–'+c.fim):'livre'}${c&&livre?' · aberto':''}</span>`}).join('');
}
setInterval(()=>{if(!USER||PAGE!=='rest')return;renderHorariosRest();if(CUR&&!$('confirm-card').hidden&&!FOTO.busy)renderMeal()},30000);
/* Configurações › Horários */
let HED=null;
function renderHorarios(){HED=JSON.parse(JSON.stringify(horarios()));$('h-err').hidden=true;desenhaHorarios()}
function desenhaHorarios(){
  const on=HED.ativo;$('h-ativo').classList.toggle('on',on);$('h-ativo').setAttribute('aria-checked',String(on));$('h-ativo-txt').textContent=on?'Limite ativado':'Limite desativado';$('h-ativo-txt').style.color=on?'var(--good)':'var(--ink-3)';
  $('h-tabela').innerHTML=`<div class="hrow hh"><span>Refeição</span><span>Limitar</span><span>Início</span><span>Término</span></div>`+TIPOS.map(t=>{const c=HED.tipos[t.id];return `<div class="hrow${on&&c.ativo?'':' off'}"><span><span class="pill ${t.id}">${t.curto}</span></span><span><button type="button" class="switch${c.ativo?' on':''}" data-ht="${esc(t.id)}" role="switch" aria-checked="${c.ativo===true}" aria-label="Limitar horário — ${t.curto}"></button></span><span data-l="Início"><input type="time" data-hi="${esc(t.id)}" value="${esc(c.ini)}" ${c.ativo?'':'disabled'} aria-label="Início — ${t.curto}"></span><span data-l="Término"><input type="time" data-hf="${esc(t.id)}" value="${esc(c.fim)}" ${c.ativo?'':'disabled'} aria-label="Término — ${t.curto}"></span></div>`}).join('');
  $('h-tabela').querySelectorAll('[data-ht]').forEach(b=>b.onclick=()=>{const c=HED.tipos[b.dataset.ht];c.ativo=!c.ativo;desenhaHorarios()});
  $('h-tabela').querySelectorAll('[data-hi]').forEach(i=>i.onchange=()=>{HED.tipos[i.dataset.hi].ini=i.value});
  $('h-tabela').querySelectorAll('[data-hf]').forEach(i=>i.onchange=()=>{HED.tipos[i.dataset.hf].fim=i.value});
  $('h-save').disabled=!can('cfg.horarios');
}
$('h-ativo').onclick=()=>{HED.ativo=!HED.ativo;desenhaHorarios()};
$('h-reset').onclick=renderHorarios;
$('h-save').onclick=()=>{
  if(!can('cfg.horarios'))return;const err=$('h-err');
  const ruim=TIPOS.filter(t=>{const c=HED.tipos[t.id];return c.ativo&&(!c.ini||!c.fim||c.ini===c.fim)});
  if(ruim.length){err.hidden=false;err.textContent=`Informe início e término diferentes para: ${ruim.map(t=>t.curto).join(', ')}.`;return}
  err.hidden=true;const antes=horarios();
  const txt=H=>(H.ativo?'ATIVADO':'DESATIVADO')+' — '+TIPOS.map(t=>{const c=H.tipos[t.id];return `${t.curto} ${c.ativo?c.ini+'–'+c.fim:'livre'}`}).join(', ');
  S.horarios=JSON.parse(JSON.stringify(HED));
  audit('horarios.salvar',txt(S.horarios),{entidade:'horários de registro',antes:txt(antes),depois:txt(S.horarios)});
  concluir(S.horarios.ativo?'Horários salvos — limite ativado':'Horários salvos — limite desativado');desenhaHorarios();
};

/* =================== ANALÍTICO (v2.2) ===================
   Refeições registradas + sobras cobradas (1 unidade por refeição que sobrou); não inclui as fechadas sem BM.
   Cores dos gráficos: --viz-qtd (quantidade) e --viz-val (valor) — par validado para daltonismo, claro e escuro. */
let ANA={preset:'mes'};
function anaDatas(p){const t=today();const d=parse(t);
  if(p==='mes')return [ymd(new Date(d.getFullYear(),d.getMonth(),1)),ymd(new Date(d.getFullYear(),d.getMonth()+1,0))];
  if(p==='mes-ant')return [ymd(new Date(d.getFullYear(),d.getMonth()-1,1)),ymd(new Date(d.getFullYear(),d.getMonth(),0))];
  if(p==='30')return [addDays(t,-29),t];
  if(p==='ano')return [ymd(new Date(d.getFullYear(),0,1)),ymd(new Date(d.getFullYear(),11,31))];
  return null}
function anaFiltros(){return {de:$('an-de').value,ate:$('an-ate').value,emp:$('an-emp').value,obra:$('an-obra').value,colab:$('an-colab').value.trim().toLowerCase(),tipo:$('an-tipo').value,ct:$('an-ct').value}}
function anaItens(F){
  const ok=x=>x.data>=F.de&&x.data<=F.ate&&(!F.emp||x.empresaId===F.emp)&&(!F.obra||x.obraId===F.obra)&&(!F.tipo||x.tipo===F.tipo)&&(!F.ct||ctOf(x)===F.ct);
  const regs=S.registros.filter(r=>!r.fechado&&regOk(r)&&ok(r)&&(!F.colab||String(r.nome||'').toLowerCase().includes(F.colab)));
  const sob=F.colab?[]:(S.sobras||[]).filter(s=>s.empresaId&&sobraOk(s)&&ok(s)).flatMap(sobraUnits);
  return regs.concat(sob)}
function anaNum(v){return Math.round(v).toLocaleString('pt-BR')}
function anaMoedaCurta(v){return v>=1e6?'R$ '+(v/1e6).toFixed(1).replace('.',',')+' mi':v>=1e4?'R$ '+(v/1e3).toFixed(0)+' mil':v>=1e3?'R$ '+(v/1e3).toFixed(1).replace('.',',')+' mil':'R$ '+Math.round(v)}
function niceMax(v){if(v<=0)return 1;const e=Math.pow(10,Math.floor(Math.log10(v)));const f=v/e;return (f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*e}
function renderAna(){
  if(!$('an-de').value||!$('an-ate').value){const r=anaDatas(ANA.preset)||anaDatas('mes');$('an-de').value=r[0];$('an-ate').value=r[1]}
  if($('an-de').value>$('an-ate').value){const x=$('an-de').value;$('an-de').value=$('an-ate').value;$('an-ate').value=x}
  document.querySelectorAll('#an-presets [data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===ANA.preset));
  fillSelect($('an-emp'),S.empresas.slice().sort((a,b)=>a.nome.localeCompare(b.nome)),$('an-emp').value,'Todas');
  fillSelect($('an-obra'),S.obras.filter(o=>obraOk(o.id)&&(!$('an-emp').value||o.empresaId===$('an-emp').value)).sort((a,b)=>a.nome.localeCompare(b.nome)),$('an-obra').value,'Todas');
  fillSelect($('an-ct'),(S.contratadas||[]).filter(c=>ctOk(c.id)),$('an-ct').value,'Todos');
  if($('an-tipo').options.length<2)TIPOS.forEach(t=>{const o=document.createElement('option');o.value=t.id;o.textContent=t.curto;$('an-tipo').appendChild(o)});
  $('an-colab-list').innerHTML=[...new Set(S.colab.map(c=>c.nome).concat(S.registros.filter(r=>modOf(r)==='terceirizado').map(r=>r.nome)))].sort().map(n=>`<option value="${esc(n)}">`).join('');
  const F=anaFiltros();const it=anaItens(F);
  const qtd=it.length,val=it.reduce((s,r)=>s+(r.valor||0),0),nsob=it.filter(r=>r.sobra).length;
  const fimEfetivo=F.ate<today()?F.ate:today();const diasCorridos=F.de>fimEfetivo?0:Math.round((parse(fimEfetivo)-parse(F.de))/864e5)+1;
  const diasCom=new Set(it.map(r=>r.data)).size;
  $('ana-sub').textContent=`${br(F.de)} a ${br(F.ate)} · refeições registradas e sobras cobradas · não inclui refeições fechadas sem BM`;
  $('ana-kpis').innerHTML=`<div class="tile total"><div class="k">Refeições no período</div><div class="v num">${anaNum(qtd)}</div><div class="s">${nsob?`inclui ${anaNum(nsob)} sobra${nsob>1?'s':''}`:'&nbsp;'}</div></div>
    <div class="tile total"><div class="k">Valor no período</div><div class="v num">${money(val)}</div><div class="s">${qtd?`preço médio ${money(val/qtd)}`:'&nbsp;'}</div></div>
    <div class="tile total"><div class="k">Média por dia</div><div class="v num">${diasCorridos?anaNum(qtd/diasCorridos):'—'}</div><div class="s">${diasCorridos?`${diasCorridos} dia(s) corrido(s) · ${money(diasCorridos?val/diasCorridos:0)}/dia`:'período futuro'}</div></div>
    <div class="tile total"><div class="k">Dias com registro</div><div class="v num">${diasCom}</div><div class="s">${new Set(it.filter(r=>!r.sobra).map(r=>r.colabId||r.nome)).size} colaborador(es)</div></div>`;
  // série temporal: por dia (até 62 dias) ou por mês
  const dias=Math.round((parse(F.ate)-parse(F.de))/864e5)+1;const porMes=dias>62;const buckets=[];
  if(porMes){let d=parse(F.de);d=new Date(d.getFullYear(),d.getMonth(),1);const fim=parse(F.ate);while(d<=fim){const k=ymd(d).slice(0,7);buckets.push({k,lab:d.toLocaleDateString('pt-BR',{month:'short'}).replace('.','')+'/'+String(d.getFullYear()).slice(2),tit:d.toLocaleDateString('pt-BR',{month:'long',year:'numeric'})});d=new Date(d.getFullYear(),d.getMonth()+1,1)}}
  else for(let d=F.de;d<=F.ate;d=addDays(d,1))buckets.push({k:d,lab:d.slice(8),tit:`${wd(d)}, ${br(d)}`});
  const key=r=>porMes?r.data.slice(0,7):r.data;const agg={};it.forEach(r=>{const k=key(r);const a=agg[k]||(agg[k]={q:0,v:0,t:{}});a.q++;a.v+=r.valor||0;a.t[r.tipo]=(a.t[r.tipo]||0)+1});
  const pts=buckets.map(b=>{const a=agg[b.k]||{q:0,v:0,t:{}};return {...b,q:a.q,v:a.v,t:a.t}});
  const detalhe=p=>TIPOS.filter(t=>p.t[t.id]).map(t=>`${t.curto}: ${p.t[t.id]}`);
  $('ana-t1').textContent=`${anaNum(qtd)} refeições`;$('ana-t2').textContent=money(val);
  $('ana-c1-sub').textContent=porMes?'por mês':'por dia';$('ana-c2-sub').textContent=porMes?'por mês':'por dia';
  colChart($('ana-c1'),pts.map(p=>({lab:p.lab,v:p.q,tit:p.tit,linhas:[`${money(p.v)}`].concat(detalhe(p)),fmt:anaNum(p.q)+(p.q===1?' refeição':' refeições')})),'var(--viz-qtd)',anaNum);
  colChart($('ana-c2'),pts.map(p=>({lab:p.lab,v:p.v,tit:p.tit,linhas:[`${anaNum(p.q)} refeições`],fmt:money(p.v)})),'var(--viz-val)',anaMoedaCurta);
  $('ana-c1-tab').innerHTML=anaTabela([porMes?'Mês':'Dia','Refeições'].concat(TIPOS.map(t=>t.curto)).concat(['Valor']),pts.filter(p=>p.q).map(p=>[p.tit,anaNum(p.q)].concat(TIPOS.map(t=>p.t[t.id]?anaNum(p.t[t.id]):'–')).concat([money(p.v)])));
  $('ana-c2-tab').innerHTML=anaTabela([porMes?'Mês':'Dia','Valor','Refeições'],pts.filter(p=>p.q).map(p=>[p.tit,money(p.v),anaNum(p.q)]));
  // por obra e por empresa (quantidade e valor lado a lado, mesma linha)
  const grupo=(fk,fn)=>{const m=new Map();it.forEach(r=>{const k=fk(r)||'—';const a=m.get(k)||{nome:fn(r)||'—',q:0,v:0};a.q++;a.v+=r.valor||0;m.set(k,a)});return [...m.values()].sort((a,b)=>b.q-a.q||b.v-a.v)};
  const obs=grupo(r=>r.obraId||r.obraNome,r=>(obra(r.obraId)||{}).nome||r.obraNome),ems=grupo(r=>r.empresaId,r=>(emp(r.empresaId)||{}).nome||r.empresaNome);
  pairBars($('ana-c3'),obs,qtd,val);pairBars($('ana-c4'),ems,qtd,val);
  $('ana-c3-n').textContent=`${obs.length} obra(s)`;$('ana-c4-n').textContent=`${ems.length} empresa(s)`;
  $('ana-c3-tab').innerHTML=anaTabela(['Obra','Refeições','% qtd','Valor','% valor'],obs.map(g=>[g.nome,anaNum(g.q),pct(g.q,qtd),money(g.v),pct(g.v,val)]));
  $('ana-c4-tab').innerHTML=anaTabela(['Empresa','Refeições','% qtd','Valor','% valor'],ems.map(g=>[g.nome,anaNum(g.q),pct(g.q,qtd),money(g.v),pct(g.v,val)]));
  $('ana-vazio').hidden=!!qtd;
}
function pct(a,b){return b?(a/b*100).toFixed(1).replace('.',',')+'%':'—'}
function anaTabela(cab,linhas){return `<div class="tablewrap"><table><thead><tr>${cab.map((c,i)=>`<th${i?' class="r"':''}>${esc(c)}</th>`).join('')}</tr></thead><tbody>${linhas.map(l=>`<tr>${l.map((c,i)=>`<td${i?' class="r num"':''}>${esc(c)}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="${esc(cab.length)}" class="empty">Sem dados no período.</td></tr>`}</tbody></table></div>`}
/* colunas (uma série): barra ≤24px, topo arredondado 4px, base reta; grade discreta; rótulo só no maior valor */
function colChart(el,pts,cor,fmtEixo){
  const W=Math.max(280,el.clientWidth||600),H=230,ml=Math.max(34,String(fmtEixo(niceMax(Math.max(0,...pts.map(p=>p.v))))).length*6.6+10),mr=6,mt=22,mb=24;
  const pw=W-ml-mr,ph=H-mt-mb,n=pts.length||1,band=pw/n,bw=Math.max(2,Math.min(24,band-2));
  const max=niceMax(Math.max(0,...pts.map(p=>p.v)));const y=v=>mt+ph-(v/max)*ph;
  const ticks=[0,.25,.5,.75,1].map(f=>f*max);
  const passo=Math.max(1,Math.ceil(n*26/pw));const iMax=pts.reduce((m,p,i)=>p.v>pts[m].v?i:m,0);
  let s=`<svg class="viz-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Gráfico de colunas">`;
  s+=ticks.map((t,i)=>`<line class="${i?'grid':'base'}" x1="${ml}" x2="${W-mr}" y1="${y(t)}" y2="${y(t)}"/><text x="${ml-6}" y="${y(t)+4}" text-anchor="end">${esc(fmtEixo(t))}</text>`).join('');
  pts.forEach((p,i)=>{const x=ml+i*band+(band-bw)/2;const h=Math.max(0,y(0)-y(p.v));
    if(h>0){const r=Math.min(4,bw/2,h);const yt=y(p.v);s+=`<path class="bar" data-i="${i}" style="fill:${cor}" d="M${x},${y(0)}V${yt+r}Q${x},${yt} ${x+r},${yt}H${x+bw-r}Q${x+bw},${yt} ${x+bw},${yt+r}V${y(0)}Z"/>`}
    if(i%passo===0)s+=`<text x="${x+bw/2}" y="${H-7}" text-anchor="middle">${esc(p.lab)}</text>`;
    s+=`<rect class="hit" data-i="${i}" x="${ml+i*band}" y="${mt-18}" width="${band}" height="${ph+18}" tabindex="0" aria-label="${esc(p.tit+': '+p.fmt)}"/>`});
  if(pts.length&&pts[iMax].v>0){const p=pts[iMax];const x=ml+iMax*band+band/2;s+=`<text class="viz-lbl" x="${Math.min(Math.max(x,ml+30),W-mr-30)}" y="${y(p.v)-6}" text-anchor="middle">${esc(fmtEixo===anaNum?anaNum(p.v):anaMoedaCurta(p.v))}</text>`}
  s+='</svg>';el.innerHTML=s;
  el.querySelectorAll('.hit').forEach(h=>{const i=+h.dataset.i;const bar=el.querySelector(`.bar[data-i="${i}"]`);const p=pts[i];
    const show=ev=>{el.querySelectorAll('.bar.on').forEach(b=>b.classList.remove('on'));if(bar)bar.classList.add('on');vizTip(ev,p.fmt,[p.tit].concat(p.linhas||[]),cor,h)};
    h.addEventListener('pointerenter',show);h.addEventListener('pointermove',show);h.addEventListener('focus',show);
    const hide=()=>{if(bar)bar.classList.remove('on');vizTipHide()};h.addEventListener('pointerleave',hide);h.addEventListener('blur',hide)});
}
/* barras horizontais pareadas: quantidade e valor da mesma obra/empresa na mesma linha (duas escalas separadas, sem eixo duplo) */
function pairBars(el,grupos,qtdTot,valTot){
  if(!grupos.length){el.innerHTML='<div class="small muted" style="padding:10px 0">Sem dados no período.</div>';return}
  let lista=grupos;if(grupos.length>10){const resto=grupos.slice(9);lista=grupos.slice(0,9).concat([{nome:`Outras (${resto.length})`,q:resto.reduce((s,g)=>s+g.q,0),v:resto.reduce((s,g)=>s+g.v,0)}])}
  const mq=Math.max(...lista.map(g=>g.q)),mv=Math.max(...lista.map(g=>g.v))||1;
  el.innerHTML=`<div class="pb-row pb-h"><span></span><span><i class="key" style="background:var(--viz-qtd)"></i>Refeições</span><span><i class="key" style="background:var(--viz-val)"></i>Valor</span></div>`+
    lista.map((g,i)=>`<div class="pb-row" tabindex="0" data-i="${i}"><div class="pb-lab">${esc(g.nome)}</div><div class="pb-cell"><div class="pb-bar" style="background:var(--viz-qtd);width:calc((100% - 52px) * ${(g.q/mq).toFixed(4)})"></div><span class="pb-v">${anaNum(g.q)}</span></div><div class="pb-cell"><div class="pb-bar" style="background:var(--viz-val);width:calc((100% - 108px) * ${(g.v/mv).toFixed(4)})"></div><span class="pb-v">${money(g.v)}</span></div></div>`).join('');
  el.querySelectorAll('.pb-row[data-i]').forEach(r=>{const g=lista[+r.dataset.i];const show=ev=>vizTip(ev,g.nome,[`${anaNum(g.q)} refeições · ${pct(g.q,qtdTot)} do total`,`${money(g.v)} · ${pct(g.v,valTot)} do valor`,`preço médio ${money(g.q?g.v/g.q:0)}`],null,r);
    r.addEventListener('pointerenter',show);r.addEventListener('pointermove',show);r.addEventListener('focus',show);r.addEventListener('pointerleave',vizTipHide);r.addEventListener('blur',vizTipHide)});
}
function vizTip(ev,titulo,linhas,cor,alvo){
  const t=$('viz-tip');t.textContent='';const b=document.createElement('b');b.textContent=titulo;t.appendChild(b);
  (linhas||[]).forEach((l,i)=>{const d=document.createElement('div');if(i===0&&cor){const k=document.createElement('i');k.className='lk';k.style.background=cor;d.appendChild(k)}d.appendChild(document.createTextNode(l));if(i>0||!cor)d.className='m';t.appendChild(d)});
  t.hidden=false;let x,y;
  if(ev&&ev.clientX!==undefined&&ev.type!=='focus'){x=ev.clientX;y=ev.clientY}else{const r=alvo.getBoundingClientRect();x=r.left+r.width/2;y=r.top}
  const w=t.offsetWidth,h=t.offsetHeight;let left=x+14,top=y-h-12;if(left+w>innerWidth-8)left=x-w-14;if(left<8)left=8;if(top<8)top=y+16;t.style.left=left+'px';t.style.top=top+'px';
}
function vizTipHide(){$('viz-tip').hidden=true}
document.querySelectorAll('#an-presets [data-p]').forEach(b=>b.onclick=()=>{ANA.preset=b.dataset.p;const r=anaDatas(ANA.preset);$('an-de').value=r[0];$('an-ate').value=r[1];renderAna()});
['an-de','an-ate'].forEach(id=>$(id).onchange=()=>{ANA.preset='';renderAna()});
['an-emp','an-obra','an-tipo','an-ct'].forEach(id=>$(id).onchange=renderAna);
$('an-colab').oninput=()=>{clearTimeout(ANA.t);ANA.t=setTimeout(renderAna,250)};
$('an-limpar').onclick=()=>{['an-emp','an-obra','an-tipo','an-ct','an-colab'].forEach(id=>$(id).value='');ANA.preset='mes';const r=anaDatas('mes');$('an-de').value=r[0];$('an-ate').value=r[1];renderAna()};
document.querySelectorAll('[data-vista]').forEach(b=>b.onclick=()=>{const c=b.closest('.viz-card');const tab=c.classList.toggle('tabela');b.textContent=tab?'Gráfico':'Tabela';b.setAttribute('aria-pressed',String(tab));vizTipHide();if(!tab)renderAna()});
addEventListener('resize',()=>{clearTimeout(ANA.rz);ANA.rz=setTimeout(()=>{if(PAGE==='ana')renderAna()},200)});
addEventListener('scroll',vizTipHide,true);

/* =================== BOOT =================== */
if('serviceWorker' in navigator&&location.protocol==='https:'){navigator.serviceWorker.register('sw.js').catch(()=>{})}
boot();
