module.exports = {
	build: {
		options: {
			sizes: [{
				name: 'small',
				width: 500
			}, {
				name: 'medium',
				width: 800
			}, {
				name: 'large',
				width: 1200
			}]
		},
		files: [
			{expand: true, cwd: 'contents', src: '**/*.{jpg,png}', dest: '<%= buildPath %>'}
		]
	}
};