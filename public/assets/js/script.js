$( document ).ready(function() {
    $('.header-arrow-down').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("nav").offset().top
        }, 350);
    });
});