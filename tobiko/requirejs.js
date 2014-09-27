module.exports = {
	prod: {
		options: {
			baseUrl: 'bower_components',
			mainConfigFile: 'js/config.js',
			paths: {
				'almond': 'almond/almond',
				'app': '../js/app',
			},
			include: ['app'],
			insertRequire: ['app'],
			name: 'almond',
			out: '<%= buildPath %>/app.js',
			optimize: 'uglify2',
			generateSourceMaps: true,
			preserveLicenseComments: false
		}
	}
}