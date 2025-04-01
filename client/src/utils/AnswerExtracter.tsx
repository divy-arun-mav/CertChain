/* eslint-disable no-useless-escape */
interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

export const extractCorrectAnswer = (q: Question): string => {
    const rawAnswer = q.correctAnswer.replace(/Correct\s*answer\s*/i, "")
        .replace(/Correct\s*/i, "")
        .trim();

    if (/^[A-D]$/.test(rawAnswer)) {
        const letterToIndex: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
        const index = letterToIndex[rawAnswer.toUpperCase()];
        if (q.options[index]) {
            return q.options[index].replace(/Option\s+[A-D][\):]\s*/i, "").trim();
        }
    }

    const letterMatch = rawAnswer.match(/^([A-D])[\):]?\s*/i);
    if (letterMatch) {
        const letter = letterMatch[1].toUpperCase();
        const matchingOption = q.options.find(opt => new RegExp(`^Option\\s+${letter}[\\):]`, "i").test(opt));
        if (matchingOption) {
            return matchingOption.replace(new RegExp(`^Option\\s+${letter}[\\):]\\s*`, "i"), "").trim();
        }
    }
    const matchingOption = q.options.find(opt => opt.toLowerCase().includes(rawAnswer.toLowerCase()));
    if (matchingOption) {
        return matchingOption.replace(/Option\s+[A-D][\):]\s*/i, "").trim();
    }

    return rawAnswer;
};
