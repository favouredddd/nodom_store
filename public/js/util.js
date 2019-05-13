var util = {
	getItem(str) {
		var me = this
		if (str.indexOf('Object') !== -1) {
			return JSON.parse(localStorage.getItem(str))
		}
		return localStorage.getItem(str)
	},
	setItem(key, value) {
		var me = this
		if (key.indexOf('object') !== -1) {
			localStorage.setItem(key, JSON.stringify(value))
		}
		localStorage.setItem(key, value)
	}
}
