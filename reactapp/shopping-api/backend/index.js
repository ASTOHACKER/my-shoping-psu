const express = require("express");
const app = express();
const productsController = require("./controllers/productsController");
const { authenticateToken, isAdmin } = require("./middleware/authMiddleware");
app.use(express.json());
app.use("/static", express.static("public"));
app.post(
  "/api/products",
  authenticateToken,
  isAdmin,
  productsController.createProduct,
);
app.get("/api/stats", authenticateToken, productsController.getProductStats);
app.listen(3000, () => console.log("API running on :3000"));
