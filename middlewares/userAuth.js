

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userAuth=async (req,res,next)=>{

    try{
      
        const {token}=req.cookies

        if(!token){
            return res.status(401).json({message:'Unauthorized'})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET || 'secretKey')

        const user=await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({message:'Unauthorized'})
        }

        req.user=user
        next()
    }
    catch(err){

        res.status(500).json({message:err.message})
    }
}

export default userAuth