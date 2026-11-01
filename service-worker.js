/* Shell-only cache. Live map tiles and directions require internet. */
const CACHE='rihla-v3';const APP=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(r).then(c=>c||fetch(r)));});
