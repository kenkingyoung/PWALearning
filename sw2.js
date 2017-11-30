self.addEventListener('fetch', function(event) {
    alert(event.request.url);
    if (/\.jpg$/.test(event.request.url)) {
        event.respondWith(fetch('images/unicorn.jpg'));
    }
});