import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ------------------- Types -------------------

type Hackathon = {
    _id: string;
    title: string;
    description: string;
    image?: string;
    theme?: string;
    startDate: string;
    endDate: string;
    status?: "completed" | "ongoing";
};

type Achievement = {
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
};

type Course = {
    _id: string;
    studentAddress: string;
    certificate: string;
    courseId: {
        _id: string;
        courseId: string;
        title: string;
        category: string;
        summary: string;
        duration: string;
    };
};

type Certificate = {
    certificateId: string;
    certificateHash: string;
    courseName: string;
    issuedAt: string;
    score: number;
    valid: boolean;
    student: string;
};


type UserProfileProps = {
    user: {
        name: string;
        rank: number;
        points: number;
        bio: string;
        hackathonTags: string[];
        hackathons: Hackathon[];
        achievements: Achievement[];
        courses: Course[];
        certificates: Certificate[];
    };
};


// ------------------- Main Component -------------------

const UserProfile: FC<UserProfileProps> = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-black text-white p-6 flex flex-col md:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg rounded-md w-full md:w-3/12 flex flex-col items-center gap-4 text-center p-4">
                <div className="group bg-[#00a6e8d2] rounded-full w-24 h-24 flex items-center justify-center text-4xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                        src="/Pro.png"
                        alt="profile icon"
                        className="w-full h-full object-cover rounded-full shadow-2xl shadow-[#00a6e8e8] group-hover:-translate-y-1 transition-transform duration-300"
                    />
                </div>
                <h2 className="text-2xl font-bold text-[#00A8E8] animate-neon-glow">{user.name}</h2>
                <Badge className="bg-card text-card-foreground border border-[#00A8E8]">
                    Rank #{user.rank}
                </Badge>
                <Badge className="bg-card text-card-foreground border border-[#00A8E8]">
                    {user.points} Points
                </Badge>

                <div className="mt-6 w-full">
                    <h3 className="text-[#00A8E8] text-lg font-semibold mb-2">Domains</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {user.hackathonTags.map((tag, i) => (
                            <Badge key={i} className="bg-[#00A8E8] text-sm text-white rounded-full">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                <p className="text-sm text-muted-foreground mt-6 px-4">{user.bio}</p>
            </div>

            {/* Right Main Content */}
            <div className="w-full md:w-9/12 space-y-10">
                {/* Hackathons */}
                <Section title="Hackathons Participated" count={user.hackathons.length}>
                    <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#00A8E8] scrollbar-track-darkBg py-2">
                        {user.hackathons.map((hackathon, index) => (
                            <HackathonCard key={`${hackathon._id}-${index}`} hackathon={hackathon} navigate={navigate} />
                        ))}
                    </div>
                </Section>

                {/* Achievements */}
                <Section title="Achievements" count={user.achievements.length}>
                    {renderAchievements(user.achievements)}
                </Section>

                {/* Courses */}
                <Section title="Courses Completed" count={user.courses.length}>
                    {renderScrollableCourses(user.courses)}
                </Section>

                {/* Certificates */}
                <Section title="Certificates" count={user.certificates.length}>
                    {renderScrollableCertificates(user.certificates)}
                </Section>
            </div>
        </div>
    );
};

// ------------------- Card Components -------------------

const HackathonCard = ({
    hackathon,
    navigate,
}: {
    hackathon: Hackathon;
    navigate: ReturnType<typeof useNavigate>;
}) => (
    <Card className="relative bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg transform transition-transform duration-300 min-w-[260px] max-w-[260px]">
        <CardContent className="flex flex-col items-center p-4">
            {hackathon.image && (
                <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-24 h-24 object-cover rounded-full border-2 border-[#00A8E8]"
                />
            )}
            <h2 className="text-lg font-semibold mt-2 text-[#00A8E8] text-center">
                {hackathon.title}
            </h2>
            <p className="text-sm text-wrap text-gray-400 text-center mt-1">{hackathon.description.slice(0,40)+"...."}</p>
            {hackathon.theme && (
                <p className="text-sm text-gray-400 text-center mt-1">
                    Theme: <span className="text-blue-400">{hackathon.theme}</span>
                </p>
            )}
            <p className="text-sm text-gray-400 text-center mt-1">
                {new Date(hackathon.startDate).toLocaleDateString()} -{" "}
                {new Date(hackathon.endDate).toLocaleDateString()}
            </p>
            <span
                className={`text-xs font-medium px-2 py-1 mt-2 rounded-full ${hackathon.status === "completed"
                        ? "bg-green-700 text-green-200"
                        : "bg-yellow-700 text-yellow-200"
                    }`}
            >
                {hackathon.status}
            </span>
            <Button
                onClick={() => navigate(`/hackathon/${hackathon._id}`, { state: hackathon })}
                variant="outline"
                className="mt-4 border-[#00A8E8] text-[#00A8E8] hover:bg-[#00A8E8] hover:text-white"
            >
                View Details
            </Button>
        </CardContent>
    </Card>
);

// ------------------- Sections -------------------

const Section: FC<{ title: string; count: number; children: React.ReactNode }> = ({
    title,
    count,
    children,
}) => (
    <div className="bg-gradient-to-b from-gray-900 to-black border border-[#00A8E8] shadow-lg p-4 rounded-md">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-[#00A8E8] text-xl font-semibold">{title}</h3>
            <span className="text-muted-foreground">{count} total</span>
        </div>
        <div>{children}</div>
    </div>
);

// ------------------- Achievements Renderer -------------------

const renderAchievements = (achievements: Achievement[]) => {
    return (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#00A8E8] scrollbar-track-darkBg py-2">
            {achievements.map((a, i) => (
                <div
                    key={i}
                    className="bg-darkCard border border-[#00A8E8] min-w-[300px] rounded-lg shadow-lg p-4 flex flex-col justify-between"
                >
                    <div>
                        <h4 className="text-lg text-wrap font-semibold text-[#00A8E8]">{a.prize.title}</h4>
                        <p className="text-sm text-wrap text-gray-300 mt-1">{a.prize.description}</p>
                        <p className="text-sm text-muted mt-2">🏆 {a.prize.amount} USD</p>
                        <p className="text-sm mt-2 text-blue-400">
                            Project: <a href={a.project.projectUrl} target="_blank" rel="noreferrer" className="underline">{a.project.title}</a>
                        </p>
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                        {a.project.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt="project screenshot"
                                className="w-20 h-20 object-cover rounded-md border border-[#00A8E8]"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const renderScrollableCourses = (courses: Course[]) => {
    return (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#00A8E8] scrollbar-track-darkBg py-2">
            {courses.map((course, i) => (
                <div
                    key={i}
                    className="bg-darkCard border border-[#00A8E8] px-4 py-4 rounded-md min-w-[280px] text-sm shadow-md"
                >
                    {/* <img
                        src={course.courseId.image}
                        alt={course.courseId.title}
                        className="w-full h-32 object-cover rounded-md mb-2 border border-[#00A8E8]"
                    /> */}
                    <h4 className="text-lg text-wrap text-[#00A8E8] font-bold">{course.courseId.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{course.courseId.category}</p>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-3">{course.courseId.summary.slice(0,40)+"...."}</p>
                    <p className="text-sm text-muted mt-2">Duration: {course.courseId.duration}</p>
                </div>
            ))}
        </div>
    );
};

const renderScrollableCertificates = (certificates: Certificate[]) => {
    return (
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#00A8E8] scrollbar-track-darkBg py-2">
            {certificates.map((cert, i) => (
                <div
                    key={i}
                    className="bg-darkCard border border-[#00A8E8] p-4 rounded-lg min-w-[300px] max-w-xs shadow-lg flex flex-col gap-2"
                >
                    <h2 className="text-lg font-semibold text-[#00A8E8]">{cert.courseName}</h2>
                    <p className="text-sm text-gray-400">Issued: {cert.issuedAt}</p>

                    <p className="text-sm text-gray-400">
                        Hash:{" "}
                        <span
                            className="text-blue-400 underline cursor-pointer"
                            title={cert.certificateHash}
                        >
                            {cert.certificateHash.slice(0, 10)}...{cert.certificateHash.slice(-6)}
                        </span>
                    </p>

                    <p className="text-sm text-gray-400">Score: {cert.score}</p>

                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-800 text-green-200 w-fit">
                        {cert.valid ? "Valid" : "Invalid"}
                    </span>
                </div>
            ))}
        </div>
    );
};


export default UserProfile;