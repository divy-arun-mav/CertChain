import UserProfile from './UserProfile';

const Profile = () => {
    return (
        <div className="w-screen text-white">
            <UserProfile
                user={{
                    name: "Divy Arun Mav",
                    rank: 1,
                    points: 410,
                    bio: "I am Divy Mav, a CSE student at D.J.Sanghvi College of Engineering. Proficient in MERN/BERN stack web development and skilled in C, C++, Java, and Python, with a strong track record in blockchain and smart contracts.",
                    hackathonTags: ["Artificial Intelligence", "Blockchain", "Machine Learning", "AR/VR"],
                    hackathons: [
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "completed",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "ongoing",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "ongoing",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "ongoing",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "ongoing",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "ongoing",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                        {
                            _id: "hackedu-1",
                            title: "HackEDU",
                            description:
                                "HackEDU is an online hackathon where students and professionals can participate to drive innovative solutions on EDU-Chain and Open Campus Blockchain.",
                            theme: "Blockchain",
                            startDate: "2025-04-03T00:00:00.000Z",
                            endDate: "2025-04-28T00:00:00.000Z",
                            status: "ongoing",
                            "image": "https://i.ytimg.com/vi/JUyX5Cz8fU0/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCEWiwe1ZzYbgqWBLs6Mk5C9rhKLQ",
                        },
                    ],
                    achievements: [
                        {
                            hackathonTitle: "HackEDU",
                            hackathonId: "67ed987dcb5087822bd57de6",
                            prize: {
                                title: "1st prize Blockchain Track",
                                description: "1st prize for projects created in Blockchain track.",
                                amount: 2500
                            },
                            project: {
                                title: "CertiChain",
                                projectUrl: "https://github.com/divy-arun-mav/CertiChain",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693916/yegxuw18kssrjed2plcr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693921/t2wtpximnspdrmvs4gyb.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694025/kedzotk8k2kwe1tioi2l.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694030/gcfkdrnwo6nu0tmlryka.png"
                                ]
                            },
                        },
                        {
                            hackathonTitle: "HackEDU",
                            hackathonId: "67ed987dcb5087822bd57de6",
                            prize: {
                                title: "2nd prize Blockchain Track",
                                description: "2nd prize for projects created in Blockchain track.",
                                amount: 1500
                            },
                            project: {
                                title: "CertiChain",
                                projectUrl: "https://github.com/divy-arun-mav/CertiChain",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693916/yegxuw18kssrjed2plcr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693921/t2wtpximnspdrmvs4gyb.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694025/kedzotk8k2kwe1tioi2l.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694030/gcfkdrnwo6nu0tmlryka.png"
                                ]
                            }
                        },
                        {
                            hackathonTitle: "HackEDU",
                            hackathonId: "67ed987dcb5087822bd57de6",
                            prize: {
                                title: "3rd prize Blockchain Track",
                                description: "3rd prize for projects created in Blockchain track.",
                                amount: 1000
                            },
                            project: {
                                title: "CertiChain",
                                projectUrl: "https://github.com/divy-arun-mav/CertiChain",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693916/yegxuw18kssrjed2plcr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693921/t2wtpximnspdrmvs4gyb.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694025/kedzotk8k2kwe1tioi2l.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694030/gcfkdrnwo6nu0tmlryka.png"
                                ]
                            }
                        },
                        {
                            hackathonTitle: "HackEDU",
                            hackathonId: "67ed987dcb5087822bd57de6",
                            prize: {
                                title: "1st prize AI Track",
                                description: "1st prize for projects created in AI track.",
                                amount: 2500
                            },
                            project: {
                                title: "CertiChain",
                                projectUrl: "https://github.com/divy-arun-mav/CertiChain",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693916/yegxuw18kssrjed2plcr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693921/t2wtpximnspdrmvs4gyb.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694025/kedzotk8k2kwe1tioi2l.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694030/gcfkdrnwo6nu0tmlryka.png"
                                ]
                            }
                        },
                        {
                            hackathonTitle: "HackEDU",
                            hackathonId: "67ed987dcb5087822bd57de6",
                            prize: {
                                title: "2nd prize AI Track",
                                description: "2nd prize for projects created in AI track.",
                                amount: 1500
                            },
                            project: {
                                title: "CertiChain",
                                projectUrl: "https://github.com/divy-arun-mav/CertiChain",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693916/yegxuw18kssrjed2plcr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693921/t2wtpximnspdrmvs4gyb.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694025/kedzotk8k2kwe1tioi2l.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694030/gcfkdrnwo6nu0tmlryka.png"
                                ]
                            }
                        },
                        {
                            hackathonTitle: "HackEDU",
                            hackathonId: "67ed987dcb5087822bd57de6",
                            prize: {
                                title: "3rd prize AI Track",
                                description: "3rd prize for projects created in AI track.",
                                amount: 1000
                            },
                            project: {
                                title: "CertiChain",
                                projectUrl: "https://github.com/divy-arun-mav/CertiChain",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693916/yegxuw18kssrjed2plcr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743693921/t2wtpximnspdrmvs4gyb.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694025/kedzotk8k2kwe1tioi2l.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743694030/gcfkdrnwo6nu0tmlryka.png"
                                ]
                            }
                        },
                        {
                            hackathonTitle: "Summer Hack",
                            hackathonId: "67f0adf61d0c0f3ea599aa9b",
                            prize: {
                                title: "AI Prize",
                                description: "Person with most innovative solution and fully functional product will get the chance to win cash prize and internship opportunity.",
                                amount: 10000
                            },
                            project: {
                                title: "Kalpayit",
                                projectUrl: "https://github.com/divy-arun-mav/Kalpayit",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743826995/zwwoxu0lr3cw0a4lovli.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743827096/zeqoibvp60s8vlzj8az4.png"
                                ]
                            }
                        },
                        {
                            hackathonTitle: "Hack Block",
                            hackathonId: "67f174e57ace6462eadb4074",
                            prize: {
                                title: "3rd prize",
                                description: "3rd prize",
                                amount: 5000
                            },
                            project: {
                                title: "MediChain",
                                projectUrl: "https://medronic.vercel.app/",
                                images: [
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743878657/i7njw8tuqrt239vjkm8f.jpg",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743878658/gv1bwkn6kgzaj6xtjndn.jpg",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743878657/bt4e1fhq97yrsl5fj6sr.png",
                                    "https://res.cloudinary.com/djy7my1mw/image/upload/v1743878657/feqn1jw7tkwcouseqtqu.png"
                                ]
                            }
                        }
                    ],
                    courses: [
                        {
                            _id: "67ec414fe58333fddc7285a2",
                            studentAddress: "0x4b9a95105Efb75f8A254D1E0dB7153E85ed6C2A5",
                            certificate: "0xcb6a508f1e3d997483079ea90b6f19a8c608222e4662623ce01c1a42616fb473",
                            courseId: {
                                _id: "67ec40e50c9d49ae654eb6bc",
                                courseId: "211",
                                title: "Introduction to Polygon Network",
                                category: "Blockchain / Layer 2 Solutions",
                                summary: "Covering the fundamental concepts of Polygon Network, this course equips learners with the skills to develop, deploy, and manage decentralized applications on Polygon. From understanding its multi-chain framework to exploring use cases in DeFi, NFTs, and beyond, students will learn how Polygon is shaping the future of blockchain scalability and interoperability.",
                                duration: "10 weeks",
                            }
                        },
                        {
                            _id: "67ec414fe58333fddc7285a2",
                            studentAddress: "0x4b9a95105Efb75f8A254D1E0dB7153E85ed6C2A5",
                            certificate: "0xcb6a508f1e3d997483079ea90b6f19a8c608222e4662623ce01c1a42616fb473",
                            courseId: {
                                _id: "67ec40e50c9d49ae654eb6bc",
                                courseId: "211",
                                title: "Introduction to Polygon Network",
                                category: "Blockchain / Layer 2 Solutions",
                                summary: "Covering the fundamental concepts of Polygon Network, this course equips learners with the skills to develop, deploy, and manage decentralized applications on Polygon. From understanding its multi-chain framework to exploring use cases in DeFi, NFTs, and beyond, students will learn how Polygon is shaping the future of blockchain scalability and interoperability.",
                                duration: "10 weeks",
                            }
                        },
                        {
                            _id: "67ec414fe58333fddc7285a2",
                            studentAddress: "0x4b9a95105Efb75f8A254D1E0dB7153E85ed6C2A5",
                            certificate: "0xcb6a508f1e3d997483079ea90b6f19a8c608222e4662623ce01c1a42616fb473",
                            courseId: {
                                _id: "67ec40e50c9d49ae654eb6bc",
                                courseId: "211",
                                title: "Introduction to Polygon Network",
                                category: "Blockchain / Layer 2 Solutions",
                                summary: "Covering the fundamental concepts of Polygon Network, this course equips learners with the skills to develop, deploy, and manage decentralized applications on Polygon. From understanding its multi-chain framework to exploring use cases in DeFi, NFTs, and beyond, students will learn how Polygon is shaping the future of blockchain scalability and interoperability.",
                                duration: "10 weeks",
                            }
                        },
                        {
                            _id: "67ec414fe58333fddc7285a2",
                            studentAddress: "0x4b9a95105Efb75f8A254D1E0dB7153E85ed6C2A5",
                            certificate: "0xcb6a508f1e3d997483079ea90b6f19a8c608222e4662623ce01c1a42616fb473",
                            courseId: {
                                _id: "67ec40e50c9d49ae654eb6bc",
                                courseId: "211",
                                title: "Introduction to Polygon Network",
                                category: "Blockchain / Layer 2 Solutions",
                                summary: "Covering the fundamental concepts of Polygon Network, this course equips learners with the skills to develop, deploy, and manage decentralized applications on Polygon. From understanding its multi-chain framework to exploring use cases in DeFi, NFTs, and beyond, students will learn how Polygon is shaping the future of blockchain scalability and interoperability.",
                                duration: "10 weeks",
                            }
                        }
                    ],
                    certificates: [
                        {
                            certificateId: "string;",
                            certificateHash: "string;",
                            courseName: "string;",
                            issuedAt: "string;",
                            score: 90,
                            valid: true,
                            student: "string;",
                        },
                        {
                            certificateId: "string;",
                            certificateHash: "string;",
                            courseName: "string;",
                            issuedAt: "string;",
                            score: 90,
                            valid: true,
                            student: "string;",
                        },
                        {
                            certificateId: "string;",
                            certificateHash: "string;",
                            courseName: "string;",
                            issuedAt: "string;",
                            score: 90,
                            valid: true,
                            student: "string;",
                        },
                        {
                            certificateId: "string;",
                            certificateHash: "string;",
                            courseName: "string;",
                            issuedAt: "string;",
                            score: 90,
                            valid: true,
                            student: "string;",
                        }
                    ],
                }}
            />
        </div>
    );
};

export default Profile;