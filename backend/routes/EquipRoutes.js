const express = require("express");
// const {getAllEquips} = require('../controllers/Equipment')
const { getAllEquipments, getEquipment } = require("../controllers/Equipment");
const router = express.Router();

// Viết các API ở đây
// ví dụ
// router.get('/getAllEquipments', getAllEquips)
router.get("/getAllEquipments", getAllEquipments);
router.get("/getEquipment/:id", getEquipment);

module.exports = router;
