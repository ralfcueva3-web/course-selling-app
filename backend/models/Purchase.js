const mongoose = require ("mongoose");

const purchaseSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true},
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true, unique: true},
    amountPaid: {type: String, required: true},
    currency: {type: String, default: "INR"},
    paymentId: {type: String, required: true, unique: true},
    status: {type: String, enum: ["pending", "completed", "failed"], default: "completed"}
}, {timestamps: true}
)
//to prevent duplicate puchasing for same user + course
purchaseSchema.index({userId: 1, courseId: 1}, {unique: true})

module.exports = mongoose.model("Purchse", purchaseSchema)