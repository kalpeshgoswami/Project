import Joi from "joi";

export const addBlogSchema = Joi.object({
    title: Joi.string().min(3).max(100).trim().required().messages({
        "string.base": "Title must be a string",
        "string.min": "Title must be at least 3 characters long",
        "string.max": "Title cannot exceed 100 characters",
        "any.required": "Title is required",
    }),

    description: Joi.string().min(20).required().messages({
        "string.base": "Description must be a string",
        "string.min": "Description must be at least 20 characters long",
        "any.required": "Description is required",
    }),


    category: Joi.string()
        .valid("Technology", "Sports", "Politics")
        .optional()
        .messages({
            "any.only": "Category must be Technology, Sports or Politics",
        }),
        
    image: Joi.string().optional(),

});

export const updateBlogSchema = addBlogSchema
    .fork(
        ["title", "description", "category", "image"],
        (field) => field.optional()
    )
    .or(
        "title",
        "description",
        "category",
        "image"
    )
    .messages({
        "object.missing":
            "At least one field (title, description, image, category) is required to update",
    });