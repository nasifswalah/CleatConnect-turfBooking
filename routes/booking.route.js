import express from "express";
import { bookings, verify } from "../controllers/booking.controller.js";
import { userAuthorization } from "../utils/authorization.js";

const router = express.Router();

router.post("/booking", userAuthorization, bookings);
router.post("/verify-booking", userAuthorization, verify);

export default router;
