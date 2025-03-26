import * as z from "zod"
import { Role } from '@prisma/client'

export const registerSchema = z.object({
  email: z.string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, { message: "La contraseña debe tener al menos una mayúscula" })
    .regex(/[a-z]/, { message: "La contraseña debe tener al menos una minúscula" })
    .regex(/[0-9]/, { message: "La contraseña debe tener al menos un número" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirmar contraseña es requerido" }),
  name: z.string()
    .min(1, { message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  role: z.nativeEnum(Role),
  unidad: z.string()
    .min(1, { message: "Debe seleccionar una unidad" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z.string()
    .min(1, { message: "La contraseña es requerida" }),
});

export type LoginInput = z.infer<typeof loginSchema>
