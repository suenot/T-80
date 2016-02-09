$(document).ready(function(){
	var scaleScreen = function(){
		var htmlWidth = $('html').width();
		if ($.browser.mobile) {
			// for phones
			if (htmlWidth <= 500) {
				$('meta[name=viewport]').attr('content', 'width=320');
				$('.footable').footable({
					breakpoints: {
						phone: 320
					}
				});
			// for tablets
			} else {
				$('meta[name=viewport]').attr('content', 'width=1350');
			};
		};
	};

	scaleScreen();
	// var resizeTimer = true;
	// $(window).on('resize', function(){
	// 	clearTimeout(resizeTimer);
	// 	resizeTimer = setTimeout(scaleScreen, 500);
	// });
});