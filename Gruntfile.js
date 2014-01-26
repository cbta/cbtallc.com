'use strict';

module.exports = function(grunt) {

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);
	// display execution time of grunt tasks
	require('time-grunt')(grunt);

	grunt.initConfig({
		config: grunt.file.readJSON('config-dev.json'),
		connect: {
			dev: {
				options: {
					port: '<%= config.port %>',
					middleware: function(connect, options) {
						return [
							// serve files in /dist as if they were in the root.
							connect.static(__dirname + '/build/www'),
							// but serve everything else from the root
							connect.static(__dirname)
						];
					}
				}
			},
			prod: {
				options: {
					base: '<%= config.buildPath %>',
					keepalive: true,
				}
			}
		},
		copy: {
			build: {
				files: [
					{expand: true, src: ['CNAME'], dest: '<%= config.buildPath %>/'},
					{expand: true,
						cwd: 'components',
						src: [
							'fancybox/source/**/*',
							'fullcalendar/fullcalendar.css'
						],
						dest: '<%= config.buildPath %>/components'},
					{expand: true, cwd: 'sass', src: 'assets/**/*', dest: '<%= config.buildPath %>/css/'}
				]
			}
		},
		imagemin: {
			// build is done after responsive_images, dev is done before responsive_images
			build: {
				files: [
					{
						expand: true,
						cwd: '<%= config.buildPath %>',
						src: '**/*.{jpg,png,gif}',
						dest: '<%= config.buildPath %>/'}
				]
			},
			dev: {
				files: [
					{expand: true, cwd: 'contents', src: '**/*.{jpg,png,gif}', dest: 'contents'}
				]
			}
		},
		responsive_images: {
			build: {
				options: {
					sizes: [{
						name: 'small',
						width: 500
					}, {
						name: 'medium',
						width: 800
					}]
				},
				files: [
					{expand: true, cwd: 'contents', src: '**/*.{jpg,png}', dest: '<%= config.buildPath %>'}
				]
			}
		},
		handlebars_html: {
			options : {
				partialDir : 'templates/partials',
				helperDir : 'templates/helpers'
			},
			dev: {
				src: 'templates/*.hbs',
				dest: '<%= config.buildPath %>',
				data: 'build/data.json',
			},
			prod: '<%= handlebars_html.dev %>'
		},
		import_contents: {
			options : {
				baseDir: 'contents',
				config : 'config.json',
				markdown: {
					breaks: true,
					smartLists: true,
					smartypants: true,
					langPrefix: 'language-'
				}
			},
			all: {
				src: 'contents/**/*.{json,md}',
				dest: 'build/data.json'
			}
		},
		requirejs: {
			prod: {
				options: {
					baseUrl: '.',
					mainConfigFile: 'js/config.js',
					name: 'components/almond/almond',
					insertRequire: ['js/app'],
					out: '<%= config.buildPath %>/app.js',
					optimize: 'uglify2',
					generateSourceMaps: true,
					preserveLicenseComments: false,
				}
			}
		},
		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'<%= config.buildPath %>/css/main.css': 'sass/main.scss'
				}
			},
			prod: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= config.buildPath %>/css/main.css': 'sass/main.scss'
				}
			}
		},
		autoprefixer: {
			dev: {
				src: '<%= config.buildPath %>/css/main.css',
				dest: '<%= config.buildPath %>/css/main.css'
			}
		},
		csso: {
			prod: {
				src: '<%= config.buildPath %>/css/main.css',
				dest: '<%= config.buildPath %>/css/main.css'
			}
		},
		'gh-pages': {
			prod: {
				options: {
					base: '<%= config.buildPath %>'
				},
				src: ['**/*']
			}
		},
		watch: {
			options: {
				livereload: '<%= config.livereload %>' || 35729
			},
			js: {
				files: ['js/**/*.js']
			},
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass:dev', 'autoprefixer:dev']
			},
			contents: {
				files: ['contents/**/*.{json,md}'],
				tasks: ['import_contents', 'handlebars_html:dev']
			},
			templates: {
				files: ['templates/**/*.{hbs,html}'],
				tasks: ['handlebars_html:dev']
			},
			images: {
				files: ['contents/**/*.{jpg,png,gif}'],
				tasks: ['imagemin:dev', 'responsive_images']
			},
			assets: {
				files: ['sass/assets/'],
				tasks: ['copy:build']
			},
			grunt: {
				files: ['tasks/**/*.js', 'Gruntfile.js'],
				tasks: ['process']
			}
		}
	});

	// load local tasks
	grunt.loadTasks('tasks');

	grunt.registerTask('process', 'Process content files, render html and compile css', [
		'import_contents',
		'copy:build',
		'handlebars_html:dev'
	]);

	grunt.registerTask('dev', [
		'process',
		'newer:imagemin:dev',
		'newer:responsive_images',
		'sass:dev',
		'autoprefixer:dev',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'import_contents',
		'newer:responsive_images',
		'newer:imagemin:build',
		'copy:build',
		'handlebars_html:prod',
		'sass:prod',
		'autoprefixer',
		'csso:prod',
		'requirejs:prod'
	]);

	grunt.registerTask('deploy', 'Deploy site via gh-pages.', [
		'build',
		'gh-pages'
	])

	grunt.registerTask('default', ['dev']);
}