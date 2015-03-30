module.exports = {
	dev: {
		options: {
			style: 'expanded'
		},
		files: {
			'<%= buildPath %>/css/main.css': 'sass/main.scss'
		}
	},
	prod: {
		options: {
			style: 'compressed'
		},
		files: {
			'<%= buildPath %>/css/main.css': 'sass/main.scss'
		}
	}
}