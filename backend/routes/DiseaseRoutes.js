const express = require("express");
const { getAllDisease } = require("../controllers/Disease");

const router = express.Router();

router.get("/all", getAllDisease);

module.exports = router;
