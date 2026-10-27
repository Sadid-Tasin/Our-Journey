// Login questions data - Replace with your own personal questions & answers!
export interface Question {
    id: number;
    question: string;
    placeholder: string;
    answer: string;
}

export const loginQuestions: Question[] = [
    {
        id: 1,
        question: "The first city we traveled to together was",
        placeholder: "Enter the city name...",
        answer: "paris", // Change this to your real answer (lowercase)
    },
    {
        id: 2,
        question: "Our song is called",
        placeholder: "Enter our song name...",
        answer: "perfect", // Change this to your real answer (lowercase)
    },
    {
        id: 3,
        question: "The nickname I secretly call you is",
        placeholder: "Enter the nickname...",
        answer: "sunshine", // Change this to your real answer (lowercase)
    },
];
