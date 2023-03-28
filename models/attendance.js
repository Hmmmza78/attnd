const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    checkInTime: {
        type: String,
        required: true
    },
    checkInLat: {
        type: String,
        required: true
    },
    checkInLon: {
        type: String,
        required: true
    },
    checkOutTime: {
        type: String,
        required: false
    },
    checkOutLat: {
        type: String,
        required: false
    },
    checkOutLon: {
        type: String,
        required: false
    },
    day: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "checkedIn"
    }
}, {
    timestamps: true,
    collection: "attendance"
})




module.exports = mongoose.model("attendanceSchema", attendanceSchema)
