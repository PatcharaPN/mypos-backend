const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const {
  createStore,
  getStoreById,
  getAllStore,
  deleteStore,
} = require("../controllers/storeController");
const cacheMiddleWare = require("../middlewares/cacheMiddleWare");

router.post("/store", upload.single("storeImage"), createStore);
router.get("/store", getAllStore);
router.delete("/store/:storeId", cacheMiddleWare, deleteStore);
router.get("/store/:storeId", cacheMiddleWare, getStoreById);
module.exports = router;
