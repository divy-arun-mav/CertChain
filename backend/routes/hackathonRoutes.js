const express = require("express");
const Hackathon = require("../models/Hackathon");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, description, theme, startDate, endDate, creator, prizes } = req.body;
        const hackathon = new Hackathon({
            title,
            description,
            theme,
            startDate,
            endDate,
            creator,
            prizes,
        });
        await hackathon.save();
        res.status(201).json({ message: "Hackathon created successfully", hackathon });
    } catch (error) {
        console.error("Error creating hackathon:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const hackathons = await Hackathon.find()
            .populate("participants")
            .populate("submissions.participant")
            .populate("submissions.project");

        res.status(200).json({ hackathons });
    } catch (error) {
        console.error("Error fetching hackathons:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const hackathons = await Hackathon.find({ participants: userId })
            .populate("participants")
            .populate("submissions.participant")
            .populate("submissions.project");

        res.status(200).json({ hackathons });
    } catch (error) {
        console.error("Error fetching user's hackathons:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/join/:id", async (req, res) => {
    try {
        const hackathonId = req.params.id;
        const { participantId } = req.body;
        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });
        if (!hackathon.participants.includes(participantId)) {
            hackathon.participants.push(participantId);
            await hackathon.save();
        }
        res.json({ message: "Joined hackathon successfully", hackathon });
    } catch (error) {
        console.error("Error joining hackathon:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/joined/:id", async (req, res) => {
    try {
        const hackathonId = req.params.id;
        const { participantId } = req.body;
        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }
        if (hackathon.participants.includes(participantId)) {
            return res.status(400).json({ message: "User already participated in this hackathon" });
        }
        res.json({ message: "You might want to participate in this hackathon", hackathon });
    } catch (error) {
        console.error("Error joining hackathon:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/end/:id", async (req, res) => {
    try {
        const hackathonId = req.params.id;
        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });
        hackathon.status = "completed";
        await hackathon.save();
        res.json({ message: "Hackathon ended successfully", hackathon });
    } catch (error) {
        console.error("Error ending hackathon:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/award-prize/:id", async (req, res) => {
    try {
        const hackathonId = req.params.id;
        const { prizeDetails, winnerId } = req.body;
        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });
        hackathon.awardedPrize = { ...prizeDetails, winner: winnerId };
        await hackathon.save();
        res.json({ message: "Prize awarded successfully", hackathon });
    } catch (error) {
        console.error("Error awarding prize:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
