/* eslint-disable no-undef */

$(() => {
  const pricePerItem = Number($('#val1').text());


  const addition = () => {
    let a = $('#qty-box').val();

    if (a && a >= 0) {
      a++;
      let subTotal = 0;
      subTotal = a * pricePerItem;

      $("#qty-box").val(a);
      $('#val1').text(subTotal);

    }

  };

  const subtract = () => {
    let b = $('#qty-box').val();

    if (b && b >= 1) {
      b--;
      let subTotal = 0;
      subTotal = b * pricePerItem;
      $("#qty-box").val(b);
      $('#val1').text(subTotal);
    }

  };




  $(".inc").on('click', addition);
  $(".dec").on('click', subtract);





});



