const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create course
//create course me dikkat ho rhi hai course ko create krne me
//51:00 minute pe course creation ki testing hue hai
exports.createCourse = async (req, res) => {
  try {
    const id = req.user._id;
    console.log("userId ->", id);

    let {
      courseName,
      courseDescription,
      whatyouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;
    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatyouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    //check if the user is an instructor
    const instructorDetails = await User.findById(
      { _id: id },
      {
        accountType: "Instructor",
      }
    );
    console.log("instructorDetails ->", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    //check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found ",
      });
    }

    //upload the thumbnail to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    //create new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatyouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      instructions: instructions,
      status: status,
    });

    //update instructor schema
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    //update tag schema
    await Category.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Course created successfully.",
      data: newCourse,
    });
  } catch (error) {
    console.log("error while creating course", error);
    res.status(500).json({
      success: false,
      message: "Failed to create courses",
    });
  }
};

//getAllCourse

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentEnrolled: true,
      }
        .populate("instructor")
        .exec()
    );
    res.json({
      success: true,
      message: "All courses fetched successfully.",
      data: allCourse,
    });
  } catch (error) {
    console.log("error while getting all courses", error);
    res.status(500).json({
      success: false,
      message: "Failed to get all courses",
    });
  }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id ${courseId} `,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully.",
      data: courseDetails,
    });
  } catch (error) {
    console.log("error while getting course details", error);
    res.status(500).json({
      success: false,
      message: "Failed to get course details",
    });
  }
};
