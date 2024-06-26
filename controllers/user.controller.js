import Slots from "../models/slots.model.js";
import Turfs from "../models/turf.model.js";
import { errorHandler } from "../utils/error.handler.js";
import { Types } from "mongoose";

export const getAllTurfData = async (req, res, next) => {
  try {
    const allTurfsData = await Turfs.find();
    if (!allTurfsData) {
      return next(errorHandler(404, "Turfs are not found"));
    }

    return res.status(200).json({
      success: true,
      data: allTurfsData,
    });
  } catch (error) {
    next(error);
  }
};

export const getSelectedTurfData = async (req, res, next) => {
  try {
    const turfId = req.params.id;
    const turfData = await Turfs.findOne({ _id: turfId });
    if (!turfData) {
      return next(errorHandler(404, "Turf not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Selected turf details are listed below",
      data: turfData,
    });
  } catch (error) {
    next(error);
  }
};

export const getTimeSlots = async (req, res, next) => {
  try {
    let currentHour = 0;
    let currentDate = new Date(req.query.date);
    if (new Date(new Date().setUTCHours(0, 0, 0, 0)) === currentDate) {
      currentHour = new Date().getHours();
    }

    const availableSlots = await Slots.aggregate([
      {
        $match: {
          turfId: req.query.turfId,
          date: currentDate,
          'slot.id': { $gte: currentHour },
        },
      },
      {
        $project: {
          _id: 1,
          date: 1,
          slot: 1,
          cost: 1,
          bookedBy: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Slots are listed here",
      data: availableSlots
    });
  } catch (error) {
    next(error);
  }
};
