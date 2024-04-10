const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/User_route');
const orderItemRouter = require('./routes/Order_Items_route');
const productRouter = require('./routes/Product_route');
const reviewRouter = require('./routes/Review_route');
require('dotenv').config();

try{
mongoose.connect(process.env.MONGO_URI);
const app=express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    source: '*',
    credentials: true
}))
app.use(userRouter);
app.use(orderItemRouter);
app.use(productRouter);
app.use(reviewRouter);

app.listen(PORT,()=>{
    console.log(`Server started on port: ${PORT}`);
})
}
catch(err){
    console.log("mongoose not connected");
    console.log(err)
}
