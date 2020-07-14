// Define all routes related to CRUD

const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const productModel = require("./../models/Product");

router.get("/", async (req, res, next) => {
  try {
    console.log("foo1")
    const products = await productModel.find();
    console.log("foo2")
    res.json(products);
  } catch (error) {
    next(error)
  }
})

router.get("/:cat", async (req, res, next) => {
  try {
    const products = await productModel.find({ category: req.params.cat});
    res.render("products", { products: products});
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.render("one_product", { product });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) =>{
    try {
        res.json(await productModel.create(req.body));
    } catch (error) {
        next(error)
    }
});

module.exports = router;
