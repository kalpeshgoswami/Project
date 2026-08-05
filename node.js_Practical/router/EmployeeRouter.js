import express from "express";
import employeeController from "../Controller/employeeController.js";
import auth from "../middleware/auth.js";


const router = express.Router()

router.post("/addEmployee", employeeController.add)

router.post("/login", employeeController.login)

router.post("/authlogin", auth, employeeController.authLogin)

router.get("/allEmp", employeeController.allEmpData)

router.get("/logout", auth, employeeController.logout)

router.get("/allLogout", auth, employeeController.allLogout)

router.delete("/delete", auth, employeeController.deleteEmp)

router.patch("/update", auth, employeeController.update)

export default router
