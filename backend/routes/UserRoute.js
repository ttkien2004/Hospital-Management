const express = require("express");

const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/User");
const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:username", getUser);
router.post("/", createUser);
router.delete("/:username", deleteUser);
router.put("/:username", updateUser);

module.exports = router;
