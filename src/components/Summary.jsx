import {Card} from "./Card";
import {CardContent} from "./CardContent";
import {Button} from "./Button";

export function Summary({ responses, onRestart }) {
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Summary</h2>
                <div className="grid gap-2">
                    {responses.map((resp, idx) => (
                        <div key={idx} className="p-2 border-b">
                            <p className="font-medium">{resp.question}</p>
                            <p className={resp.correct ? "text-green-500" : "text-red-500"}>{resp.answer}</p>
                        </div>
                    ))}
                </div>
                <Button onClick={onRestart} className="mt-4">Restart</Button>
            </CardContent>
        </Card>
    );
}
