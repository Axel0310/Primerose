const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profil: {
        type: String,
        enum: ["user", "admin"]
    },
    favoriteShops: [{
        type: Schema.Types.ObjectId,
        ref: "Shop"
    }],
    favoriteProducts: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    pastOrders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }],
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        default: null
    }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;