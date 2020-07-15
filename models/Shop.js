const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    image: String,
    description: String,
    view: Number,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    totalSales: Number,
    creationDate: {
        type : Date,
        default:Date.now,
}
})

const shopModel = mongoose.model("Shop", shopSchema);

module.exports = shopModel;