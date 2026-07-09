import mongoose from "mongoose";


const incidentSchema=mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    incidentType:{
        type:String,
        required:true,
        enum:["Road Accident","Fire","Medical Emergency","Crime","Flood","Earthquake","Gas Leak","Building Collapse","other"]
    },
    severity:{
        type:String,
        required:true,
        enum:["Low","Medium","High","Critical"] 
    },
   status:{
       type:String,
       required:true,
       default:"Reported",
       enum:["Reported","In Progress","Resolved","Closed","Assigned"]
   },
    location:{
        type:String,
        required:true
    },
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    assignedUnits:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }],
    images:{
        type:[String],
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model('Incident',incidentSchema)