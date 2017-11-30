// 为 fetch 事件添加事件监听器
self.addEventListener('fetch', function(event) {
    // 检查传入的 HTTP 请求是否是 JEPG 类型的图片
    if (/\.jpg$/.test(event.request.url)) {
        // 尝试获取 unicorn.jpg 用它替换图片来相应请求
        event.responseWith(fetch('/images/unicorn.jpg'));
    }
});