import express from "express";

import EmergencyUnit from "../models/EmergencyUnit.js";

import userAuth from "../middlewares/userAuth.js";
import { ValidateEmergencyUnit, validateEdit } from "../middlewares/Validate.js";

const emergencyRouter = express.Router();

// Middleware wrapper for ValidateEmergencyUnit
const validateEmergencyUnitMiddleware = (req, res, next) => {
    try {
        ValidateEmergencyUnit(req);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Middleware wrapper for validateEdit
const validateEditMiddleware = (req, res, next) => {
    try {
        validateEdit(req);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// =============================
// Create Emergency Unit
// =============================

emergencyRouter.post(
    "/emergencyUnit",
    userAuth,
    validateEmergencyUnitMiddleware,
    async (req, res) => {
        try {

            if (req.user.role !== "Admin") {
                return res.status(403).json({
                    message: "Access Denied"
                });
            }

            const emergencyUnit = new EmergencyUnit({
                name: req.body.name,
                type: req.body.type,
                department: req.body.department,
                location: req.body.location,
                status: req.body.status,
                vehicleNumber: req.body.vehicleNumber,
                driverPhone: req.body.driverPhone,
                contactNumber: req.body.contactNumber, 
               
            });

            await emergencyUnit.save();

            res.status(201).json({
                message: "Emergency Unit Created Successfully",
                emergencyUnit
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }
    }
);


// =============================
// Get All Emergency Units
// =============================

emergencyRouter.get(
    "/emergencyUnit",
    userAuth,
    async (req, res) => {

        try {

            const filter = {};

            if (req.query.type) {
                filter.type = req.query.type;
            }

            if (req.query.status) {
                filter.status = req.query.status;
            }

            const emergencyUnits = await EmergencyUnit.find(filter)
                .populate( "name contactNumber");

            res.status(200).json({
                count: emergencyUnits.length,
                emergencyUnits
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);


// =============================
// Get Emergency Unit By ID
// =============================

emergencyRouter.get(
    "/emergencyUnit/:id",
    userAuth,
    async (req, res) => {

        try {

            const emergencyUnit = await EmergencyUnit.findById(req.params.id)
                .populate( "name contactNumber");

            if (!emergencyUnit) {
                return res.status(404).json({
                    message: "Emergency Unit Not Found"
                });
            }

            res.status(200).json({
                emergencyUnit
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);


// =============================
// Update Emergency Unit
// =============================

emergencyRouter.patch(
    "/emergencyUnit/:id",
    userAuth,
    validateEditMiddleware,
    async (req, res) => {

        try {

            const emergencyUnit = await EmergencyUnit.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!emergencyUnit) {
                return res.status(404).json({
                    message: "Emergency Unit Not Found"
                });
            }

            res.status(200).json({
                message: "Emergency Unit Updated Successfully",
                emergencyUnit
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);


// =============================
// Delete Emergency Unit
// =============================

emergencyRouter.delete(
    "/emergencyUnit/:id",
    userAuth,
    async (req, res) => {

        try {

            if (req.user.role !== "Admin") {
                return res.status(403).json({
                    message: "Access Denied"
                });
            }

            const emergencyUnit = await EmergencyUnit.findByIdAndDelete(req.params.id);

            if (!emergencyUnit) {
                return res.status(404).json({
                    message: "Emergency Unit Not Found"
                });
            }

            res.status(200).json({
                message: "Emergency Unit Deleted Successfully"
            });

        } catch (err) {

            res.status(500).json({
                message: err.message
            });

        }

    }
);

export default emergencyRouter;