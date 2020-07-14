var express = require('express');
var router = express.Router();
const shopModel = require("../models/Shop");


/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
  const topShops = await shopModel.find().sort({view:-1}).limit(5);
  const newShops = await shopModel.find().sort({date:1}).limit(5);
  res.render('home', { title: 'Home', topShops: topShops, newShops: newShops});
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
