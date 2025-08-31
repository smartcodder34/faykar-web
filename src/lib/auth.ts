import { useAuthStore } from "@/lib/store/authStore";

export function isLoggedIn(): boolean {
  try {
    return !!useAuthStore.getState().token;
  } catch {
    return false;
  }
}

