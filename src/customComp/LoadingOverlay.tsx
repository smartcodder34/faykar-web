"use client";

import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";

type LoadingOverlayProps = {
  isOpen: boolean;
  message?: string;
  backdropClassName?: string;
};

export default function LoadingOverlay({
  isOpen,
  message = "Loading...",
  backdropClassName,
}: LoadingOverlayProps) {
  if (!isOpen) return null;
  return (
    <div
      className={
        "fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 " +
        (backdropClassName || "")
      }
      aria-live="assertive"
      role="alert"
    >
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/90 px-6 py-6 shadow-xl">
        <div className="relative h-14 w-14">
          <Image src={logo} alt="loading" fill className="object-contain animate-pulse" />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}

