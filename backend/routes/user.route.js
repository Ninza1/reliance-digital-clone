const express = require("express");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const userRouter= express.Router();

userRouter.get("/", async(req,res) =>{
    try{
       
        res.status(200).json({msg:"Data fetched successfully!" })
    }catch(err){
        res.send(`Err occured while fetching User data: ${err}`)
    }
})

userRouter.post("/register", async(req,res) =>{
    try{
        const{firstName, lastName, email, password, phone, role}  = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409).json({msg:"User alread exiest"});
        }

        const hashPassword =await bcrypt.hash(password, 10);
        console.log(hashPassword);

        const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password:hashPassword,
            phone,
            role
        })

        await newUser.save();
        res.status(200).json({msg:"Registed successfully!", newUser})

    }catch(err){
        res.send(`Err occured while register:${err}`)
    }

})

// Login logic
userRouter.post("/login", async(req,res) =>{
    try{
        const{email, password} = req.body;
        const user  = await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({msg:"404 User Not found!"})
        }

        const isValidated = await bcrypt.compare(password, user.password);
        if(!isValidated){
            return res.status(402).json({msg:"password is wrong"})
        }
        const token = await jwt.sign({_id:user._id, role:user.role }, process.env.SECRET_KEY)
        res.status(200).json({msg:"Login successfully!", token, usreId:user._id})

    }catch(err){
        res.send(`Err occured while login: ${err}`)
    }
})
module.exports = userRouter;