const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //check login status
  router.get("/:user_id", (req, res) => {
    const user = req.session.user;
    if ( user.id != req.params.user_id) {
      return res.redirect("/");
    }

    const cart =
      {
        id: 1,
        name: 'john',
        email: 'johnabc@gmail.com',
        phone: '7788334525',
        quantity: 3,
        items: [
          {
            name: 'Coffee',
            id: 1,
            //please put item id
            img: 'https://www.sevensummitscoffee.com/uploads/1/3/1/2/131291290/s598870640510727702_p68_i1_w308.png',
            price: '245',
            number: 3
          },
          {
            name: 'Cookie',
            id: 2,
            img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg',
            price: '150',
            number: 1
          }
        ],
        total: 14.7
      };

    const templateVars = {
      user,
      cart
    };
    res.render('cart', templateVars);
  });
  return router;
};
