
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
