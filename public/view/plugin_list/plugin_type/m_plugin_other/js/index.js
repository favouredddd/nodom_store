;(function() {
	var data = {
		delayInit: true,
		requires: [
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index.css' },
			{ type: 'css', path: '/plugin_set/public/plugins/plugins_show/other/uploadImage/css/index1.css' }
		],
		name: 'm_plugin_other',
		data: {
			hasCreated: false,
			name: '上传图片',
			test: 'webpack动画',
			uploads: '大文件上传'
		},
		delayInit: true,
		modules: [
			{
				el: '.el-plugin-20001',
				onBeforeFirstRender() {
					if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
						this.data.upload.height = 80
					}
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
					}
				},
				methods: {
					cancle(e, d, v) {
						let me = this
						if (d.$index === undefined) return
						me.data.upload.imgs.splice(d.$index, 1)
						me.data.upload.value = ''
					},
					updata() {
						alert('文件上传成功')
						this.data.upload.$set('imgs', [])
					}
				}
			},
			{
				el: '.el-plugin-20003',
				onBeforeFirstRender() {
					if (window.navigator.userAgent.indexOf('iPhone') !== -1) {
						this.data.upload.height = 80
					}
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
					}
				},
				methods: {
					cancle(e, d, v) {
						let me = this
						if (d.$index === undefined) return
						me.data.upload.imgs.splice(d.$index, 1)
						me.data.upload.value = ''
					},
					updata() {
						alert('文件上传成功')
						this.data.upload.$set('imgs', [])
					}
				}
			},
			{
				el: '.el-plugin-20002',
				data: {
					animation: {
						init: true,
						rotate: 0,
						start: 0,
						select: [{ x: 0 }, { x: -90 }, { x: 90 }, { x: -90 }, { x: 90 }, { x: 180 }],
						repeat: [{ x: 0 }, { x: -90 }, { x: 90 }, { x: -90 }, { x: 90 }, { x: 180 }]
					}
				}
			}
		],
		templateUrl: '/plugin_set/public/view/plugin_list/plugin_type/m_plugin_other/m_plugin_other.html'
	}
	DD.createModule(data)
})()
