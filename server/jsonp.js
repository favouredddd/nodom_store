var express = require('express')
var routerjsonp = express.Router()

/* GET home page. */
routerjsonp.get('/', function(req, res, next) {
	let url = req.url
	let str = req.query.callback
	let data = 'this is jsonp!'
	res.setHeader('Content-Type', 'application/javascript')
	res.end(str + `("` + data + `")`)
})
module.exports = routerjsonp
