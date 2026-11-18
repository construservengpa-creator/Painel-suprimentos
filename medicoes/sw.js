/* Service worker: guarda a "casca" do app para abrir mesmo sem internet.
   Os dados continuam vindo do Supabase; registros feitos offline ficam na fila do app. */
const CACHE='refeicoes-shell-3.3.0';
const SHELL=['./', './index.html', './config.js?v=painel-1', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './app-3.3.0.js', './lib-jsqr-1.4.0.js', './lib-jspdf-2.5.1.js', './lib-fflate-0.8.2.js', './instalar.js', './janela-app.js', './capivara-biometria.js?v=6', './fontes/barlow-semi-condensed-500.woff2', './fontes/barlow-semi-condensed-600.woff2', './fontes/barlow-semi-condensed-700.woff2', './fontes/ibm-plex-mono-400.woff2', './fontes/ibm-plex-mono-500.woff2', './fontes/ibm-plex-sans-200.woff2', './fontes/ibm-plex-sans-400.woff2', './fontes/ibm-plex-sans-500.woff2', './fontes/ibm-plex-sans-600.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>null)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  const isShell=u.origin===location.origin&&!u.pathname.includes('/rest/')&&!u.pathname.includes('/auth/');
  if(!isShell)return; // Supabase: sempre rede (bibliotecas e fontes agora vêm junto com o próprio site)
  // rede primeiro (para pegar a versão nova); se a rede falhar, responder com erro ou não responder em 4 s (internet fraca), usa a cópia guardada
  e.respondWith(caches.match(e.request).then(hit=>{
    if(hit&&/\/(app|lib)-[\w.-]+\.js$|\/fontes\/[\w.-]+\.woff2$/.test(u.pathname))return hit;   // programa e bibliotecas têm a versão no nome e as fontes não mudam: a cópia guardada é sempre a certa
    const rede=fetch(e.request).then(res=>{
      if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res}
      return hit||res;
    });
    if(!hit)return rede.catch(()=>Response.error());
    try{e.waitUntil(rede.catch(()=>null))}catch(x){}
    return Promise.race([rede.catch(()=>hit),new Promise(ok=>setTimeout(()=>ok(hit),4000))]);
  }));
});
