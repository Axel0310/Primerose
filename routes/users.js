var express = require('express');
var router = express.Router();
const productModel = require("./../models/Product");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/cart", async (req, res, next) =>{

  if(req.session.userCart)
  {
  req.session.userCart.push(req.body);
   } 
   else
   {
    req.session.userCart =[]
    req.session.userCart.push(req.body);
  }
  const cart = req.session.userCart;
  res.render("cart", {cart})
});

module.exports = router;
