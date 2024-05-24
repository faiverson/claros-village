import prisma from '@/src/db'
import { generateEmailHash } from '@/utils/tokens'
import crypto from 'crypto'

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
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24)
  return await prisma.verificationToken.create({
    data: {
      identifier: user_id,
      token: generateEmailHash(`${user_id}-${expires.toISOString()}`),
      expires,
    },
  })
}
