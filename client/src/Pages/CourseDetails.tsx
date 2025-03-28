import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import toast from "react-hot-toast";

type Module = {
    moduleId: string;
    title: string;
    content: string;
    learn: string;
};

type Course = {
    _id: string;
    courseId: number;
    image: string;
    title: string;
    category: string;
    description: string;
    summary: string;
    modules: Module[];
};

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/courses/${id}`);
                if (!res.ok) throw new Error("Failed to fetch course");
                const data = await res.json();
                setCourse(data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load course details.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const enroll = async (id: string) => {
        try {
            if (!id) return toast.error("Course ID not provided");

            const res = await fetch(`http://localhost:5000/api/enroll/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentAddress: "0x4b9a95105Efb75f8A254D1E0dB7153E85ed6C2A5"
                })
            });

            if (res.status === 201) {
                const data = await res.json();
                toast.success(data.message);
                console.log(data.message);
            } else {
                const data = await res.json();
                toast.error(data.message);
                throw new Error("Failed to enroll");
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (loading) {
        return <div className="text-white text-center mt-10">Loading...</div>;
    }

    if (!course) {
        return <div className="text-red-500 text-center mt-10">Course not found!</div>;
    }

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6">
            {/* Course Header Section */}
            <div className="w-full md:w-[50%] text-center">
                <h1 className="text-3xl font-bold text-[#00A8E8]">{course.title}</h1>
                <img
                    src={course.image}
                    alt={course.title}
                    className="mt-4  object-cover rounded-lg"
                />
                <p className="mt-3 text-base text-gray-300">{course.description}</p>
            </div>

            {/* Course Modules Section */}
            <div className="mt-8 w-full md:w-[50%]">
                <h2 className="text-2xl font-bold text-[#00A8E8] text-center">Modules</h2>
                <Accordion type="multiple" className="mt-4 space-y-2">
                    {course.modules.map((module) => (
                        <AccordionItem
                            key={module.moduleId}
                            value={module.moduleId}
                            className="bg-transparent border-none shadow-none"
                        >
                            <AccordionTrigger className="text-lg font-medium text-white hover:text-[#00A8E8]">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                <p>{module.content}</p>
                                <p className="text-sm text-[#00A8E8] mt-2">Learn: {module.learn}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            {/* Enroll Button */}
            <Button
                onClick={() => enroll(course._id)}
                variant="outline"
                className="mt-6 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
            >
                Enroll Now
            </Button>
        </div>
    );
};

export default CourseDetails;