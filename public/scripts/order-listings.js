// to load current orders  and past orders
$(document).ready(function() {
//set-time decrement
  $('.dec').click(()=>{
    let value = $('#qty-box').val();
    if(value >= 1){
    value--;
    }
    $('#qty-box').val(value);
  });

//set time increment
  $('.inc').click(()=>{
    console.log(Date.now());
    let value = $('#qty-box').val();
    value++;
    $('#qty-box').val(value);
  });




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
