const express = require("express");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const router = express.Router();

router.post("/:courseId", async (req, res) => {
    try {
        const { studentAddress } = req.body;

        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });
        const existingEnrollment = await Enrollment.findOne({
            studentAddress,
            courseId: req.params.courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: "You are already enrolled in this course" });
        }

        const newEnrollment = new Enrollment({ studentAddress, courseId: req.params.courseId });
        await newEnrollment.save();

        res.status(201).json({ message: "Enrollment successful", enrollment: newEnrollment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error enrolling in course" });
    }
});

router.put("/complete/:courseId/:studentAddress/:certificateHash", async (req, res) => {
    try {
        const { courseId, studentAddress, certificateHash } = req.params;

        const enrollment = await Enrollment.findOne({ courseId, studentAddress });

        if (!enrollment) {
            return res.status(404).json({ error: "Enrollment not found" });
        }

        enrollment.completed = true;
        enrollment.certificate = certificateHash;

        await enrollment.save();

        res.status(200).json({ message: "Course marked as complete with certificate." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


router.get("/:studentAddress", async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ studentAddress: req.params.studentAddress, completed: false }).populate("courseId");
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching enrollments" });
    }
});

router.get("/completed/:studentAddress", async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ studentAddress: req.params.studentAddress, completed: true }).populate("courseId");
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching enrollments" });
    }
});

module.exports = router;