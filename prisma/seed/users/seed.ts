import { PrismaClient } from '@prisma/client'
import { FileUser } from '@/utils/types/user'
import * as argon2 from 'argon2'
import fs from 'fs'

const prisma = new PrismaClient()

export async function seedUsers() {
  // Truncate users table with CASCADE
  await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`

  const users: FileUser[] = JSON.parse(
    fs.readFileSync('static/privates/users.json', 'utf8'),
  )

  const currentDate = new Date()

  for (const user of users) {
    const hashedPassword = await argon2.hash('Pa$$w0rd!!')
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
        active: true,
        emailVerified: currentDate.toISOString(),
      },
    })
  }
}
