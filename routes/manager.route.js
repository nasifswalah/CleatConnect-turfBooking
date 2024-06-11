import express from "express";
import { bookingConfirmation, createTimeSlots, listBookings, manageMyTurf} from "../controllers/manager.controller.js";
import { managerAuthorization } from "../utils/authorization.js";

const router = express.Router();

router.post("/create-slot", managerAuthorization, createTimeSlots);
router.get("/manage-my-turf", managerAuthorization, manageMyTurf);
router.post("/list-bookings", managerAuthorization, listBookings);
router.post("/confirmation", managerAuthorization, bookingConfirmation);

export default router;

