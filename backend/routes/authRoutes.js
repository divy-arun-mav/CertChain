const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("walletAddress")
            .matches(/^0x[a-fA-F0-9]{40}$/)
            .withMessage("Invalid wallet address"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { name, email, password, walletAddress } = req.body;

            let user = await User.findOne({ email, walletAddress });
            if (user)
                return res.status(400).json({ message: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashedPassword, walletAddress });

            await user.save();
            res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty().withMessage("Password is required"),
        body("walletAddress")
            .matches(/^0x[a-fA-F0-9]{40}$/)
            .withMessage("Invalid wallet address"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        try {
            const { email, password, walletAddress } = req.body;
            const user = await User.findOne({ email, walletAddress });

            if (!user)
                return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.get("/user/:walletAddress", async (req, res) => {
    try {
        const { walletAddress } = req.params;
        console.log(walletAddress);
        const user = await User.findOne({ walletAddress });
        if (!user)
            return res.status(400).json({ message: "Invalid wallet address" });
        console.log(user);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;