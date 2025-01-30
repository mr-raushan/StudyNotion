const { default: mongoose } = require("mongoose");
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/User");

//createRating
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review } = req.body;

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Student has already reviewed this course",
      });
    }

    const newRating = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { _id: courseId },
      { $push: { ratingAndReviews: newRating._id } },
      { new: true }
    );

    console.log("Updated course details: ", updatedCourseDetails);

    return res.status(200).json({
      success: true,
      message: "Rating created successfully",
      data: newRating,
    });
  } catch (error) {
    console.log("Error creating rating: ", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while creating rating.",
    });
  }
};

//getAverageRating

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    //if no rating/review exist
    return res.status(200).json({
      success: true,
      message: "No rating review found for this course.",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while getting average rating.",
    });
  }
};

//getAllRating

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All ratings retrieved successfully.",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while getting all ratings.",
    });
  }
};
