import mongoose from 'mongoose';

const slotsSchema = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    slot:{
        type: Object,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    turfId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'turfs'
    }
})

const Slots = mongoose.model('slot', slotsSchema);
export default Slots;