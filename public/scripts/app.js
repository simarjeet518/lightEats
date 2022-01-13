
$(() => {
  const cart = JSON.parse(Cookies.get("user"));

  if (!cart.quantity) {
    cart.quantity = 0;
  }
  if (!cart.items) {
    cart.items = [];
  }
  if (!cart.total) {
    cart.total = 0;
  }

  const $items = $(".items");

  for (let item of $items) {

    $(item).find("button").on("click", () => {
      const itemName = $(item).find(".items-name").text();
      const price = $(item).find(".items-price").text().split("$")[1];
      let exit = false;
      for (let dish of cart.items) {
        if (dish.name === itemName) {
          dish.number++;
          exit = true;
        }
      }
      //not in cart yet
      if (!exit) {
        const index = cart.items.length;
        const imgUrl= $(item).find(".items-img").attr("src");
        const id= $(item).find(".items-id span").text();

        cart.items.push({});
        cart.items[index].name = itemName;
        cart.items[index].img = imgUrl;
        cart.items[index].price = price;
        cart.items[index].number = 1;
        cart.items[index].item_id = id;
      }
      
      const itemPrice = Number(price);
      cart.total += itemPrice;
      cart.total = Number(cart.total.toFixed(2));
      cart.quantity += 1;
      Cookies.set("user", JSON.stringify(cart));
    });
  }
});

