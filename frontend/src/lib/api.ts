import axios from "axios";

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

console.log("API base:", api.defaults.baseURL);
