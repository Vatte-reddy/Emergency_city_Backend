import mongoose from "mongoose";

import {MongoDB_URI} from '../.env'

const connectDB=async()=>{
    try{
        await mongoose.connect(MongoDB_URI)
        console.log('db connected')
    }catch(err){
        console.log(err)
    }
}



export default connectDB