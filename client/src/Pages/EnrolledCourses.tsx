/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Module = {
    moduleId: string;
    title: string;
    content: string;
    learn: string;
};

type Course = {
    _id: string;
    title: string;
    description: string;
    category: string;
    summary: string;
    image: string;
    modules: Module[];
};

const EnrolledCourses = () => {
    const { studentAddress } = useParams(); 
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        if (!studentAddress) return;

        fetch(`${import.meta.env.VITE_BACKEND_URI}/api/enroll/${studentAddress}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const courses = data.map((enrollment: any) => enrollment.courseId);
                setEnrolledCourses(courses);
            })
            .catch((err) => console.error("Error fetching enrolled courses:", err));
    }, [studentAddress, token]);

    const startLearning = (id: string) => {
        navigate(`/learn/${id}`);
    };

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                My Enrolled Courses
            </h1>
            {enrolledCourses.length === 0 ? (
                <>
                    <p className="text-gray-400 mt-6">You have not enrolled in any courses yet.</p>
                    <Button className="mt-3" onClick={()=>navigate('/courses')}>View All courses</Button>
                </>
            ) : (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                    {enrolledCourses.map((course) => (
                        <Card
                            key={course._id}
                            className="relative bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg transform hover:scale-105 transition-transform duration-300"
                        >
                            <CardContent className="flex flex-col items-center p-6">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-32 h-32 object-cover rounded-full border-2 border-[#00A8E8]"
                                />
                                <h2 className="text-xl text-white font-semibold mt-4 text-center">
                                    {course.title}
                                </h2>
                                <p className="text-sm text-gray-400 text-center mt-2">
                                    {course.summary}
                                </p>
                                <Button
                                    onClick={() => startLearning(course._id)}
                                    variant="outline"
                                    className="mt-4 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                                >
                                    Start Learning
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;