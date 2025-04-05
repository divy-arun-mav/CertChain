const express = require("express");
const router = express.Router();
const Project = require("../models/Projects"); 
const Hackathon = require("../models/Hackathon");

router.get("/my-project", async (req, res) => {
    try {
        const { userId, hackathonId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!hackathonId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const project = await Project.findOne({creator: userId, hackathon: hackathonId});
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, projectUrl, image, images, description, creator, hackathon } = req.body;
        const newProject = new Project({
            title,
            projectUrl,
            image: image || null,
            images,
            description,
            creator,
            hackathon: hackathon || null,
        });

        await newProject.save();

        if (hackathon) {
            await Hackathon.findByIdAndUpdate(hackathon, {
                $push: {
                    submissions: {
                        participant: creator,
                        images,
                        project: newProject._id,
                        submittedAt: Date.now()
                    }
                }
            });
        }

        res
            .status(201)
            .json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;