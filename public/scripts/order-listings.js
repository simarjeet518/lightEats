$(document).ready(function() {

$('#current').click(function(e) {
 console.log("hello");
    $.ajax({
      type: "GET",
      url: "/current/3",
      success: function(result) {
       console.log(result);
      },
      error: function(result) {
        alert('error');
      }
    });

  });

});
