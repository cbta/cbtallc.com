module.exports = function( string ) {
	return string.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};