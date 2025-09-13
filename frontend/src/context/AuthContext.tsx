// /context/AuthContext.tsx
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
import type { ReactNode } from "react";
import type { AxiosError } from "axios";
import { restoreAuthToken } from "@/lib/api";
import { login as loginSvc, logout as logoutSvc, getMe } from "@/services/auth";

type User = { id: number; name: string; email: string; password: string };

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const didInit = useRef(false);

  // --- bootstrap (restaura header, rehidrata user y valida /me) ---
  useEffect(() => {
    if (didInit.current) return; // evita doble ejecución en StrictMode
    didInit.current = true;

    const token = restoreAuthToken(); // <-- pone Authorization si hay token

    // lee user cacheado (opcional, evita parpadeo)
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
        const fresh = (await getMe()) as User;
        setUser(fresh);
        try {
          localStorage.setItem("user", JSON.stringify(fresh));
        } catch {}
      } catch (e) {
        const status = (e as AxiosError)?.response?.status;
        if (status === 401 || status === 403) {
          // token inválido/expirado → limpiar
          logoutSvc();
          setUser(null);
          try {
            localStorage.removeItem("user");
          } catch {}
        } else {
          // error transitorio (red/CORS/5xx) → conservamos token y user cacheado
        }
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // --- login sin defaults; persiste user para rehidratación rápida ---
  const login = useCallback(async (email: string, password: string) => {
    const u = (await loginSvc(email, password)) as unknown as User;
    setUser(u);
    try {
      localStorage.setItem("user", JSON.stringify(u));
    } catch {}
  }, []);

  const logout = useCallback(() => {
    logoutSvc(); // debería borrar token en storage y header
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch {}
  }, []);

  const refreshUser = useCallback(async () => {
    const fresh = (await getMe()) as User;
    setUser(fresh);
    try {
      localStorage.setItem("user", JSON.stringify(fresh));
    } catch {}
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      hydrated,
      login,
      logout,
      refreshUser,
    }),
    [user, hydrated, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
