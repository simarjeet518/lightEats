const express = require("express");
const { idleTimeoutMillis } = require("pg/lib/defaults");
const router = express.Router();
//const createtempVars = require("./public/scripts/orders-helpers.js")


const queryString =` SELECT  orders.created_at , orders.id ,customers.name as customer_name ,orders.order_total,menu_items.name,menu_items.price,orders_items.quantity
FROM orders
JOIN orders_items ON orders.id = orders_items.order_id
JOIN customers ON customer_id= customers.id
JOIN menu_items ON menu_items.id = orders_items.menu_item_id
WHERE customer_id = $1
ORDER BY orders.id ;`;


module.exports = (db) => {
  router.get("/", (req, res) => {
     db.query(queryString,[1])
    .then(data => {
      const result = data.rows;
     if(result.length !==0){
     console.log("here");
     const tempVars = createtempVars(result);
     res.render('orders', {id:2 ,user_id:2,username:"simar",result:tempVars});
   }
   else {
    res.render('orders', {id:2 ,result:null});
   }
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
        newObj.order_total= (result[i].order_total/100).toFixed(2);
        newObj.quantity = 0;
        orderAlreadyinResult="old";
        newObj.items =[];
       }

        let b ={
          item_name:result[i].name,
          quantity :result[i].quantity,
          price:(result[i].price/100).toFixed(2)
        }
        newObj.items.push(b);

        newObj.quantity += result[i].quantity;


     }
     else {

      ordersArray.push(newObj)
       newObj ={};
       a= result[i].id;
       orderAlreadyinResult="new";
       i--;
     }
     if(i ===result.length-1){
       ordersArray.push(newObj);
     }
   }
   return ordersArray;
 }
