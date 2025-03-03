import "../styles/globals.css";

import Layout from "../components/Layout";
import Questionnaire from "../components/Questionnaire";
import Introduction from "../components/Introduction";

export default function Home() {

    const handleFormSubmit = (formData) => {
        console.log("Form Data Submitted:", formData);
    };

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                <Introduction onSubmit={handleFormSubmit} />
            </div>
        </Layout>
    );
}