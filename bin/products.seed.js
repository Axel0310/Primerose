require("dotenv").config();
require("./../config/mongodb");

const productModel = require("./../models/Product");
const categoryModel = require("./../models/Category");
const shopModel = require("./../models/Shop");

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
    genre: ["women"],
    name: "Lingerie",
  },
  {
    genre: ["men"],
    name: "Underwear",
  },
];

const shops = [
  {
    name: "Maison Francette",
    description: "Cousu main pres du Canal Saint Martin",
    view: 2300,
    image: "/images/logo-maison-francette.png",
  },
  {
    name: "Sezane",
    description: "Made in Paris",
    view: 1200,
    image:
      "https://www.connected-store.com/wp-content/uploads/2020/02/SezaneEco3.png",
  },
  {
    name: "Balzac",
    description: "Une marque éthique et tendance",
    view: 200,
    image:
      "https://www.slapdigital.fr/static/7c3ec037a9ac175fab0d0379e4ab0f2e/37d5a/logo-balzac-paris.png",
  },
];

Promise.all( [categoryModel.insertMany(categories), shopModel.insertMany(shops)] )
.then( ([categories, shops]) => {
  const products = [
    {
      name: "Robe fleurie",
      description: "Cousu main pres du Canal Saint Martin",
      image: "/images/logo-maison-francette.png",
      price: 6,
      view: 12,
      genre: "women",
      category: categories[1]._id,
      sizesAvailable: [
        { size: "M", quantity: 3 },
        { size: "L", quantity: 10 },
      ],
      shop: shops[0]._id,
    },
    {
      name: "Veste de travail",
      description: "Materiau brut et finitions parfaites",
      price: 50,
      view: 60,
      genre: "women",
      category: categories[0]._id,
      sizesAvailable: [
        { size: "S", quantity: 13 },
        { size: "M", quantity: 12 },
      ],
      shop: shops[1]._id,
    },
    {
      name: "Itsbitsi Bikini",
      description: "Un tout petit petit bikini",
      price: 40,
      view: 30,
      genre: "women",
      category: categories[8]._id,
      sizesAvailable: [
        { size: "XS", quantity: 23 },
        { size: "S", quantity: 18 },
      ],
      shop: shops[2]._id,
    },
    {
      name: "Random jean",
      description: "a random jean",
      price: 70,
      view: 10,
      genre: "men",
      category: categories[3]._id,
      sizesAvailable: [
        { size: "XS", quantity: 23 },
        { size: "S", quantity: 18 },
      ],
      shop: shops[1]._id,
    },
    {
      name: "Random jacket",
      description: "a random jacket",
      price: 150,
      view: 10,
      genre: "men",
      category: categories[7]._id,
      sizesAvailable: [
        { size: "XS", quantity: 23 },
        { size: "S", quantity: 18 },
      ],
      shop: shops[2]._id,
    },
  ];

  productModel
  .insertMany(products)
  .then( async (prods) => {
    shops[0].products = [prods[0]._id];
    shops[1].products = [prods[1]._id, prods[1]._id];
    shops[2].products = [prods[2]._id, prods[4]._id];
    console.log(shops[0])
    await shopModel.findByIdAndUpdate(shops[0]._id, shops[0]);
    await shopModel.findByIdAndUpdate(shops[1]._id, shops[1]);
    await shopModel.findByIdAndUpdate(shops[2]._id, shops[2]);
    console.log("====Insertion done====")
  });
  
})
.catch((dbErr) => console.log(dbErr));


