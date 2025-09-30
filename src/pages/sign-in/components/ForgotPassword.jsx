// src/pages/SignIn/components/ForgotPassword.jsx
import React, { useState } from "react";
import { supabase } from "../../../supabaseClient";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const ForgotPassword = ({ onClose, openResetPassword }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(""); // for user input
  const [step, setStep] = useState(1); // 1 = enter email, 2 = enter OTP
  const [generatedOtp, setGeneratedOtp] = useState(""); // store OTP temporarily (optional)

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      // Check if email exists
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (userError || !user) {
        setError("Email not found.");
        return;
      }

      // Generate OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      setGeneratedOtp(newOtp);

      // Save OTP & expiry in DB (5 min expiry)
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 5);

      const { error: otpError } = await supabase
        .from("users")
        .update({ otp: newOtp, otp_expiry: expiry.toISOString() })
        .eq("email", email);

      if (otpError) {
        setError("Failed to send OTP. Try again.");
        return;
      }

      // Send OTP via email (our custom API route)
      await fetch("http://localhost:5000/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: newOtp }),
      });
      // const response = await fetch("/api/sendOtp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: "dnyaneshsb20@gmail.com", otp: "123456" }),
      // });

      // const data = await response.json();
      // console.log(data);

      setMessage("OTP sent to your email!");
      setStep(2); // move to OTP input step
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      // Fetch user by email
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (userError || !user) {
        setError("Email not found.");
        return;
      }

      const now = new Date();
      const expiry = new Date(user.otp_expiry);

      if (user.otp !== otp) {
        setError("Invalid OTP. Please try again.");
        return;
      }

      if (expiry < now) {
        setError("OTP has expired. Please request a new one.");
        return;
      }

      // OTP is valid, clear it from DB
      await supabase
        .from("users")
        .update({ otp: null, otp_expiry: null })
        .eq("email", email);

      // Move to Reset Password modal
      onClose(); // close ForgotPassword modal
      openResetPassword(email);
      // You will need to open ResetPassword modal here in SignIn.jsx
      // e.g., call a function passed from SignIn like openResetPassword(email)
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 w-full max-w-sm bg-popover border border-border rounded-lg shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-white">
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Enter OTP</label>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-white">
              Verify OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
