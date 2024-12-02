const express = require("express");
const { getAllAddresses } = require("../controllers/ChiNhanh");

const router = express.Router();

router.get("/getAllAddresses", getAllAddresses);
module.exports = router;
