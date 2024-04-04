const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    seller_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    images: [],
    quantity: Number
})

const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;