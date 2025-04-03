import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Achievement {
  hackathonTitle: string;
  hackathonId: string;
  prize: {
    title: string;
    description: string;
    amount: number;
  };
  project: {
    title: string;
    projectUrl: string;
    images: string[];
  };
}

const Achievements: React.FC = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(`http://localhost:5000/api/hackathons/${user._id}/achievements`);
        const data = await res.json();
        setAchievements(data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    fetchAchievements();
  }, [user?._id]);

  const handleShare = async (achievement: Achievement) => {
    const { hackathonTitle, prize, project } = achievement;

    const message = `🚀 Just won "${prize.title}" 🏆 at ${hackathonTitle}!

Project: ${project.title}
Prize Amount: $${prize.amount}

Built with passion, teamwork, and technology! 💻💡
Check it out: ${project.projectUrl}

#HackathonWin #Blockchain #AI #EduChain #Innovation`;

    try {
      await navigator.clipboard.writeText(message);
      toast.success("Post content copied to clipboard!");

      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(project.projectUrl)}`;
      window.open(linkedinUrl, "_blank");
    } catch (error) {
      console.error("Clipboard error:", error);
      toast.error("Failed to copy post content. Please try again.");
    }
  };



  return (
    <div className="min-h-screen w-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#00A8E8] mb-8">🏆 My Achievements</h1>

      {achievements.length === 0 ? (
        <p className="text-gray-400">You haven't won any hackathons yet. Keep hustling 🚀</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-md hover:shadow-xl transition"
            >
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-white">{achievement.hackathonTitle}</h2>
                <div>
                  <p className="text-blue-400 font-semibold">{achievement.prize.title}</p>
                  <p className="text-gray-300 text-sm">{achievement.prize.description}</p>
                  <p className="text-green-400 text-sm">🏅 ${achievement.prize.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Project: {achievement.project.title}</p>
                  <a
                    href={achievement.project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-blue-400 hover:underline mt-1"
                  >
                    <Github className="w-4 h-4 mr-1" /> View on GitHub
                  </a>
                  <div className="flex gap-2 mt-3">
                    {achievement.project.images.slice(0, 3).map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Project Preview"
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <Button
                className="m-4 text-sm border border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
                onClick={() => handleShare(achievement)}
              >
                Share on LinkedIn
              </Button>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Achievements;