'use strict';

module.exports = function(grunt) {
    var path = require('path'),
        tobiko = grunt.file.readJSON('tobiko.json');
    // display execution time of grunt tasks
    require('time-grunt')(grunt);
    // load all grunt configs
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'tobiko'),
        config: tobiko
    });
    grunt.config.set('gh-pages', {
        prod: {
            options: {
                base: '<%= buildPath %>',
            },
            src: ['**/*']
        }
    });
}
