const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

// capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.id;

  if (!course_id) {
    return res.status(400).json({
      success: false,
      message: "Course ID is required",
    });
  }

  let course;
  try {
    course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    //user already enrolled in the course
    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "User already enrolled in this course",
      });
    }
  } catch (error) {
    console.log("Error in finding course");
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  //order create
  const amount = course.price;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("Payment response:", paymentResponse);

    return res.status(200).json({
      success: true,
      orderId: paymentResponse.id,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";

  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === signature) {
    console.log("payment is authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;
    try {
      //fulfill the action

      //find the course and enrolled the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Failed to enroll user in course",
        });
      }

      console.log("User enrolled successfully in course:", enrolledCourse);

      //find the student and add the course to their enrolled courses
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log("User enrolled successfully in student:", enrolledStudent);

      //mail send krna hai
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulation from codehelp",
        "Congratulation, you are onboarded into new CodeHelp course!"
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature verified and course added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while enrolling user in course",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
