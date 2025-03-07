import { useState } from "react";
import { useRouter } from "next/router";

const Introduction = ({ onSubmit }) => {

    const defaultDescription = '**Job Title: Senior PHP/Laravel Backend Developer**\n' +
        '\n' +
        '**Job Overview:**  \n' +
        'We are seeking an experienced **Senior PHP/Laravel Backend Developer** to join our team. The ideal candidate will be responsible for designing, developing, and maintaining high-performance backend systems using Laravel and PHP. You will work closely with front-end developers, product managers, and other team members to build scalable and secure web applications. If you are passionate about writing clean and efficient code while implementing best practices, we’d love to hear from you.\n' +
        '\n' +
        '**Key Responsibilities:**  \n' +
        '- Develop, test, and maintain scalable backend applications using PHP and Laravel.\n' +
        '- Design and implement RESTful APIs and third-party integrations.\n' +
        '- Optimize database queries and ensure efficient data storage using MySQL or PostgreSQL.\n' +
        '- Collaborate with frontend developers to integrate user-facing elements with backend logic.\n' +
        '- Troubleshoot, debug, and enhance existing applications.\n' +
        '- Write clean, maintainable, and well-documented code following industry standards.\n' +
        '- Implement security measures to protect applications and data.\n' +
        '- Conduct code reviews and mentor junior developers.\n' +
        '- Stay updated with emerging technologies and best practices in PHP and Laravel development.\n' +
        '- Participate in system architecture discussions and contribute to technical decision-making.\n' +
        '\n' +
        '**Requirements:**  \n' +
        '- **5+ years** of experience in PHP development, with a strong focus on **Laravel**.\n' +
        '- Proficient in writing RESTful APIs and integrating third-party services.\n' +
        '- Strong knowledge of **MySQL, PostgreSQL**, or other relational databases.\n' +
        '- Experience with **Redis, Elasticsearch, or other caching mechanisms** is a plus.\n' +
        '- Familiarity with **Docker, Kubernetes, or cloud services (AWS, GCP, or Azure)**.\n' +
        '- Proficiency in **Git** for version control and collaborative development.\n' +
        '- Understanding of **SOLID principles, design patterns, and best coding practices**.\n' +
        '- Experience with **unit testing and automated testing frameworks**.\n' +
        '- Strong debugging and problem-solving skills.\n' +
        '- Excellent communication and teamwork abilities.\n' +
        '- Experience with Agile methodologies is a plus.\n' +
        '\n' +
        '**Nice to Have:**  \n' +
        '- Experience in microservices architecture.\n' +
        '- Knowledge of event-driven architectures (RabbitMQ, Kafka, etc.).\n' +
        '- Familiarity with DevOps practices and CI/CD pipelines.\n' +
        '- Contributions to open-source projects or a strong GitHub portfolio.\n' +
        '\n' +
        '**Benefits:**  \n' +
        '- Competitive salary based on experience.\n' +
        '- Flexible working hours and remote work options.\n' +
        '- Opportunity to work with modern technologies and scalable projects.\n' +
        '- A collaborative and innovative work environment.\n' +
        '- Professional growth opportunities and learning resources.\n' +
        '\n' +
        'If you are a highly skilled Laravel backend developer looking for an exciting challenge, apply now and be part of a dynamic team that values innovation and technical excellence!\n' +
        '\n';

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        description: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        position: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = { name: "", position: "", description: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            isValid = false;
        }

        if (!formData.position.trim()) {
            newErrors.position = "Position is required.";
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required.";
            isValid = false;
        } else if (formData.description.split(/\s+/).length < 20) {
            newErrors.description = "Description must be at least 200 words.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        formData.questions = [];

        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput: formData }),
        });

        const data = await res.json();
// console.log(data);
        await router.push("/questions");
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
            <h1 className="text-xl font-bold mb-4 text-center">Job position details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <input
                    type="text"
                    name="position"
                    placeholder="Position Name"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
                <textarea
                    name="description"
                    placeholder="Position Description"
                    value={formData.description || defaultDescription}
                    onChange={handleChange}
                    rows="20"
                    className="w-full p-2 border rounded-md resize-none"
                    required
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    Start Test
                </button>
            </form>
        </div>
    );
};

export default Introduction;