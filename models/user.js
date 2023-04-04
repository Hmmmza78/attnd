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
        required: false
    },
    title: {
        type: String,
        required: false
    },
    designation: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    isAdmin: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
})



module.exports = mongoose.model("userSchema", userSchema)