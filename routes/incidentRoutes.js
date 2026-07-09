import express from "express";

const incidentRouter = express.Router();

import Incident from "../models/Incident.js";

 import userAuth from "../middlewares/userAuth.js";

import validate from "../middlewares/Validate.js";

import validateEdit from "../middlewares/ValidateEdit.js";

incidentRouter.post("/incident",userAuth ,(req,res)=>{
    try{
       
        validate(req.body)
        
        const incident=new Incident({
            title:req.body.title,
            description:req.body.description,
            incidentType:req.body.incidentType,
            severity:req.body.severity,
            status:req.body.status,
            location:req.body.location,
            reportedBy:req.user._id,
            assignedUnits:req.body.assignedUnits,
            images:req.body.images
        })
        const savedIncident=await incident.save()
        res.status(201).json({message:'incident created',incident:savedIncident})

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

incidentRouter.get("/incident/:id",userAuth ,async (req,res)=>{
    try{
    
        const Incident=await Incident.findById(req.params.id).populate('reportedBy','name email').populate('assignedUnits','name email')
        if(!Incident){
            return res.status(404).json({message:'incident not found'})
        }
        res.status(200).json({Incident})    
         
    }
    catch(err)
    {
        
        res.status(500).json({message:err.message})
    }
})

incidentRouter.get("/incident/my" ,userAuth ,async (req,res)=>{

    try{
       
        const incidents=await Incident.find({reportedBy:req.user._id}).populate('reportedBy','name email').populate('assignedUnits','name email')
        res.status(200).json({incidents})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})

incidentRouter.patch("/incident/:id",userAuth ,(req,res)=>{
    try{
      
        const updatefield=req.body;
        const incident=await Incident.findByIdAndUpdate(req.params.id,updatefield,{new:true})

        res.status(200).json({message:'incident updated',incident})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})

incidentRouter.delete("/incident/:id",userAuth ,async (req,res)=>{
    try{
        const incident=await Incident.findByIdAndDelete(req.params.id)    
        res.status(200).json({message:'incident deleted',incident})
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})  