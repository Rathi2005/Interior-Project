import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { verifyOtp } from "../api/auth_email";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_APP_API_URL;
const API = axios.create({ baseURL: `${API_URL}/api/auth` });

const OtpForm = ({ email }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) {
          newOtp[i] = pastedData[i];
        }
      }
      setOtp(newOtp);

      // Focus the last input with a value
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();


    setLoading(true);
    setError("");

    const otpString = otp.join("");

    try {
      const data = await verifyOtp({ email, otp: otpString });
      if (data.token) {
        toast.success("Welcome to the Dashboard");
        navigate("/home");
      } else {
        setError("Invalid OTP. Try again.");
      }
    } catch (err) {

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/resend-otp", { email });
      alert(res.data.message); // or show toast
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="max-w-md space-y-6 p-6 ">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Verify Your Identity
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to {email}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-semibold rounded-lg border-2
                    focus:outline-none focus:ring-2
                    ${digit ? "border-green-600" : "border-gray-300"} 
                    transition-colors duration-200`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.some((digit) => digit === "")}
            className="w-full bg-[#b08a44] text-white py-2.5 rounded-lg hover:bg-[#9a7740] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-medium text-[#b08a44] hover:text-[#9a7740]"
              onClick={handleResendOtp}
            >
              Resend OTP
            </button>
          </p>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            &larr; Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
