const express = require('express');
const review_controller = require('../controllers/Review_controller');
const authorize_seller = require('../middlewares/authorize_product_seller')
const authenticate_login = require('../middlewares/authenticate_user_login')
const Router = express.Router();


//get all review for product
Router.get('/review',review_controller.getAllReviews);


// add review
Router.post('/review',review_controller.addReview);

// add response
Router.put('/review/response',authenticate_login,authorize_seller,review_controller.addResponse);




module.exports= Router;