/* Capivara · entrar e desbloquear com digital ou rosto (biometria do próprio aparelho, via WebAuthn).
 *
 * Fonte única. Este mesmo código vai embutido (entre os comentários
 * "capivara-biometria:inicio" e "capivara-biometria:fim") em todos os apps do Capivara:
 *   Painel-suprimentos: index.html, inicio.html, medicoes/ (arquivo medicoes/capivara-biometria.js,
 *                       porque a página de Refeições só aceita scripts em arquivo)
 *   almoxarifado:       index.html, aprovacoes/, contagem/, notificacoes/
 *   ControleNotasFiscais: index.html, validador/
 * Ao mudar este arquivo, copie o conteúdo para os outros lugares.
 *
 * A tag <script> de cada app informa:
 *   data-sessao  chave onde o supabase-js do app guarda a sessão (ex.: sb-<ref>-auth-token)
 *   data-projeto endereço do projeto Supabase do app (https://<ref>.supabase.co)
 *   data-apikey  chave pública (anon/publishable) do projeto — a mesma que já está na página
 * Sem esses atributos (página inicial), o script só serve para ativar/desativar.
 *
 * Como funciona
 * - Os apps ficam no mesmo endereço (construservengpa-creator.github.io): uma ativação vale para todos.
 * - Ativar cria uma chave no leitor do aparelho (digital, Face ID, Windows Hello...) e um par de chaves
 *   de cifra. A parte que decifra só é liberada pela digital/rosto (extensão PRF do WebAuthn; em
 *   aparelhos sem PRF, fica guardada como chave não exportável do navegador).
 * - Cada login com email e senha feito num app é guardado CIFRADO neste aparelho (cofre).
 * - App com sessão salva: ao abrir (ou voltar após 5 min) pede a digital/rosto para desbloquear.
 * - App sem sessão (saiu, sessão venceu, primeiro uso): pede a digital/rosto e entra sozinho com o
 *   email e senha do cofre — sem digitar nada. Se o app nunca teve login neste aparelho, tenta o
 *   email/senha usados nos outros apps do Capivara (quando a senha é a mesma, entra direto).
 * - "Usar email e senha" sempre volta para o login normal do app.
 * - Desativar apaga a chave e o cofre deste aparelho.
 */
