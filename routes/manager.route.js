import express from "express";
import { createTimeSlots } from "../controllers/manage.controller.js";

const router = express.Router();

router.post('/create-slot', createTimeSlots);

export default router;