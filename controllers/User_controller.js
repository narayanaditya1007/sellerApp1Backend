const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Product = require('../models/Products');
const bcrypt= require('bcrypt');
require('dotenv').config();

async function signup(req,res){
    try{
        console.log("hello");
        const hashPass = await bcrypt.hash(req.body.password,10);
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password: hashPass,
            phone: req.body.phone,
            user_type: "seller",
            is_approved: false,
            address:{
                locality:req.body.address.locality,
                city: req.body.address.city,
                state:req.body.address.state,
                country: req.body.address.country,
                postal_code: req.body.address.postal_code
            },
        });
        console.log(user)
        await user.save();
        res.status(201).send(user);

    }catch(err){
        console.log("hello");
        console.log(err);
    }
}

async function login(req,res){
    try{
        console.log("i reached login")
        const user=await User.findOne({email: req.body.email});
        console.log(user)
        if(!user){
            res.send("User not found")
            throw new Error("User not found");
        }
        // console.log("111");
        console.log(req.body.password);
        console.log(user.password)
        const isMatch = await bcrypt.compare(req.body.password,user.password);
        // console.log("222");
        if(!isMatch){
            res.send("Incorrect Password");
            throw new Error("Incorrect Password");
        }
        if(!user.is_approved){
            res.send(" You are not approved, Wait or your approval");
            throw new Error("Not approved")
        }


        const token = jwt.sign({email: user.email},process.env.SECRET_KEY);
        console.log("yha tak to ho gya");
        res.cookie("jwtToken",token,{
            httpOnly: true
        }).send({user,token});

    }
    catch(err){
        console.log(err);
    }
}

async function getMydetails(req,res){
    try{
        const user =await User.findById(req.body.UserId);
        res.send(user)
    }
    catch(err){
        console.log(err);
    }

}

async function updateDetails(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.save();
        res.send(user)
    }
    catch(err){
        console.log(err);
    }
}

async function approveSeller(req,res){
    try{
        const user = await User.findById(req.body.sellerId);
        user.is_approved = true;
        user.save();
        res.send(user)
    }
    catch(err){
        console.log(err);
    }
}

async function removeSeller(req,res){
    try{
        const user = await User.findById(req.body.sellerId);
        user.is_approved = false;
        user.save();
        res.send(user)
    }
    catch(err){
        console.log(err);
    }
}

async function getAllSellers(req,res){
    try{
        const allSeller = await User.find({user_type: "seller"});
        allSeller.sort((seller1,seller2)=>{
            if(seller1.is_approved)return false;
            return true;
        })
        res.send(allSeller);
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    signup,
    login,
    updateDetails,
    approveSeller,
    getMydetails,
    removeSeller,
    getAllSellers

}