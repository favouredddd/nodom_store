var mysql = require('mysql')
var model = require('../db')
var express = require('express')
var routers = express.Router()
routers.get('/', function(req, res, next) {
	var connection = mysql.createConnection(model.mysql)
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	let date = new Date().getTime()
	let preDate = date - 7 * 86400000
	if (preDate <= 1556955305506) {
		predate = 1556955305505
	}
	var sql = 'select * from LOGIN where time BETWEEN ' + preDate + ' AND ' + date + ' order by time desc;'
	var page = req.query.page
	var row = req.query.row
	connection.query(sql, function(err, result) {
		if (!result.length) {
			res.send({ result: false })
			return
		}
		var all = result.length
		var arr = []
		var index = page * row
		if (index > result.length) index = result.length
		arr = result.slice((page - 1) * row, index)
		res.send({ result: arr, all: all })
	})
	connection.end()
})
module.exports = routers
