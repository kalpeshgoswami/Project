import Joi from "joi";

export const registerUserSchema = Joi.object({
    name: Joi.string().min(2).max(50).trim().required().messages({
        "string.base": "Name must be in string format",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name cannot exceed 50 characters",
        "any.required": "Name is required",
    }),

    email: Joi.string().email().trim().required().messages({
        "string.base": "Email must be in string format",
        "string.email": "Please enter a valid email",
        "any.required": "Email is required",
    }),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.base": "Phone must be in string format",
            "string.pattern.base":
                "Phone number must be a valid 10-digit Indian mobile number",
            "string.empty": "Phone is required",
            "any.required": "Phone is required",
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
        .messages({
            "string.base": "Password must be in string format",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 20 characters",
            "string.pattern.base":
                "Password must contain uppercase, lowercase, number and special character",
            "any.required": "Password is required",
        }),

    address: Joi.string().min(5).max(100).trim().required().messages({
        "string.base": "Address must be in string format",
        "string.min": "Address must be at least 5 characters long",
        "string.max": "Address cannot exceed 100 characters",
        "any.required": "Address is required",
    }),

    role: Joi.string().valid("user", "admin").default("user").messages({
        "any.only": "Role must be either user or admin",
    }),
});

export const updateUserSchema = registerUserSchema
    .fork(["name", "phone", "password", "address"], (field) =>
        field.optional()
    )
    .fork(["email", "role"], (field) => field.forbidden())
    .or("name", "phone", "password", "address")
    .messages({
        "object.missing":
            "At least one of name, phone, password, address, or userPhoto is required to update.",
    });