
import userModel from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";


const add = async (req, res, next) => {
    try {
        console.log("REGISTER BODY:", req.body);
        console.log("REGISTER FILE:", req.file);

        const {
            name,
            email,
            password,
            phone,
            address
        } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return next(new HttpError("Email already registered", 409));
        }

        const newUser = new userModel({
            name,
            email,
            password,
            phone,
            address,
            role: "user",
            userPhoto: req.file?.path || "",
            cloudinary_id: req.file?.filename || null,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "New User Added Successfully",
            user: newUser,
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return next(new HttpError(error.message, 500));
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findByCredential(email, password);
        const token = await user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "User Logged in Successfully",
            user,
            token,
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return next(new HttpError(error.message, 401));
    }
};

const authLogin = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
        });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

const allUserData = async (req, res, next) => {
    try {
        const allUser = await userModel.find();

        if (allUser.length === 0) {
            return next(new HttpError("User data not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Users found successfully",
            allUser,
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const logout = async (req, res, next) => {
    try {
        const user = req.user;

        user.tokens = user.tokens.filter(
            (t) => t.token !== req.token
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "User logout successfully",
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const allLogout = async (req, res, next) => {
    try {
        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({
            success: true,
            message: "User logged out from all devices",
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const targetedUser = req.params.id || req.user._id;
        const user = await userModel.findById(targetedUser);

        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        if (user.cloudinary_id) {
            await cloudinary.uploader.destroy(user.cloudinary_id);
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const update = async (req, res, next) => {
    try {
        const targetedUser = req.params.id || req.user._id;
        const user = await userModel.findById(targetedUser);

        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        const updates = Object.keys(req.body);

        let allowedFields = ["name", "address", "phone"];

        if (req.user.role === "admin") {
            allowedFields.push("isVerified");
        }

        const isValidUpdate = updates.every((field) =>
            allowedFields.includes(field)
        );

        if (!isValidUpdate || updates.length === 0) {
            return next(
                new HttpError("Only allowed fields can be updated", 400)
            );
        }

        if (req.file) {
            if (user.cloudinary_id) {
                await cloudinary.uploader.destroy(user.cloudinary_id);
            }

            user.userPhoto = req.file.path;
            user.cloudinary_id = req.file.filename || null;
        }

        updates.forEach((field) => {
            user[field] = req.body[field];
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "User data updated successfully",
            user,
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

export default {
    add,
    login,
    authLogin,
    allUserData,
    logout,
    allLogout,
    deleteUser,
    update,
};
