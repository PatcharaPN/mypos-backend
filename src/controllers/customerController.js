const Customer = require("../models/CustomerModel");

const createCustomer = async (req, res) => {
  const { customername, email, phone } = req.body;
  if (!customername) {
    res.status(400).json({
      message: "Customer is required!!",
    });
  }
  if (!email) {
    res.status(400).json({
      message: "Email is required!!",
    });
  }
  if (!phone) {
    res.status(400).json({
      message: "Phone number is required !!",
    });
  }
  try {
    const cutomer = await Customer.create({
      customername,
      email,
      phone,
    });
    await cutomer.save();
    res.status(201).json(cutomer);
  } catch (error) {
    res.status(500).json({
      message: "Error with Customer create Controller",
    });
  }
};
const getAmountCustomer = async (req, res) => {
  try {
    const result = await Customer.countDocuments();
    res.status(200).json({ amount: result });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllCustomer = async (req, res) => {
  try {
    const result = await Customer.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error with getallCustomer in Controller",
    });
  }
};
module.exports = { createCustomer, getAllCustomer, getAmountCustomer };
