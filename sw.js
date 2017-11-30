// 缓存的名称
// 我们将进入 Service Worker 的安装事件
// 使用我们指定的缓存名称来打开缓存
// 把 JavaScript 和 图片文件添加到缓存中
var cacheName = 'helloWorld';
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll([
            'js/scripts.js',
            'images/hello.jpeg'
        ]))
    );
});

// 添加 fetch 事件的事件监听器
// 检查传入的请求 URL 是否匹配当前缓存中存在的任何内容
// 如果有 response 并且它不是 undefined 或 null 的话就将它返回
// 否则只是如往常一样继续，通过网络获取预期的资源
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});