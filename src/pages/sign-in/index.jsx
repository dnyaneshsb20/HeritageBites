// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../../components/AppIcon";
import heroFood from "../../assets/hero-food.jpg";

const SignIn = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false); // toggle state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // only for Sign Up
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (isSignUp && !fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Please enter all required fields.");
      return;
    }

    if (isSignUp) {
      console.log("Signing up with", { fullName, email, password });
      // TODO: call your signup API
      navigate("/recipe-discovery-dashboard");
    } else {
      console.log("Signing in with", { email, password });
      // TODO: call your signin API
      navigate("/recipe-discovery-dashboard");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image + Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
      <div className="absolute inset-0"></div>

        <div className="absolute inset-0"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md p-6 rounded-lg shadow-md bg-popover border border-border">
        <h1 className="text-2xl font-heading font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name={isSignUp ? "UserPlus" : "LogIn"} size={20} />
          <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
        </h1>

        {error && (
          <div className="mb-3 text-sm text-destructive font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="text-sm font-medium block mb-1">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

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

          {!isSignUp && (
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="accent-primary" />
                <span>Remember me</span>
              </label>
              <span className="text-sm cursor-pointer hover:underline">
                Forgot?
              </span>
            </div>
          )}

          <Button
            type="submit"
            variant="default"
            size="sm"
            className="w-full bg-gradient-to-r from-[#f87d46] to-[#fa874f] text-[#fdfbff]"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-4">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                className="underline hover:no-underline cursor-pointer"
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="underline hover:no-underline cursor-pointer"
                onClick={() => setIsSignUp(true)}
              >
                Create one
              </span>
            </>
          )}
        </p>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Back to{" "}
          <span
            className="underline hover:no-underline cursor-pointer"
            onClick={() => navigate("/recipe-discovery-dashboard")}
          >
            Dashboard
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
