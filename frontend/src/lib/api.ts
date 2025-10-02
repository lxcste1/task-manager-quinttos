import axios from "axios";

const resolvedBaseURL = process.env.NEXT_PUBLIC_API_URL?.trim() || "/api";

export const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export function setAuthToken(token?: string) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export function restoreAuthToken(): string | null {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  setAuthToken(token || undefined);
  return token;
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

console.log("API base:", api.defaults.baseURL);
