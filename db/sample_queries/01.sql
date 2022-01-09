SELECT accepted_at  FROM orders WHERE ID =1;
/* All accepted at , prepared at , picked at is null at the time of order creation

created_at is set default do not need to insert , when order is made transactions flows on database  will be like this
IF(SELECT accepted_at  FROM orders WHERE ID =1;) MEANS NULL ORDER IS PENDING , status of order on user side is pending


WHEN RESTAURENT CLICKS ACCEPT BUTTON
UPDATE TABLE SET accepted_at = now(); ===> if(prepared_at is not null)=> status changes to ready in -- miutes;

WHEN RESTAURENT CLICKS DONE BUTTON
UPDATE TABLE SET prepared _at = now();  ===> if(prepared_at is not null) ====>status on user side is ready to pick up

// when restaurent clicks delivers buttton

UPDATE TABLE SET picked_at = now();   ====> if(picked_at is not null) order from user moved to history or go away from screen

INSERT INTO orders (customer_id , order_total) value ($1, $2) RETURNING * //returns object then writing next query

.THEN
INSERT INTO  order_items(order_id,menu_item_id,quantity) VALUES (orders.id,$2,$3) //
*/


--query to select order details on restaurent side(new orders)
SELECT created_at ,orders.id,customers.name ,customers.phone ,order_total FROM orders
JOIN customers ON orders.customer_id = customers.id
WHERE accepted_at IS NULL;  -- RETURN  [{TIMESTAMP OERDER ID, NAME , PHONE },{}]  //length can tell how many new orders conatiner needed;

--- for each conatiner fetch items (new orders items)==> can be done in one query
SELECT order_items.menu_item_id , menu_items.name FROM order_items
JOIN menu_items ON  menu_item_id = menu_items.id
WHERE order_id = 2;

--query to select order details for past orders(fot specific customer)
SELECT created_at ,prepared_at ,orders.id as order_id,customers.name ,customers.phone ,order_total FROM orders
JOIN customers ON orders.customer_id = customers.id
WHERE picked_at IS  NOT NULL AND  customers.id =1
ORDER BY prepared_at;




