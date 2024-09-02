const express = require("express");
const router = express.Router();
const { createBrand, getAllBrand } = require("../controllers/brandController");

router.post("/brand", createBrand);
router.get("/brand", getAllBrand);

module.exports = router;
