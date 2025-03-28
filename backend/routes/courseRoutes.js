const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching courses" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });
        res.json(course);
    } catch (err) {
        res.status(500).json({ message: "Error fetching course" });
    }
});

module.exports = router;