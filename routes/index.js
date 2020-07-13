var express = require('express');
var router = express.Router();
const shopModel = require("../models/Shop");


/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
  const topShops = await shopModel.find().sort({view:-1}).limit(10);
  const newShops = await shopModel.find().sort({date:1}).limit(10);
  res.render('home', { title: 'Home' }, {topShops}, {newShops});
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
