/* Pizzaiolo – Service Worker
   Strategie: network first, Cache als Fallback. Updates landen sofort,
   ohne Netz läuft die App aus dem Cache.

   WICHTIG: Alle Mini-Apps liegen auf derselben Herkunft
   (mvonulmerbach-ship-it.github.io) und teilen sich EINEN Cache-Speicher.
   Darum nur Caches mit dem eigenen PRAEFIX löschen – niemals fremde.
   "::" als Trenner, damit "kaffee::" nicht auch "kaffee-nachschlagewerk::v1" trifft. */

const PRAEFIX = "pizzateig::";
const CACHE = PRAEFIX + "v1";          // bei jeder Änderung an der App hochzählen
const ALT_PRAEFIXE = ["pizzaiolo-"];   // frühere Cache-Namen dieser App
const KERN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(KERN)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(namen => Promise.all(namen
        .filter(n => (n.startsWith(PRAEFIX) && n !== CACHE) || ALT_PRAEFIXE.some(a => n.startsWith(a)))
        .map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (!req.url.startsWith(self.registration.scope)) return;   // nur eigene Dateien
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok && res.type === "basic") {
          const kopie = res.clone();
          caches.open(CACHE).then(c => c.put(req, kopie)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.open(CACHE)
        .then(c => c.match(req, { ignoreSearch: true })
          .then(treffer => treffer || (req.mode === "navigate" ? c.match("./index.html") : undefined)))
        .then(antwort => antwort || Response.error()))
  );
});
