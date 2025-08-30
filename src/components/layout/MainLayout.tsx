// src/components/layout/MainLayout.tsx
"use client";

import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
