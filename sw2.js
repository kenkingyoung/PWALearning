self.addEventListener('fetch', function(event) {
    if (/\.other.html$/.test(event.request.url)) {
        event.respondWith(
            new Response('<p>This is a response that comes from your service worker!</p>', { headers: { 'Content-Type': 'text/html' } })
        );
    }
});