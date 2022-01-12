$(() => {
  const cart = JSON.parse(Cookies.get("user"));
  console.log(cart);

  const $cartItems = $(".cart-box-item");
  for (let item of $cartItems) {
    const $itemNumber = $(item).find(".cart-quantity-box p");
    const $itemTotalCost = $(item).find("#price p");
    const $totalPrice = $("#cart-order-total p");

    $(item).find(".btn.minus").on("click",() => {
      const itemName = $(item).find(".b-desc").text();
      const currentObj = findItem(itemName, cart);
      currentObj.number--;
      cart.total -= Number(currentObj.price);
      cart.quantity--;

      $itemNumber.text(currentObj.number);
      $itemTotalCost.text("$" + (currentObj.number * currentObj.price).toFixed(2));
      $totalPrice.text("Sub-total: $" + cart.total);
      Cookies.set("user", JSON.stringify(cart));
      }
    );
    $(item).find(".btn.plus").on("click",() => {
      const itemName = $(item).find(".b-desc").text();
      const currentObj = findItem(itemName, cart);
      currentObj.number++;
      cart.total += Number(currentObj.price);
      cart.quantity++;

      $itemNumber.text(currentObj.number);
      $itemTotalCost.text("$" + (currentObj.number * currentObj.price).toFixed(2));
      $totalPrice.text("Sub-total: $" + cart.total.toFixed(2));
      Cookies.set("user", JSON.stringify(cart));
      }
    );
  }

  $("#button-set-add-more").on("click", () => {
    Cookies.set("user", JSON.stringify(cart));
  });
});

const findItem = (name, cartObj) => {
  for (let itemObj of cartObj.items) {
    if (itemObj.name === name) {
      return itemObj;
    }
  }
}