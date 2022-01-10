// load .env data into process.env
require("dotenv").config();

// Web server config
<<<<<<< HEAD
const PORT = process.env.PORT || 8080;
=======
const PORT = process.env.PORT || 8080; //anyway I still prefer 8080
>>>>>>> index-page
const sassMiddleware = require("./lib/sass-middleware");
const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(() => {
  console.log("database connected!");
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));//based on body-parser
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ["lightEasts", "allenKevinSimar"]
}));

// Separated Routes for each Resource
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const ordersRoutes = require("./routes/orders");
const cartsRoutes = require("./routes/carts");
const restaurantsRoutes = require("./routes/restaurants");
const orderStatus = require("./routes/current");

// Mount all resource routes
app.use("/orders/", ordersRoutes(db));
app.use("/carts/", cartsRoutes(db));
app.use("/restaurants/", restaurantsRoutes(db));
app.use("/current/",orderStatus(db));
app.use("/login/", loginRoutes());
app.use("/logout/", logoutRoutes());

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const user_id = req.session.user_id;
  db.query(`
  SELECT restaurants.*, menu_items.name AS item_name, price, image_url
  FROM menu_items
  JOIN restaurants ON
  restaurants.id = restaurant_id`)
  .then(data => {
    const menuItems = data.rows;
    const templatevars = {
      user_id,
      rest_id: null,
      menuItems
    };
    return templatevars;
  })
  .then(templatevars => {
    if (!templatevars.user_id) {
      res.render("index", templatevars);
    } else {
      db.query(`
      SELECT name FROM customers WHERE id = $1`, [templatevars.user_id])
      .then(name => {
        templatevars.username = name.rows[0].name;
        res.render("index", templatevars);
      })
    }
  })
});


//clinet login
// app.post("/1", (req, res) => {
//   const user_id = 1;
//   //sql query get userObj{id}
//   res.redirect("/");
// });

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
