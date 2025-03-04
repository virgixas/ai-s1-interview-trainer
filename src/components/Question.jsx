import React, { useState, useEffect } from "react";

const Question = () => {
    // State to manage question data
    const [questionData, setQuestionData] = useState(null);

    // Function to load question data
    const loadQuestion = async () => {
        try {
            console.log("Loading question...");

            // Call generateQuestion to get data
            const result = await generateQuestion();
            setQuestionData(result);
        } catch (error) {
            console.error("Error loading question:", error);
        }
    };

    // Function to generate question (retrieves data from sessionStorage and processes it)
    const generateQuestion = async () => {
        if (typeof window === "undefined") {
            console.error("Window is undefined (server-side)");
            return null;
        }

        // Access sessionStorage
        const storedIntroduction = sessionStorage.getItem("introduction");

        if (!storedIntroduction) {
            console.error("No introduction data found in sessionStorage");
            return null;
        }

        // Parse sessionStorage data
        const introduction = JSON.parse(storedIntroduction);

        // Generate question data (mock example/call question function)
        const { position, description } = introduction;

        // In real usage, replace this with a function that processes the data (like `question()`).
        return { position, description }; // Mock response for now
    };

    // Initial effect to call loadQuestion when the component mounts
    useEffect(() => {
        loadQuestion();
    }, []);

    return (
        <div className="question-component">
            {/* Wrap the content within the required div */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full">
                {/* Render data or placeholder */}
                {questionData ? (
                    <>
                        <h1 className="text-xl font-bold">Question Loaded</h1>
                        <p>Position: {questionData.position}</p>
                        <p>Description: {questionData.description}</p>
                    </>
                ) : (
                    <p>Loading question data...</p>
                )}
            </div>
        </div>
    );
};

export default Question;

// import { generateQuestion } from '../services/openai';
//
// const Question = () => {
//
//     const introduction = JSON.parse(sessionStorage.getItem("introduction"));
//     const question = generateQuestion([], introduction.position, introduction.description);
//
//     console.log(question);
//
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md w-full">
//             <h1 className="text-xl font-bold mb-4 text-center">{data.question}</h1>
//             <div className="grid gap-2">
//                 {data.answers.map((answer, key) => (
//                     <button
//                         onClick={() => onAnswer(answer)}
//                         className="p-2 border rounded-md hover:bg-gray-200"
//                     >
//                         {answer.text}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// export default Question;