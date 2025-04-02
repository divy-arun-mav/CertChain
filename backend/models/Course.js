const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    duration: { type: String, required: true }, 
    tests: { type: Number, required: true }, 
});

module.exports = mongoose.model("Course", CourseSchema);
