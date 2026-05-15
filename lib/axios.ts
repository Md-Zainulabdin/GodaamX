import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";

import { API_BASE_URL } from "@/constants/api.constants";
import { getSession, clearSession } from "@/lib/auth";
import { getCachedToken, setCachedToken } from "@/lib/token-cache";

/* =========================================================
   API Error Type
   ========================================================= */

export type ApiError = {
  status: number | undefined;
  message: string;
  original: AxiosError;
};

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
   - Uses client-side cache to avoid redundant Server Action calls
   ========================================================= */

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = getCachedToken();

    // If no cached token, try to get it from the session (Server Action)
    if (!token) {
      const session = await getSession();
      if (session?.token) {
        token = session.token;
        setCachedToken(token);
      }
    }

    if (token) {
      const headers = (config.headers as AxiosRequestHeaders) ?? {};
      headers["Authorization"] = `Bearer ${token}`;
      config.headers = headers;
    }

    // Dev-only logging
    if (process.env.NODE_ENV === "development") {
      // removed development console log
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
   - Central place for error normalization
   ========================================================= */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<{ detail?: string; message?: string }>) => {
    const status = error.response?.status;

    // Unauthorized → force logout
    if (status === 401) {
      setCachedToken(null);
      await clearSession();
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Forbidden → permission issue
    if (status === 403) {
      console.error("Access denied: insufficient permissions.");
    }

    const message =
      error.response?.data?.detail || error.response?.data?.message || error.message || "Unexpected API error";

    // Normalize rejected error shape for callers
    const apiError: ApiError = {
      status,
      message,
      original: error,
    };
    return Promise.reject(apiError);
  },
);
