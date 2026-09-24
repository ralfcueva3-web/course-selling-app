const mongoose = require ("mongoose");

const progressSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true},
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true},
    completedLessons: {type: mongoose.Schema.Types.ObjectId},
    completed: {type: Boolean, default: false}
})

progressSchema.index({userId: 1, courseId: 1}, {unique: true});

module.exports = mongoose.model("Progress", progressSchema)