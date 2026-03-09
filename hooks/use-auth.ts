"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { setSession, getSession, clearSession, type AuthUser, type AuthSession } from "@/lib/auth";

export function useAuth() {
  const router = useRouter();
  const [session, setSessionState] = useState<AuthSession>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((s) => {
      setSessionState(s);
      setLoading(false);
    });
  }, []);

  async function save(token: string, user: AuthUser) {
    await setSession(token, user);
    const s = await getSession();
    setSessionState(s);
  }

  async function logout() {
    await clearSession();
    setSessionState(null);
    router.push("/login");
  }

  return { session, loading, save, logout };
}
