/* Capivara · desbloqueio por digital ou rosto (biometria do próprio aparelho, via WebAuthn).
 *
 * Fonte única. Este mesmo código vai embutido (entre os comentários
 * "capivara-biometria:inicio" e "capivara-biometria:fim") em todos os apps do Capivara:
 *   Painel-suprimentos: index.html, inicio.html, medicoes/ (arquivo medicoes/capivara-biometria.js,
 *                       porque a página de Refeições só aceita scripts em arquivo)
 *   almoxarifado:       index.html, aprovacoes/, contagem/, notificacoes/
 *   ControleNotasFiscais: index.html, validador/
 * Ao mudar este arquivo, copie o conteúdo para os outros lugares.
 *
 * Como funciona
 * - Todos os apps ficam no mesmo endereço (construservengpa-creator.github.io), então uma única
 *   ativação vale para todos eles no mesmo aparelho/navegador.
 * - Depois do login com senha, o app oferece "Ativar digital ou rosto". A chave fica no aparelho
 *   (leitor de digital, Face ID, Windows Hello...); nenhuma biometria sai do aparelho.
 * - Com a função ativada, ao abrir um app com a sessão já salva (ou voltar a ele depois de
 *   5 minutos em segundo plano) aparece uma tela de bloqueio que só sai com a digital/rosto.
 *   "Entrar com senha" encerra a sessão salva e volta para a tela de login normal do app.
 * - Navegar de um app para outro na mesma aba não pede de novo (vale por 5 minutos).
 * - É uma trava do aparelho: a senha continua sendo a forma de entrar; a biometria só
 *   substitui digitá-la de novo enquanto a sessão salva estiver válida.
 */
