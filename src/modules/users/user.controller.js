const { getUserProfileService,updateUserProfileService } = require('./user.service');

const getUserProfile = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params;
        console.log(id);
        console.log(user.id);

        if (user.id !== id && user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }
        const result = await getUserProfileService(id,user);

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
        const payload=req.body
        // console.log(id);
        // console.log(user.id);

        if (user.id !== id && user.role !== "admin") {
            return res.status(401).json({ success: false, message: "Unauthorize" });
        }
        const result = await updateUserProfileService(id,user,payload);

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


module.exports = { getUserProfile,updateUserProfile };