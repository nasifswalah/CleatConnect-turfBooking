import mongoose from "mongoose";

const turfSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
    },
    turfType: {
        type: String,
        required: true
    },
    imageUrls:{
        type: [String],
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    bookings: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'booking'
        }],
    }
},
{ timestamps: true}
);

const Turfs = mongoose.model('turf', turfSchema);

export default Turfs;
