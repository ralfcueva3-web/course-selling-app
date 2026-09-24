const mongoose = require ("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {type: String, required: true},
    videoURL: {type: String},
    duration: {type: Number},
    order: {type: Number, required: true}
})
const courseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    thumbnail: {type: String},
    price: {type: Number, required: true},
    creatorId : {type : mongoose.Schema.Types.ObjectId, ref: "Admin", required: true},
    content: [lessonSchema]
})

module.exports = mongoose.model("Course", courseSchema)