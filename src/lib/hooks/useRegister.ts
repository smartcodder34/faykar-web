import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  RegisterPayload,
  verifyPayload,
  loginPayload,
  verifyEmail,
  loginUser,
} from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { ApiError, toApiError } from "../http";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useAuthStore } from "../store/authStore";

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