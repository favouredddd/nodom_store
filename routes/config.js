let config = {
	path: '/route',
	module: 'm_index',
	routes: [
		{
			path: '/manager',
			module: 'm_manager',
			onEnter: () => {
				DD.Module.get('m_index').model.data.nav_list.forEach((i, index, arr) => {
					i.active = false
				})
			}
		},
		{
			path: '/home',
			module: 'm_home'
		},
		{
			path: '/plugin_list',
			module: 'm_plugin_list',
			routes: [
				{
					path: '/instruction',
					module: 'm_plugin_instruction'
				},
				{
					path: '/address',
					module: 'm_plugin_address'
				},
				{
					path: '/other',
					module: 'm_plugin_other'
				},
				{
					path: '/emoji',
					module: 'm_plugin_emoji'
				},
				{
					path: '/buffering',
					module: 'm_plugin_buffering'
				},
				{
					path: '/carousel',
					module: 'm_plugin_carousel'
				},
				{
					path: '/checkBox',
					module: 'm_plugin_checkBox'
				},
				{
					path: '/colorPicker',
					module: 'm_plugin_colorPicker'
				},
				{
					path: '/dateInput',
					module: 'm_plugin_dateInput'
				},
				{
					path: '/foldCollapse',
					module: 'm_plugin_foldCollapse'
				},
				{
					path: '/imgShow',
					module: 'm_plugin_imgShow'
				},
				{
					path: '/inputAuto',
					module: 'm_plugin_inputAuto'
				},
				{
					path: '/paging',
					module: 'm_plugin_paging'
				},
				{
					path: '/progress',
					module: 'm_plugin_progress'
				},
				{
					path: '/switcher',
					module: 'm_plugin_switcher'
				},
				{
					path: '/table',
					module: 'm_plugin_table'
				},
				{
					path: '/chart',
					module: 'm_plugin_chart'
				},
				{
					path: '/tree',
					module: 'm_plugin_tree'
				}
			]
		},
		{
			path: '/plugin_download',
			module: 'm_plugin_download',
			routes: [
				{
					path: '/Carousel_1',
					module: 'm_plugin_download_Carousel_1'
				},
				{
					path: '/Carousel_2',
					module: 'm_plugin_download_Carousel_2'
				},
				{
					path: '/Carousel_3',
					module: 'm_plugin_download_Carousel_3'
				},
				{
					path: '/Carousel_4',
					module: 'm_plugin_download_Carousel_4'
				},
				{
					path: '/Carousel_5',
					module: 'm_plugin_download_Carousel_5'
				},
				{
					path: '/Switch_1',
					module: 'm_plugin_download_Switch_1'
				},
				{
					path: '/Switch_2',
					module: 'm_plugin_download_Switch_2'
				},
				{
					path: '/Switch_3',
					module: 'm_plugin_download_Switch_3'
				},
				{
					path: '/Progress_1',
					module: 'm_plugin_download_Progress_1'
				},
				{
					path: '/Progress_2',
					module: 'm_plugin_download_Progress_2'
				},
				{
					path: '/Progress_3',
					module: 'm_plugin_download_Progress_3'
				},
				{
					path: '/Page_1',
					module: 'm_plugin_download_Page_1'
				},
				{
					path: '/Page_2',
					module: 'm_plugin_download_Page_2'
				},
				{
					path: '/Page_3',
					module: 'm_plugin_download_Page_3'
				},
				{
					path: '/Magn_1',
					module: 'm_plugin_download_Magn_1'
				},
				{
					path: '/Complete_1',
					module: 'm_plugin_download_Complete_1'
				},
				{
					path: '/foldCollapse_1',
					module: 'm_plugin_download_foldCollapse_1'
				},
				{
					path: '/Table_1',
					module: 'm_plugin_download_Table_1'
				},
				{
					path: '/Animation_1',
					module: 'm_plugin_download_Animation_1'
				},
				{
					path: '/Animation_2',
					module: 'm_plugin_download_Animation_2'
				},
				{
					path: '/Animation_3',
					module: 'm_plugin_download_Animation_3'
				},
				{
					path: '/Animation_4',
					module: 'm_plugin_download_Animation_4'
				},
				{
					path: '/Animation_5',
					module: 'm_plugin_download_Animation_5'
				},
				{
					path: '/Animation_6',
					module: 'm_plugin_download_Animation_6'
				},

				{
					path: '/Date_1',
					module: 'm_plugin_download_Date_1'
				},
				{
					path: '/Date_2',
					module: 'm_plugin_download_Date_2'
				},
				{
					path: '/Location_1',
					module: 'm_plugin_download_Location_1'
				},
				{
					path: '/Checkbox_1',
					module: 'm_plugin_download_Checkbox_1'
				},
				{
					path: '/Checkbox_2',
					module: 'm_plugin_download_Checkbox_2'
				},
				{
					path: '/Checkbox_3',
					module: 'm_plugin_download_Checkbox_3'
				},
				{
					path: '/Checkbox_4',
					module: 'm_plugin_download_Checkbox_4'
				},
				{
					path: '/Checkbox_5',
					module: 'm_plugin_download_Checkbox_5'
				},
				{
					path: '/Button_1',
					module: 'm_plugin_download_Button_1'
				},
				{
					path: '/ColorPicker_1',
					module: 'm_plugin_download_ColorPicker_1'
				},
				{
					path: '/Tree_1',
					module: 'm_plugin_download_Tree_1'
				},
				{
					path: '/Chart_1',
					module: 'm_plugin_download_Chart_1'
				},
				{
					path: '/Chart_2',
					module: 'm_plugin_download_Chart_2'
				},
				{
					path: '/Chart_3',
					module: 'm_plugin_download_Chart_3'
				},
				{
					path: '/Chart_4',
					module: 'm_plugin_download_Chart_4'
				},
				{
					path: '/Chart_5',
					module: 'm_plugin_download_Chart_5'
				},
				{
					path: '/Icon_1',
					module: 'm_plugin_download_Icon_1'
				}
			]
		}
	]
}
let list = []
let merge = function(route, path) {
	path += route.path.trim()
	list.push(path)
	if (route.routes) {
		let len = route.routes.length
		for (let i = 0; i < len; i += 1) {
			merge(route.routes[i], path)
		}
	}
}
merge(config, '')
module.exports = list
