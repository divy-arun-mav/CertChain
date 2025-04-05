const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { userId, event, prize } = req.body;
    let pointsToAdd = 0;

    if (event === "courseCompleted") {
        pointsToAdd += 40;
    }
    if (event === "hackathonParticipation") {
        pointsToAdd += 20;
    }
    if (prize) {
        if (prize === "1st") {
            pointsToAdd += 20;
        } else if (prize === "2nd") {
            pointsToAdd += 15;
        } else if (prize === "3rd") {
            pointsToAdd += 10;
        } else if (prize === "consolation") {
            pointsToAdd += 5;
        }
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $inc: { points: pointsToAdd } },
            { new: true }
        );
        res.json({ message: "Points updated", points: user.points });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update points" });
    }
});

module.exports = router;
