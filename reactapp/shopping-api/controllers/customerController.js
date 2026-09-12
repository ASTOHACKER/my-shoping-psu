const db = require("../db");

const getAllCustomers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, phone, city, created_at FROM customers ORDER BY id"
    );
    return res.json(result.rows);
  } catch (error) {
    console.error("Get customers error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, email, phone, city, created_at FROM customers WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get customer error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllCustomers, getCustomer };
