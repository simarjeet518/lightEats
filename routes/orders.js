const queryString = ` SELECT  orders.created_at , orders.id ,customers.name as customer_name ,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity
FROM orders
JOIN orders_items ON orders.id = orders_items.order_id
JOIN customers ON customer_id= customers.id
JOIN menu_items ON menu_items.id = orders_items.menu_item_id
WHERE customer_id = $1`;
 const pendingquery = `${queryString} AND picked_at IS  NULL ORDER BY orders.id ;`;
 const completedquery = `${queryString} AND picked_at IS NOT NULL ORDER BY orders.id ;`;

module.exports = (router, db) => {

  router.get("/current", (req, res) => {
    const user = req.session.user;
    const user_id = user.id
    console.log(user);
    db.query(pendingquery, [user_id])
      .then(data => {
        const result = data.rows;

        if (result.length !== 0) {
          const tempVars = createtempVars(result);
          res.render('orders', { user:user, result: tempVars ,status:"Pending"});
        } else {
          res.render('orders', { user:user, result: null ,status:null});
        }
      })
      .catch(err => res.json(err.message));
  });


  router.get("/past", (req, res) => {
    const user = req.session.user;
    const user_id = user.id
    db.query(completedquery, [user_id])
      .then(data => {
        const result = data.rows;
        if (result.length !== 0) {
          const tempVars = createtempVars(result);
          res.render('orders', { user:user, result: tempVars,status:"Completed" });
        } else {
          res.render('orders', {user:user, result: null,status:null});
        }
      })
      .catch(err => res.json(err.message));
  });




  router.get("/:user_id", (req, res) => {
    // checl login

    const user = req.session.user;
    const user_id = req.params.user_id;


    db.query(pendingquery, [user_id])
      .then(data => {
        const result = data.rows;
        if (result.length !== 0) {
          const tempVars = createtempVars(result);
          res.render('orders', { user:user, result: tempVars ,status:"Pending"});
        } else {
          res.render('orders', { user: user, result: null ,status:null});
        }
      })
      .catch(err => res.json(err.message));
  });





}
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
