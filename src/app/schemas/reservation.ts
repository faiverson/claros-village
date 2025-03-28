import { z } from 'zod';
import { Amenity, SumShift, SumRoom } from '@/types/enums';

export const ReservationDBSchema = z.object({
  amenity: z.nativeEnum(Amenity),
  shift: z.nativeEnum(SumShift),
  date_at: z.union([z.string(), z.date()]),
  rooms: z.array(z.nativeEnum(SumRoom)),
  observation: z.string().optional()
});

export type ReservationSchemaType = z.infer<typeof ReservationDBSchema>;
