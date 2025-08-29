import { useMutation } from "@tanstack/react-query";
import {
  registerUser,
  RegisterPayload,
  verifyPayload,
  verifyEmail,
} from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { ApiError, toApiError } from "../http";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

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
      router.push("/login");
    },
    onError(error) {
      const apiError = toApiError(error) as ApiError;
      showErrorToast(apiError || "Registration failed");
      throw apiError;
    },
  });
};

// export const useLoginUser = () => {
//   const router = useRouter();
//   const setIsLoggedIn = useAuthStore().setIsLoggedIn;

//   return useMutation({
//     mutationFn: loginUser,
//     async onSuccess(data: any) {
//       // showSuccessToast({
//       //   message: data.message,
//       // });
//       if (data) {
//         await AsyncStorage.setItem("token", data.data.access_token.token);
//         setIsLoggedIn(true);
//         router.push("/(tabs)/homepage");
//         console.log("data000:", data);
//       }
//     },
//     onError(error: any) {
//       console.log("login error", error.response?.status === 403);
//       handleAxiosError(error);
//     },
//   });
// };
