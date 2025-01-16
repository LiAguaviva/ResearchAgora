import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("invalid email"),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "invalid password"),
  repPassword: z.string().min(1, "Please repeat the password"),
}).refine(data => data.password === data.repPassword, {
  message: "*Incorrect log in credentials",
  path: ["repPassword"],
});