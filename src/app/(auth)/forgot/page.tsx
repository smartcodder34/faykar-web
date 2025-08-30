"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import Logo from "@/customComp/Logo";

type FormValues = { email: string };

export default function ForgotPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
   
    console.log("forgot submit", data);

    router.push("/reset-password");
   
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
                placeholder="Enter your email"
                // iconPostion="left"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.email?.message}
              />
            )}
          />

          <div className="mt-4">
            <CustomButton
              // title={isSubmitting ? "Sending..." : "Send Reset Link"}]
              title={ "Send Reset Link"}
              primary
              // loading={isSubmitting}
              // disabled={!isValid}
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
