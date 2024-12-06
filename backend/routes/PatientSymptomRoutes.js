const express = require("express");
const { getAllPatientSymptom } = require("../controllers/PatientSymptom");

const router = express.Router();

router.get("/all", getAllPatientSymptom);

module.exports = router;
