
import express from 'express';

const authRouter = express.Router();

import bcrypt from 'bcrypt';

import User from '../models/User.js';

import jwt from 'jsonwebtoken';

import { validate } from "../middlewares/Validate.js";

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1d' });
};

authRouter.post('/signup', async (req,res)=>{
   
    try{
        
         validate(req)

         const {name,email,password,phone,role,department,status} = req.body;
          
         const hassedPassword= await bcrypt.hash(password,10)

         const user=new User({
            name,
             email,
             password:hassedPassword,
             phone,
             role,
             department,
             status
         })

         const savedUser=await user.save()

         const token = createToken(savedUser._id)

         res.cookie('token',token,{httpOnly:true,maxAge:24*60*60*1000})

         return res.status(201).json({
            message:'user created',
            user:{
                id:savedUser._id,
                name:savedUser.name,
                email:savedUser.email,
                role:savedUser.role
            },
            token
         })


    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

authRouter.post('/signin',async (req,res)=>{
try
   { const {email,password}=req.body;

    const user=await User.findOne({email})

    if(!user)
    {
        return res.status(404).json({message:'user not found'})
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch)
        return res.status(400).json({message:'invalid credentials'})

    const token=createToken(user._id) 

    res.cookie('token',token,{httpOnly:true,maxAge:24*60*60*1000})

    return res.status(200).json({user,token})
    }
    catch(err){
        return res.status(500).json({message:err.message})

    }
    
})

authRouter.get('/signout',(req,res)=>{
    res.clearCookie('token')
    return res.json({message:'user signed out'})
})

export default authRouter