import mongoose from "mongoose";

const EmergencyUnit=mongoose.Schema({

    
    name:{
        type:String,
        required:true
    },
    type:{

         type:String,
        required:true,
        enum:["Ambulance","Fire","Police ","Rescue","Disaster","other"]
    },
    department:{
        type:String,
        required:true
    },
   location: {
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
},
    status:{
        type:String,
        required:true,
        default:"Available",
        enum:["Available","Busy","Unavailable"]
    },
    vehicleNumber:{ 
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    createdAt:{ 
        type:Date,
        default:Date.now
    },
    updatedAt:{ 
        type:Date,
        default:Date.now
    }
})


export default mongoose.model('EmergencyUnit',EmergencyUnit)