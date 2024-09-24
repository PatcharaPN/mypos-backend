const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const { createStore, getAllStore } = require("../controllers/storeController");

router.post("/store", upload.single("storeImage"), createStore);
router.get("/store", getAllStore);

module.exports = router;
