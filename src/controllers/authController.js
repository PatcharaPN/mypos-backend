const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const LoginHistory = require("../models/loginHistoryMiodel");

const geHistory = async (req, res) => {
  const history = await LoginHistory.find()
    .populate("user")
    .sort({ loginTime: -1 });
  res.status(200).json(history);
};
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const loginHistory = new LoginHistory({
      user: user._id,
      userId: user._id,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
    await loginHistory.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { loginUser, geHistory };
