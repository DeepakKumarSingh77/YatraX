const userModel=require("../models/user.model");
const { validationResult } = require("express-validator");
const userService=require("../services/user.services");

module.exports.registerUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(errors.length>0){
        return res.status(400).json({errors});
    }
    const {fullname,email,password}=req.body;
     console.log(req.body);
    const isUserExist=await userModel.findOne({email});
    if(isUserExist){
        return res.status(400).json({message:"User already exists"});
    }
    const hashedPassword=await userModel.hashPassword(password);
    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
    });

    const token=user.generateAuthToken();

    res.status(201).json({user,token});
}