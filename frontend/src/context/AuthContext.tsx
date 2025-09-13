"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { login as loginSvc, logout as logoutSvc } from "@/services/auth";
import { User } from "@/types/types";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    async (email = "admin@example.com", password = "password") => {
      const u = await loginSvc(email, password);
      setUser(u as User);
    },
    []
  );

  const logout = useCallback(() => {
    logoutSvc();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
