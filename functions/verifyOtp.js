// functions/verifyOtp.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Generate a secure reset token
function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

app.post("/verifyOtp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

    // Fetch user
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // Check OTP match and expiry
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (new Date() > user.otp_expiry) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Optional: generate a reset token valid for 15 minutes
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await pool.query(
      `UPDATE users SET reset_token = $1, reset_token_expiry = $2, otp = NULL, otp_expiry = NULL WHERE email = $3`,
      [resetToken, resetTokenExpiry, email]
    );

    res.json({ message: "OTP verified successfully", resetToken });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5001; // use a different port if needed
app.listen(PORT, () => console.log(`OTP verification server running on port ${PORT}`));
