// components/Hackathons.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";

type Hackathon = {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
    status: string;
    image?: string;
};

const Hackathons = () => {
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const navigate = useNavigate();
    const { certi } = useWeb3();

    const createHack = () => {
        if (certi < 3) {
            toast.error("You need atleast 3 valid certificates to create hackathon but you have only "+certi);
            return;
        }
        navigate("/hackathon/create")
    }

    useEffect(() => {
        fetch("http://localhost:5000/api/hackathons")
            .then((res) => res.json())
            .then((data) => setHackathons(data.hackathons));
    }, []);

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center">
            <div className="mt-4 flex flex-col md:flex-row gap-4">
                <Button
                    onClick={() => navigate("/hackathon/participated")}
                    className="border border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                >
                    Participated Hackathons
                </Button>
                <Button
                    onClick={createHack}
                    className="border border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                >
                    Create Hackathon
                </Button>
                <Button
                    onClick={() => navigate("/my-hackathons")}
                    className="border border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                >
                    My Created Hackathons
                </Button>
                <Button
                    onClick={() => navigate("/solidity-ide")}
                    className="border border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                >
                    Special Tool
                </Button>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                All Hackathons
            </h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                {hackathons.map((hackathon) => (
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
                            <Button
                                onClick={() => navigate(`/hackathon/${hackathon._id}`, { state: hackathon })}
                                variant="outline"
                                className="mt-4 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Hackathons;