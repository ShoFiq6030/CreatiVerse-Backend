const User = require('./user.model');
const bcrypt = require("bcryptjs");
const Contest = require('../contests/contest.model');
const Submission = require('../submissions/submission.model');

const getUserProfileService = async (id, user) => {
    try {
        const userData = await User.findById(id)
            .select("+password +refreshToken +emailVerifyCode");


        if (!userData) {
            return { error: 'User not found' };
        }

        // Exclude sensitive fields that are select:false
        const safeUser = userData.toObject();

        if (user.role === "admin") {
            return safeUser;

        } else {
            delete safeUser.password;
            delete safeUser.refreshToken;
            delete safeUser.emailVerifyCode;
            return safeUser;
        }




    } catch (error) {
        return { error: error.message };
    }
};
const updateUserProfileService = async (id, currentUser, payload) => {
    try {
        // Fetch user with hidden fields
        const existingUser = await User.findById(id)
            .select("+password +refreshToken +emailVerifyCode");

        if (!existingUser) {
            return { error: "User not found" };
        }

        // --- Non-admin users cannot update certain fields ---
        const forbiddenFields = ["email", "role", "isVerified", "refreshToken", "emailVerifyCode"];

        if (currentUser.role !== "admin") {
            for (const field of forbiddenFields) {
                if (payload[field] !== undefined) {
                    return { error: `${field} cannot be updated` };
                }
            }
        }
        // --- Handle password change ---
        if (payload.password) {
            if (!payload.oldPassword) {
                return { error: "oldPassword is required to change password" };
            }

            const isMatch = await bcrypt.compare(payload.oldPassword, existingUser.password);
            if (!isMatch) {
                return { error: "Old password is incorrect" };
            }

            // Hash new password
            const salt = await bcrypt.genSalt(10);
            payload.password = await bcrypt.hash(payload.password, salt);
        }

        // --- Update user ---
        const updatedUser = await User.findByIdAndUpdate(
            id,
            payload,
            { new: true, runValidators: true }
        ).select("+password +refreshToken +emailVerifyCode");

        if (!updatedUser) {
            return { error: "Failed to update user" };
        }

        // Convert to object for safe filtering
        const safeUser = updatedUser.toObject();

        // --- Hide sensitive fields for non-admins ---
        if (currentUser.role !== "admin") {
            delete safeUser.password;
            delete safeUser.refreshToken;
            delete safeUser.emailVerifyCode;
        }

        return safeUser;

    } catch (error) {
        return { error: error.message };
    }
};

const getAllUsersService = async () => {
    try {
        const users = await User.find()
            .select("-password -refreshToken +emailVerifyCode")
            .sort({ createdAt: -1 });

        return users;
    } catch (error) {
        return { error: error.message };
    }
};
const deleteUserService = async (id) => {
    try {

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return { error: "User not found or already deleted" };

        }
        const deleteUserContest = await Contest.deleteMany({ creator: id });
        const deleteUserSubmissions = await Submission.deleteMany({ userId: id });
        return deletedUser;
    } catch (error) {
        return { error: error.message };
    }
};





module.exports = { getUserProfileService, updateUserProfileService, getAllUsersService, deleteUserService };
