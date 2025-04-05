import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import toast from "react-hot-toast";

interface User {
    _id: string;
    name: string;
    email: string;
    walletAddress: string;
}

interface Project {
    _id: string;
    title: string;
    projectUrl: string;
    description: string;
    images: string[];
}

interface Prize {
    _id: string;
    title: string;
    description: string;
    amount: number;
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
    prizes: Prize[];
    submissions: Submission[];
}

const AwardPrizes: React.FC = () => {
    const { state } = useLocation();
    const hackathon = state as Hackathon;
    const navigate = useNavigate();
    
    const [selectedWinners, setSelectedWinners] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const end = Object.keys(selectedWinners).length > 0 ? false : true;
    
    const handleWinnerChange = (prizeId: string, participantId: string) => {
        setSelectedWinners((prev) => ({
            ...prev,
            [prizeId]: participantId,
        }));
    };

    const awardPrizes = async () => {
        setLoading(true);
        try {
            const awardedPrizes = hackathon.prizes
                .map((prize) => {
                    const winnerId = selectedWinners[prize._id];
                    if (!winnerId) return null;
                    return {
                        title: prize.title,
                        description: prize.description,
                        amount: prize.amount,
                        winner: winnerId,
                    };
                })
                .filter((prize) => prize !== null);
            
            if (!window.confirm("Are you sure you want to award prizes and end this hackathon?")) {
                setLoading(false);
                return;
            }

            const res = await fetch(`http://localhost:5000/api/hackathons/award-multiple-prizes/${hackathon._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prizes: awardedPrizes }),
            });

            if (!res.ok) throw new Error("Failed to award prizes");

            await fetch(`http://localhost:5000/api/hackathons/end/${hackathon._id}`, {
                method: "POST",
            });

            for (const prize of awardedPrizes) {
                const winnerId = prize.winner;
                if (!winnerId) continue;

                await fetch(`http://localhost:5000/api/update-points`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: winnerId,
                        event: "hackathonParticipation",
                        prize: prize.title,
                    }),
                });
            }

            toast.success("Prizes awarded and hackathon ended!");
            navigate("/my-hackathons");
        } catch (error) {
            console.error("Error awarding prizes or ending hackathon:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen w-screen bg-black text-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#00A8E8] mb-6">
                Award Prizes - {hackathon.title}
            </h1>

            <div className="w-full max-w-6xl space-y-8">
                {hackathon.prizes.map((prize) => (
                    <Card key={prize._id} className="bg-gray-900 border border-blue-600">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-blue-400">{prize.title}</h2>
                            <p className="text-sm text-gray-300">{prize.description}</p>
                            <p className="text-sm text-gray-300 mb-4">Amount: ${prize.amount}</p>

                            <div className="space-y-4 text-white">
                                {hackathon.submissions.map((submission) => (
                                    <div
                                        key={submission._id}
                                        className={`p-4 rounded-md border ${selectedWinners[prize._id] === submission.participant._id
                                            ? "border-green-500 bg-green-900/20"
                                            : "border-gray-600"
                                            }`}
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <div>
                                                <p>
                                                    <strong>Participant:</strong> {submission.participant.name}
                                                </p>
                                                <p>
                                                    <strong>Project:</strong> {submission.project.title}
                                                </p>
                                                <a
                                                    href={submission.project.projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-blue-400 hover:underline mt-1"
                                                >
                                                    <Github className="w-4 h-4 mr-1" /> GitHub
                                                </a>
                                                <div className="flex mt-2 gap-2 flex-wrap">
                                                    {submission.project.images?.slice(0, 3).map((img, i) => (
                                                        <img
                                                            key={i}
                                                            src={img}
                                                            alt="Preview"
                                                            className="w-16 h-16 rounded border"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    handleWinnerChange(prize._id, submission.participant._id)
                                                }
                                                variant="outline"
                                                className={`mt-4 md:mt-0 ${selectedWinners[prize._id] === submission.participant._id
                                                    ? "border-green-500 text-green-500"
                                                    : "border-[#00A8E8] text-[#00A8E8]"
                                                    }`}
                                            >
                                                {selectedWinners[prize._id] === submission.participant._id
                                                    ? "Selected"
                                                    : "Select Winner"}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Button
                className="mt-10 bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded"
                onClick={awardPrizes}
                disabled={loading || end}
            >
                {loading ? "Processing..." : "Award & End Hackathon"}
            </Button>
        </div>
    );
};

export default AwardPrizes;