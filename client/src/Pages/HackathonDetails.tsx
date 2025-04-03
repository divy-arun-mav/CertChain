/* eslint-disable react-hooks/rules-of-hooks */
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { Github } from "lucide-react";
import { useWeb3 } from "@/context/Web3";

type Prize = {
    _id: string;
    title: string;
    description: string;
    amount: number;
};

type Project = {
    _id: string;
    title: string;
    projectUrl: string;
    description: string;
    images: string[]; // Assuming images is an array of URLs
};

type Submission = {
    _id: string;
    participant: string;
    project: Project;
    submittedAt: string;
};

type HackathonDetail = {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
    image?: string;
    status: string;
    prizes: Prize[];
    submissions: Submission[];
};

const HackathonDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const hackathon = state as HackathonDetail;
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState("");
    const [hasJoined, setHasJoined] = useState(false);

    const { certi } = useWeb3();

    const participantId = user?._id || "";

    if (!hackathon) {
        return (
            <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center">
                <p>No hackathon data provided.</p>
            </div>
        );
    }

    useEffect(() => {
        const checkIfJoined = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/hackathons/joined/${hackathon._id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ participantId }),
                    }
                );
                if (res.status === 400) {
                    setHasJoined(true);
                } else {
                    setHasJoined(false);
                }
            } catch (error) {
                console.error("Error checking participation:", error);
            }
        };

        if (participantId) {
            checkIfJoined();
        }
    }, [hackathon._id, participantId]);

    const joinHackathon = async () => {

        if (certi < 1) {
            toast.error("You are not eligible to participate in hackathon")
            return;
        }

        setIsJoining(true);
        setJoinError("");
        try {
            const res = await fetch(
                `http://localhost:5000/api/hackathons/join/${hackathon._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ participantId }),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                setJoinError(data.message || "Failed to join hackathon.");
            } else {
                toast.success("Successfully joined the hackathon!");
                setHasJoined(true);
            }
        } catch (error) {
            console.error(error);
            setJoinError("An error occurred while joining the hackathon.");
        }
        setIsJoining(false);
    };

    const mySubmission = hackathon?.submissions?.find(
        (submission) => submission.participant === participantId
    );

    const handleProjectNavigation = () => {
        if (mySubmission) {
            navigate("/project", { state: mySubmission });
        } else {
            navigate("/hackathon/project", {
                state: { hackathonId: hackathon._id, create: true },
            });
        }
    };

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center p-4">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                {hackathon.title}
            </h1>
            {hackathon.image && (
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="max-w-10/12 object-cover rounded-lg border-2 border-[#00A8E8] mt-4"
                />
            )}
            <p className="mt-4 max-w-2xl text-center">{hackathon.description}</p>
            <p className="mt-2">
                Theme: <span className="text-blue-400">{hackathon.theme}</span>
            </p>
            <p className="mt-2">
                Start: {new Date(hackathon.startDate).toLocaleDateString()}
            </p>
            <p className="mt-2">
                End: {new Date(hackathon.endDate).toLocaleDateString()}
            </p>

            <div className="submission-container">
                <h2 className="submission-heading">Submissions</h2>
                {hackathon.submissions && hackathon.submissions.length > 0 ? (
                    <div className="submission-grid">
                        {hackathon.submissions.map((submission) => (
                            <Card key={submission._id} className="submission-card">
                                <CardContent>
                                    <div className="text-sm flex justify-between items-center">
                                        <img
                                            src={submission.project.images[0]}
                                            alt={submission.project.title}
                                            className="submission-image"
                                        />
                                        <div className="flex justify-center items-center flex-col">
                                            <h3 className="submission-title">
                                                {submission.project.projectUrl
                                                    ? (<span className="text-green-500">Project Submitted</span>)
                                                    : "Submission"}
                                            </h3>
                                            <p className="text-sm mt-2">{submission.project.title}</p>
                                            <a
                                                href={submission.project.projectUrl}
                                                className="submission-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github />
                                                <span>View on GitHub</span>
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 text-gray-400">No submissions yet</p>
                )}
            </div>

            {joinError && (
                <p className="mt-4 text-red-500 text-sm">{joinError}</p>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-8">
                {!hasJoined && (
                    <Button
                        onClick={joinHackathon}
                        variant="outline"
                        className="border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                        disabled={isJoining || hackathon.status === "completed"}
                    >
                        {isJoining ? "Joining..." : "Join Hackathon"}
                    </Button>
                )}
                <Button
                    onClick={handleProjectNavigation}
                    // disabled={hackathon.status === "completed"}
                    variant="outline"
                    className="border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                >
                    {mySubmission ? "View/Modify Project" : "Create Project"}
                </Button>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        </div>
    );
};

export default HackathonDetail;
