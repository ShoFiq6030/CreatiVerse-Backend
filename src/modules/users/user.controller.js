const { getUserProfileService, updateUserProfileService, getAllUsersService, deleteUserService, getUserContestParticipatedService,getUserContestWinService } = require('./user.service');

const getUserProfile = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params;
        // console.log(id);
        // console.log(user.id);

        if (user.id !== id && user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }
        const result = await getUserProfileService(id, user);

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        res.status(200).json({
            success: true,
            message: 'User profile fetched successfully',
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateUserProfile = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params;
        const payload = req.body
        // console.log(id);
        // console.log(user.id);

        if (user.id !== id && user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }
        const result = await updateUserProfileService(id, user, payload);

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        res.status(200).json({
            success: true,
            message: 'User profile update successfully',
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user = req.user;

        // Only admin can access this endpoint
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin access required"
            });
        }

        const result = await getAllUsersService();

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }

        res.status(200).json({
            success: true,
            message: 'All users fetched successfully',
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        // Only admin can access this endpoint
        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Admin access required"
            });
        }
        const result = await deleteUserService(id);

        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserContestParticipated = async (req, res) => {
    try {
        const user = req.user;
        // console.log(user);
        const { userId } = req.params;
        if (user.id !== userId && user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }
        const result = await getUserContestParticipatedService(userId);
        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }
        res.status(200).json({
            success: true,
            message: 'User contest participated fetched successfully',
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserContestWin = async (req, res) => {
    try {
        const user = req.user;
        const { userId } = req.params;
        if (user.id !== userId && user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }
        const result = await getUserContestWinService(userId);
        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }
        res.status(200).json({
            success: true,
            message: 'User contest win fetched successfully',   
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = { getUserProfile, updateUserProfile, getAllUsers, deleteUser, getUserContestParticipated,getUserContestWin };
