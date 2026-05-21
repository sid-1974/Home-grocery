const express = require("express");
const router = express.Router();
const Suggestion = require("../models/Suggestion");
const User = require("../models/User");
const auth = require("../middleware/auth");
const { sendMail } = require("../utils/emailservice");
const { getSuggestionTemplate } = require("../utils/emailTemplates");

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

    // Send email to admin (EMAIL_USER is configured in .env and acts as the admin email)
    const adminEmail = process.env.EMAIL_USER;
    const emailHtml = getSuggestionTemplate(userEmail, nameEn, nameKn, comments);
    
    await sendMail(adminEmail, `New Grocery Suggestion: ${nameEn} 💡`, emailHtml);

    res.status(201).json({ message: "Suggestion submitted successfully", suggestion: newSuggestion });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
