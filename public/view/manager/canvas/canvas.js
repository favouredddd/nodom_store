DD.createModule({
	name: 'm_canvas',
	data: {
		width: window.innerWidth
	},
	templateUrl: HTMLURL + '/manager/canvas/canvas.html',
	onBeforeFirstRender() {
		let me = this
		me.module.methodFactory.methods.getChart.call(me)
	},
	methods: {
		getChart() {
			DD.request({
				url: protocol + `/api/getcanvas`,
				params: {},
				successFunc(r) {
					let result = []
					r = JSON.parse(r)
					result = r.map(i => {
						return { x: new Date(i.t), y: i.c }
					})
					var chart = new CanvasJS.Chart('chartContainer', {
						animationEnabled: true,
						title: {
							text: 'nodom 访问人数'
						},
						axisY: {
							title: '访问',
							valueFormatString: '#',
							prefix: '人',
							prefix: ''
						},
						data: [
							{
								type: 'splineArea',
								color: 'rgba(54,158,173,.7)',
								markerSize: 5,
								xValueFormatString: 'YYYY',
								yValueFormatString: '#人',
								dataPoints: result
							}
						]
					})
					chart.render()
				}
			})
		}
	}
})
