
import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const employee = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: (value) => {
            if (value.toLowerCase() === "password") {
                throw new Error("password can't be use as password");
            }
        },
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee"
    },

    tokens: [{
        token: {
            type: String,
        }
    }]

}, {
    timestamps: true
})

employee.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

employee.statics.findByCredential = async function (email, password) {

    try {

        const employee = await this.findOne({ email });

        if (!employee) {
            throw new HttpError("Unable to login", 400);
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if (!isMatch) {
            throw new HttpError("Unable to login", 400);
        }

        return employee;

    } catch (error) {
        throw new Error(error.message)
    }

}

employee.methods.generateAuthToken = async function () {

    try {

        const employee = this;

        const token = jwt.sign(
            {
                _id: employee._id,
                role: employee.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        employee.tokens = employee.tokens.concat({ token })

        await employee.save()

        return token

    } catch (error) {
        throw new Error(error.message)
    }

}


const Employee = mongoose.model("employee", employee);

export default Employee;