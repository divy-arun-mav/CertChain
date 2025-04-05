/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable no-debugger */
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useWeb3 } from "@/context/Web3";
import { extractCorrectAnswer } from "@/utils/AnswerExtracter";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const StudentTest = () => {
    const { topic } = useParams<{ topic: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState<Record<number, string>>({});
    const [devToolsDetected, setDevToolsDetected] = useState<boolean>(false);
    const { state, address } = useWeb3();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/generate-questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
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
        if (!state?.educhaincontract) {
            console.log("contract not found");
            return;
        }
        try {
            const tx = await state.educhaincontract.issueCertificate(address, topic, correct * 100);
            console.log("Certificate issued successfully!", tx);
            toast.success("Certificate issued successfully!");
        } catch (err) {
            console.error("Error issuing certificate:", err);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("devtools-opened") === "true") {
            resetTest();
        }
    }, []);

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

    const resetTest = () => {
        setQuestions([]);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setIncorrectAnswers({});
        setDevToolsDetected(true);
        alert("Test has been reset due to security policy!");
    };

    const testReset = () => {
        setQuestions([]);
        setAnswers({});
        setSubmitted(false);
        setScore(0);
        setIncorrectAnswers({});
    };

    const handleSelect = (questionId: number, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
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
        await issueCertificate(correct);
        await fetch(`http://localhost:5000/api/update-points`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user?._id,
                event: "courseCompleted",
                prize: null,
            }),
        });
        toast.success("You gained 40 points for completing the course!");
        navigate('/certificates');
    };

    if (devToolsDetected) {
        return <h1 className="text-red-500 text-center mt-20 text-2xl font-bold">Test has been reset due to security policy.</h1>;
    }

    return (
        <div className="w-screen min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-3xl font-bold text-[#00A8E8]">Course Test</h2>
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
                                                className={`block cursor-pointer ${isCorrect ? "text-red-400" : isWrongSelected ? "text-green-400" : ""}`}
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