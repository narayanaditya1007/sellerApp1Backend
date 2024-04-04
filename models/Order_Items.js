const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    buyer_details:{
        name: String,
        phone: Number,
        address: String
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    seller_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exp_delivery_date: String,
    status: String
})

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item;