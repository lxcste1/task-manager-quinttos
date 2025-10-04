"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

export type UserLite = {
  id: number;
  name: string;
  email: string;
};

type UseUsersState =
  | { loading: true; error: null; users: UserLite[] }
  | { loading: false; error: string | null; users: UserLite[] };

export function useUsers(initialFetch: boolean = true) {
  const { hydrated, isAuthenticated } = useAuth();
  const [state, setState] = useState<UseUsersState>({
    loading: initialFetch,
    error: null,
    users: [],
  });
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef<boolean>(false);

  const fetchUsers = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((s) => ({ ...s, loading: true, error: null }));

    try {
      const res = await api.get<UserLite[]>("/users", {
        signal: controller.signal,
      });
      if (!mountedRef.current) return;
      setState({ loading: false, error: null, users: res.data });
    } catch (err) {
      if (!mountedRef.current) return;
      if (controller.signal.aborted) return;
      const message =
        err instanceof Error
          ? err.message
          : "No se pudieron cargar los usuarios";
      setState({ loading: false, error: message, users: [] });
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    if (initialFetch) fetchUsers();
    if (!initialFetch)
      return () => {
        mountedRef.current = false;
      };
    if (!hydrated || !isAuthenticated) {
      setState((s) => ({ ...s, loading: false }));
    } else {
      fetchUsers();
    }
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, [initialFetch, hydrated, isAuthenticated, fetchUsers]);

  return {
    users: state.users,
    loading: state.loading,
    error: state.error,
    refetch: fetchUsers,
  };
}
