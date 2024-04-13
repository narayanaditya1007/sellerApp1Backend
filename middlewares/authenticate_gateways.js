require('dotenv').config();

const authenticateGateway = async(req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        console.log(token);
        if(token != process.env.GATEWAY_TOKEN){
            console.log("not authorized gateway");
            throw new Error("Gateway unauthorized")
        }
        console.log("authorized gateway");
        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = authenticateGateway;