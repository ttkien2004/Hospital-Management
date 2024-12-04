const express = require("express");
const { getAllKhoa } = require("../controllers/Khoa");

const router = express.Router();

router.get("/getAllKhoa", getAllKhoa);
module.exports = router;
