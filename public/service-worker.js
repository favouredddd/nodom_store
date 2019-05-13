var cacheName = 'weatherPWA-step-6-1'
var cacheFiles = [
	'/route/home',
	'/home',
	'/plugin_set/public/css/index.min.css',
	'/plugin_set/public/css/plugin_list.css',
	'/plugin_set/public/css/plugin_type.css',
	'/plugin_set/public/css/plugin_instruction1.css',
	'/plugin_set/public/route/route.js',
	'/plugin_set/public/js/nodom-full.min.js',
	'/plugin_set/public/js/index.min.js',
	'/plugin_set/public/js/index1.min.js',
	'/plugin_set/public/css/plugin_type1.css',
	'/plugin_set/public/css/plugin_list1.css',
	'/plugin_set/public/css/plugin_instruction.css',
	'/plugin_set/public/js/plugin_set.js',
	'/plugin_set/public/view/home/home.js',
	'/plugin_set/public/view/manager/manager.js',
	'/plugin_set/public/view/plugin_list/plugin_list.js',
	'/plugin_set/public/view/plugin_download/plugin_download.js',
	'/plugin_set/public/js/util.js',
	'/plugin_set/public/img/favico.ico',
	'/plugin_set/public/view/home/home.html',
	'/plugin_set/public/img/favico.ico',
	'/plugin_set/public/view/plugin_download/down.min.js',
	'/plugin_set/public/view/plugin_set.html',
	'/api/imgs?&id_1=1001&id_2=1001',
	'/plugin_set/public/css/img/more.png',
	'/api/imgs?&id_1=1002&id_2=1003',
	'/plugin_set/public/css/img/logo_top.png',
	'/plugin_set/public/img/alipay.png',
	'/plugin_set/public/img/qq.png',
	'/plugin_set/public/img/home.png'
]

let version = 'cache-v2'

// 缓存静态资源
self.addEventListener('install', function(evt) {
	// 强制更新sw.js
	//self.skipWaiting()
	evt.waitUntil(
		caches.open(version).then(function(cache) {
			return cache.addAll(cacheFiles)
		})
	)
})

// 缓存更新
self.addEventListener('active', function(evt) {
	evt.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName !== version) {
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})

// 请求拦截
self.addEventListener('fetch', function(evt) {
	console.log('处理fetch事件:', evt.request.url)
	evt.respondWith(
		caches
			.match(evt.request)
			.then(function(response) {
				if (response) {
					console.log('缓存匹配到res:', response)
					return response
				}
				console.log('缓存未匹配对应request,准备从network获取', caches)
				return fetch(evt.request).then(function(response) {
					console.log('fetch获取到的response:', response)
					caches.open(version).then(function(cache) {
						cache.put(evt.request, response)
						return response
					})
				})
			})
			.catch(function(err) {
				console.error('fetch 接口错误', err)
				throw err
			})
	)
})
