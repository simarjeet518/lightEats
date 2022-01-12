/* eslint-disable no-undef */

$(document).ready(()=> {
  updateSubTotal();

  $('.opt-btn').on('click', function () {
    const type = $(this).attr('data-type');
    const cartPrice = $(this).closest('.cart-box-item').find('.cart-price');
    const quantityBox = $(this).closest('.cart-box-item').find('.qty-box');
    const iPrice = $(this).closest('.cart-box-item').find('.iprice');
    const unitPrice = Number(cartPrice.text());
    const currentQuantity = type === 'minus' ? Number(quantityBox.val()) - 1 : Number(quantityBox.val()) + 1;
    if (currentQuantity >= 0) {
      quantityBox.val(currentQuantity);
      iPrice.text((unitPrice * currentQuantity).toFixed(2));
    }
    updateSubTotal();
    //update hidden fields for submit

  });

  //insert variables

  $('#button-set-order-time').on('click', submitOrder);

});

const updateSubTotal = ()=>{
  let subTotal = 0;
  $('.iprice').each(function() {
    subTotal += Number($(this).text());
  });

  $("#subtotal").text(subTotal.toFixed(2));
};

const submitOrder = () => {

  const subtotal = $("#subtotal").text() * 100;
  console.log(subtotal);

  $('.cart-box-item').each(() => {
    const itemQnt = $(this).closest('.cart-box-item').find('.qty-box');
    console.log(itemQnt.val());
  });


};
