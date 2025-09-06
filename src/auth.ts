import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { http, toApiError } from "@/lib/http"; // your axios setup
import { useAuthStore } from "@/lib/store/authStore";



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook],
  
});






