$(document).ready(function() {
	$('.navMenu').is(function(){
		var link_width = $(this).find('.navMenu__link').eq(0).width();
		$(this).find('.navMenu__link').eq(0).addClass('active');
		$('.headerBottom__lineString').width(link_width);
	});
	$('.navMenu__link').click(function(){
		var menu_item = $(this).parent().index();
		var link_width = $(this).width();
		var link_position = $(this).position().left;
		$(this).parent().siblings().find('.navMenu__link').removeClass('active');
		$(this).addClass('active');
		$('.headerBottom__lineString').width(link_width);
		$('.headerBottom__lineString').animate({
			left: link_position
		});
	});
	$('.navMenu__toggle').click(function(){
		$('.navMenu__list').toggleClass('active')
	});
});