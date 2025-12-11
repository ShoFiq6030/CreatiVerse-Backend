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
            default:""
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
                "Image Design",
                "Logo Design",
                "Photography",
                "Article Writing",
                "Story Writing",
                "Poetry Writing",
                "Business Idea",
                "Startup Pitch",
                "Gaming Review",
                "Coding Challenge",
                "Web Design",
                "Video Editing",
                "Meme Creation",
                "Marketing Strategy",
                "Innovation Challenge",
                "Other",
            ],
        },

        deadline: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
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
