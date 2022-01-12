const queryString = ` SELECT  orders.created_at ,orders.accepted_at,orders.prepared_at, orders.picked_at,orders.set_time, orders.id,customers.name as customer_name ,customers.id as customer_id,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity,customers.phone as phone
FROM orders
JOIN orders_items ON orders.id = orders_items.order_id
JOIN customers ON customer_id= customers.id
JOIN menu_items ON menu_items.id = orders_items.menu_item_id
WHERE  `;

const pendingquery = `${queryString}  picked_at IS  NULL ORDER BY orders.id ;`;
const previousquery = `${queryString}  picked_at IS NOT NULL ORDER BY orders.picked_at DESC ;`;

module.exports = (router, db) => {

  router.get("/new", (req, res) => {
     let rest_id = req.cookies["rest_id"];
     const templatevars = {
      rest_id,
      name: null
    }

    db.query(pendingquery)
      .then(data => {
        const result = data.rows;
         if (result.length !== 0) {
          const tempVars = parsedata(result);
          res.render('restaurants', { result: tempVars, user: templatevars });
        } else {
          res.render('restaurants', { result: null, user: templatevars });
        }
      })
      .catch(err => res.json(err.message));
  });


  router.get("/previous", (req, res) => {
    let rest_id = req.cookies["rest_id"];
    if (!rest_id) {
      return res.redirect("/");
    }
    const templatevars = {
      rest_id,
      name: null
    }
    db.query(previousquery)
      .then(data => {
        const result = data.rows;
        if (result.length !== 0) {
          const tempVars = parsedata(result);
          res.render('restaurants', { result: tempVars, user: templatevars });
        } else {
          res.render('restaurants', { result: null, user: templatevars });
        }
      })
      .catch(err => res.json(err.message));
  });




  router.get("/:restaurant_id", (req, res) => {
    let rest_id = req.cookies["rest_id"];
    if (!rest_id) {
      return res.redirect("/");
    }
    const templatevars = {
      rest_id,
      name: null
    }
    db.query(pendingquery)
      .then(data => {
        const result = data.rows;
        if (result.length !== 0) {
          const tempVars = parsedata(result);
          res.render('restaurants', { result: tempVars, user: templatevars });
        }
        else {
          res.render('restaurants', { result: null, user: templatevars });
        }
      })
      .catch(err => res.json(err.message));
  });


  router.post("/new/accepted", (req, res) => {

    const order_id = Number(req.body.order_id);
    const set_time = req.body.qty;
    const queryString = `UPDATE  orders SET accepted_at=$1, set_time=$2  WHERE id =$3;`;
    db.query(queryString, [new Date(), set_time, order_id])
      .then(() => {
        res.redirect("/restaurants/new");
      })
      .catch(err => res.json(err.message));
  });


  router.post("/new/ready", (req, res) => {
    const order_id = Number(req.body.order_id);
    const queryString = `UPDATE  orders SET prepared_at=$1 WHERE id =$2 ;`;
    db.query(queryString, [new Date(), order_id])
      .then(() => {
        res.redirect("/restaurants/new");
      })
      .catch(err => res.json(err.message));
  });


  router.post("/new/delivered", (req, res) => {
    const order_id = Number(req.body.order_id);
    const queryString = `UPDATE  orders SET picked_at=$1 WHERE id =$2;`;
    db.query(queryString, [new Date(), order_id])
      .then(() => {
        res.redirect("/restaurants/new");
      })
      .catch(err => res.json(err.message));
  });

  return router;
};

const parsedata = function (result) {
  let orders = {};
  let date =null;
  for (let i = 0; i < result.length; i++) {
    let status ="Pending";
    let orderId = result[i].id;
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







