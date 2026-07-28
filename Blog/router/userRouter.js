import express from "express";
import userController from "../controller/userController.js"
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const router = express.Router()

router.post("/add", upload.single("userPhoto"), userController.add)

router.post("/login", userController.login)

router.post("/authLogin",auth,userController.authLogin);

router.get("/allData", auth, userController.allUserData);

router.get("/logoutUser", auth, userController.logout);

router.delete("/delete", auth, userController.deleteUser);

router.patch("/update",auth,upload.single("userPhoto"),userController.update)

export default router