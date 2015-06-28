module.exports = {
	dev: {
		src: 'js/app.js',
		dest: '<%= buildPath %>/app.js'
	},
	devWatch: {
		src: 'js/app.js',
		dest: '<%= buildPath %>/app.js',
		options: {
			watch: true
		}
	}
};