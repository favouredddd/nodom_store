// if (!sess.logn) {
// 	sess.name = Math.random() + 'a'
// 	sess.logn = true
// 	sess.count = 1
// 	mydba.add({
// 		ip: ip,
// 		count: sess.count,
// 		session: sess.name,
// 		path: re,
// 		callback: function() {
// 			if (re === '/route') re = '/route/home'
// 			fs.readFile(__dirname + '/server/api/result.json', function(e, d) {
// 				var arr = JSON.parse(d)
// 				if (!/\{/.test(re)) {
// 					arr.push({ name: sess.name, path: re, result: /\{/.test(re) })
// 				}
// 				fs.writeFile(__dirname + '/server/api/result.json', JSON.stringify(arr), { flag: 'w' }, function() {
// 					res.render('index')
// 				})
// 			})
// 		}
// 	})
// } else {
// 	sess.count += 1
// 	mydba.update({
// 		ip: ip,
// 		count: sess.count,
// 		path: re,
// 		session: sess.name,
// 		callback: function() {
// 			fs.readFile(__dirname + '/server/api/result.json', function(e, d) {
// 				if (e) {
// 					return
// 				}
// 				var arr = JSON.parse(d)
// 				var name = sess.name
// 				arr.forEach(i => {
// 					if (i.name === name && !/\{/.test(re)) i.path = re
// 				})
// 				fs.writeFile(__dirname + '/server/api/result.json', JSON.stringify(arr), { flag: 'w' }, function(
// 					e,
// 					d
// 				) {
// 					res.render('index')
// 				})
// 			})
// 		}
// 	})
// }
