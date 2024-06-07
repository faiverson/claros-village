import { getUserById } from '@/app/user'
import { signIn } from '@/src/auth'
import prisma from '@/src/db'
import { DEFAULT_LOGIN_REDIRECT } from '@/src/routes'
import { AuthError } from 'next-auth'

export async function GET(
  request: Request,
  { params }: { params: { user_id: string; token: string } },
) {
  const { user_id, token } = params

  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier: {
        equals: user_id,
      },
      token: {
        equals: token,
      },
    },
  })

  if (!verificationToken) {
    throw new Error('token_not_found')
  }

  const tokenExpiryDate = new Date(verificationToken.expires)
  const currentDate = new Date()

  if (currentDate >= tokenExpiryDate) {
    try {
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: {
            equals: verificationToken.identifier,
          },
        },
      })

      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          active: true,
          emailVerified: currentDate.toISOString(),
        },
      })

      await signIn('credentials', {
        ...{ user_id },
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      })
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            throw new Error('invalid_credentials')
          default:
            throw new Error('unknown_error')
        }
      }
      throw error
    }
  }

  throw new Error('token_expired')
}
