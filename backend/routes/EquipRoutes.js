const express = require("express");
// const {getAllEquips} = require('../controllers/Equipment')
const {
  getAllEquipments,
  getEquipment,
  deleteEquipment,
  updateEquipment,
  createEquipment,
} = require("../controllers/Equipment");
const router = express.Router();

// Viết các API ở đây
// ví dụ
// router.get('/getAllEquipments', getAllEquips)
router.get("/getAllEquipments", getAllEquipments);
router.get("/getEquipment/:id", getEquipment);
router.delete("/deleteEquipment", deleteEquipment);
router.patch("/updateEquipment/:id", updateEquipment);
router.post("/createEquipment", createEquipment);

module.exports = router;
