
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    userPhoto: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.statics.findByCredential = async function (email, password) {

//     const user = await this.findOne({ email });

//     if (!user) {
//         throw new Error("failed to login")
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         throw new Error("failed to login")
//     }

//     return user;
// };

userSchema.statics.findByCredential = async function (email, password) {

    const user = await this.findOne({ email });

    console.log("User:", user);

    if (!user) {
        throw new Error("User not found");
    }

    console.log("Entered Password:", password);
    console.log("DB Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
        throw new Error("Invalid password");
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.JWT_SECRET
    );
    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token

};

userSchema.virtual("blogs", {

    ref: "blog",
    localField: "_id",
    foreignField: "author"

})

userSchema.methods.toJSON = function () {

    const user = this;
    const userObject = user.toObject();

    delete userObject.password,
    delete userObject.tokens;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v

    return userObject;

}

const userModel = mongoose.model("user", userSchema);

export default userModel