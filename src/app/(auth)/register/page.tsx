"use client";

import { useRouter } from "next/navigation";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Logo from "@/customComp/Logo";

export default function RegisterPage() {
  const router = useRouter();

  type FormValues = {
    username: string;
    emailOrPhone: string;
    password: string;
  };

  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { username: "", emailOrPhone: "", password: "" },
    mode: "onTouched",
  });

  const errors = formState.errors;
  const isSubmitting = formState.isSubmitting;

  // Basic carousel state
  const images = useMemo(() => [
    "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80"
  ], []);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("register submit", data);
    router.push(`/verify?email=${encodeURIComponent(data.emailOrPhone)}`);
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-w-md">
          <div className="mb-6"><Logo height={30} /></div>
          <h1 className="text-4xl md:text-5xl font-semibold text-green-700 tracking-tight">Get Started Now</h1>
          <p className="mt-3 text-sm text-gray-600">Enter your Credentials to Create your account</p>

          <form className="mt-8">
            <Controller
              control={control}
              name="username"
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <CustomInput whiteBg placeholder="Name" value={field.value} onChangeText={(t) => field.onChange(t || "")} error={errors.username?.message} />
              )}
            />

            <Controller
              control={control}
              name="emailOrPhone"
              rules={{
                required: "Email is required",
                validate: (value) => {
                  const v = value || "";
                  const emailOk = v.indexOf("@") > 0 && v.indexOf(".") > 0;
                  let phoneOk = false;
                  let s = v.trim();
                  if (s.charAt(0) === "+") s = s.slice(1);
                  if (s.length >= 7) {
                    phoneOk = true;
                    for (let i = 0; i < s.length; i++) {
                      const ch = s.charAt(i);
                      if (ch < "0" || ch > "9") { phoneOk = false; break; }
                    }
                  }
                  return emailOk || phoneOk || "Enter a valid email or phone";
                },
              }}
              render={({ field }) => (
                <CustomInput whiteBg placeholder="xyz@xyz.com" value={field.value} onChangeText={(t) => field.onChange(t || "")} error={errors.emailOrPhone?.message} />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required", minLength: { value: 6, message: "Min length is 6" } }}
              render={({ field }) => (
                <CustomInput whiteBg secureTextEntry placeholder="Password" value={field.value} onChangeText={(t) => field.onChange(t || "")} error={errors.password?.message} />
              )}
            />

            <div className="mt-4">
              <CustomButton
                title={isSubmitting ? "Creating..." : "Create Account"}
                style={{ backgroundColor: "#2E7D32", color: "#fff", width: "100%", height: 48 }}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              />
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Have an account?
            <button className="text-green-700 hover:underline ml-1" onClick={() => router.push("/login")}>Sign In</button>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl bg-white h-[520px] relative flex items-center justify-center">
          <img alt="carousel image" src={images[activeIndex]} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

