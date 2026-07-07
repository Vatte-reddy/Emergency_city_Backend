
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,  
    },
    role:{
        type:String,
        default:"user",
        enum:["Citizen","Police","Fire","Ambulance","Hospital","DisasterAuthority","Admin"],


    },
    department:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"active"    
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


export default mongoose.model('User',userSchema)