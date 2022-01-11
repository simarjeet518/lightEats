const express = require("express");
const router = express.Router();

const queryString = ` SELECT  orders.created_at , orders.id ,customers.name as customer_name , customers.phone ,orders.picked_at,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity
FROM orders
JOIN orders_items ON orders.id = orders_items.order_id
JOIN customers ON customer_id= customers.id
JOIN menu_items ON menu_items.id = orders_items.menu_item_id
WHERE `;
const pendingquery = `${queryString}  accepted_at IS  NULL ORDER BY orders.id ;`;


module.exports = (db) => {
  router.get("/:restaurant_id", (req, res) => {
    const rest_id = req.session.rest_id;
    if (!rest_id) {
      return res.redirect("/");
    }
    const templatevars = {
      rest_id,
      user: null
    }
    db.query(pendingquery)
    .then(data => {
      const result = data.rows;

      if (result.length !== 0) {
        const tempVars = createtempVars(result);
        res.render('restaurants', {  result: tempVars,user:null,rest_id:rest_id });
      } else {
        res.render('restaurants', {  result: null, user:null,rest_id :rest_id });
      }
    })
    .catch(err => res.json(err.message));
});



  return router;
};
const createtempVars = function (result) {

  let ordersArray = [];
  let a = result[0].id;
  let newObj = {}
  let orderAlreadyinResult = "new"
  for (let i = 0; i < result.length; i++) {

    if (a === result[i].id) {

      if (orderAlreadyinResult === "new") {
        newObj.id = result[i].id;
        newObj.created_at = result[i].created_at.toString().substring(0, 21);
        if(result[i].picked_at !== null){
        newObj.picked_at = result[i].picked_at.toString().substring(0, 21);
        }
        newObj.phone = result[i].phone;
        newObj.customer_name = result[i].customer_name;
        newObj.order_total = (result[i].order_total / 100).toFixed(2);
        newObj.quantity = 0;
        orderAlreadyinResult = "old";
        newObj.items = [];
      }

      let b = {
        item_name: result[i].name,
        quantity: result[i].quantity,
        price: (result[i].price / 100).toFixed(2)
      }
      newObj.items.push(b);

      newObj.quantity += result[i].quantity;


    }
    else {

      ordersArray.push(newObj)
      newObj = {};
      a = result[i].id;
      orderAlreadyinResult = "new";
      i--;
    }
    if (i === result.length - 1) {
      ordersArray.push(newObj);
    }
  }
  return ordersArray;
}
