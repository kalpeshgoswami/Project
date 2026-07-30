import userModel from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

// add user
async function add(req, res, next) {

    try {
        const { name, email, password, phone, address, role } = req.body;
        const newUser = await userModel({
            name,
            email,
            password,
            phone,
            address,
            role,
            userPhoto: req.file?.path,
            cloudinary_id: req.file.filename
        })
        await newUser.save()

        res.status(201).json({ success: true, message: "New User Added Successfully", newUser });

    } catch (error) {
        console.log(error);
        return next(new HttpError(error.message, 500));
    }
}

// login user

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // console.log(email, password);

        const user = await userModel.findByCredential(email, password);

        // console.log(user);

        const token = await user.generateAuthToken();

        res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            user,
            token
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        next(new HttpError(error.message, 500));
    }
}

// auth login

const authLogin = async (req, res, next) => {

    try {

        const user = req.user;

        if (!user) {
            return next(new HttpError("user not found", 404));
        }

        res.status(200).json({ success: true, message: "user logged in successfully", user });

    } catch (error) {
        return next(new HttpError(error.message, 500));
    }

}

// all user

const allUserData = async (req, res, next) => {

    try {

        const allUser = await userModel.find()

        if (allUser.length === 0) {
            return next(new HttpError("User data is not found", 400))
        }

        res.status(200).json({ success: true, message: "User found Successfully", allUser });

    } catch (error) {
        next(new HttpError(error.message, 500))
    }

}

// logout user

const logout = async (req, res, next) => {
    try {
        const user = req.user;

        user.tokens = user.tokens.filter((t) => t.token != req.token);
        await user.save();

        res
            .status(200)
            .json({ success: true, message: "user logout successfully" });
    } catch (error) {
        next(new HttpError(error.message));
    }
};

// all logout 

const allLogout = async (req, res, next) => {

    try {

        req.user.tokens = [];

        await req.user.save();

        res.status(200).json({ success: "user logout from all device" })

    } catch (error) {
        next(new HttpError(error.message));
    }

}

// delete user

const deleteUser = async (req, res, next) => {
    try {
        const targetedUser = req.params.id || req.user._id;

        const user = await userModel.findById(targetedUser);

        await cloudinary.uploader.destroy(user.cloudinary_id);

        await user.deleteOne();

        res
            .status(200)
            .json({ success: true, message: "user data delete successfully" });
    } catch (error) {
        next(new HttpError(error.message));
    }
};

// update user

const update = async (req, res, next) => {

    try {

        const targetedUser = req.params.id || req.user._id;

        const user = await userModel.findById(targetedUser);

        const updates = Object.keys(req.body);

        let allowedFiled = ["name", "address", "phone"];

        if (req.user.role === "admin") {
            allowedFiled = [...allowedFiled, "isVerified"];
        }

        const isValidUpdate = updates.every((filed) => {
            return allowedFiled.includes(filed);
        })

        if (!isValidUpdate) {
            return next(new HttpError("Only allowed filed can update", 404))
        }

        if (req.file) {
            if (user.Cloudinary_Id) {
                await cloudinary.uploader.destroy(user.Cloudinary_Id);
            }

            user.userPhoto = req.file.path;
            user.Cloudinary_Id = req.file.filename;
        }

        updates.forEach((update) => {
            user[update] = req.body[update];
        })

        await user.save()

        res.status(200).json({ message: "user data updated successfully", user })

    } catch (error) {
        return next(new HttpError(error.message))
    }

}

export default { add, login, authLogin, allUserData, logout, allLogout, deleteUser, update }