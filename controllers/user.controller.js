import Turfs from "../models/turf.model.js"
import { errorHandler } from "../utils/error.handler.js"

export const getAllTurfData = async (req, res, next) => {
    try {
        const allTurfsData = await Turfs.find()
        if (!allTurfsData) {
            return next(errorHandler(404, "Turfs are not found"));
        }

        return res.status(200).json({allTurfsData}); 
    } catch (error) {
        next(error);
    }
};

export const getSelectedTurfData = async (req, res, next) => {
    try {
        const turfId = req.params.id;
        const turfData = await Turfs.findById(turfId);
        if (!turfData){
            return next(errorHandler(404, "Turf not found"));
        }

        return res.status(200).json({turfData})
    } catch (error) {
        
    }
}