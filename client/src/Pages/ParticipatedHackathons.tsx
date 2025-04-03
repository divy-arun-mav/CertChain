// pages/ParticipatedHackathons.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Hackathon = {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
    image?: string;
};

const ParticipatedHackathons = () => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHackathons = async () => {
            if (!user?._id) return;
            const res = await fetch(`http://localhost:5000/api/hackathons/${user._id}`);
            const data = await res.json();
            setHackathons(data.hackathons || []);
        };

        fetchHackathons();
    }, [user?._id]);

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                Participated Hackathons
            </h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                {hackathons.length > 0 ? (
                    hackathons.map((hackathon) => (
                        <Card
                            key={hackathon._id}
                            className="relative bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            <CardContent className="flex flex-col items-center p-6">
                                {hackathon.image && (
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="w-32 h-32 object-cover rounded-full border-2 border-[#00A8E8]"
                                    />
                                )}
                                <h2 className="text-xl text-white font-semibold mt-4 text-center">
                                    {hackathon.title}
                                </h2>
                                <p className="text-sm text-gray-400 text-center mt-2">
                                    {hackathon.description}
                                </p>
                                <p className="text-sm text-gray-400 text-center mt-2">
                                    Theme: <span className="text-blue-400">{hackathon.theme}</span>
                                </p>
                                <p className="text-sm text-gray-400 text-center mt-2">
                                    Start: {new Date(hackathon.startDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-400 text-center mt-2">
                                    End: {new Date(hackathon.endDate).toLocaleDateString()}
                                </p>
                                <Button
                                    onClick={() => navigate(`/hackathon/${hackathon._id}`, { state: hackathon })}
                                    variant="outline"
                                    className="mt-4 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-8">You haven't participated in any hackathons yet.</p>
                )}
            </div>
        </div>
    );
};

export default ParticipatedHackathons;