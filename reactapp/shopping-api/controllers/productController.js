const db = require("../db");
const pool = db.pool || db;
const fs = require("fs/promises");
const path = require("path");

const getProductId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const getAllProducts = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, category, description, price, stock, image, image AS image_url FROM products ORDER BY id"
    );
    return res.json(result.rows);
  } catch (error) {
    console.error("Get products error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getProduct = async (req, res) => {
  const id = getProductId(req.params.id);
  if (!id) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const result = await db.query(
      "SELECT id, name, category, description, price, stock, image, image AS image_url FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get product error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const validateProduct = ({ name, category, price, stock }) => {
  if (!String(name ?? "").trim() || !String(category ?? "").trim() || price === undefined || price === null || price === "") {
    return "Name, category, and price are required";
  }

  if (!Number.isFinite(Number(price)) || Number(price) < 0) {
    return "Price must be a number greater than or equal to 0";
  }

  if (stock !== undefined && stock !== "" && (!Number.isInteger(Number(stock)) || Number(stock) < 0)) {
    return "Stock must be an integer greater than or equal to 0";
  }

  return null;
};

const createProduct = async (req, res) => {
  const { name, category, description, price, stock, image_url, image } = req.body;
  const validationError = validateProduct({ name, category, price, stock });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const imagePath = req.file
    ? `/static/uploads/products/${req.file.filename}`
    : image_url || image || null;

  try {
    const result = await db.query(
      `INSERT INTO products (name, category, description, price, stock, image)
       VALUES ($1, $2, $3, $4, COALESCE($5, 0), $6)
       RETURNING id, name, category, description, price, stock, image, image AS image_url`,
      [name.trim(), category.trim(), description || null, Number(price), stock === "" ? null : stock, imagePath]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Create product error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  const id = getProductId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const { name, category, description, price, stock, image_url, image } = req.body;
  const validationError = validateProduct({ name, category, price, stock });

  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const imagePath = req.file
    ? `/static/uploads/products/${req.file.filename}`
    : image_url || image || null;

  try {
    const result = await db.query(
      `UPDATE products
       SET name = $1, category = $2, description = $3, price = $4,
           stock = COALESCE($5, 0), image = $6
       WHERE id = $7
       RETURNING id, name, category, description, price, stock, image, image AS image_url`,
      [name.trim(), category.trim(), description || null, Number(price), stock === "" ? null : stock, imagePath, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Update product error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const id = getProductId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  try {
    const result = await db.query("DELETE FROM products WHERE id = $1 RETURNING id, image", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const image = result.rows[0].image;
    if (image && image.startsWith("/static/uploads/products/")) {
      const imageFile = path.join(
        __dirname,
        "..",
        "backend",
        "public",
        image.replace("/static/", "")
      );
      await fs.unlink(imageFile).catch(() => {});
    }

    return res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("Delete product error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getProductStats = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT category, COUNT(*)::int AS total FROM products GROUP BY category ORDER BY category"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStockStats = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT category, SUM(stock)::int AS total_stock FROM products GROUP BY category ORDER BY category"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  getProductStats,
  getStockStats,
  createProduct,
  updateProduct,
  deleteProduct,
};
module.exports.getProductStats = getProductStats;
module.exports.getStockStats = getStockStats;
