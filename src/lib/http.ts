import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/lib/store/authStore";

// Configure the base URL here or via NEXT_PUBLIC_API_BASE_URL
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

console.log("apiBaseUrl", apiBaseUrl);

export const http = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Read token from storage if present
function getAccessToken(): string | null {
  try {
    if (typeof window === "undefined") return null;
    // Prefer zustand store if available
    try {
      const tokenFromStore = useAuthStore.getState().token;
      if (tokenFromStore) return tokenFromStore;
    } catch {}
    // Fallback to localStorage mirror
    return window.localStorage.getItem("access_token");
  } catch {
    return null;
  }
}

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    // Centralize error handling; in real apps you might refresh token here
    const status = error.response?.status;
    if (status === 401) {
      // Optionally, redirect to login or clear token
      try {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("access_token");
        }
      } catch {}
    }
    return Promise.reject(error);
  }
);

// export type ApiError = {
//   message: string;
//   code?: string | number;
//   details?: unknown;
// };

// export function toApiError(err: unknown): ApiError {
//   if (axios.isAxiosError(err)) {
//     const data: unknown = err.response?.data;
//     const message =
//       (typeof data === "object" && data && (data as { message?: string }).message)
//         || err.message
//         || "Request failed";
//     return { message, code: err.response?.status, details: data };
//   }
//   const fallbackMessage =
//     typeof err === "object" && err && (err as { message?: string }).message
//       ? (err as { message: string }).message
//       : "Unknown error";
//   return { message: fallbackMessage };
// }



export type ApiError = {
  message: string;
  code?: string | number;
  details?: unknown;
};

export function toApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const data: unknown = err.response?.data;

    if (typeof data === "object" && data !== null && "message" in data) {
      // Already looks like an ApiError
      return {
        message: (data as { message: string }).message,
        code: (data as { code?: string | number }).code ?? err.response?.status,
        details: (data as { details?: unknown }).details ?? data,
      };
    }

    // Fallback for AxiosError without ApiError structure
    return {
      message: err.message || "Request failed",
      code: err.response?.status,
      details: data,
    };
  }

  // Non-Axios error
  if (typeof err === "object" && err !== null && "message" in err) {
    return {
      message: (err as { message: string }).message,
      code: (err as { code?: string | number }).code,
      details: (err as { details?: unknown }).details,
    };
  }

  return { message: "Unknown error" };
}
