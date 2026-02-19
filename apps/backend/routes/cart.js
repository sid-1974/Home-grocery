const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

// Get current cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const parseQuantity = (qStr) => {
  if (!qStr) return { amount: 0, unit: "kg" };
  const match = qStr.match(/^([\d.]+)\s*(.*)$/);
  if (!match) return { amount: 0, unit: "kg" };
  return { amount: parseFloat(match[1]), unit: match[2].toLowerCase() };
};

const formatQuantity = (amount, unit) => {
  const rounded = Math.round(amount * 1000) / 1000;
  return `${rounded} ${unit}`;
};

const addQuantities = (q1, q2) => {
  const p1 = parseQuantity(q1);
  const p2 = parseQuantity(q2);

  if (!p1.unit) return q2;
  if (!p2.unit) return q1;

  if (p1.unit === p2.unit) {
    return formatQuantity(p1.amount + p2.amount, p1.unit);
  }

  const weightUnits = { kg: 1000, gram: 1, g: 1 };
  if (weightUnits[p1.unit] && weightUnits[p2.unit]) {
    const totalGrams = p1.amount * weightUnits[p1.unit] + p2.amount * weightUnits[p2.unit];
    return totalGrams >= 1000 ? formatQuantity(totalGrams / 1000, "kg") : formatQuantity(totalGrams, "gram");
  }

  const volumeUnits = { ltr: 1000, ml: 1 };
  if (volumeUnits[p1.unit] && volumeUnits[p2.unit]) {
    const totalMl = p1.amount * volumeUnits[p1.unit] + p2.amount * volumeUnits[p2.unit];
    return totalMl >= 1000 ? formatQuantity(totalMl / 1000, "ltr") : formatQuantity(totalMl, "ml");
  }

  return q2;
};

// Add or update item in cart
router.post("/item", auth, async (req, res) => {
  try {
    const { name, quantity, imageUrl } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.name === name);
    if (itemIndex > -1) {
      // Sum the quantities instead of replacing
      cart.items[itemIndex].quantity = addQuantities(cart.items[itemIndex].quantity, quantity);
    } else {
      cart.items.push({ name, quantity, imageUrl });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Batch add / Replace cart with list items
router.post("/batch", auth, async (req, res) => {
  try {
    const { items, replace } = req.body; // replace: boolean
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    if (replace) {
      cart.items = items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        imageUrl: i.imageUrl,
      }));
    } else {
      items.forEach((newItem) => {
        const itemIndex = cart.items.findIndex(
          (item) => item.name === newItem.name,
        );
        if (itemIndex > -1) {
          cart.items[itemIndex].quantity = newItem.quantity;
        } else {
          cart.items.push({
            name: newItem.name,
            quantity: newItem.quantity,
            imageUrl: newItem.imageUrl,
          });
        }
      });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update quantity of an existing item
router.patch("/item/:itemId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item)
      return res.status(440).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
router.delete("/item/:itemId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId,
    );
    cart.updatedAt = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.delete("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
