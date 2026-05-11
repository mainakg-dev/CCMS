import axios from "axios";
import { API_BASE_URL } from "./constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Redirect to login on unauthorized
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Extract meaningful error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
