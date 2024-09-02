const express = require("express");
const router = express.Router();

const { createaPrice, getAllPrice } = require("../controllers/priceController");

router.post("/price", createaPrice);
router.get("/price", getAllPrice);

module.exports = router;
