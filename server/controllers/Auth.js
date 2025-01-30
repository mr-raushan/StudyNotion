const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");

//sign up

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      // otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
      // !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmPassword do not match.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    //find the most recent OTP for the email
    // const response = await OTP.findOne({ email })
    //   .sort({ createdAt: -1 })
    //   .limit(1);
    // console.log("Recent OTP: ", response);

    // if (response?.length == 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "OTP expired. Please generate a new one.",
    //   });
    // } else if (otp !== response?.otp) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "This OTP is not valid",
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      additionDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User signed up successfully.",
      user,
    });
  } catch (error) {
    console.log("Error in signup: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while signing up.",
    });
  }
};

// log in

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    let user = await User.findOne({ email }).populate("additionDetails");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      // console.log("accountType:", user.accountType),
      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          message: `Welcome back ${user.firstName}!`,
          token,
          user,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.log("Error in login: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in.",
    });
  }
};

//send OTP

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      return res.status(400).json({
        success: false,
        message: `This ${email} already exists.`,
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP Generated: ", otp);

    const result = await OTP.findOne({ otp: otp });
    console.log("result", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: `OTP sent successfully on this ${email}`,
      data: otp,
    });
  } catch (error) {
    console.log("Error in sending OTP: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while sending OTP.",
    });
  }
};

//logout

exports.logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.log("Error in logout: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging out.",
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    // const user = req.user;
    // if (!oldPassword || !newPassword || !confirmNewPassword) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required.",
    //   });
    // }
    const isMatch = await bcrypt.compare(oldPassword, userDetails.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect old password.",
      });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    //update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
      // user: updatedUserDetails,
    });
  } catch (error) {
    console.log("Error in change password: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while changing password.",
    });
  }
};
