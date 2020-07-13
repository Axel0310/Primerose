// Define all routes related to CRUD

const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const productModel = require("./../models/products");

router.get("/products/:cat", async (req, res, next) => {
  try {
    const products = await productModel.find({ category: req.params.cat});
    res.render("products", { products: products});
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.render("one_product", { product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
