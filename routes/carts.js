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
      res.json(data.rows[0]);
    })
    .catch(err => res.json(err.message));
  });
  return router;
};