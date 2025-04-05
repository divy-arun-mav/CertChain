const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).sort({ points: -1 });
        const total = users.length;
        const leaderboard = users.map((user, index) => {
            const rank = index + 1;
            const percentile = (rank / total) * 100;
            let badge = 'Rookie';
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
            return {
                name: user.name,
                email: user.email,
                points: user.points,
                percentile,
                badge,
            };
        });
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
});

module.exports = router;