import { z } from "zod"; 

export const resetPasswordScheme = z.object({   
  newPassword: z.string().min(6, "Password must be at least 6 characters"), 
  confirmNewPassword: z.string().min(6, "Password must be at least 6 characters"),
 }).refine(data => data.newPassword === data.confirmNewPassword, {   message: "Passwords do not match",   
path: ["confirmNewPassword"],  });