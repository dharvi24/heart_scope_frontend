import axios from "axios";

// API base URL - currently set to production Render backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://heart-scope-backend.onrender.com";

// Create axios instance with timeout and error handling
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictCardio = async (data) => {
  try {
    const res = await apiClient.post("/predict", data);
    return res.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error("Request timeout - Backend is taking too long to respond");
    }
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.detail || error.response.data?.message || `Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("CONNECTION_ERROR");
    } else {
      // Something else happened
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

// Health check function
export const checkBackendHealth = async () => {
  try {
    const res = await apiClient.get("/");
    return { status: "ok", data: res.data };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
