// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
//const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//helper functions
const getClientOrders = (id) => {
  return db.query(`
  SELECT * 
  FROM orders
  JOIN orders_items ON orders.id = orders_items.order_id
  JOIN menu_items ON menu_items.id = menu_item_id
  WHERE user_id = $1 
  `, [id])
  .then(res => {
    return res.rows;
  })
  .catch(err => err.message);
}

const getRestaurantOrders = (id) => {
  return db.query(`
  SELECT * 
  FROM orders
  JOIN orders_items ON orders.id = orders_items.order_id
  JOIN menu_items ON menu_items.id = menu_item_id
  WHERE restaurant_id = $1 
  `, [id])
  .then(res => {
    return res.rows;
  })
  .catch(err => err.message);
}

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

app.get("/", (req, res) => {
  //sql
  const templatevars = {
  };
  res.render("index", templatevars);
});

app.get("/login", (req, res) => {
  res.render('login');
});
//clinet
app.post("/login", (req, res) => {
  const username = req.body.username;
  //sql query get userObj{id}
  if (userObj.id === "restaurat_owner_id") {
    res.redirect("/admin/:restaurantid");
  } else {
    res.redirect("/");
  }
});


//client orders page
app.get("/:userid/orders", (req, res) => {
  const id = req.params.userid;
  const clinetOrders = getClientOrders(id);
  clinetOrders
  .then(res => {
    const ordersArray = res;
    const templatevars = {
      ordersArray
    };
    res.render("orders", templatevars);
  })
});

//check shopping cart
app.get("/:userid/cart", (req, res) => {
  res.render("cart");
});
//submit order
app.post("/:userid/cart", (req, res) => {
  //date => insert into table orders, orders_items
  res.redirect("/:userid/orders");
});

//restaurant admin page
app.get("/admin/:restaurantid", (req, res) => {
  const id = req.params.restaurantid;
  const newOrders = getRestaurantOrders(id);
  newOrders
  .then(res => {
    const newOrdersArray = res;
    const templatevars = {
      newOrdersArray
    };
    res.render("admin", templatevars);
  })
});

//when click on Accept/DONE
app.post("/admin/:restaurantid/:function", (req, res) => {
  const id = req.params.restaurantid;
  if (req.params.function === 'accpet') {
    //send msm to clinet
    //update clinet orders page <time> button
    return;
  }
  if (req.params.function === 'done') {
    //send msm to client
    //INSERT INTO orders table SET timestamp2 = NOW();
    //current order moved to past orders
    return;
  }
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
