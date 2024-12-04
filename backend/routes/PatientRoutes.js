const express = require("express");
const {
  getAllPatients,
  getPatient,
  createNewPatient,
  deletePatient,
  getLKB,
  updatePatient,
} = require("../controllers/Patient");

const router = express.Router();

router.get("/getAllPatients", getAllPatients);
router.get("/getPatient/:id", getPatient);
router.post("/createPatient", createNewPatient);
router.delete("/deletePatient", deletePatient);
router.get("/getAllLKB/:BnID", getLKB);
router.patch("/updatePatient", updatePatient);

module.exports = router;
