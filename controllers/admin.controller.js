import { storage } from '../config/firebase.config.js'
import {v4 as uuidv4} from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Turfs from '../models/turf.model.js';
import Slots from '../models/slots.model.js';
import { errorHandler } from '../utils/error.handler.js';

export const createTurf = async (req, res, next) => {
  try {
    const {
      name,
      location,
      description,
      contactNumber,
      turfType,
      manager,
      bookings,
      createdBy
    } = req.body;

    let imageUrls = [];

    if(req.files && req.files.length > 0) {

        for( let file of req.files){
        const filename = `${uuidv4()}-${file.originalname}`;
        const storageRef = ref(storage, filename);
        const metadata = {contentType: file.mimetype};

        const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
        const downloadUrl = await getDownloadURL((await snapshot).ref);
        imageUrls.push(downloadUrl);
    }}
    const turfData = { name,
        location,
        description,
        contactNumber,
        turfType,
        manager,
        bookings,
        createdBy,
        imageUrls
    }

    const newTurf = await Turfs.create(turfData);

    return res.status(201).json({
        success: true,
        message: "Turf created successfully",
        data: newTurf
    });
  } catch (error) {
    next(error);
  }
};

// export const createTimeSlots = async (req, res, next) => {
//   try {
//     const { startDate, endDate, cost, bookedBy, turfId, newSlots } = req.body;

//     let from = new Date(new Date(startDate).setUTCHours(0,0,0,0));
//     let to = new Date(new Date(endDate).setUTCHours(0,0,0,0));
//     const slotObjects = [];

//     while(from <= to) {
//       for(let slotData of newSlots) {
//         slotObjects.push({
//           date: JSON.parse(JSON.stringify(from)),
//           slot: {
//             name: slotData.name,
//             id: slotData.id
//           },
//           cost,
//           turfId,
//           bookedBy
//         })
//       }
//       from.setDate(from.getDate()+1)
//     }
//     await Slots.insertMany(slotObjects);
//     res.status(201).json({message: "New slot created successfully"});
//   } catch (error){
//     next(error);
//   }
// }

export const updateTurf = async (req, res, next) => {
  try {
    const turfData = await Turfs.findById(req.params.id);
  
    if (!turfData) {
      return next(errorHandler(404, "Turf not found"))
    }

    if(req.user._id != turfData.createdBy) {
      return next(errorHandler(401, "You cannot edit this turf details"));
    }

    const updatedTurfData = await Turfs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTurfData);
  } catch (error) {
    next(error)
  }
};

export const deleteTurf = async (req, res, next) => {
  try {
    const turfData = await Turfs.findById(req.params.id);

    if (!turfData) {
      return next(errorHandler(404, "Turf not found"));
    } 

    if (req.user._id !== turfData.createdBy) {
      return next(errorHandler(401, "You cannot delete this turf"));
    }

    const deletedTurf = await Turfs.findByIdAndDelete(req.params.id);
    res.status(200).json("Turf deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getMyTurfs = async (req, res, next) => {
  try {
    const myTurfs = await Turfs.find({createdBy: req.user._id});

    if(!myTurfs) {
      return next(errorHandler(404, "You should create atleast one turf first"))
    };

    res.status(200).json(myTurfs);
  } catch (error) {
    next(error)
  }
}

