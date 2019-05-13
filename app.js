var express = require('express')
var cmp = require('compression')
var https = require('https')
var http = require('http')
var session = require('express-session')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var fs = require('fs')
var deleteList = require('./server/api/deleteList')
var index = require('./server/index')
var down = require('./server/api/down')
var imgs = require('./server/api/imgs')
var post = require('./server/token')
var json = require('./server/api/json')
var callback = require('./server/api/callback')
var mydba = require('./server/api/login')
var getClientIp = require('./server/api/getIp')
var getList = require('./server/api/getList')
var upload = require('./server/api/upload')
let jsonp = require('./server/jsonp.js')
let chipe = require('./server/getChipe.js')
let options = {
	key: fs.readFileSync(__dirname + '/keys/store.key'),
	cert: fs.readFileSync(__dirname + '/keys/store.pem')
}
var app = express()
//post中间模块
// app.use()
//跨域使用模块
app.use('/*', function(req, res, next) {
	if (req.hostname == '112.74.56.131') {
		return res.redirect(302, 'https://nodom.store')
	}
	next()
})
app.all('*', function(req, res, next) {
	re = req.url
	let rs = fs.readFileSync(__dirname + '/record.txt')
	fs.writeFileSync(__dirname + '/record.txt', rs + ',\r\n' + '"' + re + '"')
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	next()
})
var multer = require('connect-multiparty')
var muli = multer()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').__express)
app.set('view engine', 'html')
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(muli)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
	session({
		secret: 'hhhh',
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 1000 * 60 * 60 }
	})
)
app.use(cmp())
app.use('/plugin_set/public', express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }))
//get获取数据
// app.use(function(req, res, next) {
// 	if (req.hostname === '112.74.56.131') {
// 		res.redirect(301, 'https://www.baidu.com')
// 		next()
// 	}
// })
app.use('/', index)
app.use('/api/getChipe', chipe)
app.use('/api/down', down)
app.use('/api/get_list', getList)
app.use('/api/imgs', imgs)
app.use('/api/upload', upload)
app.use('/api/json', json)
//post获取数据
app.use('/api/post', post)
app.use('/api/deleteList', deleteList)
app.use('/api/callback', callback)
app.use('/api/record', require('./server/api/record'))
let imgsList = require('./server/api/getImgs.js')
app.use('/api/Images/list', imgsList)
let deleteImgs = require('./server/api/getDelete.js')
let canvas = require('./server/api/getcanvas.js')
let getInfor = require('./server/api/getInfor.js')
app.use('/api/getcanvas', canvas)
app.use('/api/Images/delete', deleteImgs)
app.use('/api/getInfor', getInfor)
app.use('/api/getfiles', function(req, res, next) {
	let baseUrl = '/public/upload'
	let tem = fs.readdirSync(__dirname + baseUrl).map(i => {
		return '/plugin_set' + baseUrl + '/' + i
	})
	res.json(tem)
})
app.use('/uploads', (req, res, next) => {
	res.render('upload.html')
})
// catch 404 and forward to error handler
var re
var ip
app.use('/api/jsonp', jsonp)
app.use(function(req, res, next) {
	re = req.url
	ip = getClientIp(req)
	var sess = req.session
	re = decodeURI(re)
	let str = 'index.html'
	if (re.indexOf('favicon') !== -1 || /\{/.test(re)) {
		str = '404.html'
	}
	if (/\{\{.+?\}\}/g.test(re)) {
		res.status(404)
		str = '404.html'
	}
	if (re.indexOf('www') !== -1 || re.indexOf('php') !== -1) {
		str = '404.html'
	}
	mydba.add({
		path: re,
		ip: ip,
		callback: () => {
			res.render(str)
			res.end()
			next()
		},
		count: 1,
		session: Math.random()
	})
})
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	// render the error page
	// res.status(err.status || 500)
	// res.send('error')
})
http.createServer(app).listen(80)
https.createServer(options, app).listen(443)
