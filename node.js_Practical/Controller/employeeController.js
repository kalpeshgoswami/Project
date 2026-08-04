import HttpError from "../middleware/HttpError.js";
import Employee from "../model/EmployeeModel.js";


const add = async (req, res, next) => {

    try {

        const { name, address, phone, email, password, role } = req.body

        const newEmployee = await Employee({ name, address, phone, email, password, role });

        await newEmployee.save();

        res.status(201).json({ success: true, message: "New employee Added Successfully", newEmployee });

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}

const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const employeelogin = await Employee.findByCredential(email, password);

        if (!employeelogin) {
            return next(new HttpError("unable to login", 400))
        }

        const token = await employeelogin.generateAuthToken();

        res.status(200).json({ success: true, message: "Employee logged in succeessfully", employeelogin, token })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }

}


const authLogin = async (req, res, next) => {
    try {
        const employee = req.employee;

        if (!employee) {
            return next(new HttpError("employee not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "employee logged in successfully",
            employee
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
}

const allEmpData = async (req, res, next) => {

    try {

        const allEmp = await Employee.find()

        if (allEmp.length === 0) {
            return next(new HttpError("Employee data is not found", 400))
        }

        res.status(200).json({ success: true, message: "Employee found Successfully", allEmp });

    } catch (error) {
        next(new HttpError(error.message, 500))
    }

}

const logout = async (req, res, next) => {
    try {
        const employee = req.employee;

        employee.tokens = employee.tokens.filter((t) => t.token != req.token);
        await employee.save();

        res
            .status(200)
            .json({ success: true, message: "Employee logout successfully" });
    } catch (error) {
        next(new HttpError(error.message));
    }
};

const allLogout = async (req, res, next) => {

    try {

        req.employee.tokens = [];

        await req.employee.save();

        res.status(200).json({ success: "Employee logout from all device" })

    } catch (error) {
        next(new HttpError(error.message));
    }

}

const deleteEmp = async (req, res, next) => {
    try {
        const targetedEmp = req.params.id || req.employee._id;

        const employee = await Employee.findById(targetedEmp);

        await employee.deleteOne();

        res
            .status(200)
            .json({ success: true, message: "Employee data delete successfully" });
    } catch (error) {
        next(new HttpError(error.message));
    }
};


const update = async (req, res, next) => {

    try {

        const targetedEmp = req.params.id || req.employee._id;

        const employee = await Employee.findById(targetedEmp);

        const updates = Object.keys(req.body);

        let allowedFiled = ["name", "address", "phone"];

        const isValidUpdate = updates.every((filed) => {
            return allowedFiled.includes(filed);
        })

        if (!isValidUpdate) {
            return next(new HttpError("Only allowed filed can update", 404))
        }

        updates.forEach((update) => {
            employee[update] = req.body[update];
        })

        await employee.save()

        res.status(200).json({ message: "Employee data updated successfully", employee })

    } catch (error) {
        return next(new HttpError(error.message))
    }

}


export default { add, login, authLogin, allEmpData, logout, allLogout, deleteEmp, update }