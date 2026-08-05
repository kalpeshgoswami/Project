import express from "express";

import employeeController from "../Controller/employeeController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.delete("/Delete/:id", auth, checkRole("admin"), employeeController.deleteEmp);

router.patch("/Update/:id", auth, checkRole("admin"), employeeController.update);

export default router;