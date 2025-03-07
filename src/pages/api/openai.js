import { generateQuestion } from "../../services/openai";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { name, position, description, questions } = req.body; // Extract required data
            const question = await generateQuestion(questions, position, description); // Call our service
            return res.status(200).json(question);
        } catch (error) {
            console.error("Error generating question:", error.message);
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}