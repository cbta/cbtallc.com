module.exports =  {
	build: {
		files: [
			{
				expand: true,
				cwd: 'contents',
				src: '**/*.svg',
				dest: '<%= buildPath %>',
				ext: '.min.svg'
			}
		]
	}
};