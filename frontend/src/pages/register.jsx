import React, { useState } from "react";
import { registerUser } from "../api/auth"; // you'll define this API call

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = await registerUser({ username, email, password });
      setSuccess("Registration successful! Please log in.");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-center bg-[url('../../loginBG.jpg')]">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Left side - Register form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign up to manage orders, update info, and access exclusive features.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="youname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-gray-900 font-medium hover:underline">
              Log In
            </a>
          </p>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 relative">
          <img
            src="..\..\login.jpg"
            alt="register visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
