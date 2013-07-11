require.config({

	baseUrl: '/',
	deps: ['js/app'],

	paths: {
		text: 'components/requirejs-plugins/lib/text',
		json: 'components/requirejs-plugins/src/json',
		handlebars: 'components/handlebars/handlebars',
		jquery: 'components/jquery/jquery.min',
		fullcalendar: 'components/fullcalendar/fullcalendar.min',
		gcal: 'components/fullcalendar/gcal'
	},

	// load non-amd dependencies
	shim: {
		handlebars: {
			exports: 'Handlebars'
		},
		gcal: {
			deps: ['fullcalendar']
		}
	},

	// Remove these modules from the final build.
	stubModules: ['text', 'json']
});