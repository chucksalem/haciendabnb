$(function(){

  $(".fancybox").fancybox();

  $(".fancybox-media").fancybox({
    helpers : {
      media : {}
    }
  });

  $('.open-lightbox').on('click', function(e) {
    e.preventDefault();
    $.fancybox.open($('.fancybox'));
  });


  if($("#map-canvas").length > 0) {
      var lat = $("#map-canvas").data("lat");
      var lon = $("#map-canvas").data("lon");
      var myLatLng = { lat: lat, lng: lon};

      // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: myLatLng,
        zoom: 8,
        scrollwheel: false,
        disableDefaultUI: true,
        draggable: false
      });

      var blueDot = {
          path: 'M-50,0a50,50 0 1,0 100,0a50,50 0 1,0 -100,0',
          fillColor: '#4d85bc',
          fillOpacity: 0.8,
          scale: .5,
          strokeWeight: 0
        };

        // Create a marker and set its position.
        var marker = new google.maps.Marker({
          map: map,
          icon: blueDot,
          position: map.getCenter(),
          title: 'Hello World!'
        });
    }
});

$(document).ready(function(){
    $('.search-btn').on('click', function(){
        var code = $('#select-drop').val();
        var guests = $('#guests').val();
        var start_date = $('#start_date').val();
        var end_date = $('#end_date').val();
        if(code != null) {
            window.location = "/accommodations/"+code+"?start_date="+start_date+"&end_date="+end_date+"&guests="+guests;
        }else{
            alert('Please select any room first');
        }
    });
});
