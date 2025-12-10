const jwt = require("jsonwebtoken");
const config = require("../config/index");

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, email: user.email, name: user.name },
        config.jwtSecret,
        { expiresIn: "2d" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        config.jwtSecret,
        { expiresIn: "7d" }
    );
};
module.exports = {
    generateAccessToken,
    generateRefreshToken,
};