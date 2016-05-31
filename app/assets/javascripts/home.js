$(document).ready(function(){

    $('.search-btn').on('click', function(){
        var code = $('#select-drop').val();
        var guests = $('#guests').val();
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();

        if(code != null) {
            window.location = "/accommodations/" + code + "?start_date=" + start_date + "&end_date=" + end_date + "&guests=" + guests;
        }else{
            window.location = "/accommodations";
        }
    });

    var documentWidth = $(window).width();
    if(documentWidth < 680){
        $('.slider5').bxSlider({
            slideWidth: 600,
            minSlides: 1,
            maxSlides: 1,
            slideMargin: 10
        });
    }else{
        $('.slider5').bxSlider({
            slideWidth: 400,
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 10
        });
    }

    $('.navbar-inverse').css('margin-top','21px');
    $('.heading-large.margin-top-by-5').css('padding-top','10%');
});

