import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/Loader";

type Module = {
    moduleId: string;
    title: string;
    content: string;
    learn: string;
};

type Course = {
    _id: string;
    courseId: number;
    title: string;
    description: string;
    category: string;
    summary: string;
    image: string;
    modules: Module[];
};

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        setLoading(true);
        setError(false);

        if (!token) return;

        fetch(`${import.meta.env.VITE_BACKEND_URI}/api/courses`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch courses");
                return res.json();
            })
            .then((data) => setCourses(data))
            .catch((err) => {
                console.error(err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, [token]);


    const courseDetail = (id: string) => {
        navigate(`/course/${id}`);
    }

    return (
        <div className="min-h-screen w-screen overflow-x-hidden bg-black text-white flex flex-col items-center">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">
                All Courses
            </h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                {loading ? (
                    <div className="w-screen flex justify-center items-center"><Loader /></div>
                ) : error ? (
                    <p className="text-red-500 text-center text-2xl w-screen">Failed to get courses</p>
                ) : courses.length > 0 ? (
                    courses.map((course) => (
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
                                    onClick={() => courseDetail(course._id)}
                                    variant="outline"
                                    className="mt-4 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-yellow-400 text-center text-2xl w-screen">No courses found</p>
                )}
            </div>
        </div>
    );
};

export default Courses;