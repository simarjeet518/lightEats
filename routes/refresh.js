const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/restaurant/orders", (req, res) => {
    res.redirect("/restaurants/new");
  });

  router.post("/client/orders", (req, res) => {
    res.redirect(`/orders/user_id`);
  });
  //not done!

  return router;
}