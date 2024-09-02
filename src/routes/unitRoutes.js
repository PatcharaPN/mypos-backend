const express = require("express");
const router = express.Router();
const { createUnit, getUnit } = require("../controllers/unitController");

router.get("/unit", getUnit);
router.post("/unit", createUnit);

module.exports = router;
