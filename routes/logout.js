const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/users", (req, res) => {
    req.session.user_id = null;
    res.redirect("/");
  });
  router.post("/restaurants", (req, res) => {
    req.session.rest_id = null;
    res.redirect("/");
  });
  return router;
}