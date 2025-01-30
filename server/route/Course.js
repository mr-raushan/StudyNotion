const express = require("express");
const router = express.Router();
const {
  auth,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middleware/auth");
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  updateSubSection,
  deleteSubSection,
  createSubSection,
} = require("../controllers/SubSection");
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

//course can only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

router.post("/addSection", auth, isInstructor, createSection);

router.post("/updateSection", auth, isInstructor, updateSection);

router.post("/deleteSection", auth, isInstructor, deleteSection);

//edit subSection
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.post("/addSubSection", auth, isInstructor, createSubSection);

//get all registered courses
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);

// ***********************************************
//          Category Routes (only by Admin)
// ***********************************************

//category can only be created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ***********************************************
//              Rating And Review
// ***********************************************

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
