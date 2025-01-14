import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z
            .string()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "contraseña no valida")
})