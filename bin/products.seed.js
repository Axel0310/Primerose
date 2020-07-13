require("dotenv").config();
require("./../config/mongodb");

const productModel = require("./../models/Product");

const products = [
  {
    name: "Robe fleurie",
    description : "Cousu main pres du Canal Saint Martin",
    quantityAvailable: 10,
    price :6,
    view:12,
    genre:"women",
    category:"Dresses",
    sizesAvailable: [{size : "M", quantity:3}, {size : "L", quantity:10}],
  },
  {
    name: "Veste de travail",
    description : "Materiau brut et finitions parfaites",
    quantityAvailable: 20,
    price :50,
    view:60,
    genre:"women",
    category:"Coats & Jackets",
    sizesAvailable: [{size : "S", quantity:13}, {size : "M", quantity:12}],
  },
  {
    name: "Itsbitsi Bikini",
    description : "Un tout petit petit bikini",
    quantityAvailable: 50,
    price :40,
    view:30,
    genre:"women",
    category:"Swimwear",
    sizesAvailable: [{size : "XS", quantity:23}, {size : "S", quantity:18}],
  }
];

productModel
  .insertMany(products)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
