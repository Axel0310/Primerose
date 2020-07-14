const mongoose = require("mongoose");
const { timeStamp } = require("console");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: {
        type: String,
        default: "/images/default_product.png"
    },
    view: {
        type: Number,
        default: 0
    },
    sellsCount: {
        type: Number,
        default: 0
    },
    genre: {
        type: String,
        enum: ["men", "women"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    sizesAvailable: [{
        size : {
            type : String,
            enum: ["XXS", "XS", "S", "M", "L", "XL", "XXL"]
        },
        quantity: Number
    }],
})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;

