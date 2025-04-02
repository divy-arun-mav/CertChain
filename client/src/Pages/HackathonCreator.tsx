// components/HackathonCreator.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HackathonCreator = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // For simplicity, prizes input is omitted here; you can add dynamic fields if needed.
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const hackathonData = { title, description, theme, startDate, endDate };
        try {
            const res = await fetch("http://localhost:5000/api/hackathons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hackathonData),
            });
            const data = await res.json();
            if (res.ok) {
                // Optionally, navigate to a dashboard or details page
                navigate("/creator/dashboard");
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error creating hackathon:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Create Hackathon</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="border p-2 w-full"
                />
                <div className="flex space-x-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 flex-1"
                        required
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 flex-1"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Create Hackathon
                </button>
            </form>
        </div>
    );
};

export default HackathonCreator;
