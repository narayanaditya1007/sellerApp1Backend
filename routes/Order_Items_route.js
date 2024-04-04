const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const authorize_seller = require('../middlewares/authorize_order_seller');
const Order_item_controller = require('../controllers/Order_Item_controller');
const Router = express.Router();


// place order
Router.post('/order/placeOrder',Order_item_controller.placeOrder)

// get all ordered items --seller
Router.get('/order/seller',authenticate_login,Order_item_controller.getAllItemforSeller)


// update delivery status --seller
Router.put('/order/update',authenticate_login,authorize_seller,Order_item_controller.updateStatus);


// cancel order --buyer
Router.put('/order/cancel',Order_item_controller.cancelOrder);

module.exports= Router;



