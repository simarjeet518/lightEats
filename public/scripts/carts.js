$(() => {
  const cart = JSON.parse(Cookies.get("user"));
  const $cartItems = $(".cart-box-item");
  for (let item of $cartItems) {
    const $itemNumber = $(item).find(".cart-quantity-box p");
    const $itemTotalCost = $(item).find("#price p");
    const $totalPrice = $("#cart-order-total p");

    $(item).find(".btn.minus").on("click",() => {
      updateCart(item, cart, false, $itemNumber, $itemTotalCost, $totalPrice);
      }
    );
    
    $(item).find(".btn.plus").on("click",() => {
      updateCart(item, cart, true, $itemNumber, $itemTotalCost, $totalPrice);
      }
    );
  }
});

const findItem = (name, cartObj) => {
  for (let itemObj of cartObj.items) {
    if (itemObj.name === name) {
      return itemObj;
    }
  }
};
const removeItem = (name, cartObj) => {
  for (let i = 0; i < cartObj.items.length; i++) {
    if (cartObj.items[i].name === name) {
      cartObj.items.splice(i, 1);
      return;
    }
  }
}
const updateCart = (item, cart, isAdd, $itemNumber, $itemTotalCost, $totalPrice) => {
  const itemName = $(item).find(".b-desc").text();
  const currentObj = findItem(itemName, cart);
  if (isAdd) {
    currentObj.number++;
    cart.total += Number(currentObj.price);
    cart.total = Number(cart.total.toFixed(2));
    cart.quantity++;
  } else {
    currentObj.number--;
    cart.total -= Number(currentObj.price);
    cart.total = Number(cart.total.toFixed(2));
    cart.quantity--;
    if (currentObj.number === 0) {
      $(item).remove();
      removeItem(currentObj.name, cart);
    }
    if (cart.quantity === 0) {
      $(location).attr('href','/');
    }
  }
  $itemNumber.text(currentObj.number);
  $itemTotalCost.text("$" + (currentObj.number * currentObj.price).toFixed(2));
  $totalPrice.text("Sub-total: $" + cart.total);
  Cookies.set("user", JSON.stringify(cart));
};