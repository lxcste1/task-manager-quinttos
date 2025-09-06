import { api } from "@/lib/api";
import { setAuthToken } from "@/lib/api";

export async function login(email: string, password: string) {
  const { data } = await api.post("/login-token", { email, password });
  const { token, user } = data;
  setAuthToken(token);
  localStorage.setItem("token", token);
  return user;
}

export function logout() {
  setAuthToken(undefined);
  localStorage.removeItem("token");
}
