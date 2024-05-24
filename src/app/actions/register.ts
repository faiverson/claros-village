'use server'

import { RegisterSchema } from '@/app/schemas'
import db from '@/src/db'
import sendVerificationEmail from '@/utils/email'
import { Role } from '@prisma/client'
import * as argon2 from 'argon2'
import { z } from 'zod'

export default async function signUp(formData: z.infer<typeof RegisterSchema>) {
  const { email, password, role } = formData

  const existingUser = await db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (existingUser) {
    return { error: true, key: 'user_exist' }
  }

  const emailField = role === Role.LANDLORD ? 'email_owners' : 'email_expenses'

  const existingResident = await db.resident.findFirst({
    where: {
      [emailField]: {
        has: email,
      },
    },
  })

  const hashedPassword = await argon2.hash(password)

  if (existingResident) {
    const user = await db.user.create({
      data: {
        name: formData.name,
        role: formData.role,
        email: formData.email,
        password: hashedPassword,
        residents: {
          create: {
            residentId: existingResident.id,
          },
        },
      },
    })

    const res = await sendVerificationEmail(user)
    console.log(res)

    return { data: user, key: 'user_created' }
  }

  return { error: true, key: 'resident_not_found' }
}
