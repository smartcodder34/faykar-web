"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "@/customComp/CustomInput";
import CustomButton from "@/customComp/CustomButton";
import Logo from "@/customComp/Logo";

type FormValues = { emailOrPhone: string };

export default function ForgotPage() {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { emailOrPhone: "" },
    mode: "onTouched",
  });
  const errors = formState.errors;
  const isSubmitting = formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    console.log("forgot submit", data);
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full px-6 py-10 md:px-10 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-6"><Logo height={30} /></div>
        <h1 className="text-3xl md:text-4xl font-semibold text-green-700 tracking-tight">Reset Password</h1>
        <p className="mt-3 text-sm text-gray-600">Enter your email or phone to receive reset instructions.</p>

        <form className="mt-8">
          <Controller
            control={control}
            name="emailOrPhone"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <CustomInput whiteBg placeholder="Email or Phone Number" value={field.value} onChangeText={(t) => field.onChange(t || "")} error={errors.emailOrPhone?.message} />
            )}
          />

          <div className="mt-4">
            <CustomButton
              title={isSubmitting ? "Sending..." : "Send Reset Link"}
              style={{ backgroundColor: "#2E7D32", color: "#fff", width: "100%", height: 48 }}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Remembered your password?
          <button className="text-green-700 hover:underline ml-1" onClick={() => router.push("/login")}>Go back to Login</button>
        </div>
      </div>
    </div>
  );
}

