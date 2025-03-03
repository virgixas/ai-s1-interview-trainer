import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Questions = () => {
    const router = useRouter();
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the first AI-generated question (Replace with actual API call)
        const fetchQuestion = async () => {
            try {
                const response = await fetch("/api/question"); // Future API endpoint
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Failed to load question");

                setQuestion(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, []);

    const handleAnswerClick = (answer) => {
        console.log("Selected answer:", answer);
        // Here, you can handle the answer submission and fetch the next question
    };

    if (loading) return <p className="text-center mt-10">Loading question...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-xl font-bold mb-4">Interview Question</h1>
                <p className="mb-4">{question?.text}</p>
                <div className="space-y-2">
                    {question?.choices?.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerClick(choice)}
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Questions;