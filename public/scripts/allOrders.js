$(document).ready(function() {


  $('.dec').on('click',function(e){
  e.preventDefault();
  let value = $(this).parent('form').find('.qty-box').val();
  if(value >= 1){
  value--;
  }

  $(this).parent('form').find('.qty-box').val(value);
});

//set time increment
$('.inc').on('click',function(e){
  e.preventDefault();
  let value = $('.qty-box').val();
  value++;
  $('.qty-box').val(value);
});


$('#new').click(function(e) {
  console.log("hello");
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


$('.button-set-order-time').on('submit',function(e) {

  const formData = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/restaurants/new/accepted"

  });
});

$('.preparing').on('submit',function(e) {


  const formData = $(this).serialize();

  $.ajax({
    type: "POST",
    url: "/restaurants/new/ready"
  });
});

$('.waiting-to-pick-up').on('submit',function(e) {
  
  const formData = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/restaurants/new/delivered"
  });
});
});
