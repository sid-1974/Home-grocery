const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// POST: Add a manual product to DB (Admin Only)
router.post("/manual", [auth, admin], async (req, res) => {
  try {
    const { nameEn, nameKn, imageUrl } = req.body;
    const newProduct = new Product({
      nameEn,
      nameKn,
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
    if (search) {
      dbQuery = {
        $or: [
          { nameEn: { $regex: search, $options: "i" } },
          { nameKn: { $regex: search, $options: "i" } },
        ],
      };
    }

    const total = await Product.countDocuments(dbQuery);
    const manualProducts = await Product.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const products = manualProducts.map((p) => ({
      id: p._id,
      nameEn: p.nameEn,
      nameKn: p.nameKn,
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

// PATCH: Update product (Admin Only)
router.patch("/manual/:id", [auth, admin], async (req, res) => {
  try {
    const { nameEn, nameKn, imageUrl } = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { nameEn, nameKn, imageUrl },
      { new: true },
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Translate text (English to Kannada)
router.get("/translate", async (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ message: "Text is required" });

  try {
    // Using MyMemory Free Translation API
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|kn`,
    );
    const data = await response.json();
    const translatedText = data.responseData.translatedText;
    res.json({ translatedText });
  } catch (err) {
    res.status(500).json({ message: "Translation failed", error: err.message });
  }
});

// DELETE: Remove product (Admin Only)
router.delete("/:id", [auth, admin], async (req, res) => {
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
