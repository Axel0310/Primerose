
const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const shopModel = require("./../models/Shop");
const productModel = require("./../models/Product");


router.get("/", async (req, res, next) => {
  try {
    const shops = await shopModel.find();
    res.json(shops);
    // res.render("shops", {shops: shops});
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) =>{
    try {
        res.json(await shopModel.create(req.body));
    } catch (error) {
        next(error)
    }
});

router.get("/shop/:id", async (req, res, next) => {
  try {
    const shop = await shopModel.findById(req.params.id);
    const products = await productModel.find({shop: req.params.id});
    res.render("one_shop", {shop, products});
  }
  catch (error) {
    next(error)
}
})

module.exports = router;
