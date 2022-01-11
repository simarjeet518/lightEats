/* eslint-disable no-undef */

$(() => {
  loadOnCents();
  updateSubTotal();

  const addition = (variables) => {
    let idx = variables.data.index;
    let pricePerItem = variables.data.perPrice;
    let a = $('#qty-box' + idx).val();


    if (a && a >= 0) {
      a++;
      let subTotal = 0;
      subTotal = a * pricePerItem;
      $("#qty-box" + idx).val(a);
      $('#val' + idx).text(subTotal.toFixed(2));
    }

    updateSubTotal();
  };

  const subtract = (variables) => {
    let idx = variables.data.index;
    let pricePerItem = variables.data.perPrice;
    let b = $('#qty-box' + idx).val();

    if (b && b >= 1) {
      b--;
      let subTotal = 0;
      subTotal = b * pricePerItem;
      $("#qty-box" + idx).val(b);
      $('#val' + idx).text(subTotal.toFixed(2));
    }

    updateSubTotal();

  };


  for (let i = 0; i < 6; i++) {

    $(".inc" + i).on('click', {index:i, perPrice: Number($('#val' + i).text())}, addition);
    $(".dec" + i).on('click', {index:i, perPrice: Number($('#val' + i).text())}, subtract);

  }


});


const updateSubTotal = () => {
  let addsum = 0;
  let cents = 0;
  for (let k = 0; k < 7; k++) {

    addsum += Number($('#val' + k).text());
  }
  $('#subtotal').text(addsum.toFixed(2));
};

const loadOnCents = () => {
  for (let k = 0; k < 7; k++) {
    cents = Number($('#val' + k).text()) / 100;
    $('#val' + k).text(cents);
  }
};
