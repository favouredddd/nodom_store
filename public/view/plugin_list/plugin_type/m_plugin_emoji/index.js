;(function() {
	var data = {
		delayInit: true,
		requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index1.css' },
			{ type: 'css', path: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_emoji/index.css' }
		],
		name: 'm_plugin_emoji',
		data: {
			hasCreated: false,
			name: '表情包'
		},
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-21001',
				onBeforeFirstRender() {
					if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
						this.data.upload.height = 80
					}
					this.module.methodFactory.methods.update.call(this)
				},
				data: {
					upload: {
						opacity: 1,
						width: 0,
						height: 100,
						value: '',
						init: false,
						fileDefault: '/plugin_set/public/img/file.png',
						imgs: []
					},
					imgs: []
				},
				methods: {
					delete(e, d, v) {
						let me = this
						DD.request({
							url: protocol + '/api/Images/delete',
							params: {
								src: d.src
							},
							successFunc(r) {
								me.module.methodFactory.methods.updata.call(me)
							}
						})
					},
					update() {
						let me = this
						DD.request({
							url: protocol + '/api/Images/list',
							successFunc(r) {
								r = JSON.parse(r).map(i => {
									let src = i.src
									// .split('/')[4]
									// .replace(/\-/g, '_')
									// .replace(/\.(jpg|jpeg|gif|png)$/i, '')
									return { src: src }
								})
								me.data.$set('imgs', r)
							}
						})
					},
					updata() {
						let me = this
						DD.request({
							url: protocol + '/api/Images/list',
							successFunc(r) {
								r = JSON.parse(r).reverse()
								me.data.$set('imgs', r)
							}
						})
					},
					cancle(e, d, v) {
						let me = this
						if (d.$index === undefined) return
						me.data.upload.imgs.splice(d.$index, 1)
						me.data.upload.value = ''
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_emoji/index.html'
	}
	DD.createModule(data)
})()
