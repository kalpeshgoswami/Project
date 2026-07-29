import express from "express";
import dotenv from "dotenv";
dotenv.config()

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/DB.js";
import router from "./router/userRouter.js"
import blogRouter from "./router/blogRouter.js"

const app = express()

app.use(express.json())

app.use("/user", router)
app.use("/blog", blogRouter)

// server check
app.get("/", (req, res) => {
    res.json({ message: "hello from server" })
});

// if route not found
app.use((req, res, next) => {
    return next(new HttpError("requested route not found", 404));
})

//  centralize error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" })
})

const port = 5000;

async function startServer() {

    try {

        const connect = await connectDB()

        if (!connect) {
            return console.log("failed to connect DB")
        }

        app.listen(port, (err) => {
            if (err) {
                return console.log(err.message)
            }
            console.log(`server running port on ${port}`)
        })

    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

startServer()