const crypto = require("crypto");

// In-memory store for OTPs (email -> { otp, expiresAt })
// In production, consider using Redis or a database.
const otpStore = new Map();

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const create = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Store the OTP for a specific email with an expiration time
 * @param {string} email 
 * @param {string} otp 
 */
const store = (email, otp) => {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
  otpStore.set(email, { otp, expiresAt });
};

/**
 * Verify the OTP for a specific email
 * @param {string} email 
 * @param {string} otp 
 * @returns {object} { success: boolean, message: string }
 */
const verify = (email, otp) => {
  const record = otpStore.get(email);
  
  if (!record) {
    return { success: false, message: "OTP not found or expired" };
  }
  
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP has expired" };
  }
  
  if (record.otp === otp) {
    otpStore.delete(email); // Remove after successful verification
    return { success: true, message: "OTP verified successfully" };
  }
  
  return { success: false, message: "Invalid OTP" };
};

/**
 * Check the OTP without deleting it
 * @param {string} email 
 * @param {string} otp 
 */
const check = (email, otp) => {
  const record = otpStore.get(email);
  if (!record) return { success: false, message: "OTP not found or expired" };
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP has expired" };
  }
  if (record.otp === otp) return { success: true, message: "OTP is valid" };
  return { success: false, message: "Invalid OTP" };
};

module.exports = {
  create,
  store,
  verify,
  check,
};
