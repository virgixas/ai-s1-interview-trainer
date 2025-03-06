import { useState } from "react";
import { useRouter } from "next/router";

const Introduction = ({ onSubmit }) => {
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

        const res = await fetch("/api/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput: formData }),
        });
        const data = await res.json();
console.log(data);
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
                    value={formData.description}
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