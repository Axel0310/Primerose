const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name: String,
    image: String,
    description: String,
    view: Number,
    products: [{
        type: Schema.Types.ObjectId,
        ref: "product"
    }],
    totalSales: Number,
    creationDate: {
        type : Date,
        default:Date.now,
}
})

const shopModel = mongoose.model("Shop", shopSchema);

module.exports = shopModel;