(function () {
  'use strict';
  if (window.CapivaraBiometria) return;

  var CHAVE = 'capivara-bio';           // localStorage: { id, email, criado }
  var CHAVE_RECUSA = 'capivara-bio-recusa'; // localStorage: data em que respondeu "Agora não"
  var CHAVE_OK = 'capivara-bio-ok';     // sessionStorage: último momento desbloqueado nesta aba
  var PRAZO = 5 * 60 * 1000;            // 5 min sem pedir de novo
  var REOFERTA = 30 * 24 * 3600 * 1000; // volta a oferecer 30 dias depois do "Agora não"

  var suportado = !!(window.PublicKeyCredential && navigator.credentials && window.isSecureContext &&
    (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'));

  function ler(st, k) { try { return st.getItem(k); } catch (e) { return null; } }
  function gravar(st, k, v) { try { if (v == null) st.removeItem(k); else st.setItem(k, v); } catch (e) {} }
  function config() { try { var c = JSON.parse(ler(localStorage, CHAVE) || 'null'); return c && c.id ? c : null; } catch (e) { return null; } }

  /* Sessões do Supabase salvas no navegador (cada app usa a sua chave). */
  function chavesSessao() {
    var r = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || !/auth/i.test(k)) continue;
        try {
          var v = JSON.parse(localStorage.getItem(k));
          var s = v && (v.currentSession || v);
          if (s && s.refresh_token) r.push({ chave: k, email: (s.user && s.user.email) || '' });
        } catch (e) {}
      }
    } catch (e) {}
    return r;
  }
  function logado() { return chavesSessao().length > 0; }

  function b64u(buf) {
    var b = new Uint8Array(buf), s = '';
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function deB64u(t) {
    t = t.replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '=';
    var s = atob(t), b = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  }
  function aleatorio(n) { var b = new Uint8Array(n); crypto.getRandomValues(b); return b; }

  function marcarOk() { gravar(sessionStorage, CHAVE_OK, String(Date.now())); }
  function okRecente() { var t = +ler(sessionStorage, CHAVE_OK) || 0; return Date.now() - t < PRAZO; }

  /* ---------- aparência ---------- */
  var CSS =
    '#cbio-trava{position:fixed;inset:0;z-index:2147483647;background:#0E131A;color:#E9EDF2;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased;}' +
    '#cbio-trava .cbio-caixa{width:100%;max-width:340px;text-align:center;}' +
    '#cbio-trava .cbio-ico{width:76px;height:76px;margin:0 auto 18px;border-radius:22px;display:grid;place-items:center;background:rgba(245,165,36,.14);color:#F5C433;}' +
    '#cbio-trava .cbio-ico svg{width:42px;height:42px;}' +
    '#cbio-trava h2{margin:0 0 6px;font-size:21px;font-weight:700;letter-spacing:-.01em;}' +
    '#cbio-trava p{margin:0 0 22px;font-size:14px;line-height:1.5;color:#B3BCC8;}' +
    '#cbio-trava .cbio-msg{min-height:20px;margin:-8px 0 14px;font-size:13px;color:#F08A5D;}' +
    '.cbio-btn{display:block;width:100%;border:0;border-radius:10px;padding:13px 16px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;}' +
    '.cbio-pri{background:#F5C433;color:#1B1408;}' +
    '.cbio-sec{margin-top:10px;background:transparent;color:#B3BCC8;border:1px solid rgba(255,255,255,.16);}' +
    '.cbio-btn:focus-visible{outline:2px solid #F5A524;outline-offset:2px;}' +
    '#cbio-oferta{position:fixed;left:50%;bottom:max(16px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483646;width:calc(100% - 32px);max-width:440px;background:#161C24;color:#E9EDF2;border:1px solid rgba(255,255,255,.12);border-left:3px solid #F5C433;border-radius:12px;box-shadow:0 18px 40px -12px rgba(0,0,0,.55);padding:14px 16px;font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:14px;line-height:1.45;}' +
    '#cbio-oferta b{display:block;font-size:15px;margin-bottom:2px;}' +
    '#cbio-oferta span{color:#B3BCC8;font-size:13px;}' +
    '#cbio-oferta .cbio-acoes{display:flex;gap:8px;margin-top:12px;}' +
    '#cbio-oferta .cbio-btn{width:auto;flex:1;padding:10px 12px;font-size:14px;}' +
    '#cbio-oferta .cbio-sec{margin-top:0;}';
  var ICONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 11c0 3.5-1 6.5-2.5 8.5"/><path d="M8.6 6.6A6 6 0 0 1 18 11c0 1.5-.1 3-.4 4.4"/><path d="M6 10a6 6 0 0 1 .7-2.8"/><path d="M6 13.5c0 1.8-.4 3.3-1.2 4.5"/><path d="M15 12c0 2.6-.4 5.1-1.3 7.2"/><path d="M9 11a3 3 0 0 1 6-.2"/><path d="M4.3 6.5A9.9 9.9 0 0 1 12 2c5.5 0 10 4.5 10 10 0 .9 0 1.8-.1 2.7"/></svg>';

  function estilo() {
    if (document.getElementById('cbio-css')) return;
    var s = document.createElement('style'); s.id = 'cbio-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ---------- tela de bloqueio ---------- */
  var trava = null, pedindo = false;

  function travar() {
    if (trava || !config() || !logado()) return;
    estilo();
    trava = document.createElement('div');
    trava.id = 'cbio-trava';
    trava.setAttribute('role', 'dialog'); trava.setAttribute('aria-modal', 'true'); trava.setAttribute('aria-labelledby', 'cbio-tit');
    trava.innerHTML = '<div class="cbio-caixa"><div class="cbio-ico">' + ICONE + '</div>' +
      '<h2 id="cbio-tit">Capivara bloqueado</h2>' +
      '<p>Use a digital ou o reconhecimento de rosto do aparelho para continuar.</p>' +
      '<div class="cbio-msg" aria-live="polite"></div>' +
      '<button type="button" class="cbio-btn cbio-pri">Desbloquear</button>' +
      '<button type="button" class="cbio-btn cbio-sec">Entrar com senha</button></div>';
    trava.querySelector('.cbio-pri').addEventListener('click', function () { desbloquear(); });
    trava.querySelector('.cbio-sec').addEventListener('click', entrarComSenha);
    document.documentElement.appendChild(trava);
    try { document.documentElement.style.overflow = 'hidden'; } catch (e) {}
    // tenta abrir o leitor direto; alguns navegadores (iPhone) exigem o toque no botão
    setTimeout(function () { if (document.visibilityState === 'visible') desbloquear(true); }, 250);
  }

  function soltar() {
    if (trava) { trava.remove(); trava = null; }
    try { document.documentElement.style.overflow = ''; } catch (e) {}
    marcarOk();
  }

  function mensagem(t) { if (trava) trava.querySelector('.cbio-msg').textContent = t || ''; }

  function verificar() {
    var c = config();
    if (!c) return Promise.reject(new Error('sem-config'));
    return navigator.credentials.get({ publicKey: {
      challenge: aleatorio(32),
      allowCredentials: [{ type: 'public-key', id: deB64u(c.id), transports: ['internal', 'hybrid'] }],
      userVerification: 'required',
      timeout: 60000
    } }).then(function (cred) {
      if (!cred || b64u(cred.rawId) !== c.id) throw new Error('chave-diferente');
      var dados = new Uint8Array(cred.response.authenticatorData);
      if (!(dados[32] & 0x04)) throw new Error('sem-verificacao'); // bit UV: digital/rosto/PIN conferido
      return true;
    });
  }

  function desbloquear(automatico) {
    if (pedindo) return;
    pedindo = true; mensagem('');
    verificar().then(function () { pedindo = false; soltar(); })
      .catch(function (e) {
        pedindo = false;
        if (automatico) return; // sem toque do usuário o navegador pode recusar: espera o botão
        var n = e && e.name;
        mensagem(n === 'NotAllowedError' ? 'Não confirmado. Toque em Desbloquear para tentar de novo.'
          : n === 'InvalidStateError' || n === 'SecurityError' ? 'A chave deste aparelho não foi encontrada. Entre com a senha.'
          : 'Não foi possível confirmar. Tente de novo ou entre com a senha.');
      });
  }

  function entrarComSenha() {
    chavesSessao().forEach(function (s) { gravar(localStorage, s.chave, null); });
    gravar(sessionStorage, CHAVE_OK, null);
    location.reload();
  }

  /* ---------- ativar / desativar ---------- */
  function ativar() {
    if (!suportado) return Promise.reject(new Error('nao-suportado'));
    var s = chavesSessao()[0];
    var email = (s && s.email) || 'usuario';
    return navigator.credentials.create({ publicKey: {
      challenge: aleatorio(32),
      rp: { name: 'Capivara' },
      user: { id: aleatorio(16), name: email, displayName: email },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'discouraged' },
      attestation: 'none',
      timeout: 60000
    } }).then(function (cred) {
      gravar(localStorage, CHAVE, JSON.stringify({ id: b64u(cred.rawId), email: email, criado: new Date().toISOString() }));
      gravar(localStorage, CHAVE_RECUSA, null);
      marcarOk(); avisar();
      return true;
    });
  }

  /* Desligar com a sessão aberta exige a digital/rosto (senão bastaria desligar para passar a trava). */
  function desativar() {
    var fim = function () { gravar(localStorage, CHAVE, null); avisar(); return true; };
    if (!config()) return Promise.resolve(true);
    if (!logado()) return Promise.resolve(fim());
    return verificar().then(fim);
  }

  function avisar() { try { window.dispatchEvent(new CustomEvent('capivara-biometria', { detail: { ativo: !!config() } })); } catch (e) {} }

  /* ---------- oferta depois do login ---------- */
  var oferta = null;
  function oferecer() {
    if (oferta || trava || config() || !logado()) return;
    var recusa = +ler(localStorage, CHAVE_RECUSA) || 0;
    if (Date.now() - recusa < REOFERTA) return;
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(function (tem) {
      if (!tem || oferta || trava || config() || !logado() || !document.body) return;
      estilo();
      oferta = document.createElement('div');
      oferta.id = 'cbio-oferta'; oferta.setAttribute('role', 'dialog'); oferta.setAttribute('aria-label', 'Entrar com digital ou rosto');
      oferta.innerHTML = '<b>Entrar com digital ou rosto?</b>' +
        '<span>Neste aparelho, os apps do Capivara passam a pedir sua digital ou reconhecimento facial ao abrir.</span>' +
        '<div class="cbio-acoes"><button type="button" class="cbio-btn cbio-sec">Agora não</button>' +
        '<button type="button" class="cbio-btn cbio-pri">Ativar</button></div>';
      oferta.querySelector('.cbio-sec').addEventListener('click', function () {
        gravar(localStorage, CHAVE_RECUSA, String(Date.now())); fecharOferta();
      });
      oferta.querySelector('.cbio-pri').addEventListener('click', function () {
        var b = this; b.disabled = true; b.textContent = 'Aguarde…';
        ativar().then(fecharOferta).catch(function () { b.disabled = false; b.textContent = 'Tentar de novo'; });
      });
      document.body.appendChild(oferta);
    }).catch(function () {});
  }
  function fecharOferta() { if (oferta) { oferta.remove(); oferta = null; } }

  window.CapivaraBiometria = {
    suportado: suportado,
    ativo: function () { return !!config(); },
    ativar: ativar,
    desativar: desativar,
    bloquear: function () { gravar(sessionStorage, CHAVE_OK, null); travar(); },
    disponivel: function () { return suportado ? PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(function () { return false; }) : Promise.resolve(false); }
  };
  if (!suportado) return;

  /* ---------- ciclo ---------- */
  var tinhaSessao = logado();
  if (tinhaSessao && config() && !okRecente()) travar();
  else if (tinhaSessao) marcarOk();

  var escondidoEm = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      if (!trava) marcarOk();
      escondidoEm = Date.now();
    } else if (escondidoEm && Date.now() - escondidoEm >= PRAZO) {
      travar();
    }
  });
  window.addEventListener('pagehide', function () { if (!trava) marcarOk(); });

  setInterval(function () {
    var agora = logado();
    if (agora && !tinhaSessao) marcarOk();   // acabou de entrar com senha nesta aba
    if (!agora) { fecharOferta(); if (trava) soltar(); }
    tinhaSessao = agora;
    if (!trava && agora && document.visibilityState === 'visible') marcarOk();
    oferecer();
  }, 2000);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(oferecer, 1500); });
  else setTimeout(oferecer, 1500);
})();
