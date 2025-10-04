import axios from "axios";
import Router from "next/router";

const base = process.env.NEXT_PUBLIC_API_URL?.trim();
const resolvedBaseURL = base ? `${base.replace(/\/$/, "")}/api` : "/api";

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
    config.headers = config.headers ?? {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 && typeof window !== "undefined") {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {}
      if (location.pathname !== "/login") {
        Router.replace("/login");
      }
    }
    return Promise.reject(new Error(err.message));
  }
);

console.log("API base:", api.defaults.baseURL);
