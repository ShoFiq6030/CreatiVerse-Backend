const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
    {
        contestName: {
            type: String,
            required: true,
            trim: true,
            require: true
        },

        image: {
            type: String,
            required: true,
            require: true,
            default: ""
        },

        description: {
            type: String,
            required: true,
        },

        taskInstruction: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        prizeMoney: {
            type: Number,
            required: true,
            min: 0,
        },

        contestType: {
            type: String,
            required: true,
            enum: [
                "image-design",
                "logo-design",
                "photography",
                "article-writing",
                "story-writing",
                "poetry-writing",
                "business-idea",
                "startup-pitch",
                "gaming-review",
                "coding-challenge",
                "web-design",
                "video-editing",
                "meme-creation",
                "marketing-strategy",
                "innovation-challenge",
                "other",
            ],
        },

        deadline: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "completed"],
            default: "pending",
        },

        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        participantsCount: {
            type: Number,
            default: 0,
        },

        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        submissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Submission",
            },
        ],

        winner: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: null,
            },
            submissionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Submission",
                default: null,
            },
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Contest", contestSchema);
