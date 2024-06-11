import { Amenity, SumRoom, SumShift } from '@/utils/types'
import { Role } from '@prisma/client'
import type { DateValue } from '@react-types/calendar'
import * as z from 'zod'

const DateFieldSchema: z.ZodType<DateValue> = z.any()

export const LoginSchema = z.object({
    email: z.string().email({ message: 'El correo no es válido' }),
    password: z.string(),
})

export const RegisterSchema = z
    .object({
        name: z.string(),
        role: z.nativeEnum(Role),
        email: z.string().email({ message: 'El correo no es válido' }),
        password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
        password_confirm: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    })
    .refine((data) => data.password === data.password_confirm, {
        path: ['password_confirm'],
        message: 'La contraseña no coincide',
    })

export const ReservationSchema = z
    .object({
        amenity: z.nativeEnum(Amenity, {
            errorMap: () => {
                return { message: 'Debe seleccionar un lugar' }
            },
        }),
        date_at: DateFieldSchema,
        shift: z.nativeEnum(SumShift, {
            errorMap: () => {
                return { message: 'Debe seleccionar un horario' }
            },
        }),
        rooms: z.array(z.nativeEnum(SumRoom)),
        observation: z.string().nullable(),
    })
    .refine((data) => (data.amenity === Amenity.Sum ? data.rooms.length > 0 : true), {
        message: 'Debe seleccionar al menos un salón',
        path: ['rooms'],
    })

export const ReservationDBSchema = ReservationSchema.innerType().extend({
    date_at: z.string(),
})
