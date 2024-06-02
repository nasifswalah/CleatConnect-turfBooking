import express from 'express';
// import { adminAuthorization } from '../utils/authorization.js';
import upload from '../config/multer.config.js';
import { createTurf } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/create', upload.array('images', 10), createTurf);

export default router;