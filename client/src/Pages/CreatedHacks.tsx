// pages/CreatedHacks.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type Hackathon = {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
    image?: string;
    status?: string;
};

const CreatedHacks = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);

    useEffect(() => {
        const fetchHackathons = async () => {
            if (!user?._id) return;
            try {
                const res = await fetch(`http://localhost:5000/api/hackathons/creator/${user._id}`);
                const data = await res.json();
                setHackathons(data.hackathons || []);
            } catch (error) {
                console.error("Failed to fetch created hackathons", error);
            }
        };

        fetchHackathons();
    }, [user]);

    const handleEnd = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/hackathons/end/${id}`, { method: "POST" });
            const data = await res.json();
            alert(data.message);
            setHackathons((prev) =>
                prev.map((h) => (h._id === id ? { ...h, status: "completed" } : h))
            );
        } catch (error) {
            console.error("Error ending hackathon", error);
        }
    };

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                My Created Hackathons
            </h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                {hackathons.map((hackathon) => (
                    <Card
                        key={hackathon._id}
                        className="bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg hover:shadow-[#00A8E8]/40 transition-all duration-300"
                    >
                        <CardContent className="flex flex-col items-center p-6 text-white">
                            {hackathon.image && (
                                <img
                                    src={hackathon.image}
                                    alt={hackathon.title}
                                    className="w-32 h-32 object-cover rounded-full border-2 border-[#00A8E8]"
                                />
                            )}
                            <h2 className="text-xl font-semibold mt-4 text-center text-white">
                                {hackathon.title}
                            </h2>
                            <p className="text-sm text-gray-400 text-center mt-2">{hackathon.description}</p>
                            <p className="text-sm mt-2">
                                Theme: <span className="text-blue-400">{hackathon.theme}</span>
                            </p>
                            <p className="text-sm mt-1">
                                Start: {new Date(hackathon.startDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm mb-2">
                                End: {new Date(hackathon.endDate).toLocaleDateString()}
                            </p>
                            {hackathon.status && (
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-full ${hackathon.status === "completed"
                                            ? "bg-green-700 text-green-200"
                                            : "bg-yellow-700 text-yellow-200"
                                        }`}
                                >
                                    {hackathon.status}
                                </span>
                            )}
                            <div className="flex flex-col gap-2 mt-4 w-full">
                                <Button
                                    variant="outline"
                                    className="border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                                    onClick={() => navigate(`/my-hackathons/${hackathon._id}`, { state: hackathon })}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                                    onClick={() => navigate(`/edit-hackathon/${hackathon._id}`, { state: hackathon })}
                                    disabled={hackathon.status === "completed"}
                                >
                                    Edit Hackathon
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                                    onClick={() => navigate(`/award-prize/${hackathon._id}`, { state: hackathon })}
                                    disabled={hackathon.status === "completed"}
                                >
                                    Award Prize
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                    onClick={() => handleEnd(hackathon._id)}
                                    disabled={hackathon.status === "completed"}
                                >
                                    End Hackathon
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CreatedHacks;