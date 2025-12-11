const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        contestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contest",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        submissionText: {
            type: String,
            required: true,
            trim: true,
        },

        submissionImg: {
            type: String,
            default: "",
        },

        submittedAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Submission", submissionSchema);
