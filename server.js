// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8081;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/admin/:restaurant_id", (req, res) => {
  const restautantId = req.params.restaurant_id;
  const templateVars = {id: restautantId};
  res.render("admin", templateVars);
});

app.get("/1/cart", (req, res) => {
  const menu1 = {
    name: "Coffee",
    price: "245",
    image: "https://www.sevensummitscoffee.com/uploads/1/3/1/2/131291290/s598870640510727702_p68_i1_w308.png"
  };

  const menu2 = {
    name: "Cookie",
    price: "150",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg"
  };
  const carttemplateVars = {
    name: menu1.name,
    price: menu1.price,
    image: menu1.image,
    menu: menu2
  };
  res.render("cart", carttemplateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
