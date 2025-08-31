"use client";

import { AuthSlider } from "@/customComp/AuthSlider";
import CustomButton from "@/customComp/CustomButton";
import LoadingOverlay from "@/customComp/LoadingOverlay";
import Logo from "@/customComp/Logo";
import { useVerifyEmail } from "@/lib/hooks/useRegister";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useMemo, useRef, useState } from "react";

export default function VerificationPage() {

  const verifyEmail =  useVerifyEmail()
  const email = useAuthStore.getState().email

console.log("email from store", email);

  const [digits, setDigits] = useState(["", "", "", ""]);
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    inputs[0].current?.focus();
  }, []);

   const code = useMemo(() => digits.join(""), [digits]);

   const handleChange = (index: number, value: string) => {
     const v = value.replace(/\D/g, "");
     const nextDigits = [...digits];
     nextDigits[index] = v.slice(-1);
     setDigits(nextDigits);
     if (v && index < inputs.length - 1) inputs[index + 1].current?.focus();
   };

   const handleKeyDown = (
     index: number,
     e: React.KeyboardEvent<HTMLInputElement>
   ) => {
     if (e.key === "Backspace" && !digits[index] && index > 0) {
       inputs[index - 1].current?.focus();
     }
   };

     const onVerify = async () => {
       if (code.length !== 4) return;
      //  setSubmitting(true);
        verifyEmail.mutate({ email: email || "", otp: code });
       
       console.log("verify code", code);
      //  setSubmitting(false);
      //  router.push("/dashboard");
     };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <LoadingOverlay
        isOpen={verifyEmail.isPending}
        message="Verifying email..."
        animationType="pulse"
      />
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-w-md">
          <div className="mb-6">
            <Logo height={30} />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-green-700 tracking-tight">
            Verify Email
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Enter the 4-digit code we sent to{" "}
          </p>
          <p className="font-medium">{email}</p>.
          <div className="mt-8 flex items-center gap-3">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={inputs[i]}
                inputMode="numeric"
                pattern="[0-9]*"
                className="h-12 w-12 rounded-2xl border border-gray-200 bg-white text-center text-xl font-medium text-black focus:outline-none focus:ring-2 focus:ring-green-600"
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                maxLength={1}
              />
            ))}
          </div>
          <div className="mt-4">
            <CustomButton
              title={verifyEmail.isPending ? "Verifying..." : "Verify"}
              
              primary
              loading={verifyEmail.isPending}
              disabled={verifyEmail.isPending || code.length !== 4}
              onPress={onVerify}
            />
          </div>
        </div>
        <AuthSlider />
      </div>
    </div>
  );
}
