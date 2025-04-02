import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "@/context/Web3";
import toast from "react-hot-toast";

type Course = {
    _id: string;
    courseId: string;
    title: string;
    description: string;
    summary: string;
    image: string;
    category: string;
    duration: string;
    // Add any additional course fields if needed
};

type Enrollment = {
    _id: string;
    studentAddress: string;
    certificate: string;
    courseId: Course; // Nested course object
    completed: boolean;
    enrolledAt: string;
    __v: number;
};

const CompletedCourses = () => {
    const [completedCourses, setCompletedCourses] = useState<Enrollment[]>([]);
    const navigate = useNavigate();
    const { address } = useWeb3();

    useEffect(() => {
        if (!address) {
            console.error("wallet address not found");
            return;
        }
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/enroll/completed/" + address);
                const data = await response.json();
                setCompletedCourses(data);
            } catch (error) {
                console.error("Error fetching completed courses:", error);
                toast.error("Error occurred!!");
            }
        };
        fetchCourses();
    }, [address]);

    const handleCourseDetail = () => {
        navigate(`/certificates`);
    };

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                Completed Courses
            </h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                {completedCourses.length > 0 ? (
                    completedCourses.map((enrollment) => (
                        <Card
                            key={enrollment._id}
                            className="relative bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            <CardContent className="flex flex-col items-center p-6">
                                <img
                                    src={enrollment.courseId.image}
                                    alt={enrollment.courseId.title}
                                    className="w-32 h-32 object-cover rounded-full border-2 border-[#00A8E8]"
                                />
                                <h2 className="text-xl text-white font-semibold mt-4 text-center">
                                    {enrollment.courseId.title}
                                </h2>
                                <p className="text-sm text-gray-400 text-center mt-2">
                                    {enrollment.courseId.summary}
                                </p>
                                <Button
                                    onClick={() => handleCourseDetail()}
                                    variant="outline"
                                    className="mt-4 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                                >
                                    View Certificates
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-400">No completed courses found.</p>
                )}
            </div>
        </div>
    );
};

export default CompletedCourses;