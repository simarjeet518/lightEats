const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    db.query(`
      SELECT *
      FROM orders
      JOIN orders_items ON orders.id = orders_items.order_id
      JOIN menu_items ON menu_items.id = menu_item_id
      WHERE customer_id = $1
      `, [req.params.user_id])
    .then(data => {
      //res.json(data.rows);
      res.render('orders', {id:2});
    })
    .catch(err => res.json(err.message));
  });
  return router;
};

// render to a ejs
//const templatevars = {
  //       ordersArray
  //     };
  //     res.render("orders", templatevars);
