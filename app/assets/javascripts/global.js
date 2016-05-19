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

  // Update the second date field based on the first field's selected date
  $('#start_date').on("change", function(e) {

    var dateString = e.currentTarget.value;
    var startDate = moment(dateString, 'M/D/YYYY');

    // adds one day to selected start date
    var nextDate = startDate.add(2, 'd');

    // update the second field
    endPicker.setMoment(moment(nextDate, 'M/D/YYYY'));
  });
});
