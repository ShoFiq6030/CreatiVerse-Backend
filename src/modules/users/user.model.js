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
            default: "https://res.cloudinary.com/dutnq2gdm/image/upload/v1745864054/user-1699635_640_mgcjmz.png",
        },
        bio: {
            type: String,
            default: "I am a Digital Marketing Specialist with 5+ years in e-commerce. Known for driving online growth through data-driven campaigns, she helps small businesses expand their digital footprint.",
        },

        // Social login ids
        googleId: {
            type: String,
            default: null,
        },
        provider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            select: false,
        },
        emailVerifyCode: {
            type: Number,
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
