;(function() {
	DD.createModule({
		name: 'm_table',
		templateUrl: HTMLURL + '/manager/table/table.html',
		delayInit: true,
		requires: [
			{ type: 'css', path: CSSURL + '/m_table.css' },
			{ type: 'css', path: HTMLURL + '/plugin_download/page_1/css/index.css' }
		],
		data: {
			pc: false,
			width: window.innerWidth,
			list: [],
			//字体颜色
			word_color: '#000000',
			//页数颜色
			page_color: '#ff0000',
			page: 1,
			row: 10,
			total: 1,
			to_page: 1,
			allpage: 1
		},
		onBeforeFirstRender() {
			var me = this
			if (window.innerWidth > 800) {
				me.data.pc = true
			}
			if (!util.getItem('token')) {
				try {
					DD.Router.go('/route/home')
					return
				} catch (e) {
					console.log(e)
				}
				try {
					DD.Router.Start('/route/home')
					return
				} catch (e) {
					console.log(e)
				}
			}
			if (window.innerWidth > 800) {
				me.data.row = 10
			} else {
				me.data.row = 5
			}
			me.module.methodFactory.methods.update.call(me, 1)
		},
		methods: {
			update(page = 1, flag = false) {
				var me = this
				DD.request({
					url: protocol + `/api/get_list`,
					params: {
						page: page,
						row: me.data.row
					},
					successFunc(r) {
						let getLocalTime = function(nS) {
							return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
						}
						r = JSON.parse(r)
						r.result.forEach(i => {
							i.ip = i.ip.split(':')
							i.ip = i.ip.slice(-1).join(':')
							i.pc = me.data.pc
						})
						for (let i = 0; i < r.result.length; i += 1) {
							r.result[i].time = getLocalTime(r.result[i].time)
						}
						me.data.$set('total', r.all)
						me.data.$set('allpage', Math.ceil(r.all / me.data.row))
						if (!flag) {
							me.module.methodFactory.methods.getAddress.call(me, r)
						} else {
							me.data.$set('list', r.result)
						}
					}
				})
			},
			updatePage() {
				var me = this
				me.module.methodFactory.methods.update.call(me, me.data.page)
			},
			getAddress(r) {
				let me = this
				let set = {}
				let ipList = []
				r.result.forEach(i => {
					if (set[i.ip]) {
						return
					}
					set[i.ip] = i.ip
				})
				Object.keys(set).forEach(i => {
					let r
					if (typeof i === 'number') {
						return
					}
					r = new Promise((resolve, reject) => {
						DD.request({
							url: protocol + '/api/getInfor',
							params: { ip: i, random: Math.random() },
							successFunc(r) {
								r = JSON.parse(r)
								set[i] = r.body
								resolve()
							}
						})
					})
					ipList.push(r)
				})
				Promise.all(ipList).then(t => {
					r.result.forEach(i => {
						i.ct = set[i.ip]
					})
					me.data.$set('list', r.result)
				})
			},
			delete(e, d, v) {
				var me = this
				DD.request({
					url: protocol + '/api/deleteList?',
					params: {
						random: Math.random(),
						session: d.session
					},
					successFunc(r) {
						r = JSON.parse(r)
						if (r.result) {
							me.module.methodFactory.methods.update.call(me, me.data.page)
						}
					}
				})
			}
		}
	})
})()
