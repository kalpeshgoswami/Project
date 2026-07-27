import userModel from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {

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
        next(new HttpError(error.message, 500))
    }

}

export default {add}