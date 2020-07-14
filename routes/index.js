var express = require('express');
var router = express.Router();
const shopModel = require("../models/Shop");
const categoryModel = require("./../models/Category")


/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
  const topShops = await shopModel.find().sort({view:-1}).limit(5);
  const newShops = await shopModel.find().sort({date:1}).limit(5);
  const tagsList = await categoryModel.find();
  res.render('home', { title: 'Home', topShops: topShops, newShops: newShops, tagsList: tagsList});
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
