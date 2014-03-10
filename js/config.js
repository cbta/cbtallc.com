require.config({
	baseUrl: '/bower_components',
	paths: {
		text: 'requirejs-plugins/lib/text',
		json: 'requirejs-plugins/src/json',
		handlebars: 'handlebars/handlebars',
		jquery: 'jquery/dist/jquery',
		fullcalendar: 'fullcalendar/fullcalendar.min',
		gcal: 'fullcalendar/gcal',
		validate: 'jquery.validation/jquery.validate',
		form: 'jquery-form/jquery.form',
		modal: 'bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal',
		tab: 'bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab',
		moment: 'moment/moment',
		config: '../config.json',
		app: '../js/app'
	},

	// load non-amd dependencies
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		fullcalendar: ['jquery'],
		gcal: ['fullcalendar'],
		validate: ['jquery'],
		form: ['jquery'],
		modal: ['jquery'],
		tab: ['jquery']
	},

	// Remove these modules from the final build.
	stubModules: ['text', 'json']
});

require(['app'], function(){
});