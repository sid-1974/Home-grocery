const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Grocery API is running...");
});

// Routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

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
