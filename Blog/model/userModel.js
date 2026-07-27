
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userPhoto: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
}, {
    timestamps: true,
})

const userModel = mongoose.model("user", userSchema);

export default userModel