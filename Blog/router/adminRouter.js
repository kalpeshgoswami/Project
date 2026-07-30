import express from "express";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";

import userController from "../controller/userController.js";

const router = express.Router()

router.delete("/delete/:id",auth,checkRole("admin"),userController.deleteUser)

router.patch("/update/:id",auth,checkRole("admin"),upload.single("image"),userController.update)

export default router;