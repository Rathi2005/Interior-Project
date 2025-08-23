  import React, { useState } from "react";
  import { loginUser } from "../api/auth";
  import { useNavigate } from "react-router-dom";


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
          setTimeout(() => {
            navigate("/home");
          }, 50); // 50ms delay is enough
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
      <div className="flex items-center justify-center min-h-screen bg-center  bg-[url('../../loginBG.jpg')]">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left side - Login form */}
          <div className="w-1/2 p-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Log In To Your <br />
              Account
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Check your order status, update your billing info, and review past
              orders.
            </p>

            <form onSubmit={handleSubmit}>
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

              <div className="flex justify-between items-center mb-4">
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm mb-2">{success}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-gray-900 font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>

          {/* Right side - Image */}
          <div className="w-1/2 relative">
            <img
              src="..\..\login.jpg"
              alt="login visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  export default Login;
