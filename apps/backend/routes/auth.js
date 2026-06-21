const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/emailservice");
const { getRegistrationTemplate, getOtpTemplate } = require("../utils/emailTemplates");
const otpServices = require("../utils/otpServices");
const { validate: validateEmailDeep } = require("deep-email-validator");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Send OTP for Registration
router.post("/send-register-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "It's not a valid email address format" });
    }

    // Perform deep validation (disabling SMTP check since Vercel/AWS blocks outbound port 25)
    const emailValidation = await validateEmailDeep({
      email: email,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: false, 
    });
    
    if (!emailValidation.valid) {
      return res.status(400).json({ message: "It's not a valid or reachable email address" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const otp = otpServices.create();
    otpServices.store(email, otp);
    console.log(`\n[DEV] Registration OTP for ${email}: ${otp}\n`);

    const emailHtml = getOtpTemplate(otp);
    await sendMail(email, "Your Registration OTP", emailHtml);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "It's not a valid email address" });
    }

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const otpResult = otpServices.verify(email, otp);
    if (!otpResult.success) {
      return res.status(400).json({ message: otpResult.message });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password });
    await user.save();

    // Send welcome email (Must wait for it in Vercel)
    const frontendUrl = process.env.FRONTEND_URL;
    const emailHtml = getRegistrationTemplate(email, frontendUrl);
    await sendMail(email, "Welcome to Home Grocery! 🛒", emailHtml);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "It's not a valid email address" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email address not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Send OTP for Password Reset
router.post("/send-reset-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "It's not a valid email address" });
    }

    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email address not found" });

    const otp = otpServices.create();
    otpServices.store(email, otp);
    console.log(`\n[DEV] Password Reset OTP for ${email}: ${otp}\n`);

    const emailHtml = getOtpTemplate(otp);
    await sendMail(email, "Your Password Reset OTP", emailHtml);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify OTP for Password Reset (Without consuming it)
router.post("/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "It's not a valid email address" });
    }
    if (!otp) return res.status(400).json({ message: "OTP is required" });

    const result = otpServices.check(email, otp);
    if (!result.success) return res.status(400).json({ message: result.message });

    res.json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "It's not a valid email address" });
    }
    
    if (!newPassword || !otp) {
      return res.status(400).json({ message: "New password, and OTP are required" });
    }

    // Use check to validate OTP without consuming it yet
    const otpResult = otpServices.check(email, otp);
    if (!otpResult.success) {
      return res.status(400).json({ message: otpResult.message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email address not found" });
    }

    // Check if new password is same as old password
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({ message: "New password cannot be the same as your old password" });
    }

    // All validations passed, consume the OTP
    otpServices.verify(email, otp);

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
