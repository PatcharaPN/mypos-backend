const express = require("express");
const router = express.Router();
const { loginUser, geHistory } = require("../controllers/authController");

router.post("/login", loginUser);
router.get("/login", geHistory);

module.exports = router;
