const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getCategoriesWithProductCount,
} = require("../controllers/categoryController");

router.get("/categories", getAllCategory);
router.get("/categories/total", getCategoriesWithProductCount);
router.post("/categories", createCategory);

module.exports = router;
