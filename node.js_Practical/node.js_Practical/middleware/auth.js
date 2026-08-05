import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js";
import Employee from "../model/EmployeeModel.js";

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new HttpError("Authorization header is required"));
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const employee = await Employee.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!employee) {
            return next(new HttpError("Authentication failed"));
        }

        req.employee = employee;
        req.token = token;

        next();
    } catch (error) {
        next(error);
    }
};

export default auth;