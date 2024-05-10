const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const authorize_seller = require('../middlewares/authorize_order_seller');
const authenticateGateway = require('../middlewares/authenticate_gateways')
const Order_item_controller = require('../controllers/Order_Item_controller');
const Router = express.Router();


// place order
Router.post('/order/placeOrder',authenticateGateway,Order_item_controller.placeOrder)

// get all ordered items --seller
Router.get('/orderItem/seller',authenticate_login,Order_item_controller.getAllItemforSeller) 

// get order detail by orderId
Router.get('/order/:orderId',authenticateGateway,Order_item_controller.getOrderDetail)



// update delivery status --seller
Router.put('order/update',authenticate_login,authorize_seller,Order_item_controller.updateStatus);


// cancel order --buyer
Router.put('order/cancel',authenticateGateway,Order_item_controller.cancelOrder);

module.exports= Router;



