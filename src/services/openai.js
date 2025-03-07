const OpenAI = require('openai');
require('dotenv').config();

export const generateQuestion = async (previousQuestions, position, description) => {

    const previous = previousQuestions.map(question => 'Previous question : "{$question.question}". Available ' +
        'responses : '+question.answers.map(answer => `"${answer}"`).join(", ")+`. Correct: "${question.correct}". 
        Answered: "${question.response}".`).join("\n");

    const system = `You are an preparation for job interview assistant. You are given a job title and description.
    You have to generate a question based on the job title and description. Question should be clear and concise. 
    You should not repeat the job title or description. You should not repeat the previous questions.
    Question should test the candidate's knowledge of the job title and description. Has to be total 10 questions. 
    50-70% of questions should be technical, others - to test candidate soft skills. Each question should have 4 options,
    where just one is correct. Your response should be in json format without any wrapping so i can JSON.parse it : {"question": "", "answers": ["", "", "", ""], "correct": (1 to 4)}'`;

    const prompt = `I m preparing for job interview for position "${position}". Full job description is: 
    "${description}". I have already answered : ${previous}. Please give me next question.`;

    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY});
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {role: 'system', content: system},
            {role: 'user', content: prompt},
        ],
        temperature: 0.7,
        max_tokens: 2000,
    });

     console.log(JSON.parse(completion.choices[0].message.content));

    return JSON.parse(completion.choices[0].message.content);
}


export default {generateQuestion};
