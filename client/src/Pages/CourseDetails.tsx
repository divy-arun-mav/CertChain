import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import toast from "react-hot-toast";
import { useWeb3 } from "@/context/Web3";

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
    const navigate = useNavigate();
    const { address } = useWeb3();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [enrolled, setEnrolled] = useState<boolean>(false);

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

    useEffect(() => {
        const checkEnrollment = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/enroll/status/${id}?address=${address}`);
                if (!res.ok) return;

                const data = await res.json();
                setEnrolled(data.enrolled);
            } catch (error) {
                console.error("Failed to check enrollment status", error);
            }
        };

        if (id && address) checkEnrollment();
    }, [id, address]);

    const enroll = useCallback(async () => {
        if (!id) return toast.error("Course ID not provided");

        try {
            const res = await fetch(`http://localhost:5000/api/enroll/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentAddress: address }),
            });

            const data = await res.json();
            if (res.status === 201) {
                toast.success(data.message);
                setEnrolled(true);
                navigate(`/learn/${id}`);
            } else {
                toast.error(data.message);
                if (data.message === "You are already enrolled in this course") {
                    setEnrolled(true);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Enrollment failed");
        }
    }, [id, address, navigate]);

    if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
    if (!course) return <div className="text-red-500 text-center mt-10">Course not found!</div>;

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col md:flex-row items-start gap-10 p-6">
            <div className="w-full md:w-[50%] text-center">
                <h1 className="text-3xl font-bold text-[#00A8E8]">{course.title}</h1>
                <img src={course.image} alt={course.title} className="mt-4 object-cover rounded-lg" />
                <p className="mt-3 text-base text-gray-300">{course.description}</p>
                <Button
                    onClick={() => (enrolled ? navigate(`/learn/${course._id}`) : enroll())}
                    variant="outline"
                    className="mt-6 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                >
                    {enrolled ? "Start Learning" : "Enroll Now"}
                </Button>
            </div>

            <div className="mt-8 w-full md:w-[50%]">
                <h2 className="text-2xl font-bold text-[#00A8E8] text-center">Modules</h2>
                <Accordion type="multiple" className="mt-4 space-y-2">
                    {course.modules.map((module) => (
                        <AccordionItem key={module.moduleId} value={module.moduleId} className="bg-transparent border-none shadow-none">
                            <AccordionTrigger className="text-lg font-medium text-white hover:text-[#00A8E8]">
                                {module.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-300">
                                <p className="text-sm text-white mt-2"><span className="text-[#00A8E8]">Learn: </span> {module.learn}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default CourseDetails;