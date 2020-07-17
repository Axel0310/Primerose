var express = require('express');
var router = express.Router();
const shopModel = require("../models/Shop");
const productModel = require("./../models/Product");


/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log(req.session.currentUser)
  try {
  const topShops = await shopModel.find().sort({view:-1}).limit(5);
  const newShops = await shopModel.find().sort({creationDate:1}).limit(5);
  res.render('home', { title: 'Home', topShops: topShops, newShops: newShops});
  }
  catch (error) {
    next(error);
  }
});

router.get("/search-results", async (req,res,next) => {
  try {
    let searchResults = [];
    let input = req.query.search;
   searchResults = await productModel.find({name: {$regex: input, $options: "i"}});
res.render("search_results", {searchResults});
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;
