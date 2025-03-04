import Layout from "../components/Layout";
import Introduction from "../components/Introduction";

export default function Home() {
    return (
        <Layout>
            <div className="flex flex-col justify-center items-center bg-gray-100">
                <Introduction/>
            </div>
        </Layout>
    );
}
