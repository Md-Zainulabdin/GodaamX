"use server";

import { cookies } from "next/headers";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export type AuthUser = {
  user_id: string;
  name: string;
  email: string;
  role: string;
  supplier_id?: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
  isAuthenticated: boolean;
} | null;

/* =========================================================
   SET SESSION
   ========================================================= */

export async function setSession(token: string, user: AuthUser) {
  const store = await cookies();  
  store.set(TOKEN_KEY, token, OPTS);
  store.set(USER_KEY, JSON.stringify(user), OPTS);
}

/* =========================================================
   GET SESSION (SERVER)
   ========================================================= */

export async function getSession(): Promise<AuthSession> {
  const store = await cookies();
  const token = store.get(TOKEN_KEY)?.value;
  const raw = store.get(USER_KEY)?.value;
  if (!token || !raw) return null;
  try {
    const user: AuthUser = JSON.parse(raw);
    return { token, user, isAuthenticated: true };
  } catch {
    return null;
  }
}

/* =========================================================
   CLEAR SESSION
   ========================================================= */

export async function clearSession() {
  const store = await cookies();
  store.delete(TOKEN_KEY);
  store.delete(USER_KEY);
}
