const express = require('express');
const authenticate_login = require('../middlewares/authenticate_user_login');
const User_controller=require('../controllers/User_controller');
const isAdmin = require('../middlewares/isAdmin')

const Router = express.Router();


// user login
Router.post('/user/login',User_controller.login);

// user singup
Router.post('/user/signup',User_controller.signup);

// user logout
Router.post('/user/logout',User_controller.logout)

// update user detail
Router.put('/user/update-details',authenticate_login,User_controller.updateDetails);

// approve seller
Router.put('/user/approve',authenticate_login,isAdmin,User_controller.approveSeller)

// remove seller
Router.put('/user/remove',authenticate_login,isAdmin,User_controller.removeSeller)

// get user details
Router.get('/user/details',authenticate_login,User_controller.getMydetails)

// get all sellers
Router.get('/user/sellers',authenticate_login,isAdmin,User_controller.getAllSellers)


module.exports= Router;