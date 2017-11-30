// // 缓存的名称
// // 我们将进入 Service Worker 的安装事件
// // 使用我们指定的缓存名称来打开缓存
// // 把 JavaScript 和 图片文件添加到缓存中
// var cacheName = 'helloWorld';
// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(cacheName)
//         .then(cache => cache.addAll([
//             'js/scripts.js',
//             'images/hello.jpg'
//         ]))
//     );
// });

/* =========================== 缓存静态资源 =========================== */

// // 为 fetch 事件添加事件监听器以拦截请求
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         // 检查请求的资源是否存在于缓存之中  
//         caches.match(event.request)
//         .then(function(response) {
//             // 如果有 response 并且它不是 undefined 或 null 的话就将它返回
//             if (response) {
//                 return response;
//             }
//             // 否则，通过网络获取预期的资源
//             return fetch(event.request);
//         })
//     );
// });


/* ===================== 缓存动态资源(先拦截再缓存) ===================== */

// 为 fetch 事件添加事件监听器以拦截请求
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // 检查请求的资源是否存在于缓存之中
        caches.match(event.request)
        .then(function(response) {
            // 如果匹配的话，就此返回缓存并不再继续执行
            if (response) {
                return response;
            }

            // 克隆了请求。请求是一个流，只能消耗一次。
            // 因为我们已经通过缓存消耗了一次，然后发起 HTTP 请求还要再消耗一次，所以我们需要在此时克隆请求。
            var requestToCache = event.request.clone();
            // 尝试按预期一样发起原始的 HTTP 请求
            return fetch(requestToCache).then(
                function(response) {
                    // 如果由于任何原因请求失败或者服务器响应了错误代码，则立即返回错误信息
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    // 克隆响应，因为我们需要将其添加到缓存中，而且它还将用于最终返回响应
                    var responseToCache = response.clone();
                    // 打开名称为 “helloWorld” 的缓存
                    caches.open(cacheName)
                        .then(function(cache) {
                            // 将响应添加到缓存中
                            cache.put(requestToCache, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});