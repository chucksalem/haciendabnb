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
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

