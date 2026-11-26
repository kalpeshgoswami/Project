
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/DB.js";
import router from "./router/userRouter.js";
import blogRouter from "./router/blogRouter.js";
import adminRouter from "./router/adminRouter.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", router);
app.use("/blog", blogRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello from server",
    });
});

app.use((req, res, next) => {
    return next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
    console.error("BACKEND ERROR:", error);
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR STACK:", error.stack);

    if (res.headersSent) {
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error",
    });
});

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        const connect = await connectDB();

        if (!connect) {
            console.log("Failed to connect DB");
            process.exit(1);
        }

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error("SERVER START ERROR:", error);
        process.exit(1);
    }
}

startServer();

export default app;
