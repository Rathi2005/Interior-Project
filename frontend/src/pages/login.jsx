import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await loginUser({ email, password });
      setSuccess("Login successful!");

      // Save token safely
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        setTimeout(() => {
          navigate("/home");
        }, 50);
      } else {
        console.error("No token received from backend");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 bg-center bg-[url('/images/loginBG.jpg')]">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
        {/* Left side - Login form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10">
          <div className="text-center lg:text-left mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Log In To Your Account
            </h2>
            <p className="text-sm text-gray-500">
              Check your order status, update your billing info, and review past orders.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b08a44] focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-[#b08a44] hover:underline">
                Forgot Password?
              </a>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b08a44] text-white py-3 rounded-lg hover:bg-[#9a7740] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Log In"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center lg:text-left">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#b08a44] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-1/2 relative order-first lg:order-last">
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-full">
            <img
              src="\images\login.jpg"
              alt="login visual"
              className="w-full h-full object-cover lg:absolute inset-0"
            />
            {/* Overlay for better text readability on small screens */}
            <div className="absolute inset-0 bg-black/20 lg:bg-transparent flex items-center justify-center lg:justify-end lg:items-end p-6">
              <div className="text-white text-center lg:text-right lg:mb-8 lg:mr-8">
                <h3 className="text-xl sm:text-2xl font-serif font-light mb-2">
                  Welcome Back
                </h3>
                <p className="text-sm sm:text-base opacity-90">
                  To Rathi Studio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;