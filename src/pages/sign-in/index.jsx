// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../../components/AppIcon";
import heroFood from "../../assets/hero-food.jpg";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    // TODO: call your auth API / Supabase / Firebase here.
    // For now we'll just log and navigate to dashboard.
    console.log("Signing in with", { email, password });

    // Example: on successful sign-in, navigate to dashboard
    navigate("/recipe-discovery-dashboard"); // change to your desired route
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image + Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
        <div className="absolute inset-0"></div>
      </div>

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-md p-6 rounded-lg shadow-md bg-popover border border-border">
        <h1 className="text-2xl font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="LogIn" size={20} />
          <span>Sign In</span>
        </h1>

        {error && (
          <div className="mb-3 text-sm text-destructive font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="accent-primary" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm hover:underline">
              Forgot?
            </Link>
          </div>

          <Button type="submit" variant="default" size="sm" className="w-full bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-[#fdfbff]">
            Sign In
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="underline hover:no-underline">
            Create one
          </Link>
        </p>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Back to Dashboard{" "}
          <Link to="/recipe-discovery-dashboard" className="underline hover:no-underline">
            Dashboard
          </Link>
        </p>
      </div>
    </div>
  );

};

export default SignIn;
