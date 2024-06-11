import prisma from '@/src/db'
import { generateEmailHash } from '@/utils/tokens'

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  })
}

export const createUserToken = async (user_id: string) => {
  const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24)
  const access_token = await generateEmailHash(`${user_id}-${expires_at.toISOString()}`)

  return await prisma.account.create({
    data: {
      userId: user_id,
      provider: 'credentials',
      providerAccountId: user_id,
      type: 'register',
      access_token,
      expires_at: BigInt(expires_at.getTime()),
    },
  })
}
