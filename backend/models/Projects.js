const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        projectUrl: { type: String, required: true },
        description: { type: String, required: true },
        image: {type:String},
        images: [{type: String}],
        creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        hackathon: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", default: null },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);