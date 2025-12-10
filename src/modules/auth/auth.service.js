const User = require("../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/index")
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwtToken");



const registerService = async ({ ...payload }) => {
    const { name, email, password, role, profileImage } = payload;

    // Check if user exists
    const isExist = await User.findOne({ email });
    if (isExist) {
        throw new Error("User already exists with this email");
    }
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log("Register Service Payload:", payload);
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        // password,
        role: role || "user",
        profileImage
    });
    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
}

const loginService = async ({ email, password }) => {
    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // console.log(user);
    // console.log(password, user.password);
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const userObj = user.toObject();
    delete userObj.password;

    // Generate JWT tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();


    return { user: userObj, accessToken, refreshToken };
}




module.exports = {
    registerService,
    loginService
};