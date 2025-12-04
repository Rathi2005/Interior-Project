import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const API = axios.create({ baseURL: `${API_URL}/api/auth` });

/* -------------------------------
   REQUEST INTERCEPTOR
-------------------------------- */

API.interceptors.request.use((req) => {
  const noAuthRoutes = ["/login", "/register"];

  // Safely handle missing req.url
  const pathname = req.url || "";

  const isNoAuthRoute = noAuthRoutes.some((route) => pathname.endsWith(route));

  if (!isNoAuthRoute) {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

/* -------------------------------
   RESPONSE INTERCEPTOR
-------------------------------- */

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

/* -------------------------------
   AUTH API FUNCTIONS
-------------------------------- */

// REGISTER USER
export const registerUser = (data) => API.post("/register", data);

// LOGIN USER
export const loginUser = async (data) => {
  const res = await API.post("/login", data);
  return res.data;
};

// GET PROFILE
export const getProfile = () => API.get("/profile");
