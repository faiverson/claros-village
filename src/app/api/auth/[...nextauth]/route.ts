import type { NextAuthOptions } from 'next-auth'
import NextAuth, { User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import GoogleProvider from "next-auth/providers/google"


const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }): Promise<boolean> {
      return ['fa.iverson@gmail.com', 'walterguzman@gmail.com'].includes(user.email!)
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { authOptions, handler as GET, handler as POST }
