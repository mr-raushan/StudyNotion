const express = require("express");
const {
  login,
  signup,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");
const { auth } = require("../middleware/auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const router = express.Router();

//Routes for login, signup, and authentication

/*  ***********************************************/
//      Authenctication Routes
/* *********************************************** */

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendOTP);

//route for changing the password
router.post("/changepassword", auth, changePassword);

/* *********************************************** */
//    Reset Password
/* *********************************************** */

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
