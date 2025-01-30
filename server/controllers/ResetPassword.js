const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `This ${email} is not registered with us, enter a valid email`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );

    console.log("updatedDetails", updatedDetails);

    const url = `http://localhost:5173/update-password/${token}`;
    await mailSender(
      email,
      "Password Reset",
      `Your link for email verification is ${url}. Please click this url to reset your password. `
    );
    return res.json({
      success: true,
      message:
        "Email sent successfully. Please check your email for further instructions.",
      token,
    });
  } catch (error) {
    console.log("Error while resetting password: ", error);
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while resetting password. Please try again later.",
    });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmPassword is not correct.",
      });
    }
    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid token.",
      });
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(400).json({
        success: false,
        message: "Token has expired. Please request a new password reset link.",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );

    return res.json({
      success: true,
      message:
        "Password updated successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.log("Error while updating password: ", error);
    return res.status(500).json({
      success: false,
      message: "error while resetting password. Please try again later.",
    });
  }
};
