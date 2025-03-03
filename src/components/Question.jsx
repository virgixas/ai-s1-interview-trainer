import { motion } from "framer-motion";
import {Card} from "./Card";
import {CardContent} from "./CardContent";

export default function Question({ data, onAnswer }) {
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">{data.question}</h2>
                <div className="grid gap-2">
                    {data.answers.map((answer, idx) => (
                        <motion.button
                            key={idx}
                            onClick={() => onAnswer(answer)}
                            className="p-2 border rounded-md hover:bg-gray-200"
                        >
                            {answer.text}
                        </motion.button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}