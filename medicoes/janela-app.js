/* v3.3.0: movido do index.html para arquivo — a política de segurança da página (CSP script-src 'self') bloqueava o script embutido */
/* Aplicativo instalado: cada app (Estoque, Aprovações, Contagem, Notificações, CAP-Refeições...) fica na própria janela.
   Link para fora deste app (ex.: "⌂ página inicial do Capivara" e, de lá, outro sistema) abre no navegador,
   em vez de trocar o conteúdo da janela do app — antes, quem ia ao início e abria o CAP-Refeições ficava com a
   janela do Estoque mostrando o Refeições, sem caminho de volta. No navegador comum nada muda. */
(function(){
  function instalado(){ try{ return matchMedia('(display-mode: standalone)').matches||matchMedia('(display-mode: minimal-ui)').matches||matchMedia('(display-mode: window-controls-overlay)').matches||navigator.standalone===true; }catch(e){ return false; } }
  var base=new URL('./',location.href).pathname;
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||!instalado())return;
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!a||a.hasAttribute('download')||(a.target&&a.target!=='_self'))return;
    var u; try{ u=new URL(a.getAttribute('href'),location.href); }catch(x){ return; }
    if(u.protocol!=='http:'&&u.protocol!=='https:')return;
    if(u.origin===location.origin&&(u.pathname===location.pathname||u.pathname===base||u.pathname===base+'index.html'))return;
    e.preventDefault();
    window.open(u.href,'_blank','noopener');
  });
})();
