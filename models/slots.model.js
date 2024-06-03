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
        type: String,
        required: true
    },
    turfId:{
        type: String,
        required: true  
    }
})

const Slots = mongoose.model('slot', slotsSchema);
export default Slots;