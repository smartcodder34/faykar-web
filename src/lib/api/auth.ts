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
  email?: string;
  password?: string;
 
};

export type SocialRegisterPayload = {
  full_name: string | null;
  email: string | null; 
  phone_number: string;
  provider: string;
};

export type SocialloginPayload = {
  email: string| null;
  provider: string;
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

export const forgotPasswordApi = async (data:string) => {
  try {
    const res = await http.post(`/auth/forgot-password`, data);
    return res.data;
  } catch (error) {
    console.error("fogot PasswordApi", error);
    throw error;
  }
};

export const resetPasswordApi = async (data: string) => {
  try {
    const res = await http.post(`/auth/reset-password`, data);
    return res.data;
  } catch (error) {
    console.error("fogot PasswordApi", error);
    throw error;
  }
};

export const EditUserDetails = async (data) => {
  try {
    const res = await http.put(`/profile/update`, data);
    return res.data;
  } catch (error) {
    console.error("EditUserDetails:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const res = await http.get(`/profile`,);
    return res.data;
  } catch (error) {
    console.error("getUserApi:", error);
    throw error;
  }
};



//social media

export const registerSocialUser = async (payload: SocialRegisterPayload) => {
  try {
    const { data } = await http.post("/auth/social-register", payload);
    return data;
  } catch (err) {
    throw toApiError(err) as ApiError;
  }
};

export const loginSocialUser = async (data: SocialloginPayload) => {
  try {
    const res = await http.post(`/auth/social-login`, data);
    return res.data;
  } catch (error) {
    console.error("Social authenticate User", error);
    throw error;
  }
};

