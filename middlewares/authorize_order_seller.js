const OrderItem = require('../models/Order_Items');

const authorize_seller = async(req,res,next) =>{
    try{
        const orderItem = await OrderItem.findById(req.body.itemId);
        // console.log(product.seller_id);
        //     console.log(req.body.UserId);
        if(orderItem.seller_id.equals(req.body.UserId)){
            
            next();
        }
        else{
            res.send("You are not the original seller of this product")
            throw Error("Not Original Seller");
            
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = authorize_seller;