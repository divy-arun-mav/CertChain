import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface Prize {
    _id?: string;
    title: string;
    description: string;
    amount: number;
}

interface Hackathon {
    _id: string;
    title: string;
    description: string;
    theme: string;
    startDate: string;
    endDate: string;
    image?: string;
    prizes: Prize[];
}

const EditHackathon: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [hackathon, setHackathon] = useState<Hackathon | null>(null);

    useEffect(() => {
        if (state) {
            setHackathon(state as Hackathon);
        }
    }, [state]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!hackathon) return;
        const { name, value } = e.target;
        setHackathon({ ...hackathon, [name]: value });
    };

    const handleSubmit = async () => {
        if (!hackathon) return;

        try {
            const res = await fetch(`http://localhost:5000/api/hackathons/${hackathon._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(hackathon),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Hackathon updated successfully!");
                navigate("/my-hackathons");
            } else {
                toast.error(data.message || "Failed to update hackathon.");
            }
        } catch (error) {
            console.error("Error updating hackathon:", error);
            toast.error("Server error.");
        }
    };

    if (!hackathon) {
        return (
            <div className="min-h-screen flex justify-center items-center text-white bg-black">
                <p>No hackathon data provided.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center px-4 py-10">
            <h1 className="text-3xl md:text-5xl font-bold text-[#00A8E8] mb-8">Edit Hackathon</h1>
            <div className="w-full max-w-xl space-y-4">
                <Input
                    name="title"
                    value={hackathon.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="bg-gray-900 text-white"
                />
                <Textarea
                    name="description"
                    value={hackathon.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="bg-gray-900 text-white"
                />
                <Input
                    name="theme"
                    value={hackathon.theme}
                    onChange={handleChange}
                    placeholder="Theme"
                    className="bg-gray-900 text-white"
                />
                <Input
                    type="date"
                    name="startDate"
                    value={hackathon.startDate.slice(0, 10)}
                    onChange={handleChange}
                    className="bg-gray-900 text-white"
                />
                <Input
                    type="date"
                    name="endDate"
                    value={hackathon.endDate.slice(0, 10)}
                    onChange={handleChange}
                    className="bg-gray-900 text-white"
                />
                <Input
                    name="image"
                    value={hackathon.image || ""}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="bg-gray-900 text-white"
                />

                <div className="flex gap-4 justify-between flex-col mt-6">
                    <Button
                        onClick={handleSubmit}
                        className="bg-[#00A8E8] hover:bg-blue-600 text-white w-full"
                    >
                        Update Hackathon
                    </Button>
                    <Button onClick={() => navigate(-1)} className="w-full">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditHackathon;