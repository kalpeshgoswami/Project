import express from "express";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import { registerUserSchema, updateUserSchema } from "../validation/userSchema.js";
import blogController from "../controller/blogController.js";

const router = express.Router()

router.post("/add", auth, upload.single("image"), blogController.add)

export default router