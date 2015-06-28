module.exports = {
	dev: {
		options: {
			outputStyle: 'expanded'
		},
		files: {
			'<%= buildPath %>/css/main.css': 'sass/main.scss'
		}
	},
	prod: {
		options: {
			outputStyle: 'compressed'
		},
		files: {
			'<%= buildPath %>/css/main.css': 'sass/main.scss'
		}
	}
};