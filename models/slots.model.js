import mongoose from "mongoose";

const slotsSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: Object,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  bookedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  turfId: {
    type: mongoose.Types.ObjectId,
    ref: "turf"
  },
  orderId: {
    type: mongoose.Types.ObjectId,
    ref: "booking",
  },
}
);

const Slots = mongoose.model("slot", slotsSchema);
export default Slots;
