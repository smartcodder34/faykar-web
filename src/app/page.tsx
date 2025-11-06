"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import LoadingOverlay from "@/customComp/LoadingOverlay";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect based on authentication status
    if (isLoggedIn()) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  // Show loading while redirecting
  return (
    <LoadingOverlay isOpen={true} message="Loading..." animationType="pulse" />
  );
}
