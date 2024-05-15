'use strict';

var $ = require('jquery');
window.jQuery = $;

const { Calendar } = require('@fullcalendar/core');
const googleCalendarPlugin = require('@fullcalendar/google-calendar').default;
const timeGridPlugin = require('@fullcalendar/timegrid').default;
const dayGridPlugin = require('@fullcalendar/daygrid').default;
const listPlugin = require('@fullcalendar/list').default;
const luxon = require('luxon');
require('modal');
require('tab');
require('tooltip');

var app = {
	therapists: function () {
		$('.therapist-stubs .stub a').on('click', function (e) {
			e.preventDefault();
			var $stub = $(this).parent('.stub');
			var therapistId = $(this).attr('href');
			var therapistOn = $stub.hasClass('active');

			// remove any other current states
			$('.therapist-stubs .stub').removeClass('active');
			$('.therapist-viewers .viewer').removeClass('active');

			// activate clicked-on therapist if it was originally not activated
			if (!therapistOn) {
				$stub.toggleClass('active');
				$(therapistId).toggleClass('active');

				// Scroll to the viewer
				var scrollPos = $('.therapist-viewers').offset().top;
				$('html, body').animate({
					scrollTop: scrollPos - 200
				}, 'slow');
			}
		});

		$('.therapist-viewers .close-button').on('click', function (e) {
			e.preventDefault();
			// Close all viewer, remove current states
			$('.therapist-stubs .stub').removeClass('active');
			$('.therapist-viewers .viewer').removeClass('active');
		});
	},
	forms: function () {
		var self = this;
		$('#contact-form').on('submit', function (e) {
			e.preventDefault();
			var $this = $(this);
			var url = $this.data('url');
			var data = $this.serialize();
			$this.addClass('loading');
			$.ajax({
				url: url,
				method: 'POST',
				data: data
			}).then(function () {
				$this.removeClass('loading')
					.empty()
					.html('<p>Thank you for contacting us. We will be in touch shortly.</p>');
			}, function (jqxhr, textStatus, errorThrown) {
				$this.removeClass('loading');
				$this.find('.error').html('An error has occurred' +
					(errorThrown ? ': ' + errorThrown : '') +
					'. Please try again.');
			});
		});

		var appointmentFormHtml = $('#appointment-request').html();
		$('#appointment-request').on('submit', function (e) {
			e.preventDefault();
			var $this = $(this);
			var url = $this.data('url');
			$this.addClass('loading');
			$.ajax({
				url: url,
				method: 'POST',
				data: $this.serialize()
			}).then(function () {
				$this.removeClass('loading')
					.empty()
					.html('<p>Thank you! Your request has been received. Please wait for confirmation from us.</p>');
				self.appointmentForm = appointmentFormHtml;
			}, function (jqxhr, textStatus, errorThrown) {
				$this.removeClass('loading');
				$this.find('.error').html('An error has occurred' +
					(errorThrown ? ': ' + errorThrown : '') +
					'. Please try again.');
			});
		});
	},
	calendar: function () {
		const self = this;
		// initialize full calendar
		let defaultView = 'timeGridDay';
		let header = {
			left: 'prev,next',
			center: 'title',
			right: 'listMonth,listWeek,timeGridDay'
		};
		if (window.matchMedia('(min-width: 800px)').matches) {
			defaultView = 'timeGridWeek';
			header = {
				left: 'prev,next,today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay'
			};
		}
		const calendarEl = document.getElementById('calendar');
		if (!calendarEl) {
			return;
		}
		const calendar = new Calendar(calendarEl, {
			plugins: [ googleCalendarPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
			defaultView,
			header,
			buttonText: {
				listMonth: 'month',
				listWeek: 'week',
			},
			// API Key from Website project
			googleCalendarApiKey: 'AIzaSyDC4VV1NvUTsDaph6uwKGADpmYfeVyBKcw',
			eventSources: [{
				googleCalendarId: 'cep1ta6rnrasr0h68a9f3qir80@group.calendar.google.com',
				id: 'jvermilyea',
				color: '#f4511e', // international-orange
			}, {
				googleCalendarId: 'cbtallc.com_6fob72tp6i9vs6t72hdng0bn38@group.calendar.google.com',
				id: 'arubin',
				color: '#8e24aa', // dark-orchid
			}],
			height: 'auto',
			minTime: '05:00:00',
			maxTime: '21:00:00',
			eventClick: function ({event, el, jsEvent, view}) {
				jsEvent.preventDefault();
				const $form = $('.appointment-form');
				const therapist = event.source.id;
				const eventStart = luxon.DateTime.fromJSDate(event.start);
				const eventEnd = luxon.DateTime.fromJSDate(event.end);
				// check for therapist from selected appointment, select the right therapist
				$('#therapist option').each(function () {
					if ($(this).val() === therapist) {
						$(this).prop('selected', true);
						// since the select element is disabled,
						// copy the value to the hidden therapist-input field
						$('#therapist-input', $form).val($(this).text());
						// set the hidden therapist-email field
						$('#therapist-email', $form).val($(this).val() + '@cbtallc.com');
					}
				});
				// bring over correct date and time to form
				$('#app-date', $form).val(eventStart.toFormat('LLL d, y'));
				$('#app-time', $form).val(eventStart.toFormat('hh:mm a') + ' - ' + eventEnd.toFormat('hh:mm a'));
				$('.appointment-form').modal()
					.on('hidden.bs.modal', function () {
						// reset form if there is form html
						if (self.appointmentForm) {
							$('#appointment-request')
								.removeClass('loading')
								.empty()
								.html(self.appointmentForm);
						}
					});
			}
		});
		calendar.render();
	},
	tabs: function () {
		// // tabs
		$('.services .tabs-menu li').click(function (e) {
			e.preventDefault();
			var a = $('a', this);
			var tabID = a.attr('href');

			$(this).addClass('active'); // add class .active to the clicked button
			$(this).siblings().removeClass('active'); // remove the .active class from sibling buttons
			$(tabID).addClass('active');
			$(tabID).siblings().removeClass('active');
		});
	},
	tooltip: function () {
		$('[data-toggle="tooltip"]').tooltip();
	}
};

$(document).ready(function () {
	app.therapists();
	app.forms();
	app.calendar();
	app.tabs();
	app.tooltip();
});
