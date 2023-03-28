const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    },
    image: {
        type: String,
        required: false
    }
}, {
    collection: 'users',
    timestamps: true
})



module.exports = mongoose.model("userSchema", userSchema)