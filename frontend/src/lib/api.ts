import axios from "axios";

// Use /api for both development and production to leverage Next.js rewrites
const baseURL = "/api";

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

// Restore token from localStorage on app initialization
export function restoreAuthToken(): boolean {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      return true;
    }
  }
  return false;
}

// Initialize token on module load
restoreAuthToken();

console.log("API base:", api.defaults.baseURL);
