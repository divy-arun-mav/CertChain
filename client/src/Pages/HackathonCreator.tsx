// components/HackathonCreator.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const HackathonCreator = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const uploadImageToCloudinary = async (): Promise<string> => {
        if (!imageFile) return "";
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "insta-clone");
        formData.append("cloud_name", "djy7my1mw");

        const res = await fetch(`https://api.cloudinary.com/v1_1/djy7my1mw/image/upload`, {
            method: "POST",
            body: formData,
        });
        const fileData = await res.json();
        return fileData.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let imageUrl = "";
        if (imageFile) {
            try {
                toast.loading("Uploading image...");
                imageUrl = await uploadImageToCloudinary();
                toast.dismiss();
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.dismiss();
                toast.error("Failed to upload image");
                return;
            }
        }

        const hackathonData = { title, description, theme, creator: user?._id, startDate, endDate, image: imageUrl };

        try {
            const res = await fetch("http://localhost:5000/api/hackathons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hackathonData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Hackathon created successfully!");
                navigate("/creator/dashboard");
            } else {
                console.error(data.message);
                toast.error(data.message || "Failed to create hackathon.");
            }
        } catch (error) {
            console.error("Error creating hackathon:", error);
            toast.error("Error creating hackathon");
        }
    };

    return (
        <div className="w-screen flex items-center justify-center min-h-screen bg-black">
            <Card className="w-screen max-w-md bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg p-6 rounded-lg">
                <CardHeader>
                    <CardTitle className="text-3xl text-white font-bold">Create Hackathon</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="text-white space-y-4">
                        <div>
                            <Label htmlFor="title" className="mb-1">
                                Title
                            </Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description" className="mb-1">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="theme" className="mb-1">
                                Theme
                            </Label>
                            <Input
                                id="theme"
                                type="text"
                                placeholder="Enter theme"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="image" className="mb-1">
                                Hackathon Image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setImageFile(e.target.files[0]);
                                    }
                                }}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <Label htmlFor="startDate" className="mb-1">
                                    Start Date
                                </Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="endDate" className="mb-1">
                                    End Date
                                </Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            Create Hackathon
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HackathonCreator;