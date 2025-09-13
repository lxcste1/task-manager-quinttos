"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { restoreAuthToken } from "@/lib/api";
import { login as loginSvc, logout as logoutSvc, getMe } from "@/services/auth";

type User = { id: number; name: string; email: string };

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const token = restoreAuthToken();

    try {
      const cached = localStorage.getItem("user");
      if (cached) setUser(JSON.parse(cached) as User);
    } catch {}

    (async () => {
      if (!token) {
        setHydrated(true);
        return;
      }
      try {
        const fresh = await getMe();
        setUser(fresh as User);
      } catch {
        logoutSvc();
        setUser(null);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  const login = useCallback(
    async (email = "admin@example.com", password = "password") => {
      const u = (await loginSvc(email, password)) as unknown as User;
      setUser(u);
    },
    []
  );

  const logout = useCallback(() => {
    logoutSvc();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, hydrated, login, logout }),
    [user, hydrated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
