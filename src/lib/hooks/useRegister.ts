import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { ApiError, toApiError } from "../http";

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
      // showSuccessToast({
      //   message: data.message,
      // });

      console.log("register success data:", data);

      // router.push("/(auth)/create-account/verification");
    },
    onError(error) {
      // handleAxiosError(error);
          throw toApiError(error) as ApiError;
      
    },
  });
};

// export const useVerifyEmail = (handleVerifyBottomSheetOpen: () => void) => {
//   return useMutation({
//     mutationFn: verifyEmail,
//     onSuccess(data: any) {
//       // showSuccessToast({
//       //   message: data.message,
//       // });
//       handleVerifyBottomSheetOpen();
//     },
//     onError(error: any) {
//       handleAxiosError(error);
//     },
//   });
// };

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


