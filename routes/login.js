const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["lightEasts", "allenKevinSimar"]
}));

module.exports = (db) => {
  router.post("/users", (req, res) => {
    const user_id = Math.floor(Math.random() * 2 + 1); //return 1 or 2
    db.query(`
    SELECT * FROM customers
    WHERE id = $1`, [user_id])
    .then(data => {
      req.session.user = data.rows[0];
      res.redirect("/");
      }
    )
  });

  router.post("/restaurants", (req, res) => {
    const rest_id = 1;
    req.session.rest_id = rest_id;
    res.redirect(`/restaurants/${rest_id}`);
  });
  return router;
}