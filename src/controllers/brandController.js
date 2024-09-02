const Brand = require("../models/brandModel");

const createBrand = async (req, res) => {
  try {
    const { name, addedBy, prefix } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "name is required",
      });
    }
    const newBrand = new Brand({
      name,
      prefix,
      addedBy,
    });
    await newBrand.save();
    const populatedBrand = await Brand.findById(newBrand._id).populate(
      "addedBy"
    );
    res.status(201).json(populatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllBrand = async (req, res) => {
  try {
    const brand = await Brand.find().populate("addedBy");
    res.status(200).json(brand);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createBrand, getAllBrand };
