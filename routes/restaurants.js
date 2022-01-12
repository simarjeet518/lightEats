const express = require("express");
const router = express.Router();

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
    //CART as a form
    const orderObj = req.body; //on order from clinet 1
    // db.query(`
    // INSERT INTO orders (customer_id,order_total)
    // VALUES ($1, $2)
    // RETURNING *`, [orderObj.customer_id, orderObj.restaurant_id, orderObj.total])

    //order_id: 3

    // 3 coffee 3
    // 3 tea    1
    // 3 muffin 2

    //just a test query
    db.query(`
    SELECT *
    FROM restaurants
    WHERE restaurants.id = $1`, [req.params.restaurant_id])
    .then(data => {
      //get order_id then add items into orders_items table
      //write sql query to insert
      const user_id = 1;
      res.redirect(`/orders/${user_id}`);
    })
    .catch(err => {
      res.json(err.message);
    })
  });

  return router;
};
