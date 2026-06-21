/**
 * Email Templates Module for Home Grocery
 * Designed to match the frontend application theme colors (Green #16a34a, Black #000000, and soft UI elements).
 */

const getRegistrationTemplate = (email, frontendUrl = process.env.FRONTEND_URL ) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Home Grocery</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .wrapper {
      width: 100%;
      background-color: #f9fafb;
      padding: 40px 0;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border: 1px solid #f3f4f6;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo-container {
      display: inline-block;
      padding: 4px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border: 1px solid #f3f4f6;
    }
    .logo {
      width: 64px;
      height: 64px;
      display: block;
      border-radius: 12px;
      object-fit: cover;
    }
    .heading {
      color: #111827;
      font-size: 26px;
      font-weight: 800;
      text-align: center;
      margin: 0 0 16px 0;
      letter-spacing: -0.025em;
    }
    .subheading {
      color: #4b5563;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      margin: 0 0 32px 0;
    }
    .card-info {
      background-color: #f9fafb;
      border: 1px solid #f3f4f6;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 32px;
    }
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .info-item:last-child {
      margin-bottom: 0;
    }
    .info-label {
      color: #6b7280;
      font-size: 14px;
      font-weight: 500;
    }
    .info-value {
      color: #111827;
      font-size: 14px;
      font-weight: 600;
    }
    .features-list {
      margin: 0 0 32px 0;
      padding: 0;
      list-style-type: none;
    }
    .feature-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      color: #374151;
      font-size: 15px;
      line-height: 22px;
    }
    .feature-icon {
      color: #16a34a;
      font-weight: bold;
      margin-right: 10px;
      font-size: 16px;
      line-height: 22px;
    }
    .btn-container {
      text-align: center;
      margin-bottom: 32px;
    }
    .btn {
      display: inline-block;
      background-color: #16a34a;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      padding: 16px 32px;
      border-radius: 16px;
      transition: background-color 0.2s ease;
      box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3);
    }
    .footer {
      text-align: center;
      color: #9ca3af;
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      border-top: 1px solid #f3f4f6;
      padding-top: 24px;
    }
    .footer a {
      color: #16a34a;
      text-decoration: none;
      font-weight: 600;
    }
    .signature {
      color: #4b5563;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="cid:logo" alt="Home Grocery Logo" class="logo">
        </div>
      </div>
      
      <h1 class="heading">Welcome to Home Grocery!</h1>
      <p class="subheading">Your smart grocery shopping companion is ready. Let's make shopping organized and effortless!</p>
      
      <div class="card-info">
        <div class="info-item">
          <span class="info-label">Account Email</span>
          <span class="info-value">${email}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Status</span>
          <span class="info-value" style="color: #16a34a;">Active</span>
        </div>
      </div>

      <ul class="features-list">
        <li class="feature-item">
          <span class="feature-icon">✓</span>
          <span>Create and manage smart shopping lists</span>
        </li>
        <li class="feature-item">
          <span class="feature-icon">✓</span>
          <span>Share lists with family and friends in real-time</span>
        </li>
        <li class="feature-item">
          <span class="feature-icon">✓</span>
          <span>Translate list items automatically to your preferred language</span>
        </li>
      </ul>

      <div class="btn-container">
        <a href="${frontendUrl}" target="_blank" class="btn">Get Started Now</a>
      </div>

      <p class="signature">Happy Shopping!<br><span style="color: #16a34a; font-weight: 700;">The Home Grocery Team</span></p>

      <div class="footer">
        <p>This email was sent to ${email} because you registered an account on Home Grocery.</p>
        <p>&copy; ${new Date().getFullYear()} Home Grocery. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

const getSuggestionTemplate = (userEmail, nameEn, nameKn = "", comments = "") => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Product Suggestion</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .wrapper {
      width: 100%;
      background-color: #f9fafb;
      padding: 40px 0;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border: 1px solid #f3f4f6;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo-container {
      display: inline-block;
      padding: 4px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border: 1px solid #f3f4f6;
    }
    .logo {
      width: 64px;
      height: 64px;
      display: block;
      border-radius: 12px;
      object-fit: cover;
    }
    .heading {
      color: #111827;
      font-size: 24px;
      font-weight: 800;
      text-align: center;
      margin: 0 0 16px 0;
      letter-spacing: -0.025em;
    }
    .subheading {
      color: #4b5563;
      font-size: 15px;
      line-height: 24px;
      text-align: center;
      margin: 0 0 32px 0;
    }
    .card-info {
      background-color: #f9fafb;
      border: 1px solid #f3f4f6;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 32px;
    }
    .info-item {
      margin-bottom: 16px;
    }
    .info-item:last-child {
      margin-bottom: 0;
    }
    .info-label {
      color: #6b7280;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: block;
    }
    .info-value {
      color: #111827;
      font-size: 15px;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      color: #9ca3af;
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      border-top: 1px solid #f3f4f6;
      padding-top: 24px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="cid:logo" alt="Home Grocery Logo" class="logo">
        </div>
      </div>
      
      <h1 class="heading">New Suggestion Received! 💡</h1>
      <p class="subheading">A user has suggested a new item to be added to the grocery list.</p>
      
      <div class="card-info">
        <div class="info-item">
          <span class="info-label">Suggested By</span>
          <span class="info-value">${userEmail}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Product Name (English)</span>
          <span class="info-value" style="color: #16a34a;">${nameEn}</span>
        </div>
        ${nameKn ? `
        <div class="info-item">
          <span class="info-label">Product Name (Kannada)</span>
          <span class="info-value">${nameKn}</span>
        </div>
        ` : ''}
        ${comments ? `
        <div class="info-item">
          <span class="info-label">Comments / Reason</span>
          <span class="info-value" style="font-style: italic; color: #4b5563;">"${comments}"</span>
        </div>
        ` : ''}
      </div>

      <div class="footer">
        <p>This is an automated notification sent from your Home Grocery App backend.</p>
        <p>&copy; ${new Date().getFullYear()} Home Grocery. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

const getSuggestionStatusUpdateTemplate = (nameEn, nameKn = "", status, rejectionReason = "", frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000") => {
  const statusColor = status === "approved" ? "#16a34a" : "#dc2626";
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Suggestion Status Update</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .wrapper {
      width: 100%;
      background-color: #f9fafb;
      padding: 40px 0;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      border: 1px solid #f3f4f6;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo-container {
      display: inline-block;
      padding: 4px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      border: 1px solid #f3f4f6;
    }
    .logo {
      width: 64px;
      height: 64px;
      display: block;
      border-radius: 12px;
      object-fit: cover;
    }
    .heading {
      color: #111827;
      font-size: 24px;
      font-weight: 800;
      text-align: center;
      margin: 0 0 16px 0;
      letter-spacing: -0.025em;
    }
    .subheading {
      color: #4b5563;
      font-size: 15px;
      line-height: 24px;
      text-align: center;
      margin: 0 0 32px 0;
    }
    .card-info {
      background-color: #f9fafb;
      border: 1px solid #f3f4f6;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 32px;
    }
    .info-item {
      margin-bottom: 16px;
    }
    .info-item:last-child {
      margin-bottom: 0;
    }
    .info-label {
      color: #6b7280;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
      display: block;
    }
    .info-value {
      color: #111827;
      font-size: 15px;
      font-weight: 600;
    }
    .btn-container {
      text-align: center;
      margin-bottom: 32px;
    }
    .btn {
      display: inline-block;
      background-color: #16a34a;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      padding: 16px 32px;
      border-radius: 16px;
      transition: background-color 0.2s ease;
      box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3);
    }
    .footer {
      text-align: center;
      color: #9ca3af;
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      border-top: 1px solid #f3f4f6;
      padding-top: 24px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo-container">
          <img src="cid:logo" alt="Home Grocery Logo" class="logo">
        </div>
      </div>
      
      <h1 class="heading">Suggestion Status Updated!</h1>
      <p class="subheading">The admin has reviewed your product suggestion.</p>
      
      <div class="card-info">
        <div class="info-item">
          <span class="info-label">Product Name</span>
          <span class="info-value">${nameEn} ${nameKn ? `(${nameKn})` : ''}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Status</span>
          <span class="info-value" style="color: ${statusColor}; text-transform: uppercase; font-weight: 800;">${statusText}</span>
        </div>
        ${status === "approved" ? `
        <div class="info-item" style="margin-top: 12px; border-top: 1px dashed #e5e7eb; padding-top: 12px;">
          <span class="info-value" style="color: #16a34a; font-weight: 700; font-size: 14px; display: block; line-height: 20px;">Your item has been added successfully. Check the list!</span>
        </div>
        ` : ''}
        ${status === "rejected" && rejectionReason ? `
        <div class="info-item">
          <span class="info-label">Reason for Rejection</span>
          <span class="info-value" style="color: #dc2626; font-style: italic;">"${rejectionReason}"</span>
        </div>
        ` : ''}
      </div>

      ${status === "approved" ? `
      <div class="btn-container" style="text-align: center; margin: 30px 0 20px 0;">
        <a href="${frontendUrl}" target="_blank" class="btn" style="display: inline-block; background-color: #16a34a; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 16px; padding: 16px 32px; border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.3);">Go to Website</a>
      </div>
      ` : ''}
 
      <p style="color: #4b5563; font-size: 14px; text-align: center; margin-bottom: 8px;">
        Thank you for helping us improve our product library!
      </p>
 
      <div class="footer">
        <p>This is an automated notification sent from your Home Grocery account.</p>
        <p>&copy; ${new Date().getFullYear()} Home Grocery. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};

const getOtpTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your OTP Code</title>
  <style>
    body { font-family: system-ui, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 0; }
    .container { max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 40px; text-align: center; }
    .otp { font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #16a34a; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Verify Your Email</h2>
    <p>Please use the following One-Time Password (OTP) to complete your request. This code is valid for 5 minutes.</p>
    <div class="otp">${otp}</div>
    <p>If you did not request this, please ignore this email.</p>
  </div>
</body>
</html>
  `;
};

module.exports = {
  getRegistrationTemplate,
  getSuggestionTemplate,
  getSuggestionStatusUpdateTemplate,
  getOtpTemplate
};
