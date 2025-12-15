const router = require("express").Router();
const auth = require("../../middlewares/auth");
const { registerUser, loginUser, logoutUser, verifyEmail, getLoginUserWithToken, googleLogin } = require("./auth.controller");

// Register route
router.post("/register", registerUser);

//login user router
router.post("/login", loginUser);

// google social login 
router.post("/google-login", googleLogin);


//log out
router.post("/logout", auth(), logoutUser);

// // Email verification route
router.post("/verify-email/:email", verifyEmail);

//get user info with jwt
router.get("/me", auth(), getLoginUserWithToken);

module.exports = router;
