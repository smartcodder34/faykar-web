import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerUser,
  RegisterPayload,
  verifyPayload,
  loginPayload,
  SocialRegisterPayload,
  SocialloginPayload,
  verifyEmail,
  loginUser,
  registerSocialUser,
  loginSocialUser,
  forgotPasswordApi,
  resetPasswordApi,
  EditUserDetails,
} from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { ApiError, toApiError } from "../http";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

import { useAuthStore, LocationData } from "../store/authStore";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGeolocation } from "./useGeolocation";



// export function useRegister() {
//   return useMutation<RegisterResponse, Error, RegisterPayload>({
//     mutationKey: ["register"],
//     mutationFn: (payload) => registerUser(payload),
//   });
// }

export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess(data: RegisterPayload) {
      showSuccessToast("Registration successful");
      console.log("register success data:", data);

      router.push("/verification");
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;

      showErrorToast(apiError || "Registration failed");
      throw apiError;
    },
  });
};

export const useVerifyEmail = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: verifyEmail,
    onSuccess(data: verifyPayload) {
      showSuccessToast("Email verification successful");
      console.log("email verify success data:", data);

      router.push("/login");
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;
      showErrorToast(apiError || "Registration failed");
      throw apiError;
    },
  });
};



export const useLoginUser = () => {
  const router = useRouter();
  const IsLoggedIn = useAuthStore.getState().isLoggedIn;

  return useMutation({
    mutationFn: loginUser,
    async onSuccess(data: loginPayload) {
      showSuccessToast("Login successful");

      if (data) {
        useAuthStore
          .getState()
          .login({ token: data?.data?.access_token?.token || "" });
        IsLoggedIn();
        router.push("/dashboard");
        console.log("data000:", data);
      }
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;
      showErrorToast(apiError || "Registration failed");
      throw apiError;
    },
  });
};

//social
export const useRegisterSocialUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerSocialUser,
    onSuccess(data: SocialRegisterPayload) {
      showSuccessToast("Registration successful");
      console.log("register success data:", data);
      signOut();
      router.push("/login");
    },
    onError(error) {
      signOut();
      const apiError = toApiError(error) as ApiError;

      showErrorToast(apiError || "Registration failed");
      throw apiError;
    },
  });
};

export const useLoginSocialUser = () => {
  const router = useRouter();
  const IsLoggedIn = useAuthStore.getState().isLoggedIn;

  return useMutation({
    mutationFn: loginSocialUser,
    async onSuccess(data: SocialloginPayload) {
      showSuccessToast("Login successful");

      if (data) {
        useAuthStore
          .getState()
          .login({ token: data?.data?.access_token?.token || "" });
        IsLoggedIn();
        router.push("/dashboard");
      }
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;
      showErrorToast(apiError || "Registration failed");
      throw apiError;
    },
  });
};


export const useForgotPasswordApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: forgotPasswordApi,
    async onSuccess(data) {
      showSuccessToast("OTP sent to Your Email");

      if (data) {
        router.push("/reset-password");
      }
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;
      showErrorToast(apiError || "OTP failed");
      throw apiError;
    },
  });
};

export const useResetPasswordApi = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPasswordApi,
    async onSuccess(data) {
      showSuccessToast("Successful");

      if (data) {
        router.push("/login");
      }
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;
      showErrorToast(apiError || "OTP failed");
      throw apiError;
    },
  });
};

export const useEditUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: EditUserDetails,
    onSuccess(data: any) {
     showSuccessToast("Successful");

      queryClient.invalidateQueries({ queryKey: ["get-profile"] });
    },
    onError(error: any) {
     const apiError = toApiError(error) as ApiError;
     showErrorToast(apiError || "Registration failed");
     throw apiError;
    },
  });
};