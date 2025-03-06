const OpenAI = require('openai');
require('dotenv').config();

/*
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
*/

// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


export const generateQuestion = async (previousQuestions, position, description) => {
    const system = ``;
    const prompt = ``;

    const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY});
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {role: 'system', content: 'You are a helpful assistant.'},
            {role: 'user', content: 'Write a haiku about recursion in programming.'},
        ],
        temperature: 0.7,
        max_tokens: 200,
    });

    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
}


export default {generateQuestion};
