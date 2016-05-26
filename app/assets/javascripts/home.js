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

    $('.slider5').bxSlider({
        slideWidth: 400,
        minSlides: 3,
        maxSlides: 3,
        slideMargin: 10
    });
});
