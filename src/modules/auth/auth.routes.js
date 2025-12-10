const router = require("express").Router();
const auth = require("../../middlewares/auth");
const { registerUser, loginUser,logoutUser, verifyEmail } = require("./auth.controller");

// Register route
router.post("/register", registerUser);

//login user router
router.post("/login", loginUser);

//log out
router.post("/logout", auth(), logoutUser);

// // Email verification route
// router.get("/verify-email", verifyEmail);

module.exports = router;
