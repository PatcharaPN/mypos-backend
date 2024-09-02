const express = require("express");
const router = express.Router();
const { createStore, getAllStore } = require("../controllers/storeController");

router.post("/store", createStore);
router.get("/store", getAllStore);

module.exports = router;
