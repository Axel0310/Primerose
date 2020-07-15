var express = require('express');
var router = express.Router();
const productModel = require("./../models/Product");

router.post("/", async (req, res, next) =>{
    try {
        const product = await productModel.create(req.body);
        // let subtotal = req.body.select-quantity*req.body.select-size;
        res.render("cart", {product})
    } catch (error) {
        next(error)
    }
});

module.exports = router;
