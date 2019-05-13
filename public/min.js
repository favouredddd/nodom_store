var ty = require('tinify')
let fs = require('fs')
ty.key = 'hhh'
let readDir = function(path) {
	let files = fs.readdirSync(path)
	let result = files.filter(i => {
		let regExp = /\.(png|jpg)/gi
		return regExp.test(i)
	})
	// let tem = path.replace(/\\/gi, '/')
	return result.map(i => {
		return path + '/' + i
	})
}
let path = readDir('C://Users/love/plugin/public/img')
let len = path.length - 1
let timer = setInterval(() => {
	let tem = path[len]
	var souce = ty.fromFile(tem)
	souce.toFile('new' + tem)
	len--
	if (len < 0) clearInterval(timer)
}, 300)
