const User = require('./user.model');

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

module.exports = { getUserProfileService };
