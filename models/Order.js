const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        list: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: Number
    }],
    orderDate: {
        type: Date,
        default: Date.now()
    },
    totalPrice: Number
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;