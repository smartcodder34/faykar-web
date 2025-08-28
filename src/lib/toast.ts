"use client";

import { toast } from "sonner";

type ToastOptions = {
  description?: string;
  durationMs?: number;
};

export function showSuccessToast(message: string, opts?: ToastOptions): void {
  toast.success(message, {
    description: opts?.description,
    duration: opts?.durationMs ?? 3500,
  });
}

export function showErrorToast(message: string, opts?: ToastOptions): void {
  toast.error(message || "Something went wrong", {
    description: opts?.description,
    duration: opts?.durationMs ?? 4500,
  });
}

export function showInfoToast(message: string, opts?: ToastOptions): void {
  toast.message(message, {
    description: opts?.description,
    duration: opts?.durationMs ?? 3500,
  });
}

