const User = require("../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/index")
const { generateAccessToken, generateRefreshToken } = require("../../utils/jwtToken");
const { sendEmail } = require("../../utils/nodeMailer");
const path = require("path");
const fs = require("fs");






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

    //email verify token 6 digits
    const emailVerifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(emailVerifyCode);

    // Load the HTML file
    const filePath = path.join(process.cwd(), "src/emails", "verification.html");
    let html = fs.readFileSync(filePath, "utf8");

    // Replace placeholder
    html = html.replace("{{CODE}}", emailVerifyCode);

    // send verification email
    sendEmail({
        to: email,
        subject: "Verify your email",
        html
    })


    // console.log("Register Service Payload:", payload);
    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        // password,
        role: role || "user",
        profileImage,
        emailVerifyCode
    });
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.emailVerifyCode;

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

const verifyEmailService = async ({ email, verifyCode }) => {

    const user = await User.findOne({ email }).select("+emailVerifyCode");
    if (!user) {
        throw new Error(`user not found with this email:${email}`);
    }
    if (user.isVerified) {
        throw new Error("This email already verified. Please login!")
    }

    if (verifyCode !== user.emailVerifyCode) {
        throw new Error("Invalid verification code");
    }
    user.isVerified = true;
    user.emailVerifyCode = null;
    await user.save();
    return true
}




module.exports = {
    registerService,
    loginService,
    verifyEmailService,
   
};