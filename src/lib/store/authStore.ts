"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AuthState = {
  token: string | null;
  email: string | null;
  setAuth: (payload: { token?: string | null; email?: string | null }) => void;
  clearAuth: () => void;
  isLoggedIn: () => boolean;
  login: (params: { token: string; email?: string | null }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,

      setAuth: ({ token, email }) =>
        set((state) => ({
          token: token !== undefined ? token : state.token,
          email: email !== undefined ? email : state.email,
        })),

      clearAuth: () => set({ token: null, email: null }),

      isLoggedIn: () => !!get().token,

      login: ({ token, email }) => {
        set({ token, email: email ?? get().email });
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("access_token", token);
          }
        } catch {}
      },

      logout: () => {
        set({ token: null, email: null });
        try {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("access_token");
          }
        } catch {}
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, email: state.email }),
      onRehydrateStorage: () => (state) => {
        // Keep the http interceptor happy by mirroring token under access_token
        try {
          if (typeof window !== "undefined") {
            const token = state?.token || null;
            if (token) {
              window.localStorage.setItem("access_token", token);
            } else {
              window.localStorage.removeItem("access_token");
            }
          }
        } catch {}
      },
    }
  )
);

export function setAccessToken(token: string | null) {
  useAuthStore.getState().setAuth({ token });
  try {
    if (typeof window !== "undefined") {
      if (token) window.localStorage.setItem("access_token", token);
      else window.localStorage.removeItem("access_token");
    }
  } catch {}
}
