define(function (require) {

	var $ = require('jquery'),
		config = require('json!config.json');

	// DOM Manipulation
	$(document).ready( function() {
		$(".therapist-stubs .stub a").click(function(e){
			e.preventDefault();
			var stub = $(this).parent(".stub"),
				therapist_id = stub.data("therapist"),
				viewer_id = '#' + therapist_id + "-viewer";



			// remove any other current states
			$(".therapist-stubs .stub").removeClass("current");
			$(".therapist-viewers .viewer").removeClass("on");

			// activate clicked-on therapist
			stub.toggleClass("current");
			$( viewer_id ).toggleClass("on");

			// THIS SCROLLING ISN'T WORKING!!
			var scrollPos = $(".therapists").offset().top;
			$('html').animate(function(){
				scrollTop: scrollPos
			}, 'slow');
		});
	});

});