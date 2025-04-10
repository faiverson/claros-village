import { Role } from '@prisma/client'
import type { DateValue } from '@react-types/calendar'
import * as z from 'zod'

import { Amenity, SumRoom, SumShift } from '@/utils/enums'

const DateFieldSchema: z.ZodType<DateValue> = z.any()

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una letra mayúscula' })
      .regex(/[a-z]/, { message: 'La contraseña debe tener al menos una letra minúscula' })
      .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' }),
    confirmPassword: z.string(),
    role: z.nativeEnum(Role),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const LoginSchema = z.object({
  email: z.string().email({ message: 'El correo no es válido' }),
  password: z.string(),
})

export const ReservationSchema = z
  .object({
    date: DateFieldSchema,
    amenity: z.nativeEnum(Amenity),
    rooms: z.array(z.nativeEnum(SumRoom)).optional(),
    shift: z.nativeEnum(SumShift).optional(),
    guestCount: z.number().min(1).max(50).optional(),
    observation: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.amenity === Amenity.Sum) {
        return Array.isArray(data.rooms) && data.rooms.length > 0
      }
      return true
    },
    {
      message: 'Debe seleccionar al menos un salón',
      path: ['rooms'],
    }
  )

export const ReservationDBSchema = ReservationSchema.innerType().extend({
  date_at: z.string(),
})
