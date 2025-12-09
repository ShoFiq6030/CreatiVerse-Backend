const router = require("express").Router();
const { registerUser, loginUser, verifyEmail } = require("./auth.controller");

// Register route
router.post("/register", registerUser);

//login user router
router.post("/login", loginUser);

// Login route
// router.post("/login", loginUser);
// // Email verification route
// router.get("/verify-email", verifyEmail);

module.exports = router;
