const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const shopModel = require("./../models/Shop");
const productModel = require("./../models/Product");
const categoryModel = require("./../models/Category");

router.get("/", async (req, res, next) => {
  try {
    const shops = await shopModel.find().sort({ name: 1 });
    // res.json(shops);
    res.render("shops", { shops: shops });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    res.json(await shopModel.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const shop = await shopModel.findById(req.params.id);
    const products = await productModel.find({ shop: req.params.id });
    res.render("one_shop", { shop, products });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/add-product", async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res.render("forms/add_product", { categories });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/add-product",
  uploader.single("picture"),
  async (req, res, next) => {
    const {
      name,
      description,
      price,
      genre,
      category,
      qtyXXS,
      qtyXS,
      qtyS,
      qtyM,
      qtyL,
      qtyXL,
      qtyXXL,
    } = req.body;

    const inputQuantities = [
      {
        size: "XXS",
        quantity: qtyXXS,
      },
      {
        size: "XS",
        quantity: qtyXS,
      },
      {
        size: "S",
        quantity: qtyS,
      },
      {
        size: "M",
        quantity: qtyM,
      },
      {
        size: "L",
        quantity: qtyL,
      },
      {
        size: "XL",
        quantity: qtyXL,
      },
      {
        size: "XXL",
        quantity: qtyXXL,
      },
    ];
    const sizesAvailable = inputQuantities.filter((size) => size.quantity > 0);
    const shop = req.params.id;

    const addedProduct = await productModel.create({
      name,
      description,
      price,
      genre,
      category,
      sizesAvailable,
      image: req.file ? req.file.path : "/images/default_product.png",
      shop,
    });
    const shopObj = await shopModel.findById(shop);
    shopObj.products.push(addedProduct._id);
    await shopModel.findByIdAndUpdate(shop, shopObj);
    req.flash("success", "Product successfully added!");
    res.redirect(`/shops/${shop}/add-product`);
  }
);

router.get("/:id/shop-dashboard", async (req, res, next) => {
  try {
    const shop = await shopModel.findById(req.params.id).populate({path: "products", populate: {path: "category"}});
    res.render("shop-dashboard", shop)
  } catch (error) {
    next(error)
  }
})

router.get("/:id/delete-product/:prod", async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.params.prod);
    const shop = await shopModel.findById(req.params.id);
    const indexProd = shop.products.findIndex( prodId => prodId == req.params.prod);
    shop.products.splice(indexProd, 1);
    await shopModel.findByIdAndUpdate(req.params.id, shop);
    res.redirect(`/shops/${req.params.id}/shop-dashboard`);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
