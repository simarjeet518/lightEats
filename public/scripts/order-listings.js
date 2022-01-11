// to load current orders  and past orders
$(document).ready(function() {

$('#current').click(function(e) {
  console.log("hello");
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
