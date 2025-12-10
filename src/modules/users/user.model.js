const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // password never returns in queries unless explicitly selected
        },

        role: {
            type: String,
            enum: ["user", "creator", "admin"],
            default: "user",
        },

        profileImage: {
            type: String,
            default: "",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },

    },
    {
        timestamps: true, 
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
