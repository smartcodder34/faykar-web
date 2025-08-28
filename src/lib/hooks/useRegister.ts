import { useMutation } from "@tanstack/react-query";
import { registerUser, RegisterPayload, RegisterResponse } from "@/lib/api/auth";

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationKey: ["register"],
    mutationFn: (payload) => registerUser(payload),
  });
}

