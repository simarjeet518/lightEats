const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["lightEasts", "allenKevinSimar"]
}));

module.exports = () => {
  router.post("/users", (req, res) => {
    const user_id = Math.floor(Math.random() * 2 + 1); //return 1 or 2
    req.session.user_id = user_id;
    res.redirect("/");
  });
  router.post("/restaurants", (req, res) => {
    const rest_id = 1;
    req.session.rest_id = rest_id;
    res.redirect(`/restaurants/${rest_id}`);
  });
  return router;
}