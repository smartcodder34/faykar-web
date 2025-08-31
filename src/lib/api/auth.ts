import { http, toApiError, ApiError } from "@/lib/http";

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  password_confirmation: string;
};

export type verifyPayload = {
  email: string;
  otp: string;
};
export type loginPayload = {
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload)=> {
  try {
    const { data } = await http.post("/auth/register", payload);
    return data;
  } catch (err) {
    throw toApiError(err) as ApiError;
  }
}

export const verifyEmail = async (data: verifyPayload) => {
  try {
    const res = await http.post(`/auth/verify-email`, data);
    return res.data;
  } catch (error) {
    console.error("address User Info", error);
    throw error;
  }
};

export const loginUser = async (data: loginPayload) => {
  try {
    const res = await http.post(`/auth/authenticate`, data);
    return res.data;
  } catch (error) {
    console.error("authenticate User", error);
    throw error;
  }
};

