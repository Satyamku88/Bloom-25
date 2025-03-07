const CACHE_NAME = "offline-cache-v5"; // Update cache version
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/logo.png",
  "/offline.html",
  "/src/pages/EducationalHub.jsx",
  "/src/assets/Vaccination.pdf",  // Cache PDFs
  "/src/assets/First-Aid.pdf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          if (event.request.destination === "document") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});