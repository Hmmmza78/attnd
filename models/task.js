const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: true
   },
   startDate: {
    type: String,
    required: true
   },
   endDate: {
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
   }
}, {
    timestamps: true,
    collection: "tasks"
})


module.exports = mongoose.model("taskSchema", taskSchema)