const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  updateProfile,
  deleteProfile,
  getAllUserDetails,
  getEnrolledCourses,
  updateDisplayPicture,
} = require("../controllers/Profile");

//profile routes

//delete user account
router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteProfile);
router.get("/getAllUserDetails", auth, getAllUserDetails);

//get enrolled course

router.get("getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;
