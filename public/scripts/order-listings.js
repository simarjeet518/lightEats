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

  const label =(text,num) =>{
   let tag =` <button id="customer-order-status${num}" class="customer-order-status">${text}</button>`
   return tag;
  }
  //click on accept-button
$('#button-set-order-time').click(() =>{
  $('#set-time').remove();
   $('#orders').prepend(label("Preparing",1));
});

$('.customer-order-status').click(() =>{
  console.log('click');
  $('.customer-order-status').remove();
  $('#orders').prepend(label("Waiting-to-picup",2));
});

$('#new').click(function(e) {
    $.ajax({
      type: "GET",
      url: "/restaurants/new"
    });
 });
 $('#previous').click(function(e) {
  $.ajax({
    type: "GET",
    url: "/restaurants/previous"
  });
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
