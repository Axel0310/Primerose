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
    size: M
  },
  {
    name: "Veste de travail",
    description : "Materiau brut et finitions parfaites",
    quantityAvailable: 20,
    price :50,
    view:60,
    genre:"women",
    category:"Coats & Jackets",
    size: L
  },
  {
    name: "Itsbitsi Bikini",
    description : "Un tout petit petit bikini",
    quantityAvailable: 50,
    price :40,
    view:30,
    genre:"women",
    category:"Swimwear",
    size: XS
  },
];

productModel
  .insertMany(products)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
