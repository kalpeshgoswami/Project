import User from "../model/userModel.js";
import HttpError from "../middleware/HttpError.js";

const addUser = async (req, res, next) => {

    try {

        const { name, email, phone, password, role } = req.body

        const newUser = new User({
            name,
            email,
            phone,
            password,
            role,
            profileImage: req.file?.path,
            cloudinary_id: req.file?.filename
        })

        await newUser.save()

        res.status(201).json({
            success: true,
            message: "New user added successfully",
            newUser
        })

    } catch (error) {
        return next(new HttpError(error.message, 500))
    }
}

export default { addUser }