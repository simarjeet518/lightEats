
# Food Pick-up Ordering App

A full-stack food-ordering pick-up application with notifications features on app and through SMS as a fulfillment of Lighthouse Lab's midterm  group project.

## Features
- Hungry clients of the  restaurant can visit its website, select one or more dishes and place an order for pick-up
- When an order is placed the restaurant receives the order notification via SMS 
- The restaurant can then specify how long it will take to fulfill it.
- Once they provide this information, the website updates for the client and also notifies them via SMS.
- When the order is prepared  restaurant notifies client again with message as "your order is ready to pick up".


## Final Product

### Home Page
!["Home Page"](https://github.com/simarjeet518/lightEats/blob/master/docs/home-page.png?raw=true)

### Cart page
!["cart page"](https://github.com/simarjeet518/lightEats/blob/master/docs/cart.png?raw=true)


### Restaurant home page
!["restaurant page"](https://github.com/simarjeet518/lightEats/blob/master/docs/restaurent.png?raw=true)


### Client order page
!["order-page](https://github.com/simarjeet518/lightEats/blob/master/docs/orderStatus.png?raw=true)


!["ready to pick up status"](https://github.com/simarjeet518/lightEats/blob/master/docs/readytopickup.png?raw=true)



### SMS Notifications
!["SMS!"](https://github.com/simarjeet518/lightEats/blob/master/docs/SMS1.png?raw=true)

!["SMS2](https://github.com/simarjeet518/lightEats/blob/master/docs/SMS2.png?raw=true)


## Dependencies
- Node 10.x or above
- Npm 5.x or above
- Pg 6.x
- Pg-native 3.0.0 or above
- Cookie-parser
- dotenv
- EJS
- Express
- Js-Cookie
- Sass
- Twilio

## Getting Started

1. Create the `.env` by using `.env.example` as a reference.
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Run the server: `npm run local`
5. Visit `http://localhost:8080/`


