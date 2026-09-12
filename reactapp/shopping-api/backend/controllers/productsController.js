const pool = require("../db/db");
exports.createProduct = async (req, res) => {
  try {
    const { name, category, description, price, stock, image_url } = req.body;
    if (!name || !category || price == null) {
      return res.status(400).json({ error: "ต้องมี name, category และ price" });
    }
    const priceNum = Number(price);
    if (Number.isNaN(priceNum)) {
      return res.status(400).json({ error: "price ต้องเป็นตัวเลข" });
    }
    const sql = `
INSERT INTO products (name, category, description, price, stock, image_url)
VALUES ($1, $2, $3, $4, COALESCE($5, 0), $6)
RETURNING *;
`;
    const params = [
      name,
      category,
      description ?? null,
      priceNum,
      stock, // หากไม่ส่งมา COALESCE จะเป็น 0
      image_url ?? null,
    ];
    const { rows } = await pool.query(sql, params);
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error("createProduct error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getProductStats = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT category, COUNT(*) AS total FROM products GROUP BY category"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

