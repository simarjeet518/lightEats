$('.logout-btn').click(function(e) {
  console.log("clicking");

  $.ajax({
    type: "GET",
    url: "/logout/"
  });
  });
