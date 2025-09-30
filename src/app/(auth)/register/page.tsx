"use client";

import { useRouter } from "next/navigation";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Logo from "@/customComp/Logo";
import { AuthSlider } from "@/customComp/AuthSlider";
import {
  useRegisterSocialUser,
  useRegisterUser,
} from "@/lib/hooks/useRegister";
import LoadingOverlay from "@/customComp/LoadingOverlay";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import facebook from "@/assets/images/facebook.png";
import google from "@/assets/images/google.png";
import { signIn, signOut, useSession } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();

  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
  const [comPassIsSecureEntry, setComPassIsSecureEntry] = React.useState(true);

  const setAuth = useAuthStore.getState().setAuth;

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

  const { data, status } = useSession();
  const session = data;


  console.log("session:", session);
  


  React.useEffect(() => {
    if (session?.user) {
      const provider = sessionStorage.getItem("provider") || "";
      registerSocialDetails.mutate({
        full_name: session?.user?.name,
        phone_number: "+2348065443333",
        email: session?.user?.email,
        provider,
      });
      //  sessionStorage.removeItem("provider");
    }
  }, [session]);

  const registerUserData = useRegisterUser();
  const registerSocialDetails = useRegisterSocialUser();

  const onSubmit = async (data: FormValues) => {
    // Simulate API call
    console.log("register submit", data);
    if (data) {
      registerUserData.mutate(data);
      setAuth({ email: data.email });
    }
  };

  const handleSignIn = (provider: string) => {
    console.log(provider, "providerRegister");
    // store in localStorage/sessionStorage before redirect
    sessionStorage.setItem("provider", provider);
    signIn(provider);
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center relative">
      <LoadingOverlay
        isOpen={
          registerUserData.isPending ||
          registerSocialDetails.isPending ||
          status == "loading"
        }
        message="Creating your account"
        animationType="pulse"
      />
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
                  value: 14,
                  message: "Phone Number must be 14 digits",
                },
                maxLength: {
                  value: 14,
                  message: "Phone Number must not exceed 14 digits",
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
          <div className=" flex items-center justify-between w-40 mx-auto my-5">
            <div onClick={() => handleSignIn("facebook")}>
              <Image
                alt="carousel image"
                src={facebook}
                className=" object-cover"
                // width={100}
                // height={100}
              />
            </div>

            <div onClick={() => handleSignIn("google")}>
              <Image
                alt="carousel image"
                src={google}
                className=" object-cover"
                // width={100}
                // height={100}
              />
            </div>
          </div>
        </div>

        <AuthSlider />
      </div>
    </div>
  );
}
