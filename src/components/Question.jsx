import React, {useEffect, useState} from "react";

const Question = (data) => {

    const onAnswer = (answer) => {
        console.log(answer);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h1 className="text-xl font-bold mb-4 text-center">{data.data.question}</h1>
            <div className="grid gap-2">
                {data.data.answers.map((answer, key) => (
                    <button
                        key={key}
                        onClick={() => onAnswer(key)}
                        className="p-2 border rounded-md hover:bg-gray-200"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;