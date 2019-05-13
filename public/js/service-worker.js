var cacheName = 'weatherPWA-step-6-1'
var cacheFiles = [
	'/api/imgs?&id_1=1002&id_2=1003',
	'/route/home',
	'/home'
	// '/plugin_set/public/css/index.min.css',
	// '/plugin_set/public/css/plugin_list.css',
	// '/plugin_set/public/css/plugin_type.css',
	// '/plugin_set/public/css/plugin_instruction1.css',
	// '/plugin_set/public/route/route.js',
	// '/plugin_set/public/js/nodom-full.min.js',
	// '/plugin_set/public/js/index.min.js',
	// '/plugin_set/public/js/index1.min.js',
	// '/plugin_set/public/css/plugin_type1.css',
	// '/plugin_set/public/css/plugin_list1.css',
	// '/plugin_set/public/css/plugin_instruction.css',
	// '/plugin_set/public/js/plugin_set.js',
	// '/plugin_set/public/view/home/home.js',
	// '/plugin_set/public/view/manager/manager.js',
	// '/plugin_set/public/view/plugin_list/plugin_list.js',
	// '/plugin_set/public/view/plugin_download/plugin_download.js',
	// '/plugin_set/public/js/util.js',
	// '/plugin_set/public/img/favico.ico',
	// '/plugin_set/public/view/home/home.html',
	// '/plugin_set/public/img/favico.ico',
	// '/plugin_set/public/view/plugin_download/down.min.js',
	// '/plugin_set/public/view/plugin_set.html',
	// '/api/imgs?&id_1=1001&id_2=1001',
	// '/plugin_set/public/css/img/more.png',
	// '/api/imgs?&id_1=1002&id_2=1003',
	// '/plugin_set/public/css/img/logo_top.png',
	// '/plugin_set/public/img/alipay.png',
	// '/plugin_set/public/img/qq.png',
	// '/plugin_set/public/img/home.png',
	// '/plugin_set/public/view/plugin_download/icon_1/css/index.css',
	// '/plugin_set/public/view/plugin_download/icon_1/index.html',
	// '/plugin_set/public/view/plugin_download/plugin_download.html',
	// '/plugin_set/public/view/plugin_list/plugin_type/list.js',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_other/js/index.js',
	// '/plugin_set/public/view/plugin_list/plugin_instruction/plugin_instruction.js',
	// '/plugin_set/public/plugins/plugins_show/example/page_1/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_instruction/plugin_instruction.html',
	// '/plugin_set/public/view/plugin_list/plugin_list.html',
	// '/plugin_set/public/css/img/top.png',
	// '/plugin_set/public/plugins/plugins_show/chart/chart_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/chart/chart_4/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/chart/chart_5/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_chart/m_plugin_chart.html',
	// '/plugin_set/public/plugins/plugins_show/chart/chart_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/chart/chart_3/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_3/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_5/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_6/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_4/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_buffering/m_plugin_buffering.html',
	// '/plugin_set/public/plugins/plugins_show/buffering/animation_3/imgs/mongguo.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/css/carousel.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_carousel/m_plugin_carousel.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/1.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/3.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/5.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/1.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/2.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_1/img/4.jpg',
	// '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_3/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/checkBox/checkbox_4/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/paging/page_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/paging/page_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/right.png',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/left.png',
	// '/plugin_set/public/plugins/plugins_show/dateInput/dateInput_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/dateInput/dateInput_2/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_checkBox/m_plugin_checkBox.html',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_paging/m_plugin_paging.html',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_dateInput/m_plugin_dateInput.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/2.jpg',
	// '/plugin_set/public/plugins/plugins_show/foldCollapse/foldCollapse_1/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_foldCollapse/m_plugin_foldCollapse.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/3.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner003.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/left.png',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_2/img/right.png',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/img/2.jpg',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_2/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_imgShow/m_plugin_imgShow.html',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_inputAuto/m_plugin_inputAuto.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/img/left.png',
	// '/plugin_set/public/view/plugin_download/inputAuto_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_3/img/right.png',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/4.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/8.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/12.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/16.jpg',
	// '/plugin_set/public/plugins/plugins_show/progress/progress_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/progress/progress_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/progress/progress_3/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_progress/m_plugin_progress.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/3.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/7.jpg',
	// '/plugin_set/public/plugins/plugins_show/switcher/button_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/switcher/switcher_1/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/switcher/switcher_2/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/switcher/switcher_3/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_switcher/m_plugin_switcher.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/11.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/15.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/2.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/6.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/10.jpg',
	// '/plugin_set/public/plugins/plugins_show/address/location_1/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_address/m_plugin_address.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/14.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/1.jpg',
	// '/plugin_set/public/plugins/plugins_show/table/table_1/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_table/m_plugin_table.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/5.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/9.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_4/img/13.jpg',
	// '/plugin_set/public/plugins/plugins_show/tree/tree_1/css/index.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_tree/m_plugin_tree.html',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner001.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner002.jpg',
	// '/plugin_set/public/plugins/plugins_show/carousel/carousel_5/img/banner004.jpg',
	// '/plugin_set/public/plugins/plugins_show/paging/page_2/imgs/go_pre.png',
	// '/plugin_set/public/plugins/plugins_show/paging/page_2/imgs/go_next.png',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a1.png',
	// '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index.css',
	// '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index1.css',
	// '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_other/m_plugin_other.html',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a2.png',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a3.png',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_2/imgs/a4.png',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/img/big.jpg',
	// '/plugin_set/public/plugins/plugins_show/imgShow/magn_1/img/small.jpg',
	// '/plugin_set/public/view/plugin_download/chart_1/css/index.css',
	// '/plugin_set/public/view/plugin_download/chart_1/index.html'
]

let version = 'cache-v2'

// 缓存静态资源
self.addEventListener('install', function(evt) {
	// 强制更新sw.js
	self.skipWaiting()
	console.log(evt)
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
	console.log(1111)
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
