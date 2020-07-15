var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/cart", async (req, res, next) =>{
    try {
        const product = await productModel.create(req.body);
        // let subtotal = req.body.select-quantity*req.body.select-size;
        res.render("cart", {product})
    } catch (error) {
        next(error)
    }
});

module.exports = router;
