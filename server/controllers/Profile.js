const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber } = req.body;
    const id = req.user._id;
    console.log("user ki id", id);

    //find the profile by id
    const userDetails = await User.findById(id);
    console.log("user details", userDetails);
    const profile = await Profile.findById(userDetails?.additionDetails);
    console.log("prfile ", profile);

    //update the pt=rofile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;

    //save the updated profile
    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.log("error while updating profile: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the profile.",
    });
  }
};

//delete profile
//Explore -> how can we schedule the deletion operation
//find out -> CRON JOB
exports.deleteProfile = async (req, res) => {
  try {
    const id = req.user._id;
    console.log("user ki id :", id);

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    await Profile.findByIdAndDelete({ _id: user.additionDetails });
    //profile delete krne me koe
    //dikkat hoga to User ki jagah user dalna hoga
    await User.findByIdAndDelete({ _id: id });

    //TODO: unroll user from all enorlled courses

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.log("error while deleting profile: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the profile.",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    console.log("getting all user details");
    const id = req.user._id;
    const userDetails = await User.findById(id)
      .populate("additionDetails")
      .exec();

    console.log("userDetails", userDetails);
    return res.status(200).json({
      success: true,
      message: "User details retrieved successfully.",
      userDetails,
    });
  } catch (error) {
    console.log("error while getting user details: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting user details.",
    });
  }
};

//ye code console me response de rha hai lekin postman me response nhi de rha hai
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user._id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update profile picture",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
