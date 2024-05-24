import { Role } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'El correo no es válido' }),
  password: z.string(),
})

export const RegisterSchema = z
  .object({
    name: z.string(),
    role: z.nativeEnum(Role),
    email: z.string().email({ message: 'El correo no es válido' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    password_confirm: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ['password_confirm'],
    message: 'La contraseña no coincide',
  })
