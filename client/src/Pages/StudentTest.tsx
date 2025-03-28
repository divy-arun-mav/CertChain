import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const StudentTest = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState<Record<number, string>>({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/generate-questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ topic: "Open Campus Edu Chain Blockchain" }),
                });

                const data: Question[] = await response.json();
                setQuestions(data);
            } catch (err) {
                console.error("Error fetching AI-generated questions:", err);
            }
        };

        fetchQuestions();
    }, [courseId]);

    const handleSelect = (questionId: number, answer: string) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = () => {
        let correct = 0;
        const incorrectAnswersMap: Record<number, string> = {};
        
        questions.forEach((q) => {
            const givenAnswer = answers[q.id][0];
            const correctAnswer = q.correctAnswer.replace("Correct ", "").trim(); 

            if (givenAnswer === correctAnswer) {
                correct++;
            } else {
                incorrectAnswersMap[q.id] = correctAnswer;
            }
        });

        setScore(correct);
        setSubmitted(true);
        setIncorrectAnswers(incorrectAnswersMap); 
    };

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
                                <h3 className="text-xl font-semibold">{q.question}</h3>
                                <div className="mt-2">
                                    {q.options.map((option) => {
                                        const isSelected = answers[q.id] === option;
                                        const isCorrect = q.correctAnswer === option;
                                        const isWrongSelected = isSelected && !isCorrect;

                                        console.log(isCorrect);

                                        return (
                                            <label
                                                key={option}
                                                className={`block cursor-pointer ${isWrongSelected ? "text-red-400" : isCorrect ? "text-green-400" : "" }`}
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

                    <button
                        onClick={handleSubmit}
                        className="mt-6 px-6 py-2 bg-[#00A8E8] text-black font-bold rounded-lg hover:bg-[#0086C7]"
                    >
                        Submit Test
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentTest;