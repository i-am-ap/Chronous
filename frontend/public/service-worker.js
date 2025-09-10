self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("chronous-static").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/favicon.ico",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  // Only cache static assets, not API calls
  if (event.request.url.includes("/api/")) {
    return; // always fetch API online
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
