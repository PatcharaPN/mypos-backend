const express = require("express");
const router = express.Router();
const cacheMiddleWare = require("../middlewares/cacheMiddleWare.js");
const { createaPrice, getAllPrice } = require("../controllers/priceController");

router.post("/price", cacheMiddleWare, createaPrice);
router.get("/price", cacheMiddleWare, getAllPrice);

module.exports = router;
