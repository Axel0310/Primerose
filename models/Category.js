const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    genre: {
        type: [String],
        enum: ["men", "women"]
    },
    category: {
        type: String,
        enum: ["Coats & Jackets", "Dresses", "Sweatshirts","Jeans","Jumpsuits","Shorts","Skirts","Suits","Swimwear","Tops", "Tracksuits","Trousers","Workwear","Lingerie"]
    },
})

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;