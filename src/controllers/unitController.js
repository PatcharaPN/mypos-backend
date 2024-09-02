const Unit = require("../models/unitModel");
const getUnit = async (req, res) => {
  try {
    const unit = await Unit.find();
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({
      message: "Error when fetching All Unit!",
    });
  }
};
const createUnit = async (req, res) => {
  try {
    const { name, unit } = req.body;
    if (!name) {
      res.status(500).json({
        message: "Name for Unit is required!!",
      });
    }
    if (!unit) {
      res.status(500).json({
        message: "Unit is required!!",
      });
    }
    let newUnit = new Unit({
      name,
      unit,
    });
    newUnit = await newUnit.save();
    res.status(201).json({
      nessage: "Unit created successfully",
      unit: newUnit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error (Unit)",
    });
  }
};

module.exports = { createUnit, getUnit };
