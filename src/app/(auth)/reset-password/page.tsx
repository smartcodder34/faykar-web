"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import Logo from "@/customComp/Logo";
import React from "react";
import { useResetPasswordApi } from "@/lib/hooks/useRegister";
import { useAuthStore } from "@/lib/store/authStore";

type FormValues = { password: string; password_confirmation: string; otp: string};

export default function ResetPasswordpage() {
  const router = useRouter();
    const email = useAuthStore.getState().email;
  

  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [comPassIsSecureEntry, setComPassIsSecureEntry] = React.useState(true);

  const resetPasswordData = useResetPasswordApi();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      password_confirmation: "",
      otp:"",
    },
  });

  const pwd = watch("password");

  const onSubmit = async (data: FormValues) => {
    console.log("forgot submit", data);
    const requestedPayload = {
      email: email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      otp: data.otp,
    };
    resetPasswordData.mutate(requestedPayload);
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Logo height={30} />
        </div>
        <h1 className="text-3xl md:text-4xl font-medium text-[#2E6939] tracking-tight">
          Reset Password
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Enter your email or phone to receive reset instructions.
        </p>

        <form className="mt-8">
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

          <Controller
            control={control}
            name="password_confirmation"
            rules={{
              required: "confirm Password is required",
              validate: (value) => value === pwd || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                // label="Re-type password"
                placeholder="confirm password"
                secureTextEntry={comPassIsSecureEntry}
                onChangeText={onChange}
                value={value}
                error={errors.password_confirmation?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="otp"
            rules={{
              required: "Otp is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                primary
                // label="Re-type password"
                placeholder="Enter Your OTP"
                secureTextEntry={comPassIsSecureEntry}
                onChangeText={onChange}
                value={value}
                error={errors.password_confirmation?.message}
              />
            )}
          />

          <div className="mt-4">
            <CustomButton
              // title={isSubmitting ? "Sending..." : "Send Reset Link"}]
              title={"Send Reset Link"}
              primary
              loading={resetPasswordData.isPending}
              disabled={!isValid || resetPasswordData.isPending}
              onPress={handleSubmit(onSubmit)}
            />
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Remembered your password?
          <button
            className="text-green-700 hover:underline ml-1"
            onClick={() => router.push("/login")}
          >
            Go back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
