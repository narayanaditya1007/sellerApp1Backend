const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const authorize_seller = require('../middlewares/authorize_product_seller');
const Product_controller = require('../controllers/Product_controller');

const Router = express.Router();


// search products --buyer
Router.get('/product',Product_controller.searchProduct);

 

// get products listed by a seller
Router.get('/product/seller',authenticate_login,Product_controller.getListedProducts)


// add new product
Router.post('/product/',authenticate_login,Product_controller.addProduct);


// update product 
Router.put('/product/',authenticate_login,authorize_seller,Product_controller.updateProduct);


// get particular product details
Router.get('/product/:productId',Product_controller.getDetail)




module.exports= Router;

// you can have keyboard

