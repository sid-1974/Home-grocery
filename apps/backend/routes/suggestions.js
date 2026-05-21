const express = require("express");
const router = express.Router();
const Suggestion = require("../models/Suggestion");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { sendMail } = require("../utils/emailservice");
const { getSuggestionTemplate, getSuggestionStatusUpdateTemplate } = require("../utils/emailTemplates");

// POST: Submit a new suggestion
router.post("/", auth, async (req, res) => {
  try {
    const { nameEn, nameKn, comments } = req.body;
    if (!nameEn) {
      return res.status(400).json({ message: "Product name (English) is required" });
    }

    const newSuggestion = new Suggestion({
      nameEn,
      nameKn,
      comments,
      userId: req.user.id,
    });

    await newSuggestion.save();

    // Fetch user details for the email
    const user = await User.findById(req.user.id);
    const userEmail = user ? user.email : "Unknown User";

    // Send email to admin in the background (not awaited to prevent blocking the response)
    const adminEmail = process.env.EMAIL_USER;
    const emailHtml = getSuggestionTemplate(userEmail, nameEn, nameKn, comments);
    
    sendMail(adminEmail, `New Grocery Suggestion: ${nameEn} 💡`, emailHtml).catch((emailErr) => {
      console.error("Error sending suggestion email in background:", emailErr);
    });

    res.status(201).json({ message: "Suggestion submitted successfully", suggestion: newSuggestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get list of suggestions (Admin sees all, User sees only their own)
router.get("/", auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "admin") {
      query.userId = req.user.id;
    }
    const suggestions = await Suggestion.find(query)
      .populate("userId", "email")
      .sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE: Delete a suggestion (Creator or Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }
    // Check authorization: Admin or the owner of suggestion
    if (req.user.role !== "admin" && suggestion.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this suggestion" });
    }
    await Suggestion.findByIdAndDelete(req.params.id);
    res.json({ message: "Suggestion deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Update suggestion status (Admin Only)
const admin = require("../middleware/admin");
router.patch("/:id/status", [auth, admin], async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ message: "Suggestion not found" });
    }

    suggestion.status = status;
    if (status === "rejected") {
      suggestion.rejectionReason = rejectionReason || "";
    } else {
      suggestion.rejectionReason = undefined;
    }

    await suggestion.save();
    await suggestion.populate("userId", "email");

    // Send email notification on status change in the background (not awaited to prevent blocking the response)
    if (suggestion.userId && suggestion.userId.email) {
      const emailHtml = getSuggestionStatusUpdateTemplate(
        suggestion.nameEn,
        suggestion.nameKn,
        status,
        suggestion.rejectionReason
      );
      sendMail(
        suggestion.userId.email,
        `Grocery Suggestion Updated: ${status.toUpperCase()} 🛒`,
        emailHtml
      ).catch((emailErr) => {
        console.error("Error sending status email in background:", emailErr);
      });
    }

    res.json(suggestion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
