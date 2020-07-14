
const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const shopModel = require("./../models/Shop");

router.get("/", async (req, res, next) => {
  try {
    const shops = await shopModel.find().sort({name: 1});
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

module.exports = router;
