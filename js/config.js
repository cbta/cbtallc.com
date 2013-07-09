require.config({

	baseUrl: '/',
	deps: ['js/app'],

	paths: {
		text: 'components/requirejs-plugins/lib/text',
		json: 'components/requirejs-plugins/src/json',
		handlebars: 'components/handlebars/handlebars',
		jquery: 'components/jquery/jquery.min'
	},

	// load non-amd dependencies
	shim: {
		handlebars: {
			exports: 'Handlebars'
		}
	}
});