/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import UserProfile from './UserProfile';
import toast from 'react-hot-toast';
import { useWeb3 } from '@/context/Web3';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';

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
} | undefined;

type UserProfileProps = {
    badge: string | undefined;
    name: string | undefined;
    rank: number | undefined;
    points: number | undefined;
    bio: string | undefined;
    hackathonTags: string[] | undefined;
    hackathons: Hackathon[] | undefined;
    achievements: Achievement[] | undefined;
    courses: Course[] | undefined;
    certificates: Certificate[] | undefined;
};

const Profile = () => {
    const [certificates, setCertificates] = useState<Certificate[] | undefined>(undefined);
    const { address, state } = useWeb3();
    const { user, token } = useAuth();
    const [userData, setUserData] = useState<UserProfileProps | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!user || !token) {
                toast.error("You are unauthorized you might have to login again", {duration: 5000,});
                return;
            }
            if (!address) {
                toast.error("Please connect your wallet!");
                return;
            }
            if (!state?.educhaincontract) {
                toast.error("Contract not found!");
                return;
            }

            setLoading(true);
            try {
                const [profileRes, certs] = await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_URI}/api/profile/${user?._id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }),
                    state.educhaincontract.getStudentCertificates(address)
                ]);

                const profileData = await profileRes.json();
                if (profileRes.status !== 200) {
                    toast.error(profileData.message);
                } else {
                    setUserData(profileData);
                }

                const parsedCerts: Certificate[] = certs.map((cert: any) => ({
                    certificateId: cert.certificateHash,
                    courseName: cert.courseName,
                    issuedAt: new Date(cert.issueDate.toNumber() * 1000).toLocaleDateString(),
                    certificateHash: cert.certificateHash,
                    score:
                        cert.score.gt && cert.score.gt(100)
                            ? cert.score.toNumber() / 100
                            : cert.score.toNumber
                                ? cert.score.toNumber()
                                : cert.score,
                    valid: cert.valid,
                    student: cert.student,
                }));
                const validCerts = parsedCerts.filter((cert) => cert?.valid);
                setCertificates(validCerts);
            } catch (error) {
                console.error("Error fetching details:", error);
                toast.error("Error fetching details");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [address, state?.educhaincontract, token, user, user?._id]);

    return (
        <>
            {loading ? (
                <div className="w-screen h-screen bg-black flex justify-center items-center">
                    <Loader />
                </div>
            ) : user ? (
                <div className="w-screen text-white">
                    <UserProfile
                        user={{
                            badge: userData?.badge,
                            name: "Divy Arun Mav", // Consider using profileData.name when available
                            rank: userData?.rank,
                            points: userData?.points,
                            bio: "I am Divy Mav, a CSE student at D.J.Sanghvi College of Engineering. Proficient in MERN/BERN stack web development and skilled in C, C++, Java, and Python, with a strong track record in blockchain and smart contracts.",
                            hackathonTags: userData?.hackathonTags,
                            hackathons: userData?.hackathons,
                            achievements: userData?.achievements,
                            courses: userData?.courses,
                            certificates: certificates
                        }}
                    />
                </div>
            ) : null}
        </>
    );
};

export default Profile;