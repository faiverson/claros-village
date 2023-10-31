import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  //   EmailProvider({
  //     server: {
  //       host: process.env.EMAIL_SERVER_HOST,
  //       port: process.env.EMAIL_SERVER_PORT,
  //       auth: {
  //         user: process.env.EMAIL_SERVER_USER,
  //         pass: process.env.EMAIL_SERVER_PASSWORD
  //       }
  //     },
  //     from: process.env.EMAIL_FROM
  //   }),
  ],
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === "google") {
  //       return profile.email_verified && profile.email.endsWith("@example.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // }
}

export default NextAuth(authOptions)
