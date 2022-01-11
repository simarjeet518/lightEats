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

    let value = $('#qty-box').val();
    value++;
    $('#qty-box').val(value);
  });

  //click on accept-button
$('#button-set-order-time').Click(() =>{

})

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
