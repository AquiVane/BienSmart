// Service worker mínimo de la app: guarda la cáscara para abrir rápido y sin conexión.
// El contenido del reto y el progreso SIEMPRE se piden al servidor (otro dominio): nunca se cachean acá.
var V = 'bs-v2';
var SHELL = ['/descargas/habitos/', '/assets/biensmart.js'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(V).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname !== '/descargas/habitos/' && u.pathname !== '/assets/biensmart.js') return;
  e.respondWith(fetch(r).then(function (res) { var cp = res.clone(); caches.open(V).then(function (c) { c.put(r, cp); }); return res; }).catch(function () { return caches.match(r); }));
});
