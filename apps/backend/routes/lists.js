const express = require("express");
const router = express.Router();
const GroceryList = require("../models/GroceryList");
const auth = require("../middleware/auth");
const crypto = require("crypto");

// Save a new grocery list (requires Auth)
router.post("/", auth, async (req, res) => {
  try {
    const { items } = req.body;
    const shareableId = crypto.randomBytes(8).toString("hex");

    const newList = new GroceryList({
      userId: req.user.id,
      items,
      shareableId,
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an existing list (requires Auth)
router.put("/:id", auth, async (req, res) => {
  try {
    const { items } = req.body;
    const list = await GroceryList.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { items },
      { new: true },
    );
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's history (requires Auth)
router.get("/history", auth, async (req, res) => {
  try {
    const history = await GroceryList.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a public list by shareableId (Public - Read Only)
router.get("/share/:shareableId", async (req, res) => {
  try {
    const list = await GroceryList.findOne({
      shareableId: req.params.shareableId,
    });
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a list (requires Auth)
router.delete("/:id", auth, async (req, res) => {
  try {
    const list = await GroceryList.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
