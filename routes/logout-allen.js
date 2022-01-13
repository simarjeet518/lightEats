const express = require("express");
const router = express.Router();

module.exports = () => {
  router.post("/users", (req, res) => {
    res.clearCookie("user");
    res.redirect("/");
  });
  router.post("/restaurants", (req, res) => {
    res.clearCookie("rest_id");
    res.redirect("/");
  });
  return router;
}