const Brand = require("../models/brandModel");
const redisClient = require("../config/cache.js");
const { default: mongoose } = require("mongoose");

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
      "addedBy",
    );
    res.status(201).json(populatedBrand);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  const { brandId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    return res.status(400).json({
      message: "Invalid brand ID",
    });
  }
  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandId);
    if (!deletedBrand) {
      return res.status(404).json({
        message: `brand with id ${brandId} was not found`,
      });
    }
    res.status(200).json({
      message: `Brand with Id ${brandId} was deleted`,
    });
  } catch (error) {
    console.error(`Errorr deleting brand ${error.message}`);
    res.status(500).json({
      message: "error when deleting brand",
      error: error.message,
    });
  }
};

const getBrandById = async (req, res) => {
  const { brandId } = req.params;

  if (mongoose.Types.ObjectId.isValid(brandId)) {
    return res.status(400).json({
      message: "Invalid brand ID",
    });
  }
  try {
    const findBrand = await Brand.findByIdAndDelete(brandId);
    if (!findBrand) {
      return res.status(404).json({
        message: `Brand with ID ${brandId} was not found`,
      });
    }
    res.status(200).json(findBrand);
  } catch (error) {
    console.error(`Error finding brand ${error.message}`);
    res.status(500).json({
      message: `An error occured while trying to find the brand`,
      error: error.message,
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

module.exports = { createBrand, getAllBrand, deleteBrand, getBrandById };
