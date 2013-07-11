define(function (require) {

	var $ = require('jquery'),
		config = require('json!config.json');

	require('gcal');

	// DOM Manipulation
	$(document).ready( function() {
		$(".therapist-stubs .stub a").click(function(e){
			e.preventDefault();
			var $stub = $(this).parent(".stub"),
				therapist_id = $stub.data("therapist"),
				viewer_id = '#' + therapist_id + "-viewer",
				therapist_on = ($stub.hasClass("current")) ? true : false;

			// remove any other current states
			$(".therapist-stubs .stub").removeClass("current");
			$(".therapist-viewers .viewer").removeClass("on");

			// activate clicked-on therapist if it was originally not activated
			if (!therapist_on) {
				$stub.toggleClass("current");
				$(viewer_id).toggleClass("on");
			}

			// THIS SCROLLING ISN'T WORKING!!
			var scrollPos = $(".therapists").offset().top;
			$('html').animate(function(){
				scrollTop: scrollPos
			}, 'slow');
		});

		$(".therapist-viewers .close-button").click(function(e){
			e.preventDefault();
			// Close all viewer, remove current states
			$(".therapist-stubs .stub").removeClass("current");
			$(".therapist-viewers .viewer").removeClass("on");
		})

		// initialize full calendar
		$('.calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			eventSources: [
				{
					url: "http://www.google.com/calendar/feeds/cep1ta6rnrasr0h68a9f3qir80%40group.calendar.google.com/public/basic",
					className: 'jvermilyea'
				},
				{
					url: "http://www.google.com/calendar/feeds/8fe01o3ivjvd9tomq8o7obub20%40group.calendar.google.com/public/basic",
					className: 'ehiggins'
				}
			],
			defaultView: 'agendaWeek'
		});

	});

});