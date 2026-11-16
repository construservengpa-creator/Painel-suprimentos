/* CAP-Refeições — instalação como aplicativo (celular e computador)
   • registra o service worker (abre mesmo com internet fraca e permite instalar)
   • Android / Chrome / Edge no PC: botão "Instalar app" (usa o pedido de instalação do navegador)
   • iPhone / iPad (Safari): dica "Compartilhar › Adicionar à Tela de Início"
   Já instalado (aberto como app): não mostra nada. */
(function () {
  'use strict';
  var KEY_FECHOU = 'sismed_instalar_fechado';
  var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
  if (standalone) return;

  function fechouAntes() { try { return localStorage.getItem(KEY_FECHOU) === '1'; } catch (e) { return false; } }
  function marcarFechou() { try { localStorage.setItem(KEY_FECHOU, '1'); } catch (e) {} }

  var css = '' +
    '#sis-inst{position:fixed;right:16px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:10px;' +
    'max-width:calc(100vw - 32px);background:#fff;color:#2a211c;border:1px solid #e8dcd2;border-radius:14px;' +
    'box-shadow:0 8px 28px rgba(60,30,10,.18);padding:10px 10px 10px 14px;font:14px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '#sis-inst img{width:32px;height:32px;border-radius:8px;flex:none}' +
    '#sis-inst .t{flex:1;min-width:0}#sis-inst .t b{display:block;font-size:14px}#sis-inst .t span{color:#7a6a60;font-size:12.5px}' +
    '#sis-inst button{border:0;border-radius:10px;font:600 14px system-ui,sans-serif;cursor:pointer}' +
    '#sis-inst .go{background:#b5481c;color:#fff;padding:9px 14px;white-space:nowrap}' +
    '#sis-inst .x{background:transparent;color:#7a6a60;padding:6px 8px;font-size:18px;line-height:1}' +
    '@media (prefers-color-scheme:dark){#sis-inst{background:#26201c;color:#f2e9e2;border-color:#3d342e}#sis-inst .t span,#sis-inst .x{color:#b5a597}}' +
    '@media print{#sis-inst{display:none}}';

  function mostrar(titulo, texto, botao, acao) {
    if (document.getElementById('sis-inst') || fechouAntes()) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'sis-inst'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', titulo);
    d.innerHTML = '<img src="icon-192.png" alt=""><div class="t"><b></b><span></span></div>' +
      (botao ? '<button class="go" type="button"></button>' : '') + '<button class="x" type="button" aria-label="Fechar">×</button>';
    d.querySelector('b').textContent = titulo;
    d.querySelector('.t span').textContent = texto;
    if (botao) { var g = d.querySelector('.go'); g.textContent = botao; g.onclick = acao; }
    d.querySelector('.x').onclick = function () { marcarFechou(); d.remove(); };
    document.body.appendChild(d);
  }
  function esconder() { var d = document.getElementById('sis-inst'); if (d) d.remove(); }

  // Android, Chrome e Edge (celular e PC)
  var pedido = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); pedido = e;
    mostrar('Instalar o CAP-Refeições', 'Abre como aplicativo, com ícone próprio e câmera.', 'Instalar app', function () {
      if (!pedido) return;
      pedido.prompt();
      pedido.userChoice.then(function () { pedido = null; esconder(); }).catch(function () {});
    });
  });
  window.addEventListener('appinstalled', function () { esconder(); marcarFechou(); });

  // iPhone / iPad: o Safari não tem pedido de instalação — mostra o caminho
  var ua = navigator.userAgent || '';
  var ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (ios) {
    window.addEventListener('load', function () {
      mostrar('Instalar no iPhone', 'No Safari, toque em Compartilhar (□↑) e depois em "Adicionar à Tela de Início".', null, null);
    });
  }
})();
