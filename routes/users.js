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
  cart.map
  res.render("cart", {cart})
});

router.get("/cart", async (req, res, next) => {
  try {
       const cart = req.session.userCart; 
    res.render("cart", {cart});
  } catch (error) {
    next(error)
  }
})

router.get("/cart/delete/:id", async (req, res, next) => {
  try {
   const cart = req.session.userCart; 
   const isProductId = (productInfo) => {
     productInfo.id === req.params.id;
   }
   const productIndex = cart.findIndex(isProductId);
    cart.splice(productIndex,1);
    res.redirect("/user/cart");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
