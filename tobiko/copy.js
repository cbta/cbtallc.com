module.exports = {
	build: {
		files: [
			{
				expand: true,
				src: ['CNAME', 'favicon.ico'],
				dest: '<%= buildPath %>/'
			},
			{
				expand: true,
				cwd: 'bower_components',
				src: [
					'jquery/jquery.min.js',
					'fancybox/source/**/*',
					'fullcalendar/dist/fullcalendar.css'
				],
				dest: '<%= buildPath %>/bower_components'
			},
			{
				expand: true,
				cwd: 'node_modules',
				src: [
					'fullcalendar/dist/fullcalendar.min.css'
				],
				dest: '<%= buildPath %>/node_modules'
			},
			{
				expand: true,
				cwd: 'sass',
				src: 'assets/**/*',
				dest: '<%= buildPath %>/css/'
			}
		]
	}
};
