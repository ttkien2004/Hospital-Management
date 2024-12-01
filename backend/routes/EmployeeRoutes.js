const express = require("express");
const {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/Employee");
const router = express.Router();

router.get("/all", getAllEmployees);
router.get("/:id", getEmployee);
router.post("/", createNewEmployee);
router.delete("/:id", deleteEmployee);
router.put("/:id", updateEmployee);

module.exports = router;
