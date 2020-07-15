const express = require("express");
const router = new express.Router();
const uploader = require("./../config/cloudinary");
const shopModel = require("./../models/Shop");
const productModel = require("./../models/Product");
const categoryModel = require("./../models/Category");
const userModel = require("./../models/User");

router.get("/", async (req, res, next) => {
  try {
    const shops = await shopModel.find().sort({ name: 1 });
    res.render("shops", { shops: shops });
  } catch (error) {
    next(error);
  }
});

router.get("/create", (req, res) => {
    res.render("forms/create_shop");
});

router.post("/create", uploader.single("image"), async (req, res, next) => {
  try {
    const newShop = req.body;
    newShop.image = req.file ? req.file.path : "/images/default_product.png";
    const createdShop = await shopModel.create(newShop);
    const user = await userModel.findById(req.session.currentUser._id)
    user.shop = createdShop._id;
    await userModel.findByIdAndUpdate(user._id, user);
    req.session.currentUser.shop = user.shop;
    req.flash("success", `Your shop has been successfully created!`);
    res.redirect(`/shops/${user.shop}/shop-dashboard`);
  } catch (error) {
    next(error);
  }
});

router.get("/update", async (req, res) => {
  res.render("forms/update_shop", await shopModel.findById(req.session.currentUser.shop));
});

router.post("/update", uploader.single("image"), async (req, res, next) => {
  try {
    const updatedShop = req.body;
    if(req.file) updatedShop.image = req.file.path;
    const shopId = req.session.currentUser.shop;
    const shop = await shopModel.findByIdAndUpdate(shopId, updatedShop);
    req.flash("success", `Your shop has been successfully updated!`);
    res.redirect(`/shops/${shopId}/shop-dashboard`);
  } catch (error) {
    next(error);
  }
});

router.get("/delete", async (req, res, next) => {
  try {
    const shopId = req.session.currentUser.shop;
    const products = (await shopModel.findById(shopId).select("products")).products;
    const promisesArr = [];
    products.forEach( prodId => {
      promisesArr.push(productModel.findByIdAndDelete(prodId))
    });
    await Promise.all(promisesArr);
    await shopModel.findByIdAndDelete(shopId);

    const userId = req.session.currentUser._id;
    const user = await userModel.findById(userId);
    user.shop = null;
    await userModel.findByIdAndUpdate(userId, user);
    req.session.currentUser.shop = null;
    req.flash("success", `Your shop has been successfully removed!`);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
})

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
  uploader.single("image"),
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
    req.flash("success", `Product "${name}" successfully added!`);
    res.redirect(`/shops/${shop}/add-product`);
  }
);

router.get("/:id/shop-dashboard", async (req, res, next) => {
  try {
    const shop = await shopModel
      .findById(req.params.id)
      .populate({ path: "products", populate: { path: "category" } });
    res.render("shop-dashboard", shop);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/delete-product/:prod", async (req, res, next) => {
  try {
    await productModel.findByIdAndDelete(req.params.prod);
    const shop = await shopModel.findById(req.params.id);
    const indexProd = shop.products.findIndex(
      (prodId) => prodId == req.params.prod
    );
    shop.products.splice(indexProd, 1);
    await shopModel.findByIdAndUpdate(req.params.id, shop);
    res.redirect(`/shops/${req.params.id}/shop-dashboard`);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/update-product/:prod", async (req, res, next) => {
  function getSizeQuantity(prod, val) {
    const sizeIndex = prod.sizesAvailable.findIndex(
      (sizeObj) => sizeObj.size === val
    );
    return sizeIndex === -1 ? 0 : prod.sizesAvailable[sizeIndex].quantity;
  }

  try {
    const product = await productModel.findById(req.params.prod);
    const categories = await categoryModel.find();
    res.locals.xxsSize = getSizeQuantity(product, "XXS");
    res.locals.xsSize = getSizeQuantity(product, "XS");
    res.locals.sSize = getSizeQuantity(product, "S");
    res.locals.mSize = getSizeQuantity(product, "M");
    res.locals.lSize = getSizeQuantity(product, "L");
    res.locals.xlSize = getSizeQuantity(product, "XL");
    res.locals.xxlSize = getSizeQuantity(product, "XXL");
    res.render("forms/update_product", {
      product: product,
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/update-product/:prod",
  uploader.single("image"),
  async (req, res, next) => {
    try {
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
      const sizesAvailable = inputQuantities.filter(
        (size) => size.quantity > 0
      );
      const product = await productModel.findById(req.params.prod);
      product.name = name;
      product.description = description;
      product.price = price;
      product.genre = genre;
      product.category = category;
      product.sizesAvailable = sizesAvailable;
      if (req.file) product.image = req.file.path;

      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.prod,
        product
      );
      req.flash("success", `Product "${name}" successfully updated!`);
      res.redirect(`/shops/${req.params.id}/shop-dashboard`);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
