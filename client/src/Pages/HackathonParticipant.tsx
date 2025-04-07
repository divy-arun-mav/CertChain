import React, { useEffect, useState } from "react";

type Hackathon = {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
};

const HackathonParticipant = () => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);

    useEffect(() => {
        const fetchHackathons = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/hackathons`);
                const data = await res.json();
                setHackathons(data);
            } catch (error) {
                console.error("Error fetching hackathons:", error);
            }
        };
        fetchHackathons();
    }, []);

    const handleJoin = async (id: string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/hackathons/join/${id}`, {
                method: "POST",
            });
            if (res.ok) {
                alert("You have joined the hackathon!");
            }
        } catch (error) {
            console.error("Error joining hackathon:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Available Hackathons</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hackathons.map((hackathon) => (
                    <React.Component key={hackathon._id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-bold">{hackathon.title}</h2>
                        <p>{hackathon.description}</p>
                        <p className="text-gray-500">Theme: {hackathon.theme}</p>
                        <p className="text-gray-500">
                            Start: {new Date(hackathon.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500">
                            End: {new Date(hackathon.endDate).toLocaleDateString()}
                        </p>
                        <button
                            onClick={() => handleJoin(hackathon._id)}
                            className="mt-2 bg-green-600 text-white p-2 rounded"
                        >
                            Join Hackathon
                        </button>
                    </React.Component>
                ))}
            </div>
        </div>
    );
};

export default HackathonParticipant;