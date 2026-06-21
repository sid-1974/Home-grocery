const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Initialize transporter with explicit Gmail SMTP configuration
// Using explicit host/port is more reliable in production/serverless environments than service: "gmail"
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,   // 10 seconds
  socketTimeout: 15000,     // 15 seconds
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email using Nodemailer
 * @param {string} email - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} htmlContent - HTML body content
 * @param {Array} [customAttachments] - Optional additional attachments
 */
const sendMail = async (email, subject, htmlContent, customAttachments = []) => {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.error("Invalid or missing recipient email:", email);
    return;
  }

  try {
    const fromName = process.env.EMAIL_FROM_NAME || "Home Grocery";
    
    // Default attachments, including the inline logo
    const attachments = [...customAttachments];
    
    // Resolve frontend logo path to attach inline only if the template uses it
    const logoPath = path.join(__dirname, "../../frontend/public/icon.png");
    if (htmlContent.includes("cid:logo") && fs.existsSync(logoPath)) {
      attachments.push({
        filename: "icon.png",
        path: logoPath,
        cid: "logo", // Matches <img src="cid:logo"> in templates
        contentDisposition: "inline", // Prevents the image from showing as a downloadable file
      });
    } else if (htmlContent.includes("cid:logo")) {
      console.warn("Logo file not found at:", logoPath);
    }

    const mailOptions = {
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendMail };
