const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user_name:String,
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: Number,
    review: String,
    response: String,
    review_date: String
})

const Review = mongoose.model("Review",ReviewSchema);
module.exports = Review;