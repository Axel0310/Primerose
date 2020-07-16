var express = require("express");
var router = express.Router();
const productModel = require("./../models/Product");
const userModel = require("./../models/User");
const shopModel = require("./../models/Shop");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/accountinformation", async (req, res, next) => {
  const user = await userModel
    .findById(req.session.currentUser._id)
    .populate("favoriteProducts")
    .populate("favoriteShops");
  const favoriteProducts = user.favoriteProducts;
  const favoriteShops = user.favoriteShops;
  res.render("my_account_info", { user, favoriteProducts, favoriteShops });
});

router.post("/cart", async (req, res, next) => {
  if (req.session.userCart) {
    req.session.userCart.push(req.body);
  } else {
    req.session.userCart = [];
    req.session.userCart.push(req.body);
  }
  const cart = req.session.userCart;
  console.log("cart>>>", cart);
  let total = 0;

  cart.forEach((productInfo) => {
    let productPrice = Number(productInfo.price);
    let productQuantity = Number(productInfo.quantity);

    const subtotal = productPrice * productQuantity;
    productInfo.subtotal = subtotal;
    total += subtotal;
    console.log("cart>>>", cart);
  });
  res.render("cart", { cart, total });
});

router.get("/cart", async (req, res, next) => {
  try {
    const cart = req.session.userCart;
    res.render("cart", { cart });
  } catch (error) {
    next(error);
  }
});

router.get("/cart/delete/:id", async (req, res, next) => {
  try {
    const cart = req.session.userCart;
    const isProductId = (productInfo) => {
      productInfo.id === req.params.id;
    };
    const productIndex = cart.findIndex(isProductId);
    cart.splice(productIndex, 1);
    res.redirect("/user/cart");
  } catch (error) {
    next(error);
  }
});

router.get("/cart/update/:id", async (req, res, next) => {
  try {
    let cart = req.session.userCart;

    const isProductId = (productInfo) => {
      return productInfo.id === req.params.id;
    };
    cart.findIndex(isProductId);
    const productIndex = cart.findIndex(isProductId);

    cart[productIndex].quantity = req.query.quantity;
    console.log("this is the new cart>>>", cart);

    let total = 0;

    cart.forEach((productInfo) => {
      let productPrice = Number(productInfo.price);
      let productQuantity = Number(productInfo.quantity);

      const subtotal = productPrice * productQuantity;
      productInfo.subtotal = subtotal;
      total += subtotal;
      console.log("cart>>>", cart);
    });

    res.render("cart", { cart, total });
  } catch (error) {
    next(error);
  }
});

router.get("/favorites/shop/:id", async (req, res, next) => {
  try {

    if (req.session.currentUser) {
      const currentUser = req.session.currentUser;

      if (currentUser.favoriteShops.includes(req.params.id)) {
        req.flash("error", "This shop is already in your favorites");

      } else {
        const favShops = currentUser.favoriteShops;
        console.log(
          "here are the favorite products of the user before adding new>>>",
          favShops
        );
        const userId = currentUser._id;
        favShops.push(req.params.id);
        let newUser = await userModel.findByIdAndUpdate(
          userId,
          { favoriteShops: favShops },
          { new: true }
        );
        req.flash("success", `This shop has been added to your favorites`);
      }
    } else {
      req.flash(
        "error",
        "You need to login to add this shop to your favorites"
      );
    }
    res.redirect(`/shops/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

router.get("/favorites/:id", async (req, res, next) => {
  try {

    if (req.session.currentUser) {
      const currentUser = req.session.currentUser;

      if (currentUser.favoriteProducts.includes(req.params.id)) {
        req.flash("error", "This product is already in your favorites");

      } else {
        const favProducts = currentUser.favoriteProducts;
        console.log(
          "here are the favorite products of the user before adding new>>>",
          favProducts
        );
        const userId = currentUser._id;
        favProducts.push(req.params.id);
        let newUser = await userModel.findByIdAndUpdate(
          userId,
          { favoriteProducts: favProducts },
          { new: true }
        );
        req.flash("success", `This product has been added to your favorites`);
      }
    } else {
      req.flash(
        "error",
        "You need to login to add this product to your favorites"
      );
    }
    res.redirect(`/products/detailed/${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
