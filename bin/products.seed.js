require("dotenv").config();
require("./../config/mongodb");

const productModel = require("./../models/Product");

const categoryModel = require("./../models/Category");

const categories = [
  {
    genre: ["Men", "Women"],
    name: "Coats & Jackets",
  },
  {
    genre: ["Women"],
    name: "Dresses",
  },
  {
    genre: ["Men", "Women"],
    name: "Sweatshirts",
  },
  {
    genre: ["Men", "Women"],
    name: "Jeans",
  },
  {
    genre: ["Men", "Women"],
    name: "Jumpsuits",
  },
  {
    genre: ["Men", "Women"],
    name: "Shorts",
  },
  {
    genre: ["Women"],
    name: "Skirts",
  },
  {
    genre: ["Men"],
    name: "Suits",
  },
  {
    genre: ["Men", "Women"],
    name: "Swimwear",
  },
  {
    genre: ["Men", "Women"],
    name: "Tops",
  },
  {
    genre: ["Men", "Women"],
    name: "Tracksuits",
  },
  {
    genre: ["Men", "Women"],
    name: "Trousers",
  },
  {
    genre: ["Men", "Women"],
    name: "Workwear",
  },
  {
    genre: ["Men", "Women"],
    name: "Lingerie",
  },
  {
    genre: ["Men"],
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
        price: 6,
        view: 12,
        genre: "Women",
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
        genre: "Women",
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
        genre: "Women",
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
        genre: "Men",
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
        genre: "Men",
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
