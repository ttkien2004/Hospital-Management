const express = require("express");
const { getAllDependence } = require("../controllers/Dependent");
const router = express.Router();

router.get("/getAllThuoc", getAllDependence);
module.exports = router;
