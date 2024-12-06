const express = require("express");
const { getAllDiseaseSymptom } = require("../controllers/DiseaseSymptom");

const router = express.Router();

router.get("/all", getAllDiseaseSymptom);

module.exports = router;
