const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/lists");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Grocery API is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Something went wrong!", error: err.message });
});

// MongoDB Connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/grocery_db";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
