import { z } from 'zod';

export const loginScheme = z.object({
  email: z.string().email("* invalid email"),
  password: z
            .string()
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "* Please enter a valid password")
})