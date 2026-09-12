const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const { login, register } = require("./controllers/authController");
const { authenticateToken } = require("./middleware/authMiddleware");
const productsController = require("./controllers/productController");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "backend", "public")));

app.get("/", (req, res) => {
  res.json({ message: "Shopping API is running" });
});
app.post("/api/login", login);
app.post("/api/users/register", register);
app.get("/api/stats", authenticateToken, productsController.getProductStats);
app.get("/api/stats/stock", authenticateToken, productsController.getStockStats);
app.use("/api", productRoutes);
app.use("/api", customerRoutes);
app.use("/api", orderRoutes);

app.use((error, req, res, next) => {
  if (error?.code === "LIMIT_FILE_SIZE" || error?.message === "Only image files are allowed") {
    return res.status(400).json({ error: error.message });
  }
  return next(error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
