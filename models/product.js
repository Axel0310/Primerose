const mongoose = require("mongoose");
const { timeStamp } = require("console");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    quantityAvailable: Number,
    price: Number,
    image: String,
    view: Number,
    sellscount: Number,
    genre: {
        type: String,
        enum: ["men", "women"]
    },
    category: {
        type: String,
        enum: ["Coats & Jackets", "Dresses", "Sweatshirts","Jeans","Jumpsuits","Shorts","Skirts","Suits","Swimwear","Tops", "Tracksuits","Trousers","Workwear","Lingerie"]
    },
    git : {
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
    },
})

const productModel = mongoose.model("Product", productSchema);

module.exports = productSchema;