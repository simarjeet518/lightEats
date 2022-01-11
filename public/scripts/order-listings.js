// to load current orders  and past orders
$(document).ready(function() {

$('#current').click(function(e) {
  console.log("hello");
    $.ajax({
      type: "GET",
      url: "/orders/current",
      success: {

      }
    });

  });

$('#past').click(function(e) {
  $('#customer-order-status').text("");
    $.ajax({
      type: "GET",
      url: "/orders/past",
      success:function(data) {
      $('#customer-order-status').text("completed")
      }
    });

 });

});
