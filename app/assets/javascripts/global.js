$(function(){

  var startPicker = new Pikaday({
      field: document.getElementById('start_date'),
      firstDay: 1,
      minDate: moment().toDate(),
      format: 'M/D/YYYY'
  });

  var endPicker = new Pikaday({
      field: document.getElementById('end_date'),
      firstDay: 1,
      minDate: moment().toDate(),
      format: 'M/D/YYYY'
  });

    $('.number-validate').keypress(function(event) {
        var ew;
        ew = void 0;
        ew = event.which;
        if (46 === ew) {
            return true;
        }
        if (8 === ew) {
            return true;
        }
        if (9 === ew) {
            return true;
        }
        if (11 === ew) {
            return true;
        }
        if (48 <= ew && ew <= 57) {
            return true;
        } else {
            return false;
        }
    });
    if ($('.main-content').length > 0)
        $('.homepage').addClass('highlight-selected');
    if ($('.pagination').length > 0)
        $('.reserve-highlight').addClass('highlight-selected');
    if ($('.reserve-high').length > 0)
        $('.reserve-highlight').addClass('highlight-selected');
    if ($('.resources-high').length > 0)
        $('.resources-highlight').addClass('highlight-selected');
    if ($('.contact-high').length > 0)
        $('.contact-highlight').addClass('highlight-selected');
    if ($('.about-high').length > 0)
        $('.about-highlight').addClass('highlight-selected');
  // Update the second date field based on the first field's selected date
  $('#start_date').on("change", function(e) {
    var dateString = e.currentTarget.value;
    var startDate = moment(dateString, 'M/D/YYYY');
    // adds one day to selected start date
    var nextDate = startDate.add(2, 'd');
    // update the second field
    endPicker.setMoment(moment(nextDate, 'M/D/YYYY'));
  });

    $('#end_date').on("change", function(e) {
        var dateString = e.currentTarget.value;
        var endDate = moment(dateString, 'M/D/YYYY');
        // subtract one day to selected start date
        var nextDate = endDate.subtract(2, 'd');
        startPicker.setMoment(moment(nextDate, 'M/D/YYYY'));
    });

    $('.contact-form').validate({ // initialize the plugin
        ignore: "",
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            email: {
                required: true
            },
            message: {
                required: true
            }
        }
    });
});

function isCharacter(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if((charCode == 9) || (charCode == 37) || (charCode == 38) || (charCode == 39) || (charCode == 40) || (charCode == 8) || (charCode == 127) || (charCode == 20) || (charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
        return true;
    }else{
        return false;
    }
}

$('.email').on('keyup', function (){
    var checkEmail = checkValidEmail();
    if(checkEmail){
        $('.invalid-email').css('display','none');
        $('.btn--brown').removeAttr('disabled');
    }else{
        $('.invalid-email').css('display','block');
        $('.btn--brown').attr('disabled',true);
    }
});

function checkValidEmail(){
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var email = $('.email').val();
    if(!regex.test(email) && (email != '')) {
        return false;
    } else {
        return true;
    }
}