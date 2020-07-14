// Define all routes related to CRUD

const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const productModel = require("./../models/Product");
const categoryModel = require("./../models/Category");

router.get("/", async (req, res, next) => {
  try {
    res.json(await productModel.find());
  } catch (error) {
    next(error)
  }
})

router.get("/detailed/:id", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.render("one_product", product);
  } catch (error) {
    next(error);
  }
});

router.get("/:genre/:cat", async (req, res, next) => {
  try {
    const products = await productModel.find({ genre: req.params.genre, category: req.params.cat}).populate("category");
    res.render("products", products);
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
