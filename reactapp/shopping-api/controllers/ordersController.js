const db = require("../db");
const pool = db.pool || db;

// GET /api/orders/stats/monthly
exports.getMonthlyStats = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*)::int AS count
       FROM orders
       GROUP BY month
       ORDER BY month`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getMonthlyStats error:", err);
    res.status(500).json({ error: err.message });
  }
};
