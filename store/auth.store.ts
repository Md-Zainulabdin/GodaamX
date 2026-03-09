"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =========================================================
   USER TYPE
   ========================================================= */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

/* =========================================================
   AUTH STORE STATE
   ========================================================= */

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;

  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
}

/* =========================================================
   ZUSTAND STORE
   ========================================================= */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

/* =========================================================
   SAFE TOKEN GETTER
   (usable in axios outside React)
   ========================================================= */

export const getAuthToken = () => {
  return useAuthStore.getState().token;
};