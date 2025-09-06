"use client";

import { useEffect } from "react";
import { restoreAuthToken } from "@/lib/api";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    restoreAuthToken();
  }, []);

  return <>{children}</>;
}
