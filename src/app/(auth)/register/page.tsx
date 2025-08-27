"use client";

import { useRouter } from "next/navigation";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import { useEffect, useMemo, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  // Simple carousel state
  const images = useMemo(
    () => [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80",
    ],
    []
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Form */}
        <div className="max-w-md">
          <h1 className="text-4xl md:text-5xl font-semibold text-green-700 tracking-tight">
            Get Started Now
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Enter your Credentials to Create your account
          </p>

          <div className="mt-8">
            <CustomInput
              whiteBg
              placeholder="Name"
              value={username}
              onChangeText={(text) => setUsername(text ?? "")}
            />
            <CustomInput
              whiteBg
              placeholder="xyz@xyz.com"
              value={emailOrPhone}
              onChangeText={(text) => setEmailOrPhone(text ?? "")}
            />
            <CustomInput
              whiteBg
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text ?? "")}
            />

            <div className="mt-4">
              <CustomButton
                title="Create Account"
                style={{
                  backgroundColor: "#2E7D32",
                  color: "#fff",
                  width: "100%",
                  height: 48,
                }}
              />
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              Have a account?{" "}
              <button
                className="text-green-700 hover:underline ml-1"
                onClick={() => router.push("/login")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Right: Carousel */}
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white h-[520px] relative">
          {images.map((src, idx) => (
            <img
              key={src}
              alt="carousel image"
              src={src}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === activeIndex ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* Footer indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  idx === activeIndex ? "bg-white w-8" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

