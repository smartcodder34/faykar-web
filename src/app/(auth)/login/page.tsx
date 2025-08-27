"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";

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

      <div>
        <CustomInput primary label="sign in" placeholder="sign in" />
      </div>

      <div>
        <CustomButton primary title="Login" />
      </div>
    </div>
  );
}

