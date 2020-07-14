require("dotenv").config();
require("./../config/mongodb");

const productModel = require("./../models/Product");

const categoryModel = require("./../models/Category");

const categories = [
  {
    genre: ["men", "women"],
    name: "Coats & Jackets",
  },
  {
    genre: ["women"],
    name: "Dresses",
  },
  {
    genre: ["men", "women"],
    name: "Sweatshirts",
  },
  {
    genre: ["men", "women"],
    name: "Jeans",
  },
  {
    genre: ["men", "women"],
    name: "Jumpsuits",
  },
  {
    genre: ["men", "women"],
    name: "Shorts",
  },
  {
    genre: ["women"],
    name: "Skirts",
  },
  {
    genre: ["men"],
    name: "Suits",
  },
  {
    genre: ["men", "women"],
    name: "Swimwear",
  },
  {
    genre: ["men", "women"],
    name: "Tops",
  },
  {
    genre: ["men", "women"],
    name: "Tracksuits",
  },
  {
    genre: ["men", "women"],
    name: "Trousers",
  },
  {
    genre: ["men", "women"],
    name: "Workwear",
  },
  {
    genre: ["men", "women"],
    name: "Lingerie",
  },
  {
    genre: ["men"],
    name: "Underwear",
  },
];

categoryModel
  .insertMany(categories)
  .then((cat) => {
    console.log(cat);
    const products = [
      {
        name: "Robe fleurie",
        description: "Cousu main pres du Canal Saint Martin",
        image : "./../public/images/logo-maison-francette.png",
        price: 6,
        view: 12,
        genre: "women",
        category: cat[1]._id,
        sizesAvailable: [
          { size: "M", quantity: 3 },
          { size: "L", quantity: 10 },
        ],
      },
      {
        name: "Veste de travail",
        description: "Materiau brut et finitions parfaites",
        price: 50,
        view: 60,
        genre: "women",
        category: cat[0]._id,
        sizesAvailable: [
          { size: "S", quantity: 13 },
          { size: "M", quantity: 12 },
        ],
      },
      {
        name: "Itsbitsi Bikini",
        description: "Un tout petit petit bikini",
        price: 40,
        view: 30,
        genre: "women",
        category: cat[8]._id,
        sizesAvailable: [
          { size: "XS", quantity: 23 },
          { size: "S", quantity: 18 },
        ],
      },
      {
        name: "Random jean",
        description: "a random jean",
        price: 70,
        view: 10,
        genre: "men",
        category: cat[3]._id,
        sizesAvailable: [
          { size: "XS", quantity: 23 },
          { size: "S", quantity: 18 },
        ],
      },
      {
        name: "Random jacket",
        description: "a random jacket",
        price: 150,
        view: 10,
        genre: "men",
        category: cat[7]._id,
        sizesAvailable: [
          { size: "XS", quantity: 23 },
          { size: "S", quantity: 18 },
        ],
      },
    ];

    productModel
      .insertMany(products)
      .then((dbRes) => console.log(dbRes))
      .catch((dbErr) => console.log(dbErr));
  })
  .catch((dbErr) => console.log(dbErr));
