const userModel=require("../models/user.model");
const { validationResult } = require("express-validator");
const userService=require("../services/user.service");
const blackListTokenModel=require("../models/blacklistToken.model");

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

module.exports.loginUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(errors.length>0){
        return res.status(400).json({errors});
    }
    const {email,password}=req.body;
    // console.log(req.body);
    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isValidPassword=await user.comparePassword(password);
    if(!isValidPassword){
        return res.status(400).json({message:"Invalid email or password"}); 
    }
    const token=user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({token,user});
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({message:"Logged out successfully"});
}

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}