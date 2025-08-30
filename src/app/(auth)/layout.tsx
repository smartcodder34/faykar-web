"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/home");
    }
  }, [router]);

  if (isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
}

