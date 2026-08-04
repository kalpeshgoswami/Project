import express from "express";
import attendanceController from "../Controller/attendanceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/mark", auth, attendanceController.markAttendance);

router.get("/today", auth, attendanceController.todayAttendance);

export default router;