var mysql = require('mysql')
var model = require('../db')
var express = require('express')
var imgs = express.Router()
imgs.get('/', function(req, res, next) {
	var connection = mysql.createConnection(model.mysql)
	//连接
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	let sql = `select src from emoji`
	connection.query(sql, function(err, r) {
		if (err) console.log(err)
		res.send(r)
		connection.end()
	})
})
module.exports = imgs
