const express = require("express");
const {
  getAllPatients,
  getPatient,
  createNewPatient,
  deletePatient,
} = require("../controllers/Patient");

const router = express.Router();

router.get("/getAllPatients", getAllPatients);
router.get("/getPatient/:id", getPatient);
router.post("/createPatient", createNewPatient);
router.delete("/deletePatient", deletePatient);

module.exports = router;
