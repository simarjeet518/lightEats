const queryString = ` SELECT  orders.created_at ,orders.accepted_at,orders.prepared_at, orders.picked_at,orders.set_time, orders.id,customers.name as customer_name ,customers.id as customer_id,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity,customers.phone
FROM orders
JOIN orders_items ON orders.id = orders_items.order_id
JOIN customers ON customer_id= customers.id
JOIN menu_items ON menu_items.id = orders_items.menu_item_id
WHERE customer_id = $1`;
const pendingquery = `${queryString} AND picked_at IS  NULL ORDER BY orders.id ;`;
const completedquery = `${queryString} AND picked_at IS NOT NULL ORDER BY orders.id ;`;

module.exports = (router, db) => {

  router.get("/current", (req, res) => {
    let user = req.cookies["user"];
    if (user) {
      user = JSON.parse(user);
    }
    if (!user) {
      res.redirect("/");
    }

    const user_id = user.id
    console.log(user);
    db.query(pendingquery, [user_id])
      .then(data => {
        const result = data.rows;
        console.log(result);

        if (result.length !== 0) {
          const tempVars = createtempVars(result);
          res.render('orders', { user: user, result: tempVars });
        }
        else {
          res.render('orders', { user: user, result: null });
        }
      })
      .catch(err => res.json(err.message));
  });


  router.get("/past", (req, res) => {
    let user = req.cookies["user"];
    if (user) {
      user = JSON.parse(user);
    }
    if (!user) {
      res.redirect("/");
    }
    const user_id = user.id
    db.query(completedquery, [user_id])
      .then(data => {
        const result = data.rows;
        if (user_id !== result.customer_id) {

          if (result.length !== 0) {
            const tempVars = createtempVars(result);
            res.render('orders', { user: user, result: tempVars });
          }
          else {
            res.render('orders', { user: user, result: null });
          }
        } else {
          res.redirect("/");
        }
      })
      .catch(err => res.json(err.message));
  });




  router.get("/:user_id", (req, res) => {

    let user = req.cookies["user"];
    if (user) {
      user = JSON.parse(user);
    }

    if (!user) {
      res.redirect("/");
    }

    const user_id = user.id;
    db.query(pendingquery, [user_id])
      .then(data => {
        const result = data.rows;

        if (result.length !== 0) {
        const tempVars = createtempVars(result);
         res.render('orders', { user: user, result: tempVars });
        }
        else
        {
          res.render('orders', { user: user, result: null });
        }
      })
      .catch(err => res.json(err.message));
  });



  return router;

}


const createtempVars = function (result) {
  let status = "Pending"
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
        newObj.phone = result[i].phone;
        orderAlreadyinResult = "old";
        newObj.items = [];
        if (result[i].accepted_at) {
          status = `Ready in ${result[i].set_time} minutes`;

          if (result[i].prepared_at) {
            status = `Ready to pick up`;

            if (result[i].picked_at) {
              status = "Delivered";
            }
          }
        }
        newObj.status = status;
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
