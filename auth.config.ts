import GoogleProvider from "next-auth/providers/google";

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
        },
      },
    }),
  ],
  callbacks: {
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
