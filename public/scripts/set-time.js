$(document).ready(function() {


  //set time

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
  let value = $(this).parent('form').find('.qty-box').val();
  value++;
  $(this).parent('form').find('.qty-box').val(value);
});




});
