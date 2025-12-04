import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const API = axios.create({ baseURL: `${API_URL}/api/auth` });

// -------------------------------
// REQUEST INTERCEPTOR
// -------------------------------

API.interceptors.request.use((req) => {
  const noAuthRoutes = ["/login", "/register", "/verify-otp", "/resend-otp"];

  // ONLY add token if route needs authorization
  if (!noAuthRoutes.includes(req.url)) {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

// -------------------------------
// RESPONSE INTERCEPTOR
// -------------------------------

API.interceptors.response.use(
  (res) => res,
  (err) => {
    // PREVENT redirect during OTP verification
    if (
      err.response &&
      err.response.status === 401 &&
      err.config.url !== "/verify-otp" &&
      err.config.url !== "/login"
    ) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

// -------------------------------
// AUTH API FUNCTIONS
// -------------------------------

// REGISTER USER
export const registerUser = (data) => API.post("/register", data);

// LOGIN USER
export const loginUser = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

// VERIFY OTP
export const verifyOtp = async ({ email, otp }) => {
  // Ensure NO OLD TOKEN interferes with verify
  localStorage.removeItem("token");

  const res = await API.post("/verify-otp", { email, otp });

  // Save JWT if backend returns token
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", email);
  }

  return res.data;
};

// RESEND OTP
export const resendOtp = async (email) => {
  const res = await API.post("/resend-otp", { email });
  return res.data;
};

// GET PROFILE
export const getProfile = () => API.get("/users/profile");
