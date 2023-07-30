const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products"
        },
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: Object,
        quantity:{
            type:Number,
            default:1
        }
    }]
});

const Cart = mongoose.model("cart",cartSchema);

module.exports = Cart;