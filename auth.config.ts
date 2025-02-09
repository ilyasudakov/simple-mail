import GoogleProvider from "next-auth/providers/google";
import type { AuthConfig } from "@auth/core";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

interface ExtendedJWT extends JWT {
  accessToken?: string;
}

interface ExtendedSession extends Session {
  accessToken?: string;
}

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: ExtendedJWT; account: any }) {
      // Persist the access token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: ExtendedJWT;
    }) {
      // Send access token to client
      session.accessToken = token.accessToken;
      return session;
    },
    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: any;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnApp = nextUrl.pathname.startsWith("/app");
      if (isOnApp) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/app", nextUrl));
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
};
