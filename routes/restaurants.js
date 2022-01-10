const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:restaurant_id", (req, res) => {
    db.query(`
    SELECT *
    FROM orders
    JOIN orders_items ON orders.id = order_id
    JOIN menu_items ON orders.restaurant_id = menu_items.restaurant_id
    WHERE orders.restaurant_id = $1`, [req.params.restaurant_id])
    .then(data => {
      //res.json(data.rows);
      res.render('restaurants', {id:1});
    })
    .catch(err => res.json(err.message));
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
      //get order_id then add items into order_items table
      //write sql query to insert
      const user_id = 1;
      res.redirect(`/orders/${user_id}`);
    })
    .catch(err => {
      res.json(err.message);
    })
  });

  //for owner login
  router.post("/:restaurant_id", (req, res) => {
    const restaurant_id = req.params.restaurant_id;
    res.redirect(`/restaurant/${restaurant_id}`);
  });

  return router;
};
