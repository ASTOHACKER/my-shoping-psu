const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { getMonthlyStats } = require("../controllers/ordersController");

const router = express.Router();

// GET /api/orders/stats/monthly
router.get("/orders/stats/monthly", authenticateToken, getMonthlyStats);

module.exports = router;
