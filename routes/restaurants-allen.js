const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

module.exports = (db) => {
  router.get("/:restaurant_id", (req, res) => {
    const rest_id = req.cookies["rest_id"];
    if (!rest_id) {
      return res.redirect("/");
    }
    const templatevars = {
      rest_id,
      user: null
    }
    res.render('restaurants', templatevars);
  });

  router.post("/orders/:restaurant_id", (req, res) => {
    const orderInfo = JSON.parse(req.cookies["user"]);
    console.log(typeof orderInfo);
    const queryString = `INSERT INTO orders (customer_id, order_total) VALUES ($1,$2) RETURNING *;`;

    db.query(queryString, [orderInfo.id, (orderInfo.total*100)])
    .then((data) => {
      const order_id = data.rows[0].id;
      for(let itemObj of orderInfo.items) {
        db.query(`INSERT INTO orders_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)`,
        [order_id, itemObj.item_id, itemObj.number])
      }
    })
    .then(() => {
      res.redirect(`/orders/${orderInfo.id}`);
    })
  });

  return router;
};
