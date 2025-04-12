const express = require("express");
const router = express.Router();
const Hackathon = require("../models/Hackathon");
const Enrollment = require("../models/Enrollment");
const Projects = require("../models/Projects");
const { isValidObjectId, default: mongoose } = require("mongoose");
const User = require("../models/User");

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const pHacks = await Hackathon.find({ participants: userId });
        const participatedHackathons = pHacks.map(hack => ({
            _id: hack._id,
            title: hack.title,
            description: hack.description,
            theme: hack.theme,
            startDate: hack.startDate,
            endDate: hack.endDate,
            image: hack.image,
            status: hack.status
        }));

        let tags = participatedHackathons.map(hack => hack.theme);

        const hackathonsWithWinnings = await Hackathon.find({ "awardedPrize.winner": userId });

        const projects = await Projects.find({ creator: userId });

        const achievements = [];
        const userObjectId = new mongoose.Types.ObjectId(userId);

        hackathonsWithWinnings.forEach(hackathon => {
            if (hackathon.awardedPrize && Array.isArray(hackathon.awardedPrize)) {
                hackathon.awardedPrize.forEach(win => {
                    if (win.winner && win.winner.equals(userObjectId)) {
                        const submissionWon = hackathon.submissions.find(s => s.participant.equals(win.winner));
                        let foundProject = {};
                        if (submissionWon) {
                            foundProject = projects.find(p => p._id.equals(submissionWon.project));
                        }

                        achievements.push({
                            hackathonTitle: hackathon.title,
                            hackathonId: hackathon._id,
                            prize: {
                                title: win.title,
                                amount: win.amount,
                                description: win.description
                            },
                            project: {
                                title: foundProject?.title || '',
                                projectUrl: foundProject?.projectUrl || '',
                                images: foundProject?.images || []
                            }
                        });
                    }
                });
            }
        });

        const user = await User.findById(userId);
        const users = await User.find({}).sort({ points: -1 });
        const total = users.length;
        let rank = 0;
        let badge = "Legendary";
        for (let i = 0; i < total; i++) {
            console.log(users[i]._id, userObjectId);
            if (users[i]._id.equals(userObjectId)) {
                console.log("found");
                rank = i + 1;
                const percentile = (rank / total) * 100;
                if (percentile <= 10) {
                    badge = 'Legendary';
                } else if (percentile <= 20) {
                    badge = 'Master';
                } else if (percentile <= 40) {
                    badge = 'Pro';
                } else if (percentile <= 50) {
                    badge = 'Elite';
                } else if (percentile <= 70) {
                    badge = 'Rookie';
                }
            }
        }


        const completedCourses = await Enrollment.find({ studentAddress: user.walletAddress, completed: true })
            .populate("courseId");

        const courses = completedCourses.map(enrollment => ({
            _id: enrollment._id,
            studentAddress: enrollment.studentAddress,
            certificate: enrollment.certificate,
            courseId: {
                _id: enrollment.courseId._id,
                courseId: enrollment.courseId.courseId, 
                title: enrollment.courseId.title,
                category: enrollment.courseId.category, 
                summary: enrollment.courseId.summary,
                duration: enrollment.courseId.duration,
            }
        }));

        res.status(200).json({
            rank:rank,
            badge: badge,
            points: user.points,
            hackathonTags: tags,
            hackathons: participatedHackathons,
            achievements: achievements,
            courses: courses
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;