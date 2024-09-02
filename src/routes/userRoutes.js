const express = require("express");
const router = express.Router();
const {
  getUserbyId,
  createUser,
  getAllUser,
  updatePermission,
} = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getAllUser);
router.put("/user/update/:id", updatePermission);
router.get("/user/:id", getUserbyId);

module.exports = router;
