$( document ).ready(function() {
	$('.participate').click(function() {
		$('.main-header, .main-content-title').addClass('hide');
		$('.form-wrapp').removeClass('hide');
	});
	$('.form-wrapp button').click(function() {
		$('.main-header, .main-content-title').removeClass('hide');
		$('.form-wrapp input').val('');
		$('.form-wrapp').addClass('hide');
	});

    $('.header-arrow-down').click(function() {
        $('html, body').animate({
            scrollTop: $("#main-content").offset().top
        }, 350);
});
});