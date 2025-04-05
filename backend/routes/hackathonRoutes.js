const express = require("express");
const Hackathon = require("../models/Hackathon");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { title, description, theme, image, startDate, endDate, creator, prizes } = req.body;
        const hackathon = new Hackathon({
            title,
            description,
            image,
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
            .populate("creator")
            .populate("participants")
            .populate("submissions.participant")
            .populate("submissions.project");

        res.status(200).json({ hackathons });
    } catch (error) {
        console.error("Error fetching hackathons:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/creator/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hackathons = await Hackathon.find({ creator: id })
            .populate("creator")
            .populate("participants")
            .populate("submissions.participant")
            .populate("submissions.project");
        res.status(200).json({ hackathons });
    } catch (error) {
        console.error("Error fetching user's created hackathons:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedHackathon = await Hackathon.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Hackathon updated successfully", hackathon: updatedHackathon });
    } catch (error) {
        console.error("Error updating hackathon:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const hackathons = await Hackathon.find({ participants: userId })
            .populate("creator")
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

router.post("/award-multiple-prizes/:id", async (req, res) => {
    try {
        const hackathonId = req.params.id;
        const { prizes } = req.body;

        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

        const awardedTitles = new Set(hackathon.awardedPrize.map(p => p.title));

        const newPrizes = prizes.filter(p => !awardedTitles.has(p.title));

        if (newPrizes.length === 0) {
            return res.status(400).json({ message: "All submitted prizes have already been awarded" });
        }

        hackathon.awardedPrize = [...hackathon.awardedPrize, ...newPrizes];
        await hackathon.save();

        res.json({ message: "New prizes awarded successfully", hackathon });
    } catch (error) {
        console.error("Error awarding multiple prizes:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:userId/achievements", async (req, res) => {
    try {
        const { userId } = req.params;

        const hackathons = await Hackathon.find({ "awardedPrize.winner": userId })
            .populate("awardedPrize.winner")
            .populate("submissions.participant")
            .populate("submissions.project");

        const achievements = [];

        hackathons.forEach((hackathon) => {
            hackathon.awardedPrize.forEach((prize) => {
                if (prize.winner?._id?.toString() === userId) {
                    const submission = hackathon.submissions.find(
                        (sub) => sub.participant?._id?.toString() === userId
                    );

                    achievements.push({
                        hackathonTitle: hackathon.title,
                        hackathonId: hackathon._id,
                        prize: {
                            title: prize.title,
                            description: prize.description,
                            amount: prize.amount,
                        },
                        project: {
                            title: submission?.project?.title || "N/A",
                            projectUrl: submission?.project?.projectUrl || "",
                            images: submission?.project?.images || [],
                        },
                    });
                }
            });
        });

        res.status(200).json(achievements);
    } catch (err) {
        console.error("Error fetching user achievements:", err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;