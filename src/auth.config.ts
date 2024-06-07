import { LoginSchema } from '@/app/schemas'
import { getUserByEmail, getUserById } from '@/app/user'
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
          let user
          if (!!credentials?.user_id) {
            const { user_id } = credentials
            user = (await getUserById(user_id as string)) as User
          } else {
            const { email, password } =
              await LoginSchema.parseAsync(credentials)
            user = (await getUserByEmail(email)) as User
          }

          if (!user) {
            return null
          }

          return user
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
      // console.log('JWT', { token, trigger, user })

      if (trigger === 'signIn') {
        token.role = user.role
        token.picture = user.avatar
      }
      return token
    },
    session({ session, token }) {
      // console.log('session', { session, token })
      session.user.role = token.role as Role
      session.user.id = token.sub as string
      session.user.avatar = token.picture as string
      return session
    },
  },
  // pages: {
  //   signIn: '/login',
  // },
} satisfies NextAuthConfig
