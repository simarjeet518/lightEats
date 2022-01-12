// to load current orders  and past orders
$(document).ready(function() {



// setTimeout(function(){
//   window.location.reload(1);
// }, 1000);


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
