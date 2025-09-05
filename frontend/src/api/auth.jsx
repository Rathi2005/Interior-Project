import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const API = axios.create({ baseURL: `${API_URL}/api/auth` });


// Interceptor to add token to headers automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  // console.log("Token from localStorage:", token); // Debugging line
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect on token expiry
    }
    return Promise.reject(err);
  }
);

// Register User
export const registerUser = (data) => API.post("/register", data);

// Login User
export const loginUser = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

// opt verification
export const verifyOtp = async ({ email, otp }) => {
  const res = await API.post("/verify-otp", { email, otp });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};


// Get Profile (with token)
export const getProfile = () => API.get("/users/profile");

