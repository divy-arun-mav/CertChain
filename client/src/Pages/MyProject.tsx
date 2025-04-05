
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import Editor from "./Editor";
import ImageSlideshow from "../components/ImageSlideShow";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/ImageUploader";

type Project = {
    _id: string;
    title: string;
    projectUrl: string;
    description: string;
    createdAt: string;
    image: string | null;
    images: string[];
};

const MyProject = () => {
    const { user } = useAuth();
    const location = useLocation();
    const hackathonId = location.state?.hackathonId as string | undefined;
    const create = location.state?.create as boolean | undefined;

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [title, setTitle] = useState("");
    const [projectUrl, setProjectUrl] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const [slideshowOpen, setSlideshowOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            if (!user) return;
            try {
                const endpoint = `http://localhost:5000/api/projects/my-project?userId=${user._id}&hackathonId=${hackathonId}`;
                const res = await fetch(endpoint, {
                    headers: { "Content-Type": "application/json" },
                });
                if (res.ok) {
                    const data = await res.json();
                    setProject(data.project);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            }
            setLoading(false);
        };
        fetchProject();
    }, [hackathonId, user]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            try {
                const urls = await uploadImages(filesArray);
                setUploadedImages((prev) => [...prev, ...urls]);
            } catch (error) {
                console.error("Error uploading images:", error);
            }
        }
    };

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            try {
                const url = await uploadImage(file);
                setLogo(url);
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
        }
    };

    const uploadImages = async (files: File[]): Promise<string[]> => {
        const uploadPromises = files.map((file) => {
            console.log(file)
            return uploadImage(file);
        });
        return Promise.all(uploadPromises);
    };

    const handleRemoveImage = (url: string) => {
        setUploadedImages((prev) => prev.filter((img) => img !== url));
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);

        try {
            const payload = {
                title,
                projectUrl,
                description,
                image: logo,
                creator: user?._id,
                images: uploadedImages,
                ...(hackathonId && { hackathon: hackathonId }),
            };

            const res = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                setProject(data.project);
                toast.success("Project Submitted successfully!");
            } else {
                console.error(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error("Error creating project");
        }

        setIsCreating(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-4">
            <h1 className="text-3xl md:text-5xl font-bold mt-8 text-[#00A8E8]">My Project</h1>
            {project && create ? (
                <Card className="text-white w-full max-w-3xl bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg p-6 rounded-lg mt-8">
                    <CardHeader className="flex justify-center items-center gap-4">
                        {project.image && (<img src={project.image} className="rounded-full w-20 h-20 border border-blue-400 p-2 bg-blue-950" />)}
                        <CardTitle className="text-white text-2xl font-bold">
                            {project.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="">Project Description: </p>
                        <div className="mt-4" dangerouslySetInnerHTML={{ __html: project.description }}></div>
                        <p className="mt-4">
                            Project URL:{" "}
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline"
                            >
                                {project.projectUrl}
                            </a>
                        </p>
                        <p className="mt-2 text-gray-400">
                            Created at: {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                        {project.images && project.images.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.images.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`Project image ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded cursor-pointer"
                                        onClick={() => {
                                            setCurrentImageIndex(index);
                                            setSlideshowOpen(true);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Card className="w-full h-max text-white max-w-3xl bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg p-6 rounded-lg mt-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {project ? "Modify Your Project" : "Create Your Project"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="mb-1">Project Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter project title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="projectUrl" className="mb-1">Project URL</Label>
                                <Input
                                    id="projectUrl"
                                    type="url"
                                    placeholder="Enter project URL"
                                    value={projectUrl}
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                    required
                                />
                                </div>
                                <div>
                                    <Label htmlFor="logo" className="mb-1">Project Logo</Label>
                                    <Input id="logo" type="file" onChange={handleLogoChange} />
                                </div>
                                {logo && (
                                    <div className="mt-2">
                                        <img src={logo} alt="Project Logo" className="w-min object-cover rounded" />
                                    </div>
                                )}
                            <div className="w-full">
                                <Label htmlFor="description" className="mb-1">Project Description</Label>
                                <Editor value={description} onChange={setDescription} />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="images" className="mb-1">Upload Images</Label>
                                <Input id="images" type="file" multiple onChange={handleImageChange} />
                            </div>
                            {uploadedImages.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {uploadedImages.map((url, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={url}
                                                alt={`Uploaded ${index}`}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <Button
                                                type="button"
                                                onClick={() => handleRemoveImage(url)}
                                                className="absolute top-0 right-0 bg-red-500 rounded-full text-white px-1"
                                            >
                                                &times;
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Button type="submit" disabled={isCreating} className="w-full">
                                {isCreating ? "Creating..." : project ? "Update Project" : "Create Project"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
            {slideshowOpen && project && project.images && (
                <ImageSlideshow
                    images={project.images}
                    initialIndex={currentImageIndex}
                    onClose={() => setSlideshowOpen(false)}
                />
            )}
        </div>
    );
};

export default MyProject;