const express = require("express");
const router = express.Router();


module.exports = () => {
  router.get("/", (req, res) => {
    res.clearCookie("rest_id");
    res.clearCookie('user');
    res.redirect("/");
  });

  return router;
}
