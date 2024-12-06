const express = require("express");
const { getAllAddresses } = require("../controllers/Address");

const router = express.Router();

router.get("/getAllAddresses", getAllAddresses);
module.exports = router;
