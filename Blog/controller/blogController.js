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


const allBlog = async (req, res, next) => {

    try {

        const blogs = await blogModel.find();

        if (blogs.length === 0) {
            return next(new HttpError("blog is not found", 400))
        }

        res.status(200).json({ success: true, message: "Blogs found Successfully", allUser });

    } catch (error) {
        next(new HttpError(error.message))
    }
};


const deleteBlog = async (req, res, next) => {

    try {

        const targetedUser = req.params.id;

        const blogs = await blogModel.findById(targetedUser);

        if (req.user.cloudinary_id) {
            await cloudinary.uploader.destroy(blogs.cloudinary_id);
        }

        await blogs.deleteOne()

        res.status(200).json({ success: true, message: "blog deleted successfully" });

    } catch (error) {
        next(new HttpError(error.message))
    }
}


const update = async (req, res, next) => {

    try {

        const blogs = await blogModel.findById(req.params.id);

        if (!blogs) {
            return next(new HttpError("Blog is not found", 404));
        }

        const updates = Object.keys(req.body);

        const allowedFields = ["title", "description", "category"];

        const isValidUpdate = updates.every((field) =>
            allowedFields.includes(field)
        )

        if (!isValidUpdate) {
            return next(new HttpError("only allowed field can be updated", 404));
        }

        if (req.file) {
            if (blogs.cloudinary_id) {
                await cloudinary.uploader.destroy(blog.cloudinary_id);
            }

            blogs.image = req.file.path;
            blogs.cloudinary_id = req.file.filename;

        }

        updates.forEach((field) => {
            blogs[field] = req.body[field];
        })

        res.status(200).json({ success: true, message: "blog updated successfully", blogs })

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default { add, allBlog, deleteBlog, update }