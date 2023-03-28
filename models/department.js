const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
},
{
    collection: "department",
    timestamps: true
})


module.exports = mongoose.model("departmentSchema", departmentSchema)