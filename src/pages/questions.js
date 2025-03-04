import Layout from "../components/Layout";
import Question from "../components/Question";

export default function Questions() {
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                <Question/>
            </div>
        </Layout>
    );
}
