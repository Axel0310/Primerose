const mongoose = require("mongoose");
const { timeStamp } = require("console");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.maslonline.org%2Fstore%2FListProducts.aspx%3Fcatid%3D64531%26ftr%3D%26view_type%3D0&psig=AOvVaw1F-qZED9TE3s2sSfCNFlXe&ust=1594735295194000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNCR_YeyyuoCFQAAAAAdAAAAABAE"
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

