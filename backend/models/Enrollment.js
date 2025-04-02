const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
    studentAddress: { type: String, required: true },
    certificate: { type: String, required: true, default: "N/A" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);