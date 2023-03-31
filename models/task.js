const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    points: {
        type: Array,
        required: false
    },
    priority: {
        type: Array,
        required: false
    },
    status: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    collection: "tasks"
})


module.exports = mongoose.model("taskSchema", taskSchema)
