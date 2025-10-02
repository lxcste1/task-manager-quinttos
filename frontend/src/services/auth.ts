import { api, setAuthToken } from "@/lib/api";

export async function login(email: string, password: string) {
  const { data } = await api.post("/login", { email, password });
  const { token, user } = data;
  setAuthToken(token);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post("/register", { name, email, password });
  const { token, user } = data;
  setAuthToken(token);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function getMe() {
  const { data } = await api.get("/me");
  return data;
}
