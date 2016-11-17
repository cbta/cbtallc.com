const tobiko = require('tobiko');

tobiko({
	contentsDir: 'contents',
	outDir: 'dist',
	handlebars: {
		templatesDir: 'templates',
		partialsDir: 'templates/partials',
		helpersDir: 'templates/helpers'
	}
}).catch(function (err) {
	console.error(err);
	console.log(err.stack);
});
