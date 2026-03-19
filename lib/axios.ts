/* =========================================================
   Axios Configuration
   ========================================================= */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

import { API_BASE_URL } from "@/constants/api.constants";
import { getSession, clearSession } from "@/lib/auth";

/* =========================================================
   AXIOS INSTANCE
   ========================================================= */

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   REQUEST INTERCEPTOR
   ---------------------------------------------------------
   - Attaches auth token (JWT)
   - Can be extended for multi-tenant headers
   ========================================================= */

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.token) {
      const headers = (config.headers as AxiosRequestHeaders) ?? {};
      headers["Authorization"] = `Bearer ${session?.token}`;
      config.headers = headers;
    }

    // Dev-only logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config);
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* =========================================================
   RESPONSE INTERCEPTOR
   ---------------------------------------------------------
   - Handles API errors consistently
   - Auto logout on 401 (unauthorized)
   - Central place for toast notifications
   ========================================================= */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Dev-only logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[API RESPONSE] ${response.config.url}`, response);
    }
    return response;
  },
  async (error: AxiosError<any>) => {
    const status = error.response?.status;

    // Unauthorized → force logout
    if (status === 401) {
      await clearSession();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Forbidden → permission issue
    if (status === 403) {
      console.error("Access denied: insufficient permissions.");
    }

    // Server error
    if (status && status >= 500) {
      console.error("Server error. Please try again later.");
    }

    const message =
      error.response?.data?.detail || error.response?.data?.message || error.message || "Unexpected API error";

    // Normalize rejected error shape for callers
    return Promise.reject({
      status,
      message,
      original: error,
    });
  },
);
