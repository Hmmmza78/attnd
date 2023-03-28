const mongoose = require('mongoose');
const pointSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    taskId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "pending"
    }
},{
    timestamps: true,
    collection: "points"
})


module.exports = mongoose.model("pointSchema", pointSchema)