
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
$(form).on('submit',function(e){
  e.preventDefault();
})

$('.button-set-order-time').click(function(e) {
  e.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/restaurants/new/update_status1"

  });
});

$('#preparing').on('submit',function(e) {
  e.preventDefault();
  const formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    type: "POST",
    url: "/restaurants/new/update_status2"
  });
});

$('#waiting-to-pick-up').on('submit',function(e) {
  e.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/restaurants/new/update_status3"
  });
});
