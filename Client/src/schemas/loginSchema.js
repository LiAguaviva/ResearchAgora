import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z
            .string()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "contraseña no valida")
})