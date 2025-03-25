import * as z from "zod"

export const registerSchema = z.object({
  email: z.string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "Correo electrónico inválido" }),
  password: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(/[A-Z]/, { message: "La contraseña debe tener al menos una mayúscula" })
    .regex(/[0-9]/, { message: "La contraseña debe tener al menos un número" }),
  confirmPassword: z.string()
    .min(1, { message: "Confirmar contraseña es requerido" }),
  name: z.string()
    .min(1, { message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  role: z.enum(["RENTER", "LANDLORD"], {
    required_error: "Debes seleccionar un rol",
  })
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
