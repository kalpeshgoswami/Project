import express from "express";
import attendanceController from "../Controller/attendanceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, attendanceController.add);

export default router;