require("dotenv").config();
require("./../config/mongodb");

const shopModel = require("./../models/Shop");

const shops = [
  {
    name: "Maison Francette",
    description : "Cousu main pres du Canal Saint Martin",
    view: 2300,
    image: "./../public/images/logo-maison-francette.png"
  },
  {
    name: "Sezane",
    description : "Made in Paris",
    view: 1200,
    image: "https://www.connected-store.com/wp-content/uploads/2020/02/SezaneEco3.png"
  },
  {
    name: "Balzac",
    description : "Une marque éthique et tendance",
    view: 200,
    image: "https://www.slapdigital.fr/static/7c3ec037a9ac175fab0d0379e4ab0f2e/37d5a/logo-balzac-paris.png"
  },
];

shopModel
  .insertMany(shops)
  .then((dbRes) => console.log(dbRes))
  .catch((dbErr) => console.log(dbErr));
