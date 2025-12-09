const { registerService } = require("./auth.service");

const registerUser = async (req, res) => {
    try {
        const { name, email, password,profileImage } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required" });
        }
        // register service
        const result = await registerService({ name, email, password,profileImage });
        if (result.error) {
            return res.status(400).json({success: false, message: result.error });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}


module.exports = {
    registerUser,
};