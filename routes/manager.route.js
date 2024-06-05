import express from "express";
import { createTimeSlots } from "../controllers/manage.controller.js";
import { managerAuthorization } from "../utils/authorization.js";

const router = express.Router();

router.post("/create-slot", managerAuthorization, createTimeSlots);

export default router;
