const User = require("../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerService = async ({ ...payload }) => {
    const { name, email, password, role,profileImage } = payload;

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

module.exports = {
    registerService,
};