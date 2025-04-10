import argon2 from 'argon2'

export async function getHashedPassword(password: string) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  })
}

export async function verifyPassword(hashedPassword: string, password: string) {
  try {
    return await argon2.verify(hashedPassword, password)
  } catch (error) {
    console.error('Password verification error:', error)
    return false
  }
}
