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

const handleApiError = (error) => {
  if (error.code === 'ECONNABORTED') {
    return "Server is waking up... please wait 30–60 seconds.";
  }
  if (error.response) {
    // Server responded with error status
    return error.response.data?.detail || error.response.data?.message || `Server error: ${error.response.status}`;
  } else if (error.request) {
    // Request was made but no response received
    return "Server is waking up... please wait 30–60 seconds.";
  } else {
    // Something else happened
    return error.message || "An unexpected error occurred";
  }
};

export const predictCardio = async (data) => {
  try {
    const res = await apiClient.post("/predict", data);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Health check function
export const checkBackendHealth = async () => {
  try {
    const res = await apiClient.get("/");
    return { status: "ok", data: res.data };
  } catch (error) {
    return { status: "error", message: handleApiError(error) };
  }
};
