const express = require("express");
const {
  getAllMedicines,
  getMedicine,
  createNewMedicine,
  deleteMedicine,
  updateMedicine,
} = require("../controllers/Medicine");
const router = express.Router();

router.get("/all", getAllMedicines);
router.get("/:id", getMedicine);
router.post("", createNewMedicine);
router.delete("/:id", deleteMedicine);
router.put("/:id", updateMedicine);

module.exports = router;
