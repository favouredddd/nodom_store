var ty = require('tinify')
let fs = require('fs')
ty.key = 'hhh'
let readDir = function(path) {
	let files = fs.readdirSync(path)
	let tem = files.map(i => {
		return i.replace(/\.(jpg)/, '.jpeg')
	})
	return tem.map((i, index) => {
		return new Promise((re, rj) => {
			fs.rename(path + '/' + files[index], path + '/' + tem[index], () => {
				re('true')
			})
		})
	})
}
let path = readDir('G:/jepg')
Promise.all(path).then(() => {
	console.log(11111)
})
