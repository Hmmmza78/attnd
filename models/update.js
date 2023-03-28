const mongoose = require('mongoose');
const updateSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    collection: 'updates'
})


module.exports = mongoose.model("updateSchema", updateSchema)