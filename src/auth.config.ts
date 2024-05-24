import { LoginSchema } from '@/app/schemas'
import { getUserByEmail } from '@/app/user'
import { Role } from '@prisma/client'
import type { NextAuthConfig, User } from 'next-auth'
import { type DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'

declare module 'next-auth' {
  interface User {
    avatar: string
    role: Role
  }
  interface Session {
    user: {
      id: string
      avatar: string
      role: Role
    } & DefaultSession['user']
  }
}

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials)
          // return {email, password, id: "1",
          // name: "Fill Murray"};

          const user = await getUserByEmail(
            'fabian.torres@clarosvillage.org.ar',
          )
          // const user = await getUserByEmail(email);
          // console.log('USER PRISMA', user);
          if (!user) {
            return null
          }

          // // TODO compare passwords
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user?.avatar,
            role: user.role,
          } as User
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, trigger, user }) {
      if (trigger === 'signIn') {
        token.role = user.role
        token.picture = user.avatar
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.role as Role
      session.user.id = token.sub as string
      session.user.avatar = token.picture as string
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig
