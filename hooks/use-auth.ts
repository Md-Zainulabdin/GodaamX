"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setSession, getSession, clearSession, type AuthUser, type AuthSession } from "@/lib/auth";
import { setCachedToken } from "@/lib/token-cache";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [session, setSessionState] = useState<AuthSession>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session and sync cache
  useEffect(() => {
    let isMounted = true;
    getSession().then((s) => {
      if (!isMounted) return;
      setSessionState(s);
      if (s?.token) setCachedToken(s.token);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const save = useCallback(async (token: string, user: AuthUser) => {
    queryClient.clear();
    await setSession(token, user);
    setCachedToken(token);
    const s = await getSession();
    setSessionState(s);
    router.push("/dashboard");
  }, [queryClient, router]);

  const logout = useCallback(async () => {
    queryClient.clear();
    setCachedToken(null);
    await clearSession();
    setSessionState(null);
    router.push("/login");
  }, [queryClient, router]);

  return { session, loading, save, logout };
}
