"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
  address?: string;
  city?: string;
  country?: string;
}

export type AuthState = {
  token: string | null;
  email: string | null;
  location: LocationData | null;
  setAuth: (payload: { token?: string | null; email?: string | null; location?: LocationData | null }) => void;
  clearAuth: () => void;
  isLoggedIn: () => boolean;
  login: (params: { token: string; email?: string | null; location?: LocationData | null }) => void;
  logout: () => void;
  setLocation: (location: LocationData) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      location: null,

      setAuth: ({ token, email, location }) =>
        set((state) => ({
          token: token !== undefined ? token : state.token,
          email: email !== undefined ? email : state.email,
          location: location !== undefined ? location : state.location,
        })),

      clearAuth: () => set({ token: null, email: null, location: null }),

      isLoggedIn: () => !!get().token,

      login: ({ token, email, location }) => {
        set({ 
          token, 
          email: email ?? get().email,
          location: location ?? get().location
        });
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("access_token", token);
          }
        } catch {}
      },

      logout: () => {
        set({ token: null, email: null, location: null });
        try {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("access_token");
          }
        } catch {}
      },

      setLocation: (location) => {
        set({ location });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token, email: state.email, location: state.location }),
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
