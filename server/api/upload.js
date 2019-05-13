var express = require('express')
var fs = require('fs')
var mysql = require('mysql')
var model = require('../db')
var imgPath = '/plugin_set/public/upload/'
let truePath = '/home/node/public/upload/'
var upload = express.Router()
upload.use('/', function(req, res) {
	var reg = /\.(gif|jpg|jpeg|png|gif|jpg|png)$/gi
	var files = req.files
	var len = Object.keys(files).length
	var connection = mysql.createConnection(model.mysql)
	//连接
	connection.connect(function(err) {
		if (err) {
			console.log(err)
		}
	})
	let file = Object.keys(files)
	Promise.all(
		file.map(i => {
			return new Promise((re, rj) => {
				var sql = `select * from emoji where src='${imgPath + files[i].originalFilename}'`
				connection.query(sql, function(err, r) {
					if (err) console.log(err)
					if (r.length == 0) {
						console.log('no i')
						re(
							new Promise((r1, r2) => {
								var sql = `insert into emoji(src) values ('${imgPath + files[i].originalFilename}')`
								connection.query(sql, function(err, r) {
									if (err) console.log(err)
									r1(r)
								})
							})
						)
					} else {
						re('true')
					}
				})
			})
		})
	).then(r => {
		connection.end()
		Object.keys(files).forEach(i => {
			fs.rename(files[i].path, truePath + files[i].originalFilename, r => {
				len--
				if (len === 0) {
					res.send({ result: true })
				}
			})
		})
	})
})
module.exports = upload
