import { storage } from '../config/firebase.config.js'
import {v4 as uuidv4} from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Turfs from '../models/turf.model.js';

export const createTurf = async (req, res, next) => {
  try {
    const {
      name,
      location,
      description,
      contactNumber,
      turfType,
      manager,
      availableSlots,
      bookings,
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
        availableSlots,
        bookings,
        imageUrls
    }

    const newTurf = await Turfs.create(turfData);

    return res.status(201).json({
        success: true,
        message: "Turf created successfully",
        data: newTurf
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
