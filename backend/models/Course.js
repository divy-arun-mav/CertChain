const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    duration: { type: String, required: true }, // Example: "4 weeks"
    tests: { type: Number, required: true }, // Example: Number of tests
});

module.exports = mongoose.model("Course", CourseSchema);
