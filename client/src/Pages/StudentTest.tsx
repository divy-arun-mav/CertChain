/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-debugger */
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/context/Web3";
import { extractCorrectAnswer } from "@/utils/AnswerExtracter";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const StudentTest = () => {
    const { topic, courseId } = useParams<{ topic: string, courseId: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState<Record<number, string>>({});
    const [devToolsDetected, setDevToolsDetected] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);
    const { state, address } = useWeb3();
    const { user,token } = useAuth();
    const navigate = useNavigate();
    const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/generate-questions`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ topic }),
                });

                const data: Question[] = await response.json();
                setQuestions(data);
            } catch (err) {
                console.error("Error fetching AI-generated questions:", err);
            }
        };

        fetchQuestions();
    }, [topic]);

    const issueCertificate = async (correct: number) => {
        const percentage = correct * 10;
        if (percentage < 90) return;
        toast.success("You are now eligible to issue certificate for " + topic);
        if (!state?.educhaincontract) return;
        try {
            const tx = await state.educhaincontract.issueCertificate(address, topic, correct * 100);
            toast.success("Certificate issued successfully!");
            return tx;
        } catch (err) {
            console.error("Error issuing certificate:", err);
        }
    };

    const resetTest = () => {
        setQuestions([]);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setIncorrectAnswers({});
        setDevToolsDetected(true);
        alert("Test has been reset due to security policy!");
    };

    useEffect(() => {
        const detectDevTools = () => {
            if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
                handleDevToolsOpen();
            }
            const devtoolsChecker = setInterval(() => {
                const start = performance.now();
                debugger;
                if (performance.now() - start > 100) {
                    handleDevToolsOpen();
                }
            }, 1000);

            return () => clearInterval(devtoolsChecker);
        };

        window.addEventListener("resize", detectDevTools);
        return () => window.removeEventListener("resize", detectDevTools);
    }, []);

    const handleDevToolsOpen = () => {
        console.warn("DevTools detected! Resetting test...");
        localStorage.setItem("devtools-opened", "true");
        resetTest();
    };

    const handleSubmit = async () => {
        if (submitted || !token) return;
        setSubmitted(true);
        let correct = 0;
        const incorrectAnswersMap: Record<number, string> = {};

        questions.forEach((q) => {
            const correctAnswer = extractCorrectAnswer(q);
            const givenAnswer = answers[q.id];
            if (givenAnswer) {
                const processedGiven = givenAnswer.replace(/Option\s+[A-D][\):]\s*/, "").trim();
                if (processedGiven.toLowerCase() === correctAnswer.toLowerCase()) {
                    correct++;
                } else {
                    incorrectAnswersMap[q.id] = correctAnswer;
                }
            }
        });

        setScore(correct);
        setIncorrectAnswers(incorrectAnswersMap);
        const certificate = await issueCertificate(correct);
        console.log(certificate);
        await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/enroll/complete/${courseId}/${address}/${certificate.hash}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/update-points`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: user?._id,
                event: "courseCompleted",
                prize: null,
            }),
        });
        toast.success("You gained 40 points for completing the course!");
        navigate("/certificates");
    };

    useEffect(() => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(console.error);
        }

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch((err) => {
            alert("Camera/Microphone access is required.");
            console.error(err);
        });

        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === "F11" || (e.ctrlKey)) {
                e.preventDefault();
                alert("This action is disabled during the test.");
            }
        };

        const mouseHandler = (e: MouseEvent) => {
            if (e.ctrlKey && e.button === 0) {
                e.preventDefault();
                alert("Ctrl+Click is disabled!");
            }
        };

        const blurHandler = () => {
            alert("Tab switch detected! Test will be reset.");
            resetTest();
        };

        window.addEventListener("keydown", keyHandler);
        window.addEventListener("mousedown", mouseHandler);
        window.addEventListener("blur", blurHandler);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            window.removeEventListener("keydown", keyHandler);
            window.removeEventListener("mousedown", mouseHandler);
            window.removeEventListener("blur", blurHandler);
            clearInterval(timerRef.current);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const sec = (seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    };

    const handleSelect = (questionId: number, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const testReset = () => {
        setQuestions([]);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setIncorrectAnswers({});
        setTimeLeft(600);
    };

    if (devToolsDetected) {
        return (
            <h1 className="w-screen h-screen text-red-500 text-center mt-20 text-2xl font-bold">
                Test has been reset due to security policy.
            </h1>
        );
    }

    return (
        <div className="w-screen min-h-screen bg-gray-900 text-white p-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-[#00A8E8]">Course Test</h2>
                <div className="text-lg bg-black px-4 py-1 rounded-lg border border-white">
                    Time Left: <span className="font-bold text-red-400">{formatTime(timeLeft)}</span>
                </div>
            </div>
            <p className="text-gray-400 mb-6">Answer the following questions:</p>

            {submitted ? (
                <div>
                    <div className="text-center text-2xl font-bold text-green-400">
                        Your Score: {score} / {questions.length}
                    </div>
                    <div className="mt-6">
                        {questions.map((q) => (
                            <div key={q.id} className="mb-6">
                                <h3 className="text-xl font-semibold">
                                    <span>{q.id}) </span>
                                    {q.question}
                                </h3>
                                <div className="mt-2">
                                    {q.options.map((option) => {
                                        const isSelected = answers[q.id] === option;
                                        const isCorrect = q.correctAnswer === option;
                                        const isWrongSelected = isSelected && !isCorrect;
                                        return (
                                            <label
                                                key={option}
                                                className={`block cursor-pointer ${isCorrect ? "text-red-400" : isWrongSelected ? "text-green-400" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={q.id.toString()}
                                                    value={option}
                                                    checked={isSelected}
                                                    readOnly
                                                    className="mr-2"
                                                />
                                                {option}
                                            </label>
                                        );
                                    })}
                                </div>
                                {incorrectAnswers[q.id] && (
                                    <p className="text-red-500">
                                        ❌ Incorrect! Correct answer:{" "}
                                        <span className="font-bold text-green-400">{incorrectAnswers[q.id]}</span>
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    {questions.map((q) => (
                        <div key={q.id} className="mb-6">
                            <h3 className="text-xl font-semibold">{q.question}</h3>
                            <div className="mt-2">
                                {q.options.map((option) => (
                                    <label key={option} className="block cursor-pointer">
                                        <input
                                            type="radio"
                                            name={q.id.toString()}
                                            value={option}
                                            onChange={() => handleSelect(q.id, option)}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Button
                        onClick={handleSubmit}
                        className="mt-6 px-6 py-2 bg-[#00A8E8] text-black font-bold rounded-lg hover:bg-[#0086C7]"
                    >
                        Submit Test
                    </Button>
                </div>
            )}

            {submitted && (
                <Button
                    onClick={testReset}
                    className="mt-6 px-6 py-2 bg-[#00A8E8] text-black font-bold rounded-lg hover:bg-[#0086C7]"
                >
                    Reset Test
                </Button>
            )}
        </div>
    );
};

export default StudentTest;