"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import Logo from "@/customComp/Logo";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  emailOrPhone: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { emailOrPhone: "", password: "" },
    mode: "onTouched",
  });

  const errors = formState.errors;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
   
    console.log("login submit", data);
    // router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-w-md">
          <div className="mb-6">
            <Logo height={30} />
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#2E6939] tracking-tight">
            Login Now
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Enter your Credentials to Log into your account
          </p>

          <form className="mt-8">
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
                      if (ch < "0" || ch > "9") {
                        phoneOk = false;
                        break;
                      }
                    }
                  }
                  return emailOk || phoneOk || "Enter a valid email or phone";
                },
              }}
              render={({ field }) => (
                <CustomInput
                  whiteBg
                  placeholder="Email or Phone Number"
                  value={field.value}
                  onChangeText={(t) => field.onChange(t || "")}
                  error={errors.emailOrPhone?.message}
                />
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Min length is 6" },
                  }}
                  render={({ field }) => (
                    <CustomInput
                      whiteBg
                      secureTextEntry
                      placeholder="Password"
                      value={field.value}
                      onChangeText={(t) => field.onChange(t || "")}
                      error={errors.password?.message}
                    />
                  )}
                />
              </div>
              <button
                type="button"
                className="text-xs text-green-700 hover:underline ml-3 whitespace-nowrap"
                onClick={() => router.push("/forgot")}
              >
                Forgot Password ?
              </button>
            </div>

            <div className="mt-4">
              <CustomButton
                title={isSubmitting ? "Signing in..." : "Login"}
                style={{
                  backgroundColor: "#2E7D32",
                  color: "#fff",
                  width: "100%",
                  height: 48,
                }}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              />
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?
            <button
              className="text-green-700 hover:underline ml-1"
              onClick={() => router.push("/register")}
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl bg-white h-[520px] relative flex items-center justify-center">
          {/* Replace with /login-hero.jpg from Image 1 */}
          <img
            alt="login hero"
            src="/login-hero.jpg"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

