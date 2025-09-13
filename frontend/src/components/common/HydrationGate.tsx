"use client";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export function HydrationGate({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { hydrated } = useAuth();
  if (!hydrated) return <>{fallback}</>;
  return <>{children}</>;
}
