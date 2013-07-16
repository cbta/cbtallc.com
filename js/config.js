require.config({

	baseUrl: '/',
	deps: ['js/app'],

	paths: {
		text: 'components/requirejs-plugins/lib/text',
		json: 'components/requirejs-plugins/src/json',
		handlebars: 'components/handlebars/handlebars',
		jquery: 'components/jquery/jquery',
		fullcalendar: 'components/fullcalendar/fullcalendar.min',
		gcal: 'components/fullcalendar/gcal',
		validate: 'components/jquery.validation/jquery.validate',
		form: 'components/jquery-form/jquery.form',
		fancybox: 'components/fancybox/source/jquery.fancybox.pack'
	},

	// load non-amd dependencies
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		gcal: {
			deps: ['fullcalendar']
		},
		validate: {
			deps: ['jquery']
		},
		form: {
			deps: ['jquery']
		},
		fancybox: {
			deps: ['jquery']
		}
	},

	// Remove these modules from the final build.
	stubModules: ['text', 'json']
});