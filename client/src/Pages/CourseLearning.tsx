import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const images = [
    "https://miro.medium.com/v2/resize:fit:1400/1*h5Zs-8nFcTrgR1UceyKYXA.png",
    "https://d2908q01vomqb2.cloudfront.net/7719a1c782a1ba91c031a682a0a2f8658209adbf/2020/11/16/Mainframe-DevOps-On-AWS-Pic-1-1024x496.png",
    "https://learn.microsoft.com/en-us/azure/devops/pipelines/architectures/media/azure-devops-ci-cd-architecture.svg?view=azure-devops",
    "https://storage.googleapis.com/gweb-cloudblog-publish/images/CloudBuildSketchnote.max-2000x2000.png",
    "https://res.cloudinary.com/practicaldev/image/fetch/s--MFlIsI5m--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/nq9mmm2rs8zb3zpbjhbw.png"
];

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

const CourseLearning = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [randomImage, setRandomImage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${courseId}`)
            .then((res) => res.json())
            .then((data) => {
                setCourse(data);
                if (data.modules.length > 0) {
                    setSelectedModule(data.modules[0]); // Select first module by default
                    setRandomImage(images[Math.floor(Math.random() * images.length)]);
                }
            })
            .catch((err) => console.error("Error fetching course details:", err));
    }, [courseId]);

    useEffect(() => {
        if (selectedModule) {
            setRandomImage(images[Math.floor(Math.random() * images.length)]);
        }
    }, [selectedModule]);

    const nextModule = () => {
        if (!course || !selectedModule) return;

        const currentIndex = course.modules.findIndex(module => module.moduleId === selectedModule.moduleId);

        if (currentIndex < course.modules.length - 1) {
            setSelectedModule(course.modules[currentIndex + 1]);
        }
    };


    return (
        <div className="flex bg-gray-900 text-white">
            <div className="flex bg-gray-900 text-white h-screen">
                <div className="w-1/4 bg-gray-800 p-6 h-full overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 text-[#00A8E8]">{course?.title}</h2>
                    <hr className="my-6" />
                    <p className="text-gray-400 mb-4">{course?.summary}</p>
                    <h3 className="text-lg font-semibold">Modules:</h3>
                    <ul className="mt-2 overflow-y-auto">
                        {course?.modules.map((module) => (
                            <li
                                key={module.moduleId}
                                className={`p-2 cursor-pointer rounded ${selectedModule?.moduleId === module.moduleId
                                    ? "bg-[#00A8E8] text-black"
                                    : "hover:bg-gray-700"
                                    }`}
                                onClick={() => setSelectedModule(module)}
                            >
                                {module.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-3/4 p-8 h-full overflow-y-auto">
                    {selectedModule ? (
                        <>
                            <h2 className="text-3xl font-bold mb-4">{selectedModule.title}</h2>
                            <p className="text-gray-300">{selectedModule.learn}</p>
                            <div className="mt-6 flex justify-center">
                                <img
                                    src={randomImage}
                                    alt="Module Visual"
                                    className="rounded-lg shadow-md w-2/3 max-h-80 object-cover border-2 border-[#00A8E8]"
                                />
                            </div>

                            <div className="mt-20">
                                <h3 className="text-xl font-semibold text-[#00A8E8]">Reading</h3>
                                <ul className="list-none">
                                    {selectedModule.content.split('\n').map((line, index) => (
                                        <li
                                            key={index}
                                            className="my-1 relative pl-6 text-gray-400 before:absolute before:left-0 before:content-['➤'] before:text-blue-500"
                                        >
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <Button
                                    onClick={() => {
                                        if (course && selectedModule) {
                                            const currentIndex = course.modules.findIndex(
                                                (module) => module.moduleId === selectedModule.moduleId
                                            );
                                            if (currentIndex < course.modules.length - 1) {
                                                nextModule();
                                            } else {
                                                navigate(`/test/${course.title}`);
                                            }
                                        }
                                    }}
                                    className={`px-6 py-2 rounded-lg ${course && selectedModule && course.modules.findIndex(module => module.moduleId === selectedModule.moduleId) < course.modules.length - 1
                                        ? "bg-[#00A8E8] text-black hover:bg-[#0086C7]"
                                        : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                >
                                    {course && selectedModule && course.modules.findIndex(module => module.moduleId === selectedModule.moduleId) < course.modules.length - 1
                                        ? "Next Module"
                                        : "Take Test"}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-400">No module selected.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseLearning;