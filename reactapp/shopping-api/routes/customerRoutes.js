const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getAllCustomers,
  getCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/customers", authenticateToken, getAllCustomers);
router.get("/customers/:id", authenticateToken, getCustomer);

module.exports = router;
