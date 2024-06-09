import express from "express";
import { bookingConfirmation, createTimeSlots, manageMyTurf} from "../controllers/manager.controller.js";
import { managerAuthorization } from "../utils/authorization.js";

const router = express.Router();

router.post("/create-slot", managerAuthorization, createTimeSlots);
router.post("/manage-my-turf", managerAuthorization, manageMyTurf);
router.post("/confirmation", /*managerAuthorization,*/ bookingConfirmation);

export default router;

