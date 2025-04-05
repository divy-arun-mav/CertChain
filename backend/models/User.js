const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    walletAddress: { type: String, unique: true, sparse: true, required: true },
    points: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);