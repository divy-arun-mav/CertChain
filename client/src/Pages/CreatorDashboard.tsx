import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Github } from "lucide-react";

interface User {
    _id: string;
    name: string;
    email: string;
    walletAddress: string;
}

interface Prize {
    _id: string;
    title: string;
    description: string;
    amount: number;
}

interface Project {
    _id: string;
    title: string;
    projectUrl: string;
    description: string;
    images: string[];
}

interface Submission {
    _id: string;
    participant: User;
    project: Project;
    submittedAt: string;
}

interface Hackathon {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
    image?: string;
    creator: User;
    participants: User[];
    prizes: Prize[];
    submissions: Submission[];
    status?: string;
    createdAt: string;
}

const CreatorDashboard: React.FC = () => {
    const { user } = useAuth();
    const [hackathons, setHackathons] = useState<Hackathon[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCreatedHackathons = async () => {
            if (!user?._id) return;
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/hackathons/creator/${user._id}`);
                const data = await response.json();
                setHackathons(data.hackathons || []);
            } catch (error) {
                console.error("Error fetching created hackathons:", error);
            }
        };

        fetchCreatedHackathons();
    }, [user?._id]);

    const handleEdit = (hackathon: Hackathon) => {
        navigate(`/edit-hackathon/${hackathon._id}`, { state: hackathon });
    };

    const handleEndHackathon = async (id: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/hackathons/end/${id}`, {
                method: "POST",
            });
            const data = await response.json();
            alert(data.message);
            setHackathons((prev) =>
                prev.map((h) => (h._id === id ? { ...h, status: "completed" } : h))
            );
        } catch (error) {
            console.error("Error ending hackathon:", error);
        }
    };

    const handleAwardPrize = (hackathon: Hackathon) => {
        navigate(`/award-prize/${hackathon._id}`, { state: hackathon });
    };

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">My Created Hackathons</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-8 w-full max-w-6xl">
                {hackathons.map((hackathon) => (
                    <Card
                        key={hackathon._id}
                        className="bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg"
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 text-white">
                                {hackathon.image && (
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="w-full md:w-64 h-40 object-cover rounded-lg border-2 border-[#00A8E8]"
                                    />
                                )}
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-2">{hackathon.title}</h2>
                                    <p className="text-gray-400 mb-2">{hackathon.description}</p>
                                    <p><strong>Theme:</strong> {hackathon.theme}</p>
                                    <p><strong>Start:</strong> {new Date(hackathon.startDate).toLocaleDateString()}</p>
                                    <p><strong>End:</strong> {new Date(hackathon.endDate).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {hackathon.status || "ongoing"}</p>
                                    <p><strong>Created At:</strong> {new Date(hackathon.createdAt).toLocaleString()}</p>

                                    <p className="mt-2"><strong>Creator:</strong> {hackathon.creator.name} ({hackathon.creator.walletAddress})</p>
                                    <p className="mt-2"><strong>Participants:</strong> {hackathon.participants.map(p => p.name).join(", ")}</p>
                                </div>
                            </div>

                            {/* Prizes */}
                            <div className="mt-6 text-white">
                                <h3 className="text-lg font-semibold text-[#00A8E8] mb-2">Prizes</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {hackathon.prizes.map((prize) => (
                                        <li key={prize._id}>
                                            <span className="text-blue-300 font-medium">{prize.title}</span>: {prize.description} (${prize.amount})
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Submissions */}
                            <div className="mt-6 text-white">
                                <h3 className="text-lg font-semibold text-[#00A8E8] mb-2">Submissions</h3>
                                {hackathon.submissions.length > 0 ? (
                                    <div className="space-y-4">
                                        {hackathon.submissions.map((submission) => (
                                            <div
                                                key={submission._id}
                                                className="border border-[#00A8E8] p-4 rounded-md"
                                            >
                                                <p><strong>By:</strong> {submission.participant.name}</p>
                                                <p><strong>Project:</strong> {submission.project.title}</p>
                                                <p className="text-sm text-gray-300"><div className="mt-4" dangerouslySetInnerHTML={{ __html: submission.project.description }}></div></p>
                                                <p><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                                                <a
                                                    href={submission.project.projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center mt-2 text-blue-400 hover:underline"
                                                >
                                                    <Github className="w-4 h-4 mr-1" />
                                                    GitHub Link
                                                </a>
                                                <div className="mt-2 flex gap-2 flex-wrap">
                                                    {submission.project.images.map((img, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={img}
                                                            className="w-20 h-20 rounded border"
                                                            alt={`Project preview ${idx + 1}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No submissions yet.</p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-4 mt-6 justify-start">
                                <Button
                                    onClick={() => handleEdit(hackathon)}
                                    variant="outline"
                                    disabled={hackathon.status === "completed"}
                                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                                >
                                    Edit Details
                                </Button>
                                <Button
                                    onClick={() => handleEndHackathon(hackathon._id)}
                                    variant="outline"
                                    disabled={hackathon.status === "completed"}
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                    End Hackathon
                                </Button>
                                <Button
                                    onClick={() => handleAwardPrize(hackathon)}
                                    variant="outline"
                                    disabled={hackathon.status === "completed"}
                                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                >
                                    Award Prize
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CreatorDashboard;