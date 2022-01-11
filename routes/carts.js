const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    //gonna use obj to save all items added into cart
    db.query(`
    SELECT name
    FROM customers
    WHERE id = $1`, [req.params.user_id])
    .then(data => {
      const userdata = data.rows[0];
      const templateVars = { userdata, id: 2, user_id:2, username:"simar" }
      res.render('cart', templateVars);
    })
    .catch(err => res.json(err.message));
  });
  return router;
};
