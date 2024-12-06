const express = require("express");
const { getAllAllergy } = require("../controllers/Allergy");

const router = express.Router();

router.get("/all", getAllAllergy);

module.exports = router;
