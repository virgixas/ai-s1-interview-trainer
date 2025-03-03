export default function handler(req, res) {
    if (req.method === "POST") {
        const { name, position, description } = req.body;
        const data = { name, position, description };

        if (!name || !position || !description) {
            return res.status(400).json({ error: "All fields are required." });
        }

        sessionStorage.setItem("introduction", JSON.stringify(data));

        // Respond with success message
        return res.status(200).json({ message: "OK" });
    }

    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
}
