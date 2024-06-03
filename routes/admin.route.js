import express from 'express';
import { adminAuthorization } from '../utils/authorization.js';
import upload from '../config/multer.config.js';
import { createTurf, deleteTurf, getMyTurfs, updateTurf } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/create-turf', adminAuthorization, upload.array('images', 10), createTurf);;
router.post('/update-turf/:id', adminAuthorization, updateTurf);
router.delete('/delete-turf/:id', adminAuthorization, deleteTurf);
router.get('/get-my-turf', adminAuthorization, getMyTurfs);

export default router;
