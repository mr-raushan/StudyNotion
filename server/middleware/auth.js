const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }
    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decode: ", decode);
      req.user = { _id: decode._id, accountType: decode.accountType };
    } catch (error) {
      console.error("Token verification failed. Error: ", error);
      return res.status(403).json({
        success: false,
        message: "Invalid token.",
      });
    }
    next();
  } catch (error) {
    console.error("Token verification failed. Error: ", error);
    return res.status(403).json({
      success: false,
      message: "Something went wrong while verifying the token.",
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not a student.",
      });
    }
    next();
  } catch (error) {
    console.log("Error while checking role: ", error);
    return res.status(500).json({
      success: false,
      message: "user role cannot be verified",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    // console.log(
    //   "printing instructor middleware accountType ->",
    //   req.user.accountType
    // );
    if (req.user.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not a Instructor.",
      });
    }
    next();
  } catch (error) {
    console.log("Error while checking role: ", error);
    return res.status(500).json({
      success: false,
      message: "Instructor role cannot be verified",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    // console.log("printing accountType", req.user);
    if (req.user.accountType !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not a Admin.",
      });
    }
    // console.log("in admin middleware accountType", req.user.accountType);
    next();
  } catch (error) {
    console.log("Error while checking role: ", error);
    return res.status(500).json({
      success: false,
      message: "Admin role cannot be verified",
    });
  }
};
