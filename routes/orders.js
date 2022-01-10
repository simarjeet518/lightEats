const express = require("express");
const { idleTimeoutMillis } = require("pg/lib/defaults");
const router = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {



    db.query(` SELECT distinct orders.created_at , orders.id ,customers.name as customer_name ,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity
      FROM orders
      JOIN orders_items ON orders.id = orders_items.order_id
      JOIN customers ON customer_id= customers.id
      JOIN menu_items ON menu_items.id = orders_items.id
      WHERE customer_id = $1
      ORDER BY orders.id desc;
      `, [req.params.user_id])
    .then(data => {


       const result = data.rows;
  //     //  let totalQuanity=0 ;
  //     let quantityObject={};
  //     for(let item of result) {

  //        if(Object.keys(quantityObject).includes((item.id).toString())){
  //          console.log("Here");
  //          quantityObject[item.id] = item.quantity+quantityObject[item.id];
  //        }
  //        else {
  //          quantityObject[item.id] = item.quantity;
  //        }
  //     }

  //     const templatevars={}
  //  for(let item of result){

  //  }

      //res.json(result);
      res.render('orders', {id:2 ,result:result});
    })
    .catch(err => res.json(err.message));
  });
  return router;
};

// render to a ejs
//const templatevars = {
  //       ordersArray
  //     };
  //     res.render("orders", templatevars);
