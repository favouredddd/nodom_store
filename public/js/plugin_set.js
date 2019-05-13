var BASEURL = '/plugin_set'
var HTMLURL = BASEURL + '/public/view'
var JSURL = BASEURL + '/public/js'
var CSSURL = BASEURL + '/public/css'
var PLUGINURL = BASEURL + '/public/plugins'
let protocol = 'http://nodom.store'
if ('serviceWorker' in navigator) {
	protocol = 'https://nodom.store'
	// navigator.serviceWorker
	// 	.register('/service-worker.js', { scope: '/' })
	// 	.then(function(reg) {
	// 		if (reg.installing) {
	// 			console.log('Service worker installing')
	// 		} else if (reg.waiting) {
	// 			console.log('Service worker installed')
	// 		} else if (reg.active) {
	// 			console.log('Service worker active')
	// 		}
	// 	})
	// 	.catch(function(error) {
	// 		console.log('Registration failed with ' + error)
	// 	})
}
if ('http:' == document.location.protocol) {
	protocol = 'https://nodom.store'
} else {
	protocol = 'https://nodom.store'
}
class Ajax {
	constructor() {
		let me = this
	}
	static init(config) {
		let me = this
		config.type = config.type === undefined ? 'get' : config.type
		switch (config.type) {
			case 'get':
				me.getRequest(config)
				break
			case 'post':
				me.postRequest(config)
				break
		}
	}
	static getRequest(config) {
		let params = config.params || {}
		let url = Object.keys(config.params)
			.map(i => {
				return i + '=' + config.params[i]
			})
			.join('&')
		if (config.url.endWith('?')) {
			url = config.url + url
		} else {
			url = config.url + '?' + url
		}
		let xml = new XMLHttpRequest()
		xml.onload = () => {
			if (xml.status === 200) {
				config.callback(xml.responseText)
			}
		}
		xml.open('get', url)
		xml.send(null)
	}
	static postRequest(config) {
		let file = new FormData()
		let xml = new XMLHttpRequest()
		let progress = config.progress || function(e) {}
		xml.onload = () => {
			if (xml.status === 200) {
				config.callback(xml.responseText)
			}
		}
		xml.upload.onprogress = progress
		if (config.params.constructor === Array) {
			config.params.forEach((i, index) => {
				file.append('file' + index, i.file)
			})
		} else {
			Object.keys(config.params).forEach(i => {
				file.append(i, config.params[i])
			})
		}
		xml.open('post', config.url)
		xml.send(file)
	}
	static postAll(config) {
		let me = this
		let arr = []
		let result = []
		let index = 0
		let map = config.params.map(i => {
			return () => {
				return me.postFile(config, i.file)
			}
		})
		let next = function() {
			if (!map.length) {
				config.callback()
				return
			}
			let f = map.shift()
			f().then(r => {
				next()
			})
		}
		next()
	}
	static postFile(config, file) {
		let me = this
		let url = config.url
		let Size = 1024 * 1024 * 2
		let slice = Math.ceil(file.size / Size)
		let start = 0
		let index = 0
		let record = 0
		let arr = []
		let date = new Date().getTime()
		while (index < slice) {
			let end = (index + 1) * Size
			if (end > file.size) end = file.size
			arr.push(me.slice(config, date, file, index, start, end, url, slice, Size, file.size))
			index += 1
			start = end
		}
		return new Promise((re, rj) => {
			me.control(arr, re)
		})
	}
	static control(arr, cb) {
		let total = 6
		let me = this
		let len = arr.length
		let data = arr.slice(0, 6)
		let result = []
		let start = 6
		let count = 0
		arr = arr.slice(6)
		let next = function() {
			if (total < 6 && arr.length) {
				var item = arr.shift()
				total += 1
				item.$index = start
				start += 1
				item().then(r => {
					total -= 1
					result[item.$index] = r
					count += 1
					next()
				})
			}
			if (len === count) {
				cb()
			}
		}
		for (let i = 0; i < data.length; i += 1) {
			data[i]().then(r => {
				total -= 1
				result[i] = r
				count += 1
				data.splice(i--, 1)
				next()
			})
		}
	}
	static slice(config, date, blob, index, start, end, url, all, Size, total) {
		let time = config.time || 6000000
		let timeF = config.timeout || function() {}
		return () => {
			return new Promise((re, rj) => {
				let xml = new XMLHttpRequest()
				let chunk = blob.slice(start, end)
				// console.log((end-start)/(1024*1024));
				let data = new FormData()
				data.append('file', chunk, blob.name)
				data.append('name', blob.name)
				data.append('all', all)
				data.append('index', index)
				data.append('date', date)
				data.append('size', Size)
				data.append('fileSize', total)
				xml.open('POST', url)
				xml.onload = function() {
					re(true)
				}
				xml.timeout = time
				xml.ontimeout = timeF
				xml.send(data)
			})
		}
	}
}
class Ajax1 {
	constructor() {
		let me = this
	}
	static init(config) {
		let me = this
		config.type = config.type === undefined ? 'get' : config.type
		switch (config.type) {
			case 'get':
				me.getRequest(config)
				break
			case 'post':
				me.postRequest(config)
				break
		}
	}
	static getRequest(config) {
		let params = config.params || {}
		let url = Object.keys(config.params)
			.map(i => {
				return i + '=' + config.params[i]
			})
			.join('&')
		if (config.url.endWith('?')) {
			url = config.url + url
		} else {
			url = config.url + '?' + url
		}
		let xml = new XMLHttpRequest()
		xml.onload = () => {
			if (xml.status === 200) {
				config.callback(xml.responseText)
			}
		}
		xml.open('get', url)
		xml.send(null)
	}
	static postRequest(config) {
		let file = new FormData()
		let xml = new XMLHttpRequest()
		let progress = config.progress || function(e) {}
		xml.onload = () => {
			if (xml.status === 200) {
				config.callback(xml.responseText)
			}
		}
		xml.upload.onprogress = progress
		if (config.params.constructor === Array) {
			config.params.forEach((i, index) => {
				file.append('file' + index, i.file)
			})
		} else {
			Object.keys(config.params).forEach(i => {
				file.append(i, config.params[i])
			})
		}
		xml.open('post', config.url)
		xml.send(file)
	}
	static postAll(config) {
		let me = this
		let arr = []
		let map = config.params.map(i => {
			return me.postFile(config, i.file)
		})
		Promise.all(map).then(r => {
			console.log('all upload success')
			config.callback()
		})
	}
	static postFile(config, file) {
		let me = this
		return new Promise((re, rj) => {
			let url = config.url
			// let file=
			let Size = 1024 * 1024 * 2
			let slice = Math.ceil(file.size / Size)
			let start = 0
			let index = 0
			let record = 0
			let arr = []
			let date = new Date().getTime()
			while (index < slice) {
				let end = (index + 1) * Size
				if (end > file.size) end = file.size
				arr.push(me.slice(config, date, file, index, start, end, url, slice, Size, file.size))
				index += 1
				start = end
			}
			Promise.all(arr).then(r => {
				re()
			})
		})
	}
	static slice(config, date, blob, index, start, end, url, all, Size, total) {
		let time = config.time || 6000000
		let timeF = config.timeout || function() {}
		return new Promise((re, rj) => {
			let xml = new XMLHttpRequest()
			let chunk = blob.slice(start, end)
			// console.log((end-start)/(1024*1024));
			let data = new FormData()
			data.append('file', chunk, blob.name)
			data.append('name', blob.name)
			data.append('all', all)
			data.append('index', index)
			data.append('date', date)
			data.append('size', Size)
			data.append('fileSize', total)
			xml.open('POST', url)
			xml.onload = function() {
				re(true)
			}
			xml.timeout = time
			xml.ontimeout = timeF
			xml.send(data)
		})
	}
}
class rotate {
	init(view) {
		view.innerHTML = `<figure style="transform: translateX(-50%) scale3d(1,1,1) rotateX(0) rotateY({{start}}deg) rotateZ(0);    width: 100px;
height: 100px;" class="animation">
      <section class="select" x-repeat="select"></section>
  </figure>
  <figure style="transform: translateX(-50%) scale3d(.5,.5,.5) rotateX(0) rotateY({{-1*start}}deg) rotateZ(0);    width: 100px;
height: 100px;" class="animation small">
      <section class="select" x-repeat="repeat" style="background:#1D78C1"></section>
  </figure>`
	}
	render(view) {
		const me = this
		me.data = view.$getData().data
		setTimeout(() => {
			if (me.data.init) {
				me.selects = [...view.querySelectorAll('.select')]
				me.view = view.querySelector('.animation')
				me.data.select.forEach((i, index) => {
					let rotate = `rotateX`
					if (index >= 3) {
						rotate = `rotateY`
					}
					DD.css(me.selects[index], 'transform', `${rotate}(${i.x}deg) translateZ(50px)`)
				})
				me.data.repeat.forEach((i, index) => {
					let rotate = `rotateX`
					if (index >= 3) {
						rotate = `rotateY`
					}
					DD.css(me.selects[index + 6], 'transform', `${rotate}(${i.x}deg) translateZ(50px)`)
				})
				me.timer = setInterval(me.startTime.bind(me), 2000)
				me.data.init = false
				window.addEventListener(
					'visibilitychange',
					() => {
						if (document.hidden) {
							clearInterval(me.timer)
						} else {
							me.timer = setInterval(me.startTime.bind(me), 2000)
						}
					},
					false
				)
				let tem = document.querySelector('.pluginWrap')
				new DD.Event({
					view: tem,
					eventName: 'swipeleft',
					handler() {
						clearInterval(me.timer)
						me.data.start -= 90
						me.timer = setInterval(me.startTime.bind(me), 2000)
					}
				})
				new DD.Event({
					view: tem,
					eventName: 'swiperight',
					handler() {
						clearInterval(me.timer)
						me.data.start += 90
						me.timer = setInterval(me.startTime.bind(me), 2000)
					}
				})
			}
		}, 100)
	}
	startTime() {
		let me = this
		me.data.start += 90
	}
}
DD.Plugin.create('rotate', rotate)
class uploadImage {
	constructor() {}
	init(view) {
		view.$dataName = DD.attr(view, 'dataName')
		let template = `<div class="wrapc">
			                    <div class="imgs" x-repeat="imgs">
			                        <img src="{{src}}" alt="">
			                        <div class="cancle" e-click="cancle" index="{{$index}}">
			                        </div>
			                    </div>
			                    <div class="select">
			                      <input type="file" class="file" multiple value="{{value}}">
			                      <div class="mask" style="line-height:{{height}}px">+</div>
			                    </div>
			                    <div class="ensure">
			                       <div class="upload">上传</div>
                          </div>
                          <div id="upload" x-class="{transition:'opacity===1'}"style="position:fixed;top:0px;left:0px;
                    
                          opacity:{{opacity}};
                          background: -webkit-linear-gradient(bottom right, #0ab9da , #0a89da);
                          background: -webkit-linear-gradient(bottom right, #0ab9da , #0a89da);
                          background: -o-linear-gradient(bottom right, #0ab9da, #0a89da);
                          background: -moz-linear-gradient(bottom right, #0ab9da, #0a89da);
                          background: linear-gradient(to bottom right, #0ab9da , #0a89da);height:2px;width:{{width}}px;"></div>
			              </div>`
		view.innerHTML = template
		view.removeAttribute('dataName')
		view.$forceRender = true
	}
	deal(files) {
		let me = this
		let tem = []
		let regExp = /\.(gif|jpg|jpeg|png|gif|jpg|png)$/im
		for (let i = 0; i < files.length; i += 1) {
			if (regExp.test(files[i].name)) {
				tem.push(files[i])
			} else {
				me.data.imgs.push({
					src: me.data.fileDefault,
					type: 'file',
					file: files[i]
				})
			}
		}
		Promise.all(
			tem.map(i => {
				return me.addFile(i)
			})
		).then(r => {
			me.data.$set('imgs', me.data.imgs)
			me.data.value = ''
		})
	}
	addFile(file) {
		return new Promise((re, rj) => {
			let me = this
			let fileReader = new FileReader()
			fileReader.onload = e => {
				me.data.imgs.push({
					src: e.target.result,
					type: 'img',
					file: file
				})
				re()
			}
			fileReader.readAsDataURL(file)
		})
	}
	render(view) {
		let me = this
		me.data = view.$getData().data
		let model = view.$module
		let methods = model.methodFactory.methods.updata || function() {}
		if (me.data.init) return
		me.data.init = false
		setTimeout(() => {
			let input = view.querySelector('input')
			let cancle = view.querySelector('.cancle')
			new DD.Event({
				eventName: 'change',
				view: input,
				handler(e, d, v) {
					if (!e.target.files.length) {
						return
					}
					me.deal(e.target.files)
				}
			})
			new DD.Event({
				view: view.querySelector('.ensure'),
				eventName: 'click',
				handler(e, d, v) {
					if (!me.data.imgs.length) return
					Ajax.init({
						progress: function(e) {
							let per = e.loaded / e.total
							me.data.width = window.innerWidth * per
							me.data.opacity = 1
						},
						type: 'post',
						params: me.data.imgs,
						url: protocol + '://112.74.56.131/api/upload',
						callback() {
							methods.call(model.model)
							console.log('upload Success')
						}
					})
				}
			})
			new DD.Event({
				view: view.querySelector('#upload'),
				eventName: 'transitionend',
				handler() {
					if (me.data.width === window.innerWidth) {
						me.data.width = 0
						me.data.opacity = 0
					}
				}
			})
		}, 100)
	}
}
class uploadImages {
	constructor() {}
	init(view) {
		view.$dataName = DD.attr(view, 'dataName')
		let template = `<div class="wrapc">
			                    <div class="imgs" x-repeat="imgs">
			                        <img src="{{src}}" alt="">
			                        <div class="cancle" e-click="cancle" index="{{$index}}">
			                        </div>
			                    </div>
			                    <div class="select">
			                      <input type="file" class="file" multiple value="{{value}}">
			                      <div class="mask" style="line-height:{{height}}px">+</div>
			                    </div>
			                    <div class="ensure">
			                       <div class="upload">上传</div>
                          </div>
                          <div id="upload" x-class="{transition:'opacity===1'}"style="position:fixed;top:0px;left:0px;
                    
                          opacity:{{opacity}};
                          background: -webkit-linear-gradient(bottom right, #0ab9da , #0a89da);
                          background: -webkit-linear-gradient(bottom right, #0ab9da , #0a89da);
                          background: -o-linear-gradient(bottom right, #0ab9da, #0a89da);
                          background: -moz-linear-gradient(bottom right, #0ab9da, #0a89da);
                          background: linear-gradient(to bottom right, #0ab9da , #0a89da);height:2px;width:{{width}}px;"></div>
			              </div>`
		view.innerHTML = template
		view.removeAttribute('dataName')
		view.$forceRender = true
	}
	deal(files) {
		let me = this
		let tem = []
		let regExp = /\.(gif|jpg|jpeg|png|gif|jpg|png)$/im
		for (let i = 0; i < files.length; i += 1) {
			if (regExp.test(files[i].name)) {
				tem.push(files[i])
			} else {
				me.data.imgs.push({
					src: me.data.fileDefault,
					type: 'file',
					file: files[i]
				})
			}
		}
		Promise.all(
			tem.map(i => {
				return me.addFile(i)
			})
		).then(r => {
			me.data.$set('imgs', me.data.imgs)
			me.data.value = ''
		})
	}
	addFile(file) {
		return new Promise((re, rj) => {
			let me = this
			let fileReader = new FileReader()
			fileReader.onload = e => {
				me.data.imgs.push({
					src: e.target.result,
					type: 'img',
					file: file
				})
				re()
			}
			fileReader.readAsDataURL(file)
		})
	}
	render(view) {
		let me = this
		me.data = view.$getData().data
		let model = view.$module
		let methods = model.methodFactory.methods.updata || function() {}
		if (me.data.init) return
		me.data.init = false
		setTimeout(() => {
			let input = view.querySelector('input')
			let cancle = view.querySelector('.cancle')
			new DD.Event({
				eventName: 'change',
				view: input,
				handler(e, d, v) {
					if (!e.target.files.length) {
						return
					}
					me.deal(e.target.files)
				}
			})
			new DD.Event({
				view: view.querySelector('.ensure'),
				eventName: 'click',
				handler(e, d, v) {
					if (!me.data.imgs.length) return
					Ajax.postAll({
						progress: function(e) {},
						type: 'post',
						params: me.data.imgs,
						url: protocol + '://112.74.56.131/api/getChipe',
						callback() {
							methods.call(model.model)
						}
					})
				}
			})
			new DD.Event({
				view: view.querySelector('#upload'),
				eventName: 'transitionend',
				handler() {
					if (me.data.width === window.innerWidth) {
						me.data.width = 0
						me.data.opacity = 0
					}
				}
			})
		}, 100)
	}
}
DD.Plugin.create('uploadImage', uploadImage)
DD.Plugin.create('uploadImages', uploadImages)
function IsPC() {
	var userAgentInfo = navigator.userAgent
	var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
	var flag = true
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false
			break
		}
	}
	return flag
}
class autopreFix {
	constructor() {}
	static fixPre(f, el, key, value, v) {
		let me = this
		el.style.cssText += 'transform-origin:' + value + ';transform:RotateY(' + v + 'rad)'
	}
}
;(() => {
	var carousel = function() {}
	carousel.prototype = {
		constructor: carousel,
		foreTranslate() {
			return `<div class="el-carousel-4">
             <div class="wrap" style="left:{{d}}px">
                  <div class="myCarousel">
                  <img src="{{src1}}">
                  <a href="{{src1}}"></a>
                  </div>
              </div>
              <div class="spanWrap" ref="span" >
                  <span x-repeat="imgs" class="span" index="{{$index}}"></span>
              </div>
          </div>`
		},
		init(view) {
			var template = `  <div class="el-carousel-4">
             <div class="wrap" style="transform:translateX({{d}}px)">
                <div class="myCarousel">
                  <img src="{{src1}}" >
                  <a href="{{src1}}"></a>
                  </div>
              </div>
              <div class="spanWrap" ref="span" >
                  <span x-repeat="imgs" class="span" index="{{$index}}"></span>
              </div>
          </div>`
			view.innerHTML = template
			view.$dataName = view.getAttribute('dataName')
			view.$forceRender = false
		},
		getImage(index) {
			var me = this
			return new Promise((r1, r2) => {
				var dom = document.createElement('div')
				var a = document.createElement('a')
				var imgs = new Image()
				dom.append(imgs)
				a.href = me.data.imgs[index].link
				a.className = 'linkTo'
				dom.append(a)
				imgs.onload = () => {
					me.imgs[index] = dom
					r1()
				}
				imgs.src = me.data.imgs[index].url
			})
		},
		doRender(view) {
			var me = this
			me.data.init = false
			me.imgs = []
			setTimeout(() => {
				me.dom = view.querySelector('.wrap')
				me.img = me.dom.querySelector('.myCarousel')
				me.index = me.data.index
				me.span = [...view.querySelectorAll('span')]
				me.span[me.index].classList.add('check')
				me.event = me.data.event
				me.width = parseInt(DD.css(me.dom, 'width')) / 2
				me.$module = view.$module
				var spanWrap = view.querySelector('.spanWrap')
				spanWrap.addEventListener(
					'click',
					e => {
						me.turn(e)
					},
					false
				)
				view.addEventListener(
					'transitionend',
					function() {
						setTimeout(me.transitionEnd.bind(me), 100)
					},
					false
				)
				new DD.Event({
					view: me.dom,
					eventName: 'swipeleft',
					handler: me.goRight.bind(me)
				})
				new DD.Event({
					view: me.dom,
					eventName: 'swiperight',
					handler: me.goLeft.bind(me)
				})
				Promise.all(
					me.data.imgs.map((i, index) => {
						return me.getImage(index)
					})
				).then(() => {
					me.create()
				})
			}, 10)
		},
		//每次加了触发器的数据的改变化调用renden函数
		//可以在此函数里面改变没有触发器的函数或者再设置一个标准物
		//这里采用采用的是init字段
		render(view) {
			var me = this
			me.data = view.$getData().data
			me.strName = me.data.GPU ? 'transitions' : 'position'
			if (!me.data.init) return
			if (!me.data.GPU) {
				view.innerHTML = me.foreTranslate()
				DD.Compiler.compile(view, view.$module)
				me.doRender(view)
				return
			}
			me.doRender(view)
			//标志物字段
		},
		setTime() {
			var me = this
			me.data.flag = false
			me.timer = setInterval(me.move.bind(me, me.data.left), 3000)
		},
		create() {
			var me = this
			if (me.data.left) {
				me.tem = me.imgs[(me.index + 1) % me.imgs.length]
				me.leaveLeft = false
			} else {
				me.leaveLeft = true
				me.tem = me.imgs[(me.index - 1 + me.imgs.length) % me.imgs.length]
			}
			me.setTime()
			window.addEventListener(
				'visibilitychange',
				() => {
					if (document.hidden) {
						clearInterval(me.timer)
					} else {
						me.setTime()
					}
				},
				false
			)
		},
		move(flag = false, index) {
			var me = this
			if (index || index === 0) {
				me.index = index
			}
			// console.log(me.index);
			if (flag) {
				me.data.d = 0
				me.tem = me.imgs[(me.index + 1) % me.imgs.length]
				setTimeout(() => {
					me.dom.appendChild(me.tem)
					me.moveLeft(0)
				}, 100)
				return
			} else {
				me.tem = me.imgs[(me.index - 1 + me.imgs.length) % me.imgs.length]
				me.data.d = -1 * me.width
				me.dom.insertBefore(me.tem, me.img)
				setTimeout(() => {
					me.moveRight(-1 * me.width)
				}, 1000)
				return
			}
		},
		transitionEnd() {
			var me = this
			me.dom.classList.remove(me.strName)
			if (me.leaveLeft) {
				me.index = (me.index + 1) % me.imgs.length
				me.updateSpan()
			} else {
				me.index = (me.index - 1 + me.imgs.length) % me.imgs.length
				me.updateSpan()
			}
			me.data.flag = true
		},
		turn(e) {
			var me = this
			var key = parseInt(e.target.getAttribute('index'))
			if (key === undefined || key === me.index || isNaN(key)) {
				return
			}
			if (!me.data.flag) return
			me.data.flag = false
			clearInterval(me.timer)
			if (key > me.index) {
				me.move(true, key - 1)
			} else {
				me.move(false, key + 1)
			}
			me.setTime()
		},
		moveLeft(d) {
			var me = this
			me.dom.classList.add(me.strName)
			me.data.flag = false
			me.data.d = -me.width
			me.leaveLeft = true
		},
		moveRight(d) {
			var me = this
			me.dom.classList.add(me.strName)
			me.data.flag = false
			me.data.d = 0
			me.leaveLeft = false
		},
		updateSpan() {
			var me = this
			me.span.forEach(i => {
				i.classList.remove('check')
			})
			me.span[me.index].classList.add('check')
			me.dom.removeChild(me.img)
			me.img = me.tem
			me.data.d = 0
			me.data.flag = true
		},
		goLeft() {
			var me = this
			if (!me.data.flag) return
			clearInterval(me.timer)
			me.data.flag = false
			me.leaveLeft = false
			me.move(false)
			me.setTime()
			me.event['left'] && me.$module.methodFactory.methods[me.event['left']].call(me.$module)
		},
		goRight() {
			var me = this
			if (!me.data.flag) return
			clearInterval(me.timer)
			me.data.flag = false
			me.leaveLeft = true
			me.move(true)
			me.setTime()
			me.event['right'] && me.$module.methodFactory.methods[me.event['right']].call(me.$module)
		}
	}
	DD.Plugin.create('carouselGPU', carousel)
	class Magn {
		constructor() {
			let me = this
		}
		init(view) {
			let template = `
<div class="wrap">
	<div class="img">
		<img src="{{src}}" >
	</div>
	<ul >
	   <li x-repeat="imgs">
	   <img src="{{src}}" e-click="changeSrc" >
	   </li>
	</ul>
</div>
<div class="leftWrap">
	<div class="magnWrap leftwrap" >
    <div class="eventMagn" >
		<img src="{{src}}" class="letfImage" >
	</div>

	</div>
	<div class="mask"></div>
</div>
<div class="eventWrap"></div>
<div class="rightWrap" x-model="right" style="top:{{top}}px;left:{{left}}px;width:{{wrap}}px;height:{{wrap}}px;opacity:{{opacity}}">
   <div class="imgWrap" >
   	<img src="{{src}}" class="rightImage">
   </div>
</div>`
			view.innerHTML = template
		}
		render(view) {
			let me = this
			me.data = view.$getData().data
			setTimeout(() => {
				me.startInit(view)
			}, 0)
		}
		startInit(view) {
			let me = this
			me.mask = view.querySelector('.mask')
			me.leftcalc = view.querySelector('.leftWrap')
			me.eventWrap = view.querySelector('.eventWrap')
			me.leftImage = view.querySelector('.letfImage')
			me.letfWrap = view.querySelector('.leftwrap')
			me.rightImage = view.querySelector('.rightImage')
			me.rightWrap = view.querySelector('.rightWrap')
			me.initCss()
			me.changeCss()
		}
		initCss() {
			let me = this
			let xd = window.innerWidth > 800 ? 20 : 5
			let left = me.data.left
			let right = me.data.right
			let per = me.data.per
			let x = parseInt(DD.css(me.leftcalc, 'width'))
			left.img = x / per
			left.wrap = x
			right.fixWidth = x
			right.img = x * per
			right.wrap = x
			right.left = x + xd
			right.top = 0
			right.fixLeft = x + xd
		}
		changeCss() {
			let me = this
			let x = me.data.x
			let y = me.data.y
			let per = me.data.per
			let change = me.data.left.wrap / me.data.right.img
			let left = x * per
			let top = y * per
			DD.css(me.letfWrap, 'left', x + 'px')
			DD.css(me.letfWrap, 'top', y + 'px')
			DD.css(me.leftImage, 'left', -1 * x + 'px')
			DD.css(me.leftImage, 'top', -1 * y + 'px')
			DD.css(me.rightImage, 'left', -1 * left + 'px')
			DD.css(me.rightImage, 'top', -1 * top + 'px')
			if (me.data.init) return
			me.data.init = true
			me.flag = true
			me.funcStack = []
			me.moveX = me.data.right.left - me.data.left.img
			me.moveY = me.data.left.img / 2
			console.log(me.moveX)
			new DD.Event({
				view: me.eventWrap,
				eventName: 'mousemove',
				handler(e, d, v) {
					let temX = e.offsetX
					let temY = e.offsetY
					me.getXY(temX, temY)
				}
			})
			new DD.Event({
				view: me.eventWrap,
				eventName: 'mouseenter',
				handler: () => {
					me.startEnter()
				}
			})
			new DD.Event({
				view: me.eventWrap,
				eventName: 'mouseleave',
				handler: () => {
					me.startLeave()
				}
			})
			new DD.Event({
				view: me.eventWrap,
				eventName: 'touchstart',
				handler(e, d, v) {
					me.startEnter()
				}
			})
			new DD.Event({
				view: me.eventWrap,
				eventName: 'touchmove',
				handler(e, d, v) {
					let t = e.touches[0]
					me.getXY(t.clientX, t.clientY)
				}
			})
			new DD.Event({
				view: me.eventWrap,
				eventName: 'touchend',
				handler(e, d, v) {
					me.startLeave()
				}
			})
		}
		startEnter() {
			let me = this
			if (!me.flag) {
				me.funcStack.push(() => {
					me.Leave(0)
				})
				return
			}
			me.Leave(0)
		}
		startLeave() {
			let me = this
			if (!me.flag) {
				me.funcStack.push(() => {
					me.Enter(me.moveX)
				})
				return
			}
			me.Enter(me.moveX)
		}
		Enter(d) {
			let me = this
			let len = me.data.right.fixWidth
			let all = me.data.right.fixLeft - me.data.left.img
			me.flag = false
			if (d > 0) {
				d -= 4
				if (d <= 0) {
					d = 0
				}
				me.data.right.top = (1 - d / all) * len / 2
				me.data.right.left = d / all * all + me.data.left.img
				me.data.right.wrap = d / all * len
				me.data.right.opacity = d / all
				window.requestAnimationFrame(() => {
					me.Enter(d)
				})
			} else {
				d = 0
				me.flag = true
				me.letfWrap.style.display = 'none'
				me.mask.style.display = 'none'
				// me.data.show=false;
				me.emit()
			}
		}
		Leave(d) {
			let me = this
			let len = me.data.right.fixWidth
			let all = me.data.right.fixLeft - me.data.left.img
			me.flag = false
			if (d < all) {
				d += 4
				if (d >= all) {
					d = all
				}
				me.data.right.top = (1 - d / all) * len / 2
				me.data.right.left = d / all * all + me.data.left.img
				me.data.right.wrap = d / all * len
				me.data.right.opacity = d / all
				window.requestAnimationFrame(() => {
					me.Leave(d)
				})
			} else {
				d = all
				me.flag = true
				me.letfWrap.style.display = 'block'
				me.mask.style.display = 'block'
				// me.data.show=true;
				me.emit()
			}
		}
		getXY(x, y) {
			let me = this
			let ox, oy
			let img = me.data.left.img
			let wrap = me.data.left.wrap
			ox = x - img / 2
			oy = y - img / 2
			if (x < img / 2) {
				ox = 0
			}
			if (x > wrap - img / 2) {
				ox = wrap - img
			}
			if (y < img / 2) {
				oy = 0
			}
			if (y > wrap - img / 2) {
				oy = wrap - img
			}
			me.data.x = ox
			me.data.y = oy
		}
		emit() {
			let me = this
			if (me.funcStack.length) {
				window.requestAnimationFrame(() => {
					while (me.funcStack.length) {
						let f = me.funcStack.pop()
						f()
					}
				})
			}
		}
	}
	DD.Plugin.create('plugin_08002', Magn)
})()
;(function() {
	var setFontSize = function() {
		var width = window.innerWidth
		//设置页面最大宽度
		// 获取默认fontsize
		if (width > 768) width = 768
		var fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16
		var x = width * 16 / (20 * fontSize)
		document.documentElement.style.fontSize = x + 'px'
	}
	setFontSize()
	//最开始动画效果
	var app = DD.createModule({
		name: 'm_plugin_set',
		el: '.el-plugin-set',
		root: true,
		data: {
			active: true
		}
	})
	DD.createModule({
		name: 'm_home_loading',
		el: '.el-loading',
		template: `<div class="nd-plugin-loading-2" x-show="show">
    <div class="spinner">
        <div class="rect1" style="background-color:#00d4b5f5"></div>
        <div class="rect2" style="background-color:#00d4b5f5"></div>
        <div class="rect3" style="background-color:#00d4b5f5"></div>
        <div class="rect4" style="background-color:#00d4b5f5"></div>
        <div class="rect5" style="background-color:#00d4b5f5"></div>
    </div>
</div>`,
		onBeforeFirstRender: function() {
			var me = this
			me.data.show = true
		},
		onReceive: function() {
			var me = this
			me.data.show = false
		},
		data: {
			show: false
		}
	})
	DD.createModule({
		el: '.com-alert',
		name: 'm_alert',
		data: {
			show: true
		},
		onFirstRender() {
			let me = this
			setTimeout(() => {
				me.data.show = false
			}, 2000)
		}
	})
	var start = DD.createModule({
		name: 'm_index',
		templateUrl: HTMLURL + '/plugin_set.html',
		requires: [
			JSURL + '/util.js',
			HTMLURL + '/home/home.js',
			HTMLURL + '/manager/manager.js',
			HTMLURL + '/plugin_list/plugin_list.js',
			HTMLURL + '/plugin_download/plugin_download.js'
		],
		data: {
			nav_list: [
				{
					name: '首页',
					path: '/route/home',
					active: false
				},
				{
					name: '插件列表',
					path: '/route/plugin_list',
					active: false
				},
				{
					name: '配置并下载',
					path: '/route/plugin_download',
					active: false
				},
				{
					name: '',
					path: '/route/manager',
					active: false
				}
			],
			img_log: '',
			show: { first: true, show: false },
			login: false,
			key: '',
			value: ''
		},
		onReceive: function(m, d) {
			var me = this
			if (d.first) {
				me.data.show.first = true
				me.data.show.show = false
				return
			}
			if (!d) {
				me.data.show.show = false
			}
		},
		onBeforeFirstRender() {
			// me.data.nav_list.forEach(i => {
			// 	i.active = false
			// })
			// me.data.nav_list[0].active = true
		},
		methods: {
			display() {
				var me = this
				me.data.login = true
				me.data.key = ''
				me.data.value = ''
			},
			noShow() {
				var me = this
				me.data.login = false
			},
			ensure() {
				var me = this
				DD.request({
					url: protocol + '/api/post',
					params: {
						key: me.data.key.trim(),
						value: me.data.value.trim()
					},
					reqType: 'POST',
					successFunc: function(r) {
						r = JSON.parse(r)
						if (r.result) {
							me.data.login = false
							me.data.key = ''
							me.data.value = ''
							util.setItem('token', r.token)
							me.data.nav_list.forEach(i => {
								if (i.name === '') {
									i.active = true
									return
								}
								i.actie = false
							})

							DD.Router.go('/route/manager')
						}
					}
				})
			},
			down: function() {
				var me = this
				if (me.data.show.first) {
					me.data.show.first = false
					me.data.show.show = true
					me.module.send('m_plugin_list', true)
					me.module.send('m_plugin_download', true)
				} else {
					me.data.show.show = !me.data.show.show
					me.module.send('m_plugin_list', me.data.show.show)
					me.module.send('m_plugin_download', me.data.show.show)
				}
			}
		},
		onBeforeFirstRender: function() {
			var me = this
			var params = {
				id_1: 1001,
				id_2: 1001
			}
			DD.request({
				params: params,
				rand: true,
				url: protocol + '/api/imgs?',
				successFunc: function(r) {
					var imgs = JSON.parse(r)
					me.data.img_log = imgs[0].img_path
				}
			})
		}
	})
	var hash = location.href
	hash = hash.replace(/\/\//g, '')
	hash = hash.split('/')
	hash.shift()
	hash = hash.join('/').trim()
	if (hash !== 'route/home' && hash !== 'route' && hash) {
		setTimeout(() => {
			DD.Router.start('/' + hash)
			setTimeout(() => {
				DD.Module.get('m_index').send('m_home_loading', false)
			}, 0)
		}, 200)
	} else {
		window.start = setInterval(() => {
			if (start && start.model && start.model.data && start.model.data.nav_list && start.model.data.nav_list[0]) {
				start.model.data.nav_list[0].active = true
				// DD.Router.start('/route/home')
				clearInterval(window.start)
			}
		}, 100)
	}
})()
