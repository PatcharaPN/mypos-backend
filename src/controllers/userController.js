const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { PI } = require("chart.js/helpers");

const getAllUser = async (req, res) => {
  try {
    const getAllUsers = await User.find().exec();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, name, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    name,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updatePermission = async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: "User Id and Role are required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User was not found" });
    }

    user.role = role;
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User role updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user" });
  }
};

const getUserbyId = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error(`User with ${id} was not found `);
  }
  res.status(200).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};
module.exports = { getUserbyId, createUser, getAllUser, updatePermission };
