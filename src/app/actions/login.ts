'use server'

import { LoginSchema } from '@/app/schemas'
import { signIn } from '@/src/auth'
import prisma from '@/src/db'
import { DEFAULT_LOGIN_REDIRECT } from '@/src/routes'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export default async function login(data: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(data)
  if (!validatedFields.success) {
    return { error: true, key: 'invalid_credentials' }
  }

  try {
    // const user = await prisma.user.findFirst({
    //   where: {
    //     email: {
    //       equals: "fabian.torres@clarosvillage.org.ar",
    //     },
    //   },
    // });
    // const user = {...data};

    const user = await signIn('credentials', {
      ...data,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
    // const user = await signIn('credentials', {...data});
  } catch (error) {
    console.log('error')
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

  // if(!!user) {
  //   return user.active ? {data: user, key: 'session_started'} : { error: true, key: 'user_inactive' };
  // }

  return { success: true }
}
