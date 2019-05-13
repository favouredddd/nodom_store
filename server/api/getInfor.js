var express = require('express')
var request = require('request')
var infor = express.Router()
infor.get('/', function(req, res, next) {
	var ip = req.query.ip
	var url = 'http://ip.soshoulu.com/ajax/shoulu.ashx?&_type=ipsearch&ip=' + ip + '&px=1'
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.send({ body: body.split('|')[0] })
		}
	})
})
module.exports = infor
