const express = require("express");
const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: true }));


module.exports = (db) => {
  router.post("/users", (req, res) => {
    const user_id = Math.floor(Math.random() * 2 + 1); //return 1 or 2
    db.query(`
    SELECT * FROM customers
    WHERE id = $1`, [user_id])
    .then(data => {
      res.cookie("user", JSON.stringify(data.rows[0]));
      res.redirect("/");
      }
    )
  });

  router.post("/restaurants", (req, res) => {
    const rest_id = 1;
    res.cookie("rest_id", rest_id);
    res.redirect(`/restaurants/${rest_id}`);
  });

  return router;
}
