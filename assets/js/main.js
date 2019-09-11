(function ($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});



	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			$body.removeClass('is-loading');
			// auth check
			var profile = JSON.parse(sessionStorage.getItem('auth0_profile'));
			if (profile && profile.name) {
				// warning: some lame hacks ahead due to dropotron creating duplicate id's
				$('#account').toggleClass('fa-unlock-alt fa-lock').css('color', '#005217');
				$('[id=username]').text(profile.name);
				$('[id=workspace]').attr('href', '#');
				$('#workspace-link').html('<span class="indent-1"></span>' + profile.name + ' workspace').attr('href', '#');
				$('[id=auth]').text('Logout').on('click', function () {
					sessionStorage.removeItem('auth0_id_token');
					sessionStorage.removeItem('auth0_profile');
					location.reload();
				});
				$('#auth-link').html('<span class="indent-1"></span>Logout').on('click', function () {
					sessionStorage.removeItem('auth0_id_token');
					sessionStorage.removeItem('auth0_profile');
					location.reload();
				});
			}
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on mobile.
		skel.on('+mobile -mobile', function () {
			$.prioritize(
				'.important\\28 mobile\\29',
				skel.breakpoint('mobile').active
			);
		});

		// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			alignment: 'center',
			expandMode: 'click'
		});

		// Off-Canvas Navigation.

		// Title Bar.
		$(
				'<div id="titleBar">' +
				'<a href="#navPanel" class="toggle"><span class="screen-reader-only">navigation links</span></a>' +
				'</div>'
			)
			.appendTo($body);

		// Navigation Panel.
		$(
				'<div id="navPanel">' +
				'<nav>' +
				$('#nav').navList() +
				'</nav>' +
				'</div>'
			)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left',
				target: $body,
				visibleClass: 'navPanel-visible'
			});

		// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#titleBar, #navPanel, #page-wrapper')
			.css('transition', 'none');

	});

	$('.twitter-popup').click(function (event) {
		var width = 575,
			height = 450,
			left = ($(window).width() - width) / 2,
			top = ($(window).height() - height) / 2,
			url = this.href,
			opts = 'status=1' +
			',width=' + width +
			',height=' + height +
			',top=' + top +
			',left=' + left;

		window.open(url, 'twitter', opts);

		return false;
	});

	$('.language-option').on('click', function () {
		$('#header').click();
	});

})(jQuery);