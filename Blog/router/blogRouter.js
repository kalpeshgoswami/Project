import express from "express";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import validate from "../middleware/validate.js";
import { addBlogSchema, updateBlogSchema } from "../validation/blogSchema.js";
import blogController from "../controller/blogController.js";

const router = express.Router()

router.post("/add", auth, upload.single("image"),validate(addBlogSchema), blogController.add);

router.get("/allBlog", auth, checkRole("user", "admin"), blogController.allBlog);

router.delete("/delete/:id", auth, checkRole("user", "admin"), blogController.deleteBlog);

router.patch("/update/:id", auth, upload.single("image"),validate(updateBlogSchema), blogController.update)

export default router