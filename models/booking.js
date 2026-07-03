const mongoose = require('mongoose');

const bookingschema = new mongoose.Schema({
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',          
    required: true
    },
    passengerName: {        
        type: String,
        required: true
    },
    passengerEmail: {
        type: String,
        required: true  
    },
    passengerPhone: {
        type: String,
        required: true
    },
    seatNumber: {  
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingschema); 