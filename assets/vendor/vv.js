// https://github.com/suenot/vv

'use strict';
var vv = function(from, base, to){
	var htmlWidth = $('html').width();
	var htmlHeight = $('html').height();
	if (from<=htmlWidth && htmlWidth<=to) {
		// for desktops: virtual viewport
		if ($.browser.desktop) {
			if (!$.browser.mozilla) {
				var scaleScreen = function(){
					$('html').css('zoom', '1');
					htmlWidth = $('html').width();
					zoom = htmlWidth/base;
					$('html').css('zoom', zoom);
				};
			} else {
				$('body').wrapInner('<div id="zoom-wrap"></div>');
				var viewport;
				var zoom;
				var scaleScreen = function(){
					$('body').css({
						'transform': 'scale(1)',
						'margin': 0
					});
					htmlWidth = $('body').width();
					htmlHeight = $('body').height();
					var zoom = htmlWidth/base;
					var viewport = base;
					$('body').css({
						'transform': 'scale('+zoom+')',
						'margin-left': -viewport * (1-zoom) / 2 + "px",
						'margin-right': -viewport * (1-zoom) / 2 + "px",
						'margin-top': -htmlHeight * (1-zoom) / 2,
						'margin-bottom': -htmlHeight * (1-zoom) / 2
					});
					$('#zoom-wrap').css({
						'overflow-y': 'hidden'
					});
				};
			};
			scaleScreen();
			var resizeTimer = true;
			$(window).on('resize', function(){
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(scaleScreen, 100);
			});
		};
		// for phones and tablets: native viewport
		if ($.browser.mobile) {
			$('html').css('min-width', '100vw');
			$('meta[name=viewport]').attr('content', 'width=' + base);
		};
		// for ie: native viewport
		if ($.browser.msie) {
			$('head').append('<style>@-ms-viewport {width: ' + base + 'px}</style>');
		};
	};
};