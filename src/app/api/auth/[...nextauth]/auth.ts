import GoogleProvider from "next-auth/providers/google";

type User = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  role?: string;
};

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log(`Auth google ${profile}`);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: User; user: User }) {
      if (user) {
        token.id = user.id ?? "";
      }
      return token;
    },
    async session({ session, token }: { session: any; token: User }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
