const mongoose = require('mongoose');

const connect = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('db connected');
    } catch (error) {
        console.log(error);
        console.log('db not connected');
    }
}

module.exports = connect
