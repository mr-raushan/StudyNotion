const Tag = require("../models/Tags");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required.",
      });
    }

    const tagDetails = await Tag.create({ name, description });
    console.log(tagDetails);

    return res.status(201).json({
      success: true,
      message: "Tag created successfully.",
      //   tagDetails,
    });
  } catch (error) {
    console.log("Error in creating tag: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating tag.",
    });
  }
};

//getAllTags
exports.showAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: "All tags retrieved successfully.",
      allTags,
    });
  } catch (error) {
    console.log("Error in getting all tags: ", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while getting all tags.",
    });
  }
};
