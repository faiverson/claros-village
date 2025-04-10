import { z } from 'zod'
import { Role } from '@prisma/client'

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').optional(),
  role: z.nativeEnum(Role),
  unidad: z.string().optional(),
  active: z.boolean().default(true),
}).refine((data) => {
  // If we're editing (id exists), then id is required
  if (data.id) {
    return data.id.length > 0;
  }
  return true;
}, {
  message: 'El ID es requerido para edición',
  path: ['id']
});

export type UserInput = z.infer<typeof userSchema>
