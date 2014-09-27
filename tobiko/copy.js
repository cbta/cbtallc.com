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
					'fancybox/source/**/*',
					'fullcalendar/fullcalendar.css'
				],
				dest: '<%= buildPath %>/bower_components'},
			{
				expand: true,
				cwd: 'sass',
				src: 'assets/**/*',
				dest: '<%= buildPath %>/css/'
			}
		]
	}
}