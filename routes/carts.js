const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //check login status
  router.get("/:user_id", (req, res) => {
    let user = req.cookies["user"];
    if (user) {
      user = JSON.parse(user);
    }
    console.log("user in cart!", user);
    if ( !user || user.id != req.params.user_id) {
      return res.redirect("/");
    }
    const templateVars = {
      user
    };
    res.render('cart', templateVars);
  });
  return router;
};
