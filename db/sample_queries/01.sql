
 const queryString = `INSERT INTO orders(customer_id,order_total)
 VALUES($1,$2) RETURING *;`

 db.query(queryString,values)
 .then((data)=>{

   //values(data.row[0].id) as order_id
   db.query(INSERT INTO orders_items(order_id, menu_item_id, quantity) values ($1,$2,$3);`,values)
   .then(()=>
   redirect to orders/userid)
 })

 `INSERT INTO orders_items(order_id, menu_item_id, quantity) values ($1,$2,$3);`;



