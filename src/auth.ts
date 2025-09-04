import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { http } from "./lib/http";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        const requestPayload = {
          email: user?.email,
          provider: account?.provider,
        };
        const res = http.post("/auth/social-login", requestPayload);
        console.log(res);
         return res.data;
      }
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
});
