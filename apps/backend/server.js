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

// Health check to debug DB connection in production
app.get("/api/status", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  res.json({
    status: "API is alive",
    database: statusMap[dbStatus] || "unknown",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Something went wrong!", error: err.message });
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error(
    "FATAL ERROR: MONGODB_URI is not defined in environment variables.",
  );
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    if (err.message.includes("buffer") || err.message.includes("selection")) {
      console.error(
        "Tip: Check if your server IP is whitelisted in MongoDB Atlas (Network Access).",
      );
    }
    process.exit(1); // Exit if DB connection fails
  });
