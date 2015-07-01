'use strict';

module.exports = function () {
	return {
		dev: {
			options: {
				port: '<%= port %>',
				base: ['<%= buildPath %>', '.']
			}
		},
		prod: {
			options: {
				base: '<%= buildPath %>',
				keepalive: true,
			}
		}
	};
};