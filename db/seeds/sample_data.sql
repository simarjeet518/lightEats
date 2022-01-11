INSERT INTO customers (name, email , phone)
VALUES ('Kevin' , 'johnabc@gmail.com','6725151337'),
('Allen' , 'shaunabc@gmail.com','7782516942'),
('harsh' , 'harsh@email.com','7788334525');

INSERT INTO restaurants (name, phone, street, city, province, country, post_code)
VALUES ('LightEats', '7788334525','7237 137 St', 'Surrey', 'BC', 'Canada', 'V3H 29T');


INSERT INTO orders (customer_id,accepted_at,prepared_at,picked_at,order_total, set_time)
VALUES(1,now() + interval '20 seconds', now() + interval '2 minutes 20 seconds',now() + interval '3 minutes ' ,595, 2),
(2,now() + interval '40 seconds', now() + interval '5 minutes 40 seconds',now() + interval '6 minutes ' ,400, 5),
(1,now() + interval '44 seconds', now() + interval '5 minutes 44 seconds',now() + interval '6 minutes ' ,1395, 5),
(1,now() + interval '1 day 20 seconds', now() + interval '1 day 2 minutes 20 seconds',now() + interval '1 day 3 minutes ' ,1745, 2),
(1,now() + interval '2 day 20 seconds', now() + interval '2 day 2 minutes 20 seconds',now() + interval '2 day 3 minutes ' ,1225, 2),
(1,now() + interval ' 1 day 40 seconds', now() + interval '1 day 5 minutes 40 seconds',now() + interval ' 1 day 6 minutes ' ,1190, 5);

INSERT INTO orders (customer_id,order_total)
VALUES (1 ,400) ,(2,400);

INSERT INTO orders (customer_id,order_total , accepted_at)
VALUES (1 ,400 ,now()) ;
INSERT INTO orders (customer_id,order_total , accepted_at,prepared_at)
VALUES (1 ,400 ,now(),now()) ;

INSERT INTO menu_items (name,price,image_url)
VALUES('Coffee',245,'https://www.sevensummitscoffee.com/uploads/1/3/1/2/131291290/s598870640510727702_p68_i1_w308.png'),
('Tea',200,'https://i0.wp.com/pickuplineninja.com/wp-content/uploads/2020/05/tea-Pick-Up-Lines.jpeg?fit=500%2C344&ssl=1'),
('Cookie',150,'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg'),
('Sandwich',350,'https://static.toiimg.com/thumb/83740315.cms?width=1200&height=900'),
('Muffin',350,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimagesvc.meredithcorp.io%2Fv3%2Fmm%2Fimage%3Furl%3Dhttps%253A%252F%252Fstatic.onecms.io%252Fwp-content%252Fuploads%252Fsites%252F19%252F2011%252F04%252F08%252Fchocolate-chip-muffins-ck-2000.jpg&q=85'),
('Omelete',450,'https://c.ndtvimg.com/2020-07/3cqv032o_omelette_625x300_23_July_20.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675');

INSERT INTO orders_items (order_id, menu_item_id, quantity)
VALUES (1,1,1),(1,2,1),(1,3,1),
(2,2,2),
(3,1,1),(3,4,2),(3,5,1),
(4,1,1),(4,3,10),
(5,1,5),
(6,4,2),(6,1,2),
(7,1,2),(8,1,2),
(9,1,2),(9,1,2);

--UPDATE orders SET STATUS ='Delivered' where id <=6;
