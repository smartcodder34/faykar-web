"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { useAuthStore } from "@/lib/store/authStore";
import { showSuccessToast } from "@/lib/toast";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import Logo from "@/customComp/Logo";
import { Controller, useForm } from "react-hook-form";
import { AuthSlider } from "@/customComp/AuthSlider";
import { useLoginUser } from "@/lib/hooks/useRegister";
import LoadingOverlay from "@/customComp/LoadingOverlay";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);

  const userLogin = useLoginUser();

  useEffect(() => {
    if (isLoggedIn()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("login submit", data);
    // Simulate successful login; integrate with real API when ready
    if(data){
      userLogin.mutate(data);
    }
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <LoadingOverlay
        isOpen={userLogin.isPending}
        message="logging in..."
        animationType="pulse"
      />
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
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  // label="Email or Phone Number"
                  placeholder="Enter your email or phone number"
                  // iconPostion="left"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: "passowrd is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&.,]{8,}$/,
                  message:
                    "Password must include uppercase, lowercase, and a number.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  // label="Password"
                  placeholder="Enter your Password"
                  secureTextEntry={isSecureEntry}
                  // iconPostion="left"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <div className="mt-2 flex justify-end">
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
                // title={isSubmitting ? "Signing in..." : "Login"}
                title={"Login"}
                style={{
                  backgroundColor: "#2E7D32",
                  color: "#fff",
                  width: "100%",
                  height: 48,
                }}
                // disabled={isSubmitting}
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

        <AuthSlider />
      </div>
    </div>
  );
}
