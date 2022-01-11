// to load current orders  and past orders
$(document).ready(function() {

$('#current').click(function(e) {
    $.ajax({
      type: "GET",
      url: "/current",
    });

  });
  $('#past').click(function(e) {

    $.ajax({
      type: "GET",
      url: "/past"
    });

  });

});
