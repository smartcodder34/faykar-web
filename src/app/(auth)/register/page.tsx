"use client";

import { useRouter } from "next/navigation";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Logo from "@/customComp/Logo";
import { AuthSlider } from "@/customComp/AuthSlider";
import { useRegisterUser } from "@/lib/hooks/useRegister";
import LoadingOverlay from "@/customComp/LoadingOverlay";

export default function RegisterPage() {
  const router = useRouter();

  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [comPassIsSecureEntry, setComPassIsSecureEntry] = React.useState(true);

  type FormValues = {
    full_name: string;
    email: string;
    password: string;
    phone_number: string;
    password_confirmation: string;
  };

    const {
      control,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm({
      mode: "onChange",
      defaultValues: {
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
        password_confirmation: "",
      },
    });

  const pwd = watch("password");


  

  const registerUserData = useRegisterUser();

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    console.log("register submit", data);
    if(data){
      registerUserData.mutate(data);
    }
    
  };

  console.log("registerUserData", registerUserData);

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center relative">
      <LoadingOverlay isOpen={registerUserData.isPending} message="Creating your account" />
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="max-w-md">
          <div className="mb-6">
            <Logo height={30} />
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-[#2E6939] tracking-tight">
            Get Started Now
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            Enter your Credentials to Create your account
          </p>

          <form className="mt-8">
            <Controller
              control={control}
              name="full_name"
              rules={{
                required: "fullname is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  primary
                  // label="Full Name"
                  placeholder="Enter your full name"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.full_name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone_number"
              rules={{
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Phone Number must be 12 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Phone Number must not exceed 12 digits",
                },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <CustomInput
                  // label="Phone Number."
                  
                  primary
                  placeholder="Enter your phone number"
                  keyboardType={"numeric"}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.phone_number?.message}
                />
              )}
            />

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

            <div className="mt-4">
              <CustomButton
                // title={isSubmitting ? "Creating..." : "Create Account"}
                title="Create Account"
                primary
                // style={{
                //   backgroundColor: "#2E7D32",
                //   color: "#fff",
                //   width: "100%",
                //   height: 48,
                // }}
                loading={registerUserData.isPending}
                disabled={!isValid || registerUserData.isPending}
                onPress={handleSubmit(onSubmit)}
              />
            </div>
            {registerUserData.error && (
              <p className="mt-3 text-sm text-red-600">
                {(registerUserData.error as Error).message ||
                  "Registration failed"}
              </p>
            )}
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Have a account?
            <button
              className="text-green-700 hover:underline ml-1"
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          </div>
        </div>

        <AuthSlider />
      </div>
    </div>
  );
}
