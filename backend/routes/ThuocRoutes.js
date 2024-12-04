const express = require("express");
const { getAllDependence } = require("../controllers/Thuoc");
const router = express.Router();

router.get("/getAllThuoc", getAllDependence);
module.exports = router;
