var mysql = require('mysql')
var model = require('../db')
//连接
var getDate = function() {
	var t = new Date()
	t = t.toLocaleDateString()
	t = new Date(t).getTime()
	return { t1: t, time: new Date().getTime() }
}
var add = function(config) {
	var connection = mysql.createConnection(model.mysql)
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	let tamp = getDate()
	var params = [config.session, config.path, tamp.time, config.ip, config.count, tamp.t1]
	var sqlstr = 'INSERT INTO LOGIN(session,path,time,ip,count,day) VALUES(?,?,?,?,?,?)'
	connection.query(sqlstr, params, (err, result) => {
		if (err) console.log(err)
		config.callback()
		connection.end()
	})
}
var update = function(config) {
	var connection = mysql.createConnection(model.mysql)
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	var params = [config.path, getDate(), config.count, config.session]
	var sql = 'UPDATE LOGIN SET path = ?,time = ?,count=? WHERE session = ?'
	connection.query(sql, params, (err, result) => {
		if (err) console.log(err)
		config.callback()
		connection.end()
	})
}
module.exports = { add: add, update: update }
