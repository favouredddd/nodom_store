;(function() {
	DD.createModule({
		name: 'm_manager',
		templateUrl: HTMLURL + '/manager/manager.html',
		delayInit: true,
		requires: [
			{ type: 'css', path: CSSURL + '/manager.css' },
			{ type: 'js', path: HTMLURL + '/manager/canvas/canvas.js' },
			{ type: 'js', path: HTMLURL + '/manager/table/table.js' }
		],
		data: {
			link: [
				{
					name: '表格',
					path: '/route/manager/table',
					active: true
				},
				{
					name: '访问图',
					path: '/route/manager/canvas',
					active: false
				}
			]
		}
	})
})()
