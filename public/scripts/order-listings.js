// to load current orders  and past orders
$(document).ready(function() {
//set-time decrement

$('#current').click(function(e) {
    $.ajax({
      type: "GET",
      url: "/orders/current"
    });

  });

$('#past').click(function(e) {
    $.ajax({
      type: "GET",
      url: "/orders/past"
    });

 });

});
