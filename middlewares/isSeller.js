const User = require('../models/Users');

const isSeller = async (req,res,next)=>{
   try{ 
        const user= await User.findById(req.body.UserId);
        if(user.user_type!="seller"){
            throw Error("Not an authorized Seller");
        }
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = isSeller;