require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const projectRoutes = require("./routes/projectRoutes"); // Import project routes
const Course = require("./models/Course");

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/hackathons", hackathonRoutes);
app.use("/api/projects", projectRoutes); // Mount the project routes

app.post("/api/generate-questions", async (req, res) => {
    const { topic } = req.body;

    const course = await Course.findOne({ title: topic });
    if (!course) {
        return res.status(400).json({ message: "Course not found" });
    }

    const prompt = `Generate 10 multiple-choice questions about ${topic} by referring to data shown below. 
  ${course}
  Each question should have 4 options and the correct answer as a separate field.(NO preamble, NO Markdown, NO additional text)`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            return res.status(500).json({ error: "Failed to fetch AI-generated questions from Gemini API" });
        }

        const data = await response.json();

        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0
        ) {
            const text = data.candidates[0].content.parts[0].text;
            res.json(parseGeminiResponse(text));
        } else {
            console.error("Gemini API response format error:", data);
            res.status(500).json({ error: "Invalid response format from Gemini API" });
        }
    } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ error: "Failed to fetch AI-generated questions" });
    }
});

const parseGeminiResponse = (text) => {
    return text.split("\n\n").map((q, index) => {
        const parts = q.split("\n");
        return {
            id: index + 1,
            question: parts[0],
            options: parts.slice(1, 5),
            correctAnswer: parts[5]?.replace("Answer: ", ""),
        };
    });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));