DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS menu_items  CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items  CASCADE;

CREATE TABLE customers  (
  id SERIAL PRIMARY KEY  NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE DEFAULT 1, --dealing with one restaurant only no need to insert any value
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  finalized_at TIMESTAMP , --- we can keep this null at the time of order creation
  done_time  TIMESTAMP,
  status VARCHAR(255) NOT NULL CONSTRAINT check_string_entered  CHECK ( status='Pending' OR status='Finalized' OR status='Ready to pick up' OR status='Delivered' ) DEFAULT 'Pending',  -- first letter is capital
  set_time INTEGER NOT NULL DEFAULT 2  --- default 2 minutes
 );

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE  DEFAULT 1,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL DEFAuLT 'A',  -- not using this for now
  price INTEGER  NOT NULL CONSTRAINT positive_price CHECK (price >= 0) DEFAULT 0, -- price storing  in cents
  image VARCHAR(255) NOT NULL
);

CREATE TABLE order_items (
 id SERIAL PRIMARY KEY NOT NULL,
 order_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
 menu_item_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
 quantity SMALLINT NOT NULL CONSTRAINT positive_quantity CHECK (quantity >= 0)

);




