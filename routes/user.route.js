import express from "express";
import {
  getAllTurfData,
  getSelectedTurfData,
  getTimeSlots,
} from "../controllers/user.controller.js";
import { userAuthorization } from "../utils/authorization.js";

const router = express.Router();

router.get("/get-turfs", userAuthorization, getAllTurfData);
router.get("/get-turf/:id", userAuthorization, getSelectedTurfData);
router.get("/get-slots", userAuthorization, getTimeSlots);

export default router;
