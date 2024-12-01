const express = require("express");
const {
  getAllNotifications,
  getNotification,
  createNewNotification,
  deleteNotification,
} = require("../controllers/Notification");
const router = express.Router();

router.get("/all", getAllNotifications);
router.get("/:id", getNotification);
router.post("/", createNewNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
