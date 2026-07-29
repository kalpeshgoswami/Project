import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";
import blogModel from "../model/blogModel.js"

const add = async (req, res, next) => {
    try {

        const { title, description, category } = req.body;

        const newBlog = await blogModel({
            title,
            description,
            category,
            image: req.file?.path || path,
            cloudinary_id: req.file.filename || null,
            author: req.user._id,
        });

        await newBlog.save()

        res.status(201).json({ success: true, message: "blog added successfully", newBlog })

    } catch (error) {
        return next(new HttpError(error.message))
    }
}

export default { add }