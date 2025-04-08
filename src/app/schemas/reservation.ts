import { z } from 'zod';
import { Amenity, SumShift, SumRoom } from '@/utils/enums';
import { Role } from '@prisma/client';

export const ReservationFormSchema = (role?: Role) => z.object({
  amenity: z.nativeEnum(Amenity, {
    required_error: 'Debe seleccionar un espacio',
  }),
  shift: z.nativeEnum(SumShift, {
    required_error: 'Debe seleccionar un turno',
  }),
  rooms: z.array(z.nativeEnum(SumRoom), {
    required_error: 'Debe seleccionar al menos un salón',
  }).min(1, 'Debe seleccionar al menos un salón'),
  date_at: z.date({
    required_error: 'Debe seleccionar una fecha',
  }),
  observation: z.string().optional(),
  userId: z.string().optional(),
}).refine((data) => {
  if (role === Role.ADMIN && !data.userId) {
    return false;
  }
  return true;
}, {
  message: 'Debe seleccionar un usuario',
  path: ['userId'],
});

export const ReservationDBSchema = z.object({
  amenity: z.nativeEnum(Amenity),
  shift: z.nativeEnum(SumShift),
  date_at: z.union([z.string(), z.date()]),
  rooms: z.array(z.nativeEnum(SumRoom)),
  observation: z.string().optional(),
  userId: z.string().optional(),
});

export type ReservationSchemaType = z.infer<typeof ReservationDBSchema>;
export type ReservationFormType = z.infer<ReturnType<typeof ReservationFormSchema>>;
