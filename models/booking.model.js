import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  turfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "turf",
    required: true,
  },
  timeSlotIds: {
    type: Array,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: new Date(),
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

const Bookings = mongoose.model("booking", bookingSchema);

export default Bookings;
