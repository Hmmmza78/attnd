const mongoose = require('mongoose');
const designationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
},
{
    collection: "designation",
    timestamps: true
})


module.exports = mongoose.model("designationSchema", designationSchema)