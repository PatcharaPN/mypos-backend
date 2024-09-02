const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");

const {
  getProduct,
  getLowStock,
  createProduct,
  deleteProduct,
  getProductById,
  getInhandAmount,
  updateProduct,
} = require("../controllers/productController");

router.delete("/products/:id", deleteProduct);
router.get("/products", getProduct);
router.get("/lowstock", getLowStock);
router.get("/getamount", getInhandAmount);
router.post("/products", upload.single("productImage"), createProduct);
router.put("/products/:id", upload.single("productImage"), updateProduct);
router.get("/products/:id", getProductById);

module.exports = router;
