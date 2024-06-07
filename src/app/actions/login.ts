'use server'

import { LoginSchema } from '@/app/schemas'
import { signIn } from '@/src/auth'
import prisma from '@/src/db'
import * as argon2 from 'argon2'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export default async function login(data: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(data)
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

    const matchPassword = await argon2.verify(
      user?.password as string,
      password,
    )

    if (!user || !matchPassword) {
      return { error: true, key: 'invalid_credentials' }
    }

    if (!user.active || !user.emailVerified) {
      return { error: true, key: 'inactive_credentials' }
    }

    await signIn('credentials', {
      ...data,
      redirect: false,
    })
  } catch (error) {
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
  // redirect('/reservas')
  return { success: true }
}
