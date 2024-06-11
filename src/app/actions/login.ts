'use server'

import { LoginSchema } from '@/app/schemas'
import { signIn } from '@/src/auth'
import prisma from '@/src/db'
import * as argon2 from 'argon2'
import { AuthError } from 'next-auth'
import { z } from 'zod'
import { auth } from '@/src/auth'

export default async function serverLogin(data: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(data)
  // console.log('validatedFields', validatedFields)
  if (!validatedFields.success) {
    return { error: true, key: 'invalid_credentials' }
  }

  try {
    const { email, password } = data

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (!user) {
      return { error: true, key: 'invalid_credentials' }
    }

    // console.log('user', user)
    const matchPassword = await argon2.verify(
      user?.password as string,
      password,
    )

    // console.log('matchPassword', matchPassword)
    if (!matchPassword) {
      return { error: true, key: 'invalid_credentials' }
    }

    if (!user.active || !user.emailVerified) {
      return { error: true, key: 'inactive_credentials' }
    }

    await signIn('credentials', {
      ...user,
      // redirectTo: '/',
      redirect: false,
    })
  } catch (error) {
    // console.log('ERROR\n\n\n\n', error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: true, key: 'invalid_credentials' }
        default:
          return { error: true, key: 'Something went wrong' }
      }
    }

    throw error
  }

  return { success: true }
}
