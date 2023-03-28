const mongoose = require('mongoose');
const companySetupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
    collection: "companySetup"
})


module.exports = mongoose.model("companySetupSchema", companySetupSchema)
