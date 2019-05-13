var express = require('express')
var fs = require('fs')
var mysql = require('mysql')
var model = require('./db')
var postChipe = express.Router()
const truePath = '/home/node/public/smallData/'
const publicPath = '/home/node/public/upload/'
const map = {}
const merge = function(old, newPath, cb,dirP) {
	let re = fs.createWriteStream(newPath + old.file);
	let next=function(arr){
		if(!arr.length){
			fs.rmdirSync(dirP);
			cb();
			return ;
		}
		let i=arr.shift();
		return new Promise((res,rj)=>{
			let tem = fs.createReadStream(i)
			tem.pipe(re, { end: false })
		    tem.on('end', () => {
			fs.unlinkSync(i);
			res();
		})}).then(()=>{
			return next(arr);
		});
	}
	next(old.arr);
}
postChipe.post('/', function(req, res) {
	let file = req.files.file
	let index = parseInt(req.body.index)
	let date = req.body.date;
	let all = parseInt(req.body.all)
	if(!map[date]){
	   fs.mkdirSync(truePath + date);
    }
	fs.rename(file.path, truePath + date + '/' + index + file.originalFilename, r => {
			if (map[date]) {
				map[date].index++
			} else {
				map[date] = {}
				map[date].index = 1
				map[date].arr = []
				map[date].file = file.originalFilename
				map[date].path = truePath + date
			}
			map[date].arr[index] = truePath + date + '/' + index + file.originalFilename
			if (map[date].index === all) {
				merge(map[date], publicPath, () => {
                                        delete map[date];
					res.send({ upload: true })
                                        
				},truePath+date);
			} else {
				res.send({ result: true })
			}
	})
})
module.exports = postChipe
