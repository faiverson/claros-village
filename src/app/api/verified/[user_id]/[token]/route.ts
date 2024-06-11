import { signIn } from '@/src/auth'
import { NextResponse } from 'next/server'
import prisma from '@/src/db'
import { DEFAULT_LOGIN_REDIRECT } from '@/src/routes'
import { AuthError } from 'next-auth'

export async function GET(
  request: Request,
  { params }: { params: { user_id: string; token: string } },
) {
  const { user_id, token } = params

  const account = await prisma.account.findFirst({
    where: {
      userId: {
        equals: user_id,
      },
      access_token: {
        equals: token,
      },
      provider: {
        equals: 'credentials',
      },
      type: {
        equals: 'register',
      },
    },
  })

  if (!account) {
    return { error: true, key: 'token_not_found' }
  }

  if (account.expires_at === null) {
    return { error: true, key: 'token_expiry_date_not_found' }
  }
  if (account.expires_at === null) {
    return { error: true, key: 'token_expiry_date_not_found' }
  }
  const currentDate = Date.now()
  const expiredAt = Number(account.expires_at.toString())

  if (currentDate <= expiredAt) {
    try {
      await prisma.account.deleteMany({
        where: {
          userId: {
            equals: account.userId,
          },
          provider: {
            equals: 'credentials',
          },
          type: {
            equals: 'register',
          },
        },
      })

      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          active: true,
          emailVerified: (new Date(currentDate)).toISOString(),
        },
      })

      console.log('credentials')
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

  return NextResponse.json( { error: true, key: 'token_expired' })
}
