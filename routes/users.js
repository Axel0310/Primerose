var express = require('express');
var router = express.Router();
const productModel = require("./../models/Product");
const userModel = require("./../models/User");

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
  console.log("cart>>>", cart);
  let total = 0;

cart.forEach( (productInfo) => {
  let productPrice = Number(productInfo.price);
  let productQuantity = Number(productInfo.quantity);

const subtotal = productPrice*productQuantity;
productInfo.subtotal = subtotal;
total +=subtotal;
  console.log("cart>>>", cart);

})
  res.render("cart", {cart, total})
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

router.get("/cart/update/:id", async (req,res,next) => {
  try {
  let cart = req.session.userCart; 

   const isProductId = (productInfo) => {
     return productInfo.id === req.params.id;   }
   cart.findIndex(isProductId);
   const productIndex = cart.findIndex(isProductId);

   cart[productIndex].quantity = req.query.quantity;
  console.log("this is the new cart>>>", cart);

  let total = 0;

  cart.forEach( (productInfo) => {
    let productPrice = Number(productInfo.price);
    let productQuantity = Number(productInfo.quantity);
  
  const subtotal = productPrice*productQuantity;
  productInfo.subtotal = subtotal;
  total +=subtotal;
    console.log("cart>>>", cart);
  })

res.render("cart", {cart, total});
  }
  catch (error) {
    next(error);
  }
});

router.get("/favorites/:id", (req,res,next) => {
  try {
console.log("this is the current user >>>" , req.session.currentUser);
if(req.session.currentUser) {
const currentUser = req.session.currentUser;
if(currentUser.favoriteProducts.includes(req.params.id)) {
  req.flash("error", "This product is already in your favorites");
}

else {
currentUser.favoriteProducts.push(req.params.id);
console.log("this is the current user after adding product to favorites >>>" , req.session.currentUser);
req.flash("success", `This product has been added to your favorites`);
}

}
else {
  console.log("we entered the else of the favorite products route")
  req.flash("error", "You need to login to add this product to your favorites");
}
res.redirect(`/products/detailed/${req.params.id}`);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
