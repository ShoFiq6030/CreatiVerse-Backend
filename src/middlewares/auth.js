
const jwt = require("jsonwebtoken")
const config = require("../config")

const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            // console.log("inside auth");

            if (!bearerToken) {
                return res.status(401).json({ message: "No token provided" });
            }

            const token = bearerToken.split(" ")[1];

            if (!token) {
                return res.status(401).json({ message: "Invalid token format" });
            }

            let decoded

            try {
                decoded = jwt.verify(token, config.jwtSecret)
            } catch (verifyError) {
                return res.status(401).json({
                    message: "Token is invalid or expired",
                });
            }

            req.user = decoded;

            // Role based check
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    message: "Forbidden: You do not have permission",
                });
            }

            next();
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Server error: " + err.message,
            });
        }
    };
};

module.exports= auth;
