import { required } from "joi"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    profileImage: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        required: true,
        trim: true,
        enum: ["user", "driver", "admin"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
    }

},
    {
        timestamps: true
    }
)

const User = mongoose.module("user", userSchema)

export default User;