const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    price : Number,
    description: String,
    category: String,
    image: String,
    rating: Object
})

const AllProduct = mongoose.model("products",schema); 

module.exports = AllProduct;