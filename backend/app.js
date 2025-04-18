require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const solc = require("solc");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const projectRoutes = require("./routes/projectRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const pointRoutes = require("./routes/pointRoutes");
const profileRoutes = require("./routes/profileRoutes");
const Course = require("./models/Course");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/courses", authMiddleware, courseRoutes);
app.use("/api/enroll", authMiddleware, enrollmentRoutes);
app.use("/api/hackathons", authMiddleware, hackathonRoutes);
app.use("/api/projects", authMiddleware, projectRoutes);
app.use("/api/leaderboard", authMiddleware, leaderboardRoutes);
app.use("/api/update-points", authMiddleware, pointRoutes);
app.use("/api/profile", authMiddleware,profileRoutes);

app.post("/api/compile-contract", authMiddleware, (req, res) => {
    const { sourceCode, contractName } = req.body;

    const input = {
        language: "Solidity",
        sources: {
            "Contract.sol": {
                content: sourceCode,
            },
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["abi", "evm.bytecode"],
                },
            },
        },
    };

    try {
        const output = JSON.parse(solc.compile(JSON.stringify(input)));
        const contract = output.contracts["Contract.sol"][contractName];

        if (!contract) {
            return res.status(400).json({ error: "Contract not found in compilation output" });
        }

        res.json({
            abi: contract.abi,
            bytecode: contract.evm.bytecode.object,
        });
    } catch (err) {
        console.error("Compilation error:", err);
        res.status(500).json({ error: "Solidity compilation failed" });
    }
});

app.post("/api/generate-questions", authMiddleware, async (req, res) => {
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

app.post("/api/generate-solidity", authMiddleware, async (req, res) => {
    const { field } = req.body;
    if (!field) {
        return res.status(400).json({ error: "Field is required" });
    }
    const prompt = `write a solidity smart contract for a ${field} and add comments to explain the code.(NO preamble, NO Markdown, NO additional text)`;

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
            return res.status(500).json({ error: "Failed to generate solidity code from Gemini API" });
        }

        const data = await response.json();
        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0
        ) {
            const code = data.candidates[0].content.parts[0].text;
            res.json({ code });
        } else {
            console.error("Gemini API response format error:", data);
            res.status(500).json({ error: "Invalid response format from Gemini API" });
        }
    } catch (error) {
        console.error("Error generating solidity code:", error);
        res.status(500).json({ error: "Failed to generate solidity code" });
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

app.use("*", (req, res) => {
    res.status(400).sendFile(path.join(__dirname, "404.html"));
});