import axios from "axios";
import { getSession } from "next-auth/react";
import { API_BASE_URL } from "@/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request interceptor - attach JWT token from NextAuth session
api.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session) {
        // NextAuth stores the JWT in the session cookie;
        // we fetch it from the session token endpoint
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data?.accessToken) {
          config.headers.Authorization = `Bearer ${data.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
