// import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
// import { authConfig } from "./auth.config";

export const options = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
      },
    }),
    // GoogleProvider({
    //   profile(profile) {
    //     console.log(`Auth google ${profile}`);
    //     return {
    //       id: profile.id,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //   },
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    // }),
  ],
  // callbacks: {
  //   async jwt({ token, user }: { token: User; user: User }) {
  //     if (user) {
  //       token.id = user.id ?? "";
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: { session: any; token: User }) {
  //     if (session?.user) {
  //       session.user.role = token.role;
  //     }
  //     return session;
  //   },
  // },
};
