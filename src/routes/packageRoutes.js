const express = require("express");
const router = express.Router();
const {
  createPackage,
  gerAllPackage,
} = require("../controllers/packageController");

router.post("/package", createPackage);
router.get("/package", gerAllPackage);

module.exports = router;
