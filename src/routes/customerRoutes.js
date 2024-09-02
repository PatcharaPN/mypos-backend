const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getAllCustomer,
  getAmountCustomer,
} = require("../controllers/customerController");

router.post("/Customer", createCustomer);
router.get("/Customer", getAllCustomer);
router.get("/Customer/amount", getAmountCustomer);

module.exports = router;
