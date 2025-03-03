import { useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import Question from "./Question";
import {Summary} from "./Summary";

export default function Questionnaire() {
    const [responses, setResponses] = useState([]);
    const [questionData, setQuestionData] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    const fetchQuestion = async () => {
        const response = await axios.get("/api/question");
        setQuestionData(response.data);
    };

    const handleAnswer = async (answer) => {
        const response = await axios.post("/api/answer", {
            question: questionData.question,
            answer: answer.text,
        });

        setResponses(response.data.responses);
        setQuestionData(null);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            {!showSummary ? (
                questionData ? (
                    <Question data={questionData} onAnswer={handleAnswer} />
                ) : (
                    <Button onClick={fetchQuestion} className="mb-4">Get Question</Button>
                )
            ) : (
                <Summary responses={responses} onRestart={() => { setResponses([]); setShowSummary(false); }} />
            )}
            {responses.length > 0 && !showSummary && (
                <Button onClick={() => setShowSummary(true)} className="mt-4">Finish</Button>
            )}
        </div>
    );
}
