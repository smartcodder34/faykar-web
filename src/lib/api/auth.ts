import { http, toApiError, ApiError } from "@/lib/http";

export type RegisterPayload = {
  username: string;
  emailOrPhone: string;
  password: string;
};

export type RegisterResponse = {
  userId: string;
  email?: string;
  phone?: string;
  next?: "verify" | "done";
};

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  try {
    const { data } = await http.post<RegisterResponse>("/auth/register", payload);
    return data;
  } catch (err) {
    throw toApiError(err) as ApiError;
  }
}

