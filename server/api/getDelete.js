var mysql = require('mysql')
var model = require('../db')
var express = require('express')
var deletes = express.Router()
deletes.get('/', function(req, res, next) {
	var connection = mysql.createConnection(model.mysql)
	//连接
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	let src = req.query.src
	let sql = `delete from emoji where src = '${src}'`
	connection.query(sql, function(err, r) {
		if (err) console.log(err)
		res.send({ result: true })
		connection.end()
	})
})
module.exports = deletes
