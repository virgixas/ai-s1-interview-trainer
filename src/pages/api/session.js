import session from "express-session";

const sessionMiddleware = session({
    secret: "a1B2c3D4e5F6g7H8i9J0kLmNOpQrStUv",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
    },
});

export default async function handler(req, res) {

    await new Promise((resolve, reject) =>
        sessionMiddleware(req, res, (err) => (err ? reject(err) : resolve()))
    );

    if (req.method === "POST") {
        const { userInput } = req.body;
        req.session.userInput = userInput; // Store in session
        res.json({ message: "User input saved!", userInput });
    }

    if (req.method === "GET") {
        res.json({ userInput: req.session.userInput || "No input yet!" });
    }
}