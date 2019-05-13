var mysql = require('mysql')
var model = require('../db')
var express = require('express')
var canvas = express.Router()
canvas.get('/', function(req, res, next) {
	var connection = mysql.createConnection(model.mysql)
	//连接
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	let sql = `SELECT * from (select day as t,count(day) as c from LOGIN GROUP BY day) as ts ORDER BY t desc;`
	connection.query(sql, function(err, r) {
		if (err) console.log(err)
		res.send(r)
	})
	connection.end()
})
module.exports = canvas
