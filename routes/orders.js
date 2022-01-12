const queryString = ` SELECT  orders.* ,customers.name as customer_name ,customers.id as customer_id,menu_items.name,menu_items.price,orders_items.quantity,customers.phone
FROM orders
JOIN orders_items ON orders.id = orders_items.order_id
JOIN customers ON customer_id= customers.id
JOIN menu_items ON menu_items.id = orders_items.menu_item_id
WHERE customer_id = $1`;
const pendingquery = `${queryString} AND picked_at IS  NULL ORDER BY orders.id desc;`;
const completedquery = `${queryString} AND picked_at IS NOT NULL ORDER BY orders.id desc;`;

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
    db.query(pendingquery, [user_id])
      .then(data => {
        const result = data.rows;
        if (result.length !== 0) {
          const tempVars = parsedata(result);
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
            const tempVars = parsedata(result);
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
        const tempVars = parsedata(result);
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

const parsedata = function (result) {
  let orders = {};

  let date =null;
  for (let i = 0; i < result.length; i++) {
    let orderId = result[i].id;
    let status ="Pending";

    if (result[i].accepted_at) {
      status = `Ready in ${result[i].set_time} minutes`;
    }
    if (result[i].prepared_at) {
      status = `Ready to pick up`;
    }
   if (result[i].picked_at) {
          status = "Delivered";
   }
    if (result[i].picked_at) {
      date = result[i].picked_at.toString().substring(0, 21);
   }

    if (!orders[orderId]) {
        orders[orderId] = {
        id: orderId,
        phone: result[i].phone,
        customer_name: result[i].customer_name,
        order_total: (result[i].order_total / 100).toFixed(2),
        quantity: 0,
        items: [],
        status:status,
        created_at:result[i].created_at.toString().substring(0, 21),
        picked_at: date,
        set_time: result[i].set_time

      }

    }
    orders[orderId].items.push({item_name:result[i].name,quantity:result[i].quantity,price:result[i].price})
    orders[orderId].quantity += result[i].quantity;

  }

  return orders;
}
