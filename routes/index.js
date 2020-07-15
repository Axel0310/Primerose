var express = require('express');
var router = express.Router();
const shopModel = require("../models/Shop");
const categoryModel = require("./../models/Category")


/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log(req.session.currentUser)
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

router.get("/search-results", async (req,res,next) => {
  try {
    let searchResults = []
    let input = req.body;
    console.log("the input is >>>", input);

    input=input.toLowerCase(); 

  const products = await productModel.insertMany();
    console.log("here is the list of products >>>", products);

for (let i=0; i<products.length; i++) {
    if(products[i].name.includes(input)) {
        console.log("here are the search results >>>>", products[i]);
        searchResults.push(products[i]);
        return searchResults;
    }
}
res.render("search_results", {searchResults});
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;
