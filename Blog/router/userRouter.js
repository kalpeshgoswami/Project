import express from "express";
import userController from "../controller/userController.js"
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import { registerUserSchema, updateUserSchema } from "../validation/userSchema.js";

const router = express.Router()

router.post("/add", upload.single("userPhoto"), validate(registerUserSchema), userController.add)

router.post("/login", userController.login)

router.post("/authLogin", auth, userController.authLogin);

router.get("/allData", auth, userController.allUserData);

router.get("/logoutUser", auth, userController.logout);

router.get("/allLogout", auth, userController.allLogout)

router.delete("/delete", auth, userController.deleteUser);

router.patch("/update", auth, upload.single("userPhoto"), validate(updateUserSchema), userController.update)

export default router;