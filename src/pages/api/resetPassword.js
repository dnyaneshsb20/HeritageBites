// pages/api/resetPassword.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // service role key for admin actions
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("---- Incoming Reset Request ----");
  console.log("Headers:", req.headers["content-type"]);
  console.log("Body:", req.body);

  try {
    const { resetToken, newPassword } = req.body;
    console.log("Received reset request:", req.body);

    if (!resetToken || !newPassword) {
      return res.status(400).json({ error: "Missing reset token or password" });
    }

    // 1. Find user by reset token
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("reset_token", resetToken)
      .single();

    console.log("Fetched user:", user);
    console.log("User reset_token_expiry:", user?.reset_token_expiry);

    if (fetchError || !user) {
      return res.status(404).json({ error: "Invalid reset token" });
    }

    // 2. Optional: check expiry
    if (user.reset_token_expiry) {
      const expiryDate = new Date(user.reset_token_expiry + "Z"); // ensure UTC
      console.log("Expiry Date (UTC):", expiryDate.toISOString());

      if (expiryDate < new Date()) {
        return res.status(400).json({ error: "Reset token expired" });
      }
    }

    // 3. Update password using Supabase admin
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.user_id,
      { password: newPassword }
    );

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // 4. Clear the reset token
    await supabase
      .from("users")
      .update({ reset_token: null, reset_token_expiry: null })
      .eq("user_id", user.user_id);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
