// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Icon from "../../components/AppIcon";
import heroFood from "../../assets/hero-food.jpg";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false); // toggle state

  // form states
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      // simple validation for signup
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      console.log("Sign Up Data:", { fullName, username, email, password });
      // TODO: send signup data to backend / supabase
      alert("Account created! Now you can log in.");
      setIsSignUp(false);
      return;
    }

    // ---------------- Sign In logic ----------------
    const hardcodedUsername = "dsb";
    const hardcodedPassword = "1234";
    const hardcodedAdmin = {
      username: "admin",
      password: "admin1234",
    };


    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    if (username === hardcodedUsername && password === hardcodedPassword) {
      login({
        name: "Dnyanesh Badave",
        email: email || "dsb@example.com",
      });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({ name: "DSB", email: "dsb@example.com" })
      );
      navigate("/recipe-discovery-dashboard");
    } else {
      setError("Invalid username or password");
    }
    // Admin login check
    if (username === hardcodedAdmin.username && password === hardcodedAdmin.password) {
      // Login as admin
      login({
        name: "Admin User",
        email: "admin@example.com",
        role: "admin", // important to mark user as admin
      });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        })
      );

      navigate("/admin-recipe-management"); // redirect admin to the admin page
      return; // stop further checks
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm"
        style={{ backgroundImage: `url(${heroFood})` }}
      >
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
            <>
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Username */}
          <div>
            <label className="text-sm font-medium block mb-1">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email (only in SignUp) */}
          {isSignUp && (
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {/* Password */}
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

          {/* Confirm Password (only in SignUp) */}
          {isSignUp && (
            <div>
              <label className="text-sm font-medium block mb-1">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

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

        {/* Toggle SignUp / SignIn */}
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

        {/* Back to Dashboard */}
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
