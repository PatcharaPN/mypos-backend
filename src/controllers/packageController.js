const { models } = require("mongoose");
const Package = require("../models/packageModel");

const createPackage = async (req, res) => {
  const { name, owner, products } = req.body;

  try {
    const result = new Package({
      name,
      owner,
      products,
    });

    await result.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const gerAllPackage = async (req, res) => {
  try {
    const result = await Package.find().populate("owner").populate("products");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { createPackage, gerAllPackage };
