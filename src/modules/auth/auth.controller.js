const User = require("../users/user.model");
const { registerService, loginService } = require("./auth.service");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImage } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // register service
        const result = await registerService({ name, email, password, profileImage });
        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        // login service
        const result = await loginService({ email, password });
        // Send refresh token in httpOnly cookie
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: true,     // true for HTTPS
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        delete result.refreshToken;
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

 const logoutUser = async (req, res) => {
  res.clearCookie("refreshToken");

  await User.findByIdAndUpdate(req.user.id, {
    refreshToken: null,
  });

  res.json({ message: "Logged out successfully" });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};