import Layout from "../components/Layout";
import Question from "../components/Question";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Questions() {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch session data
                const sessionResponse = await axios.get('/api/session');
                const sessionData = sessionResponse.data.userInput;
console.log(sessionData, "s");
                // Use session data to call the OpenAI API
                const openAIResponse = await axios.post('/api/openai', sessionData);
                const result = openAIResponse.data;
                console.log(result, "r");
                // Set the result as data
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                { data && (
                    <Question data={data}/>
                )}

            </div>
        </Layout>
    );
}
