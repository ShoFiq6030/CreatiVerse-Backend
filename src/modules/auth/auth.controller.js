const User = require("../users/user.model");
const { registerService, loginService, verifyEmailService } = require("./auth.service");
// const { googleOAuthLogin } = require("./auth.service");
const config = require("../../config/index");
const admin = require("../../firebase/firebaseAdmin");
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwtToken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImage, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (role === "admin") {
            return res.status(400).json({ success: false, message: "Cannot register as admin" });
        }

        // register service
        const result = await registerService({ name, email, password, profileImage, role });
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

const verifyEmail = async (req, res) => {
    try {
        const { verifyCode } = req.body;
        const { email } = req.params
        if (!verifyCode || !email) {
            return res.status(400).json({ success: false, message: "Verification token and email is required" });
        }

        const result = await verifyEmailService({ email, verifyCode })

        if (result) {
            return res.status(200).json({
                success: true, message: `Email verified successfully. Email:${email}`
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}
 const getLoginUserWithToken = async (req, res) => {
    try {
        const userId = req.user.id

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found..." });
        }

        res.status(200).json({
            success: true,
            message: "user fetch successfully",
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const googleLogin = async (req, res) => {
    const { firebaseToken } = req.body;

    try {
        // Verify Firebase ID token

        const decoded = await admin.auth().verifyIdToken(firebaseToken);

        // Check if user exists
        let user = await User.findOne({ email: decoded.email });

        // If not, create new user
        if (!user) {
            const password = Math.random().toString(36).slice(-8);

            // console.log(password);
            const newUser = {
                name: decoded.name || decoded.email.split("@")[0],
                email: decoded.email,
                profileImage: decoded.picture,
                googleUid: decoded.uid,
                provider: "google",
                password

            };

            const result = await User.insertOne(newUser);

            user = { _id: result.insertedId, ...newUser };
        }

        // Create your own JWT token
        const accessToken = generateAccessToken(user);



        res.status(200).json({ accessToken, user });
    } catch (err) {
        console.error("Google login error:", err);
        res.status(401).json({ message: "Invalid Google token", error: err.message });
    }
};




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    getLoginUserWithToken,
    googleLogin


};

