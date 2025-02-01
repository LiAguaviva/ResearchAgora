import { z } from 'zod';

export const editProfileScheme = z.object({
  user_name: z.string().min(1, '* B Please enter your name').nullable()
    .refine((val) => val !== null, { message: '* B Please enter your name' }), 

  user_lastname: z.string().min(1, '* B Please enter your last name').nullable()
  .refine((val) => val !== null, { message: '* B Please enter your last name' }),

  user_country: z.string().min(1, '* B Please enter your country').nullable()
  .refine((val) => val !== null, { message: '* B Please enter your country' }),

  user_city: z.string().min(1, '* B Please enter your city').nullable()
  .refine((val) => val !== null, { message: '* B Please enter your city' }),

  user_description: z.string().max(500, '* B Description cannot exceed 500 characters').nullable()
   .optional(),

  user_proficiency: z.string().max(50, '* B Proficiency cannot exceed 50 characters').nullable(),
    
  user_current_lab: z.string().max(100, '* B Current lab cannot exceed 100 characters').nullable(),
 
  user_current_boss: z.string().max(100, '* B Current head cannot exceed 100 characters').nullable(),
  

});