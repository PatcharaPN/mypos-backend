const Price = require("../models/priceModel");

const getAllPrice = async (req, res) => {
  try {
    const result = await Price.find().populate("addedBy");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const createaPrice = async (req, res) => {
  try {
    const { name, unit, description, addedBy } = req.body;
    if (!addedBy) {
      return res.status(400).json({ message: "'addedBy' field is required" });
    }
    const newPrice = new Price({
      name,
      unit,
      description,
      addedBy,
    });

    const savedPrice = await newPrice.save();

    const populatedPrice = await Price.findById(savedPrice._id).populate(
      "addedBy"
    );
    res.status(201).json(populatedPrice);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { createaPrice, getAllPrice };
