import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    turf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'turf',
        required: true,
    },
    timeslot: {
        type: String,
        required: true
    },
    bookingData: {
        type: Date,
        default: new Date(),
    },
    paymentStatus: {
        type: String,
        required: true,
    }
});

const Bookings = mongoose.model('booking', bookingSchema);

export default Bookings;