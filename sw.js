const CACHE="kusayakyu-ai-v46";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(u.pathname.endsWith("/viewer.html")){e.respondWith(fetch(e.request,{cache:"no-store"}));return}
  if(e.request.mode==="navigate"){e.respondWith(fetch(e.request,{cache:"no-store"}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});