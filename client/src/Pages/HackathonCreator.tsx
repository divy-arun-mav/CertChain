import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface Prize {
    title: string;
    description: string;
    amount: number;
}

const HackathonCreator = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [prizes, setPrizes] = useState<Prize[]>([{ title: "", description: "", amount: 0 }]);

    const { user,token } = useAuth();
    const navigate = useNavigate();

    const uploadImageToCloudinary = async (): Promise<string> => {
        if (!imageFile) return "";
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "insta-clone");
        formData.append("cloud_name", "djy7my1mw");

        const res = await fetch(`https://api.cloudinary.com/v1_1/djy7my1mw/image/upload`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        });
        const fileData = await res.json();
        return fileData.url;
    };

    const handlePrizeChange = (index: number, field: keyof Prize, value: string | number) => {
        setPrizes((prev) =>
            prev.map((prize, i) => (i === index ? { ...prize, [field]: value } : prize))
        );
    };

    const addPrize = () => {
        setPrizes([...prizes, { title: "", description: "", amount: 0 }]);
    };

    const removePrize = (index: number) => {
        setPrizes(prizes.filter((_, i) => i !== index));
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

        const hackathonData = {
            title,
            description,
            theme,
            creator: user?._id,
            startDate,
            endDate,
            image: imageUrl,
            prizes: prizes.filter((prize) => prize.title && prize.amount > 0),
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/hackathons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(hackathonData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Hackathon created successfully!");
                navigate("/my-hackathons");
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
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <Label htmlFor="theme">Theme</Label>
                            <Input id="theme" type="text" placeholder="Enter theme" value={theme} onChange={(e) => setTheme(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="image">Hackathon Image</Label>
                            <Input id="image" type="file" accept="image/*" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
                        </div>
                        <div className="flex space-x-2">
                            <div className="flex-1">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white">Prizes</h2>
                            {prizes.map((prize, index) => (
                                <div key={index} className="gap-2 mt-3">
                                    <div>
                                        <Label>Prize Title</Label>
                                        <Input
                                            type="text"
                                            placeholder="Prize title"
                                            value={prize.title}
                                            onChange={(e) => handlePrizeChange(index, "title", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <Textarea
                                            placeholder="Prize description"
                                            value={prize.description}
                                            onChange={(e) => handlePrizeChange(index, "description", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Amount</Label>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={prize.amount}
                                            onChange={(e) => handlePrizeChange(index, "amount", Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                    {index > 0 && (
                                        <Button type="button" onClick={() => removePrize(index)} className="mt-2 bg-red-500 hover:bg-red-600">
                                            Remove Prize
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" onClick={addPrize} className="mt-3 bg-blue-600 hover:bg-blue-700 w-full">
                                + Add Prize
                            </Button>
                        </div>

                        <Button type="submit" className="w-full">Create Hackathon</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HackathonCreator;