const Section = require("../models/Section");
const Course = require("../models/Course");

//create section
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const newSection = await Section.create({ sectionName });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section created successfully.",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log("Error while creating section: ", error);
    return res.status(500).json({
      success: false,
      message: "error occurred while creating section.",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName } = req.body;
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Section updated successfully.",
      section,
    });
  } catch (error) {
    console.log("Error while updating section: ", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating section.",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    await Section.findByIdAndDelete(sectionId);

    res.status(200).json({
      success: true,
      message: "Section deleted successfully.",
    });
  } catch (error) {
    console.log("Error while deleting section: ", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while deleting section.",
    });
  }
};
