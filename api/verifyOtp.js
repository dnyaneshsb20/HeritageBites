// pages/api/verifyOtp.js
import crypto from "crypto";
//comments added
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Generate a secure reset token
function generateResetToken() {
  return crypto.randomBytes(32).toString("hex");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

    // Fetch user from Supabase
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (fetchError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check OTP match and expiry
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const otpExpiry = new Date(user.otp_expiry); // converts DB timestamp to JS Date
    const now = new Date();

    console.log("Current time:", now.toISOString());
    console.log("OTP expiry time:", otpExpiry.toISOString());
    console.log("Verifying OTP for:", email, "OTP entered:", otp);
    console.log("OTP expiry being saved:", otpExpiry);

    if (now > otpExpiry) {
      return res.status(400).json({ error: "OTP expired" });
    }

    // Generate reset token valid for 15 minutes
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    // Update user with reset token and clear OTP
    const { error: updateError } = await supabase
      .from("users")
      .update({
        reset_token: resetToken,
        reset_token_expiry: resetTokenExpiry,
        otp: null,
        otp_expiry: null,
      })
      .eq("email", email);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return res.status(500).json({ error: "Failed to update user" });
    }

    res.status(200).json({ message: "OTP verified successfully", resetToken });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
