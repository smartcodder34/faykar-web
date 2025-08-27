"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>This is a public page. Toggle isLoggedIn() in src/lib/auth.ts.</p>
    </div>
  );
}

