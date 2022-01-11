
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

$('#button-set-order-time').click(function(e) {
  e.preventDefault()
  $.ajax({
    type: "POST",
    url: "/restaurants/new"

  });
});

$('#preparing').click(function(e) {
  e.preventDefault()
  $.ajax({
    type: "POST",
    url: "/restaurants/new"
  });
});

$('#waiting-to-pick-up').click(function(e) {
  e.preventDefault()
  $.ajax({
    type: "POST",
    url: "/restaurants/new"
  });
});
