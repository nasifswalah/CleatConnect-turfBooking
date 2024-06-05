import Razorpay from "razorpay";
import crypto from "crypto";
import Slots from "../models/slots.model.js";
import { errorHandler } from "../utils/error.handler.js";
import Bookings from "../models/booking.model.js";

export const bookings = async (req, res, next) => {
  try {
    const { bookedBy, turfId, timeSlotIds } = req.body;

    const slotData = await Slots.find({ _id: { $in: timeSlotIds } });
    const totalCost = 0;

    for (let slot of slotData) {
      if (slot.bookedBy) {
        return next(errorHandler(400, "Slot already booked"));
      } else {
        totalCost += slot.cost;
      }
    }

    const newBooking = await Bookings({
      turfId,
      timeSlotIds,
      bookedBy: req.user._id,
      totalCost: totalCost,
    }).save();

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const options = {
      amount: totalCost * 100,
      currency: "INR",
      receipt: newBooking._id,
    };

    const booking = await instance.orders.create(options);
    if (!booking) {
      return next(errorHandler(500, "Error on creating booking"));
    }

    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res, next) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      receipt,
      timeSlotIds,
      turfId,
      bookingDate,
    } = req.body;

    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    await Slots.updateMany(
      { _id: { $in: timeSlotIds } },
      { $set: { bookedBy: req.user._id, orderId: receipt } }
    );
    await Bookings.updateOne(
      { _id: receipt },
      {
        $set: {
          paymentStatus: "Paid",
          bookedBy: req.user._id,
          turfId: turfId,
          bookingDate: new Date(date),
        },
      }
    );

    res.status(200).json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    next(error);
  }
};