(function () {
  'use strict';
  if (window.CapivaraBiometria) return;
  var eu = document.currentScript;
  function atrib(n) { return ((eu && eu.getAttribute(n)) || '').trim(); }
  var SESSOES = atrib('data-sessao').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  var PROJETO = atrib('data-projeto').replace(/\/+$/, '');
  var APIKEY = atrib('data-apikey');

  var CHAVE = 'capivara-bio';               // localStorage: configuração (id da chave, chave pública...)
  var CHAVE_COFRE = 'capivara-bio-cofre';   // localStorage: { projeto: { email, quando, dados cifrados } }
  var CHAVE_RECUSA = 'capivara-bio-recusa'; // localStorage: data do "Agora não"
  var CHAVE_OK = 'capivara-bio-ok';         // sessionStorage: último momento desbloqueado nesta aba
  var CHAVE_PULAR = 'capivara-bio-pular';   // sessionStorage: escolheu "Usar email e senha" nesta aba
  var PRAZO = 5 * 60 * 1000;
  var REOFERTA = 30 * 24 * 3600 * 1000;

  var suportado = !!(window.PublicKeyCredential && navigator.credentials && window.isSecureContext &&
    window.crypto && crypto.subtle &&
    (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1'));
  var SUB = suportado ? crypto.subtle : null;
  var SAL = new TextEncoder().encode('capivara-cofre-v1/prf');

  function ler(st, k) { try { return st.getItem(k); } catch (e) { return null; } }
  function gravar(st, k, v) { try { if (v == null) st.removeItem(k); else st.setItem(k, v); } catch (e) {} }
  function lerJson(st, k) { try { return JSON.parse(ler(st, k) || 'null'); } catch (e) { return null; } }
  function config() { var c = lerJson(localStorage, CHAVE); return c && c.id ? c : null; }
  function completo(c) { return !!(c && c.pub); }       // versão com cofre (entra sem senha)
  function cofre() { return lerJson(localStorage, CHAVE_COFRE) || {}; }

  /* Sessões do Supabase salvas no navegador. Sem "todas", só as deste app (data-sessao). */
  function chavesSessao(todas) {
    var r = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (!k || (todas ? !/auth/i.test(k) : SESSOES.indexOf(k) < 0)) continue;
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
  function pulado() { return ler(sessionStorage, CHAVE_PULAR) === PROJETO; }

  /* ---------- cifra ---------- */
  var RSA = { name: 'RSA-OAEP', hash: 'SHA-256' };
  function chaveDoPrf(saida) {
    return SUB.importKey('raw', saida, 'HKDF', false, ['deriveKey']).then(function (base) {
      return SUB.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(0), info: new TextEncoder().encode('capivara-cofre') },
        base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    });
  }
  function cifrar(pubB64, obj) {
    var aes, iv = aleatorio(12), ct;
    return SUB.importKey('spki', deB64u(pubB64), RSA, false, ['encrypt']).then(function (pub) {
      return SUB.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']).then(function (k) {
        aes = k;
        return SUB.encrypt({ name: 'AES-GCM', iv: iv }, aes, new TextEncoder().encode(JSON.stringify(obj)));
      }).then(function (c) { ct = c; return SUB.exportKey('raw', aes); })
        .then(function (raw) { return SUB.encrypt(RSA, pub, raw); });
    }).then(function (k) { return { k: b64u(k), iv: b64u(iv), ct: b64u(ct) }; });
  }
  function decifrar(priv, d) {
    return SUB.decrypt(RSA, priv, deB64u(d.k)).then(function (raw) {
      return SUB.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
    }).then(function (aes) {
      return SUB.decrypt({ name: 'AES-GCM', iv: deB64u(d.iv) }, aes, deB64u(d.ct));
    }).then(function (pt) { return JSON.parse(new TextDecoder().decode(pt)); });
  }

  /* Chave privada sem PRF: guardada no IndexedDB como chave não exportável. */
  function idb(modo, fn) {
    return new Promise(function (ok, erro) {
      var req = indexedDB.open('capivara-bio', 1);
      req.onupgradeneeded = function () { req.result.createObjectStore('chaves'); };
      req.onerror = function () { erro(req.error); };
      req.onsuccess = function () {
        var db = req.result, tx = db.transaction('chaves', modo), r = fn(tx.objectStore('chaves'));
        tx.oncomplete = function () { db.close(); ok(r && r.result); };
        tx.onerror = function () { db.close(); erro(tx.error); };
      };
    });
  }

  /* ---------- guarda o email/senha de cada login feito com senha ---------- */
  var pendente = null;
  var fetchOrig = window.fetch;
  if (suportado && PROJETO && fetchOrig) {
    window.fetch = function (entrada, init) {
      var p = fetchOrig.apply(this, arguments);
      try {
        var u = typeof entrada === 'string' ? entrada : (entrada && entrada.url) || String(entrada);
        if (u.indexOf(PROJETO + '/auth/v1/token') === 0 && /grant_type=password/.test(u) && init && typeof init.body === 'string') {
          var corpo = JSON.parse(init.body);
          if (corpo && corpo.password) {
            p.then(function (r) {
              if (!r || !r.ok) return;
              pendente = { projeto: PROJETO, corpo: { email: corpo.email, phone: corpo.phone, password: corpo.password } };
              guardar(pendente).catch(function () {});
            }).catch(function () {});
          }
        }
      } catch (e) {}
      return p;
    };
  }
  function guardar(p) {
    var c = config();
    if (!completo(c) || !p) return Promise.resolve(false);
    return cifrar(c.pub, p.corpo).then(function (dados) {
      var cf = cofre();
      cf[p.projeto] = { email: p.corpo.email || p.corpo.phone || '', quando: new Date().toISOString(), dados: dados };
      gravar(localStorage, CHAVE_COFRE, JSON.stringify(cf));
      return true;
    });
  }

  /* ---------- aparência ---------- */
  var CSS =
    '#cbio-trava{position:fixed;inset:0;z-index:2147483647;background:#0E131A;color:#E9EDF2;display:flex;align-items:center;justify-content:center;padding:24px;font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;-webkit-font-smoothing:antialiased;}' +
    '#cbio-trava .cbio-caixa{width:100%;max-width:340px;text-align:center;}' +
    '#cbio-trava .cbio-ico{width:76px;height:76px;margin:0 auto 18px;border-radius:22px;display:grid;place-items:center;background:rgba(245,165,36,.14);color:#F5C433;}' +
    '#cbio-trava .cbio-ico svg{width:42px;height:42px;}' +
    '#cbio-trava h2{margin:0 0 6px;font-size:21px;font-weight:700;letter-spacing:-.01em;}' +
    '#cbio-trava p{margin:0 0 22px;font-size:14px;line-height:1.5;color:#B3BCC8;overflow-wrap:anywhere;}' +
    '#cbio-trava p b{color:#E9EDF2;font-weight:600;}' +
    '#cbio-trava .cbio-msg{min-height:20px;margin:-8px 0 14px;font-size:13px;color:#F08A5D;}' +
    '.cbio-btn{display:block;width:100%;border:0;border-radius:10px;padding:13px 16px;font:inherit;font-size:15px;font-weight:600;cursor:pointer;}' +
    '.cbio-btn:disabled{opacity:.6;cursor:default;}' +
    '.cbio-pri{background:#F5C433;color:#1B1408;}' +
    '.cbio-sec{margin-top:10px;background:transparent;color:#B3BCC8;border:1px solid rgba(255,255,255,.16);}' +
    '.cbio-btn:focus-visible,#cbio-pilula:focus-visible{outline:2px solid #F5A524;outline-offset:2px;}' +
    '#cbio-oferta{position:fixed;left:50%;bottom:max(16px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483646;width:calc(100% - 32px);max-width:440px;background:#161C24;color:#E9EDF2;border:1px solid rgba(255,255,255,.12);border-left:3px solid #F5C433;border-radius:12px;box-shadow:0 18px 40px -12px rgba(0,0,0,.55);padding:14px 16px;font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:14px;line-height:1.45;}' +
    '#cbio-oferta b{display:block;font-size:15px;margin-bottom:2px;}' +
    '#cbio-oferta span{color:#B3BCC8;font-size:13px;}' +
    '#cbio-oferta .cbio-acoes{display:flex;gap:8px;margin-top:12px;}' +
    '#cbio-oferta .cbio-btn{width:auto;flex:1;padding:10px 12px;font-size:14px;}' +
    '#cbio-oferta .cbio-sec{margin-top:0;}' +
    '#cbio-pilula{position:fixed;left:50%;bottom:max(16px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483646;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:11px 18px 11px 14px;background:#F5C433;color:#1B1408;font-family:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:14.5px;font-weight:600;cursor:pointer;box-shadow:0 12px 28px -10px rgba(0,0,0,.5);}' +
    '#cbio-pilula svg{width:20px;height:20px;}';
  var ICONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 11c0 3.5-1 6.5-2.5 8.5"/><path d="M8.6 6.6A6 6 0 0 1 18 11c0 1.5-.1 3-.4 4.4"/><path d="M6 10a6 6 0 0 1 .7-2.8"/><path d="M6 13.5c0 1.8-.4 3.3-1.2 4.5"/><path d="M15 12c0 2.6-.4 5.1-1.3 7.2"/><path d="M9 11a3 3 0 0 1 6-.2"/><path d="M4.3 6.5A9.9 9.9 0 0 1 12 2c5.5 0 10 4.5 10 10 0 .9 0 1.8-.1 2.7"/></svg>';

  function estilo() {
    if (document.getElementById('cbio-css')) return;
    var s = document.createElement('style'); s.id = 'cbio-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- tela: "trava" (tem sessão) ou "entrar" (sem sessão, entra com o cofre) ---------- */
  var trava = null, modo = '', pedindo = false;

  function emailDoCofre() {
    var cf = cofre(), e = cf[PROJETO];
    if (e) return e.email;
    for (var k in cf) if (cf[k] && cf[k].email) return cf[k].email;
    return '';
  }
  function podeEntrar() {
    return !!(suportado && PROJETO && APIKEY && SESSOES.length && completo(config()) && Object.keys(cofre()).length);
  }

  function abrir(m, automatico) {
    if (trava) return;
    if (m === 'trava' && (!config() || !logado())) return;
    if (m === 'entrar' && (logado() || !podeEntrar())) return;
    estilo(); fecharPilula(); fecharOferta();
    modo = m;
    var email = m === 'entrar' ? emailDoCofre() : '';
    trava = document.createElement('div');
    trava.id = 'cbio-trava';
    trava.setAttribute('role', 'dialog'); trava.setAttribute('aria-modal', 'true'); trava.setAttribute('aria-labelledby', 'cbio-tit');
    trava.innerHTML = '<div class="cbio-caixa"><div class="cbio-ico">' + ICONE + '</div>' +
      (m === 'trava'
        ? '<h2 id="cbio-tit">Capivara bloqueado</h2><p>Use a digital ou o reconhecimento de rosto do aparelho para continuar.</p>'
        : '<h2 id="cbio-tit">Entrar no Capivara</h2><p>Use a digital ou o rosto para entrar' + (email ? ' como <b>' + esc(email) + '</b>' : '') + '.</p>') +
      '<div class="cbio-msg" aria-live="polite"></div>' +
      '<button type="button" class="cbio-btn cbio-pri">' + (m === 'trava' ? 'Desbloquear' : 'Entrar com digital ou rosto') + '</button>' +
      '<button type="button" class="cbio-btn cbio-sec">Usar email e senha</button></div>';
    trava.querySelector('.cbio-pri').addEventListener('click', function () { confirmar(false); });
    trava.querySelector('.cbio-sec').addEventListener('click', usarSenha);
    document.documentElement.appendChild(trava);
    try { document.documentElement.style.overflow = 'hidden'; } catch (e) {}
    if (automatico) {
      // tenta abrir o leitor direto; alguns navegadores (iPhone) exigem o toque no botão
      setTimeout(function () { if (document.visibilityState === 'visible') confirmar(true); }, 250);
    } else {
      confirmar(false);
    }
  }

  function fechar() {
    if (trava) { trava.remove(); trava = null; }
    modo = '';
    try { document.documentElement.style.overflow = ''; } catch (e) {}
  }
  function soltar() { fechar(); marcarOk(); }
  function mensagem(t) { if (trava) trava.querySelector('.cbio-msg').textContent = t || ''; }
  function ocupado(sim) {
    if (!trava) return;
    var b = trava.querySelector('.cbio-pri');
    b.disabled = sim;
    b.textContent = sim ? 'Entrando…' : (modo === 'trava' ? 'Desbloquear' : 'Entrar com digital ou rosto');
  }

  /* Pede a digital/rosto. Devolve a saída PRF (quando houver) para abrir o cofre. */
  function verificar() {
    var c = config();
    if (!c) return Promise.reject(new Error('sem-config'));
    var pk = {
      challenge: aleatorio(32),
      allowCredentials: [{ type: 'public-key', id: deB64u(c.id), transports: ['internal', 'hybrid'] }],
      userVerification: 'required',
      timeout: 60000
    };
    if (c.prf) pk.extensions = { prf: { eval: { first: SAL } } };
    return navigator.credentials.get({ publicKey: pk }).then(function (cred) {
      if (!cred || b64u(cred.rawId) !== c.id) throw new Error('chave-diferente');
      var dados = new Uint8Array(cred.response.authenticatorData);
      if (!(dados[32] & 0x04)) throw new Error('sem-verificacao'); // bit UV: digital/rosto/PIN conferido
      var ext = cred.getClientExtensionResults ? cred.getClientExtensionResults() : {};
      return { prf: ext && ext.prf && ext.prf.results ? ext.prf.results.first : null };
    });
  }

  function chavePrivada(res) {
    var c = config();
    if (c.prf) {
      if (!res.prf) return Promise.reject(new Error('sem-prf'));
      return chaveDoPrf(res.prf).then(function (k) {
        return SUB.decrypt({ name: 'AES-GCM', iv: deB64u(c.priv.iv) }, k, deB64u(c.priv.ct));
      }).then(function (pkcs8) { return SUB.importKey('pkcs8', pkcs8, RSA, false, ['decrypt']); });
    }
    return idb('readonly', function (st) { return st.get('priv'); }).then(function (k) {
      if (!k) throw new Error('sem-chave');
      return k;
    });
  }

  function entrarComCofre(res) {
    return chavePrivada(res).then(function (priv) {
      var cf = cofre(), ordem = [];
      if (cf[PROJETO]) ordem.push(PROJETO);
      Object.keys(cf).sort(function (a, b) { return (cf[b].quando || '') < (cf[a].quando || '') ? -1 : 1; })
        .forEach(function (k) { if (k !== PROJETO) ordem.push(k); });
      var tentados = {}, semRede = false;
      function proximo(i) {
        if (i >= ordem.length) throw new Error(semRede ? 'sem-rede' : 'senha-recusada');
        var proj = ordem[i];
        return decifrar(priv, cf[proj].dados).then(function (corpo) {
          var marca = (corpo.email || corpo.phone) + '\n' + corpo.password;
          if (tentados[marca]) return proximo(i + 1);
          tentados[marca] = true;
          return (fetchOrig || fetch).call(window, PROJETO + '/auth/v1/token?grant_type=password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', apikey: APIKEY, Authorization: 'Bearer ' + APIKEY },
            body: JSON.stringify(corpo)
          }).then(function (r) {
            if (r.ok) return r.json().then(function (s) { return { sessao: s, corpo: corpo, proj: proj }; });
            if (proj === PROJETO && (r.status === 400 || r.status === 401)) {
              var atual = cofre(); delete atual[PROJETO]; gravar(localStorage, CHAVE_COFRE, JSON.stringify(atual));
            }
            return proximo(i + 1);
          }, function () { semRede = true; return proximo(i + 1); });
        }, function () { return proximo(i + 1); });
      }
      return proximo(0);
    }).then(function (ok) {
      var s = ok.sessao;
      if (!s || !s.access_token || !s.refresh_token) throw new Error('resposta-invalida');
      if (!s.expires_at && s.expires_in) s.expires_at = Math.floor(Date.now() / 1000) + s.expires_in;
      gravar(localStorage, SESSOES[0], JSON.stringify(s));
      // senha de outro app serviu aqui: passa a valer também para este app
      if (ok.proj !== PROJETO) guardar({ projeto: PROJETO, corpo: ok.corpo }).catch(function () {});
      gravar(sessionStorage, CHAVE_PULAR, null);
      marcarOk();
      location.reload();
      return new Promise(function () {}); // a página vai recarregar
    });
  }

  function confirmar(automatico) {
    if (pedindo || !trava) return;
    pedindo = true; mensagem('');
    var m = modo;
    verificar().then(function (res) {
      if (m === 'trava') { pedindo = false; soltar(); return; }
      ocupado(true);
      return entrarComCofre(res);
    }).catch(function (e) {
      pedindo = false; ocupado(false);
      var n = (e && (e.name === 'Error' ? e.message : e.name)) || '';
      if (automatico && (n === 'NotAllowedError' || n === 'AbortError')) return; // espera o toque no botão
      mensagem(n === 'NotAllowedError' || n === 'AbortError' ? 'Não confirmado. Toque no botão para tentar de novo.'
        : n === 'InvalidStateError' || n === 'SecurityError' || n === 'sem-chave' ? 'A chave deste aparelho não foi encontrada. Entre com email e senha.'
        : n === 'senha-recusada' ? 'A senha guardada não foi aceita (pode ter mudado). Entre com email e senha uma vez; depois a digital volta a funcionar.'
        : n === 'sem-rede' ? 'Sem conexão com o servidor. Verifique a internet e tente de novo.'
        : 'Não foi possível confirmar. Tente de novo ou entre com email e senha.');
    });
  }

  function usarSenha() {
    if (modo === 'trava') {
      chavesSessao().forEach(function (s) { gravar(localStorage, s.chave, null); });
      gravar(sessionStorage, CHAVE_OK, null);
      gravar(sessionStorage, CHAVE_PULAR, PROJETO);
      location.reload();
      return;
    }
    gravar(sessionStorage, CHAVE_PULAR, PROJETO);
    fechar();
  }

  /* Botão flutuante na tela de login do app (depois de "Usar email e senha" ou de sair). */
  var pilula = null;
  function mostrarPilula() {
    if (pilula || trava || oferta || !document.body || logado() || !podeEntrar()) return;
    estilo();
    pilula = document.createElement('button');
    pilula.type = 'button'; pilula.id = 'cbio-pilula';
    pilula.innerHTML = ICONE + '<span>Entrar com digital ou rosto</span>';
    pilula.addEventListener('click', function () { gravar(sessionStorage, CHAVE_PULAR, null); abrir('entrar', false); });
    document.body.appendChild(pilula);
  }
  function fecharPilula() { if (pilula) { pilula.remove(); pilula = null; } }

  /* ---------- ativar / desativar ---------- */
  function ativar() {
    if (!suportado) return Promise.reject(new Error('nao-suportado'));
    var s = chavesSessao()[0] || chavesSessao(true)[0];
    var email = (s && s.email) || (pendente && pendente.corpo.email) || 'usuario';
    var cred, prfSaida = null, prfOk = false;
    return navigator.credentials.create({ publicKey: {
      challenge: aleatorio(32),
      rp: { name: 'Capivara' },
      user: { id: aleatorio(16), name: email, displayName: email },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'discouraged' },
      attestation: 'none',
      timeout: 60000,
      extensions: { prf: { eval: { first: SAL } } }
    } }).then(function (c) {
      cred = c;
      var ext = (c.getClientExtensionResults && c.getClientExtensionResults()) || {};
      prfOk = !!(ext.prf && ext.prf.enabled);
      if (ext.prf && ext.prf.results && ext.prf.results.first) { prfSaida = ext.prf.results.first; prfOk = true; return; }
      if (!prfOk) return;
      // alguns aparelhos só entregam a chave do cofre num segundo toque
      return navigator.credentials.get({ publicKey: {
        challenge: aleatorio(32),
        allowCredentials: [{ type: 'public-key', id: cred.rawId, transports: ['internal'] }],
        userVerification: 'required', timeout: 60000,
        extensions: { prf: { eval: { first: SAL } } }
      } }).then(function (a) {
        var e2 = (a.getClientExtensionResults && a.getClientExtensionResults()) || {};
        if (e2.prf && e2.prf.results && e2.prf.results.first) prfSaida = e2.prf.results.first; else prfOk = false;
      }, function () { prfOk = false; });
    }).then(function () {
      return SUB.generateKey({ name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
        prfOk, ['encrypt', 'decrypt']);
    }).then(function (par) {
      var nova = { v: 2, id: b64u(cred.rawId), email: email, criado: new Date().toISOString(), prf: prfOk };
      return SUB.exportKey('spki', par.publicKey).then(function (spki) {
        nova.pub = b64u(spki);
        if (prfOk) {
          var iv = aleatorio(12);
          return SUB.exportKey('pkcs8', par.privateKey).then(function (pk) {
            return chaveDoPrf(prfSaida).then(function (k) { return SUB.encrypt({ name: 'AES-GCM', iv: iv }, k, pk); });
          }).then(function (ct) {
            nova.priv = { iv: b64u(iv), ct: b64u(ct) };
            return idb('readwrite', function (st) { return st.delete('priv'); }).catch(function () {});
          });
        }
        return idb('readwrite', function (st) { return st.put(par.privateKey, 'priv'); });
      }).then(function () {
        gravar(localStorage, CHAVE, JSON.stringify(nova));
        gravar(localStorage, CHAVE_COFRE, null);   // o cofre antigo era de outra chave
        gravar(localStorage, CHAVE_RECUSA, null);
        marcarOk();
        return guardar(pendente).catch(function () {});
      });
    }).then(function () { avisar(); return true; });
  }

  /* Desligar com sessão aberta exige a digital/rosto (senão bastaria desligar para passar a trava). */
  function desativar() {
    var fim = function () {
      gravar(localStorage, CHAVE, null); gravar(localStorage, CHAVE_COFRE, null);
      return idb('readwrite', function (st) { return st.delete('priv'); }).catch(function () {})
        .then(function () { fecharPilula(); avisar(); return true; });
    };
    if (!config()) return Promise.resolve(true);
    if (!chavesSessao(true).length) return fim();
    return verificar().then(fim);
  }

  function avisar() { try { window.dispatchEvent(new CustomEvent('capivara-biometria', { detail: { ativo: !!config() } })); } catch (e) {} }

  /* ---------- oferta depois do login ---------- */
  var oferta = null;
  function oferecer() {
    if (oferta || trava || completo(config()) || !logado()) return;
    var recusa = +ler(localStorage, CHAVE_RECUSA) || 0;
    if (Date.now() - recusa < REOFERTA) return;
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(function (tem) {
      if (!tem || oferta || trava || completo(config()) || !logado() || !document.body) return;
      estilo();
      oferta = document.createElement('div');
      oferta.id = 'cbio-oferta'; oferta.setAttribute('role', 'dialog'); oferta.setAttribute('aria-label', 'Entrar com digital ou rosto');
      oferta.innerHTML = '<b>Entrar com digital ou rosto?</b>' +
        '<span>Neste aparelho, os apps do Capivara passam a entrar com sua digital ou reconhecimento facial, sem digitar email e senha.</span>' +
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
    entraSemSenha: function () { return completo(config()); },
    ativar: ativar,
    desativar: desativar,
    bloquear: function () { gravar(sessionStorage, CHAVE_OK, null); abrir('trava', true); },
    entrar: function () { gravar(sessionStorage, CHAVE_PULAR, null); abrir('entrar', false); },
    disponivel: function () { return suportado ? PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().catch(function () { return false; }) : Promise.resolve(false); }
  };
  if (!suportado) return;

  /* ---------- ciclo ---------- */
  var tinhaSessao = logado();
  if (tinhaSessao && config() && !okRecente()) abrir('trava', true);
  else if (tinhaSessao) marcarOk();
  else if (podeEntrar() && !pulado()) abrir('entrar', true);

  var escondidoEm = 0;
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      if (!trava) marcarOk();
      escondidoEm = Date.now();
    } else if (escondidoEm && Date.now() - escondidoEm >= PRAZO) {
      abrir('trava', true);
    }
  });
  window.addEventListener('pagehide', function () { if (!trava) marcarOk(); });

  setInterval(function () {
    var agora = logado();
    if (agora && !tinhaSessao) { marcarOk(); gravar(sessionStorage, CHAVE_PULAR, null); } // acabou de entrar nesta aba
    if (agora) fecharPilula();
    else { fecharOferta(); if (modo === 'trava') fechar(); }
    if (agora && modo === 'entrar') fechar();
    tinhaSessao = agora;
    if (!trava && agora && document.visibilityState === 'visible') marcarOk();
    oferecer();
    mostrarPilula();
  }, 1500);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(oferecer, 1500); });
  else setTimeout(oferecer, 1500);
})();
