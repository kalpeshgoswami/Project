import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/DB.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "hello from server" });
});

// 404 route
app.use((req, res, next) => {
    next(new HttpError("Route not found", 404));
});

// Centralize  Error handling 
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

const port = 5000;

async function startServer() {

    try {

        const connect = await connectDB()

        if (!connect) {
            return next(new HttpError("failed to connect BD"))
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message);
            }

            console.log(`server running on port ${port}`);
        });

    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

startServer()