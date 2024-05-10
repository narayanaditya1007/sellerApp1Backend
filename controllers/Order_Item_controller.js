const express = require('express');
const OrderItem = require('../models/Order_Items');
const Product  = require ('../models/Products');

const placeOrder = async(req,res)=>{
    try{
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let expDeliveryDate = `${year}-${month}-${day+5}`;
        if((month < 10) && (day<10)) expDeliveryDate = `${year}-0${month}-0${day+5}`;
        else if(month < 10) expDeliveryDate = `${year}-0${month}-${day+5}`;
        else if(day < 10) expDeliveryDate = `${year}-${month}-0${day+5}`;

        const product =await Product.findById(req.body.productId);
        const orderItem = new OrderItem({
            buyer_details:{
                name: req.body.name,
                phone: req.body.phone,
                address: req.body.address,
            },
            product_id: req.body.productId,
            exp_delivery_date: expDeliveryDate,
            seller_id: product.seller_id,
            status: "placed"
        })
        product.quantity = product.quantity - 1;
        orderItem.save();
        product.save();
        res.send(orderItem)
    }
    catch(err){
        console.log(err);
    }
}

const getAllItemforSeller = async(req,res)=>{
    try{
        
        const allItemofSeller= await OrderItem.find({seller_id: req.body.UserId});
        console.log(allItemofSeller);
        // allItemofSeller.sort((order1,order2)=>{return order1.exp_delivery_date<order2.exp_delivery_date});
        let orderWithDetail =await  Promise.all(allItemofSeller.map(async (order)=>{
            
            // console.log(orderdetail);
            const productDetail = await Product.findById(order.product_id);
            // console.log(productDetail);
            let orderdetail={
                order: order,
                productDetail: productDetail
            }
            // console.log(orderdetail);
            return orderdetail
        }))
        // await Promise.all(orderWithDetail)
        console.log(orderWithDetail);
        return res.send(orderWithDetail);
    }
    catch(err){
        console.log(err);
    }
}

const updateStatus = async(req,res)=>{
    try{
        const curItem = await OrderItem.findById(req.body.itemId);
        curItem.status = req.body.status || curItem.status;
        curItem.exp_delivery_date = req.body.deliveryDate || curItem.exp_delivery_date;
        curItem.save();
        res.send(curItem);
    }
    catch(err){
        console.log(err);
    }
}


const cancelOrder = async(req,res)=>{
    try{
        console.log(req.body.itemId);
        const curItem = await OrderItem.findById(req.body.itemId);
        curItem.status = "cancel";
        curItem.exp_delivery_date = null;
        curItem.save();
        res.send(curItem);
    }
    catch(err){
        console.log(err);
    }
}

const getOrderDetail = async(req,res)=>{
    try{
        console.log(req.params.orderId);
        const order =await OrderItem.findById(req.params.orderId);
        const product =await Product.findById(order.product_id);
        let toSend = {
            name: product.name,
            price : product.price,
            images: product.images,
            desc: product.description,
            expDeliveryDate: order.exp_delivery_date,
            status: order.status,
            orderId: req.params.orderId
        }
        res.send(toSend);
    }
    catch(err){
        console.log(err);
    }

}

module.exports={
    placeOrder,
    getAllItemforSeller,
    updateStatus,
    getOrderDetail,
    cancelOrder
}
