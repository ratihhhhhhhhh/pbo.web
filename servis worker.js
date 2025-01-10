caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (!cacheWhitelist.includes(cache)) {
              return caches.delete(cache);
            }
          })
        );
      })
  );
});

// Intercept network requests and serve cached content if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
