const express = require("express");
const { idleTimeoutMillis } = require("pg/lib/defaults");
const router = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {



    db.query(` SELECT  orders.created_at , orders.id ,customers.name as customer_name ,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity
      FROM orders
      JOIN orders_items ON orders.id = orders_items.order_id
      JOIN customers ON customer_id= customers.id
      JOIN menu_items ON menu_items.id = orders_items.id
      WHERE customer_id = $1
      ORDER BY orders.id ;
      `,[req.params.user_id])
    .then(data => {
      const result = data.rows;

     const tempVars = createtempVars(result);

      res.render('orders', {id:2 ,result:tempVars});
    })
    .catch(err => res.json(err.message));
  });
  return router;
};

const createtempVars= function(result) {
  console.log(result.length);
  let ordersArray = [];
  let a= result[0].id;
  let newObj={}
  let orderAlreadyinResult ="new"
  for(let i=0; i<result.length;i++)
   {
    console.log(i);
     if(a === result[i].id){

       if(orderAlreadyinResult==="new"){
        newObj.id = result[i].id;
        newObj.created_at= result[i].created_at.toString().substring(0,24);
        newObj.customer_name = result[i].customer_name;
        newObj.order_total= result[i].order_total;
        newObj.quantity = 0;
        orderAlreadyinResult="old";
       }
        newObj[result[i].name] = {quantity :result[i].quantity,price:result[i].price};
        newObj.quantity += result[i].quantity;


     }
     else {

      ordersArray.push(newObj)
       newObj ={};
       a= result[i].id;
       orderAlreadyinResult="new";
       i--;
     }
     if(i ===result.length){
       ordersArray.push(newObj);
     }
   }
   return ordersArray;
 }
