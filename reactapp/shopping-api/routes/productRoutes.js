const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { authenticateToken, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getProduct,
  getProductStats,
  getStockStats,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

const uploadDirectory = path.join(__dirname, "..", "backend", "public", "uploads", "products");
fs.mkdirSync(uploadDirectory, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadDirectory),
    filename: (_req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith("image/")) return callback(null, true);
    return callback(new Error("Only image files are allowed"));
  },
});

router.get("/products", authenticateToken, getAllProducts);
router.get("/products/stats", authenticateToken, getProductStats);
router.get("/products/stats/stock", authenticateToken, getStockStats);
router.get("/products/:id", authenticateToken, getProduct);
router.post("/products", authenticateToken, isAdmin, upload.single("image"), createProduct);
router.put("/products/:id", authenticateToken, isAdmin, upload.single("image"), updateProduct);
router.delete("/products/:id", authenticateToken, isAdmin, deleteProduct);

module.exports = router;
