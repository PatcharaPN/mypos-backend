const express = require("express");
const router = express.Router();
const {
  createComposite,
  findAllComposite,
  findTotal,
} = require("../controllers/compositeController");

router.get("/composite", findAllComposite);
router.get("/composite/findtotal", findTotal);
router.post("/composite", createComposite);

module.exports = router;
