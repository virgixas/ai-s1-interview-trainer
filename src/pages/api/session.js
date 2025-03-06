import session from "express-session";

const sessionMiddleware = session({
    secret: "your-secret-key", // Replace with your own secret
    resave: false, // Prevents resaving session unless something changed
    saveUninitialized: true, // Creates a new session if not initialized
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
});

export default async function handler(req, res) {
    // Initialize session middleware for API route
    await new Promise((resolve, reject) =>
        sessionMiddleware(req, res, (err) => (err ? reject(err) : resolve()))
    );

    // Save user input in the session
    if (req.method === "POST") {
        const { userInput } = req.body;
        req.session.userInput = userInput; // Store in session
        res.json({ message: "User input saved!", userInput });
    }

    // Retrieve session data
    if (req.method === "GET") {
        res.json({ userInput: req.session.userInput || "No input yet!" });
    }
}