var express = require('express')
var fs = require('fs')
var mysql = require('mysql')
var model = require('./db')
var postChipe = express.Router()
const truePath = '/home/node/public/smallData/'
const publicPath = '/home/node/public/upload/'
const map = {}
const merge = function(old, newPath, cb,dirP) {
	let map=old.arr.map((i,index)=>{
		return new Promise((res,rj)=>{
			let re = fs.createWriteStream(newPath + old.file,{start:old.start[index]});
			let tem = fs.createReadStream(i)
			tem.pipe(re, { end: false })
		        tem.on('end', () => {
			fs.unlinkSync(i);
			res();
		    })
	     });
	})
	Promise.all(map).then((r)=>{
                console.log(process.memoryUsage());
		fs.rmdirSync(dirP);
			cb();
			return ;
		});
}
postChipe.post('/', function(req, res) {
	let file = req.files.file
	let index = parseInt(req.body.index)
	let date = req.body.date;
	let size=parseInt(req.body.size);
	let all = parseInt(req.body.all);
	let total=parseInt(req.body.fileSize);
	if(!map[date]){
	   fs.mkdirSync(truePath + date);
    }
	fs.rename(file.path, truePath + date + '/' + index + file.originalFilename, r => {
			if (map[date]) {
				map[date].index++
			} else {
				map[date]= {}
				map[date].start=[];
				map[date].index = 1
				map[date].arr = []
				map[date].file = file.originalFilename
				map[date].path = truePath + date
			}
			map[date].all=total;
			map[date].size=size;
			map[date].start[index]=size*index;
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
