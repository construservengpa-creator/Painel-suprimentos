/* Service worker: guarda a "casca" do app para abrir mesmo sem internet.
   Os dados continuam vindo do Supabase; registros feitos offline ficam na fila do app. */
const CACHE='refeicoes-shell-3.1.1';
const SHELL=['./', './index.html', './config.js', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png', './app-3.1.1.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>null)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  const isShell=u.origin===location.origin&&!u.pathname.includes('/rest/')&&!u.pathname.includes('/auth/');
  if(!isShell)return; // Supabase: sempre rede (bibliotecas e fontes agora vêm junto com o próprio site)
  // rede primeiro (para pegar a versão nova); se a rede falhar, responder com erro ou não responder em 4 s (internet fraca), usa a cópia guardada
  e.respondWith(caches.match(e.request).then(hit=>{
    if(hit&&/\/app-[0-9.]+\.js$/.test(u.pathname))return hit;   // o programa tem a versão no nome: a cópia guardada é sempre a certa
    const rede=fetch(e.request).then(res=>{
      if(res&&res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res}
      return hit||res;
    });
    if(!hit)return rede.catch(()=>Response.error());
    try{e.waitUntil(rede.catch(()=>null))}catch(x){}
    return Promise.race([rede.catch(()=>hit),new Promise(ok=>setTimeout(()=>ok(hit),4000))]);
  }));
});
