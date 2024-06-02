import express from 'express';
import { getAllTurfData, getSelectedTurfData } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/get-turfs',getAllTurfData);
router.get('/get-turf/:id',getSelectedTurfData);

export default router;