const mongoose = require('mongoose');
const noticeBoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
},
{
    collection: "noticeBoard",
    timestamps: true
})


module.exports = mongoose.model("noticeBoardSchema", noticeBoardSchema)