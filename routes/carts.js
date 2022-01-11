const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //check login status
  router.get("/:user_id", (req, res) => {
    const user = req.session.user;
    if ( user.id != req.params.user_id) {
      return res.redirect("/");
    }
    const templateVars = {
      user
    };
    res.render('cart', templateVars);
  });
  return router;
};
