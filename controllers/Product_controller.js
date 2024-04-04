const express = require('express');
const Products = require('../models/Products');
const { all } = require('../routes/Product_route');

const searchProduct = async(req,res)=>{
    try{
        const allSearchedProducts = await Products.find();
        res.send(allSearchedProducts);
    }
    catch(err){
        console.log(err);
    }
}

const getListedProducts = async(req,res)=>{
    try{
        console.log("it came here");
        const allListedProduct = await Products.find({seller_id: req.body.UserId});
        res.send(allListedProduct);
    }
    catch(err){
        console.log(err);
    }
}

const addProduct = async(req,res)=>{
    try{
        const product = new Products({
            name: req.body.name,
            description: req.body.desc,
            seller_id:req.body.UserId,
            price: req.body.price,
            images: req.body.images,
            quantity: req.body.quantity,
        })
        await product.save();
        res.send(product);
    }
    catch(err){
        console.log(err);
    }
}

const updateProduct = async(req,res)=>{
    try{
        const product = await Products.findById(req.body.productId);
        product.name= req.body.name || product.name;
        product.description= req.body.desc || product.description;
        product.price= req.body.price || product.price;
        product.images= req.body.images || product.images;
        product.quantity= req.body.quantity || product.quantity;
        await product.save();
        res.send(product);
    }
    catch(err){
        console.log(err);
    }
}
  


module.exports={
    searchProduct,
    getListedProducts,
    addProduct,
    updateProduct,
}