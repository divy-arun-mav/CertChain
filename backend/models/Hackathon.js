const mongoose = require("mongoose");

const PrizeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    amount: { type: Number }
});

const HackathonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: String },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    prizes: [PrizeSchema],
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],
        default: "upcoming"
    },
    submissions: [
        {
            participant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // now stores project _id
            submittedAt: { type: Date, default: Date.now }
        }
    ],
    awardedPrize: [{
        title: String,
        description: String,
        amount: Number,
        winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }],
});

module.exports = mongoose.model("Hackathon", HackathonSchema);