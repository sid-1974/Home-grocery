const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// POST: Add a manual product to DB
router.post("/manual", auth, async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const newProduct = new Product({
      name,
      imageUrl,
      userId: req.user.id,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Fetch products from DB
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search || "";

  try {
    let dbQuery = {};
    if (search) dbQuery.name = { $regex: search, $options: "i" };

    const total = await Product.countDocuments(dbQuery);
    const manualProducts = await Product.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const products = manualProducts.map((p) => ({
      id: p._id,
      nameEn: p.name,
      image: p.imageUrl,
    }));

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    });
  } catch (err) {
    console.error("DB Error:", err.message);
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
});

// PATCH: Update product
router.patch("/manual/:id", auth, async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, imageUrl },
      { new: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Remove product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
